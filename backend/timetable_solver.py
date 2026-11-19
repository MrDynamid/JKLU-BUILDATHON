"""
JKLU Automated Master Timetable Solver (Zero-Walk Constraint Engine)
Powered by Google OR-Tools CP-SAT Solver

Solves university semester timetabling with zero room clashes, zero professor clashes,
zero student batch clashes, strictly protected 12:00 - 1:00 PM lunch break,
and floor-affinity optimization for Zero Walking Delay.
"""

import sys
import json
from ortools.sat.python import cp_model

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]  # 12:00 lunch excluded

VENUES = [
    {"id": "EB1-101", "name": "Classroom EB1-101", "building": "EB1", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB1-102", "name": "Classroom EB1-102", "building": "EB1", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB1-103", "name": "Classroom EB1-103", "building": "EB1", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB1-104", "name": "Classroom EB1-104", "building": "EB1", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB2-104", "name": "Classroom EB2-104", "building": "EB2", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB2-105", "name": "Classroom EB2-105", "building": "EB2", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB2-106", "name": "Classroom EB2-106", "building": "EB2", "floor": 1, "type": "Classroom", "capacity": 60},
    {"id": "EB2-202", "name": "Classroom EB2-202", "building": "EB2", "floor": 2, "type": "Classroom", "capacity": 60},
    {"id": "EB2-204", "name": "Classroom EB2-204", "building": "EB2", "floor": 2, "type": "Classroom", "capacity": 60},
    {"id": "EB2-205", "name": "Classroom EB2-205", "building": "EB2", "floor": 2, "type": "Classroom", "capacity": 60},
    {"id": "TB-102", "name": "EE / Comp Lab", "building": "TB", "floor": 1, "type": "Hardware Lab", "capacity": 30},
    {"id": "TB-106", "name": "Programming Lab", "building": "TB", "floor": 1, "type": "Computer Lab", "capacity": 70},
    {"id": "TB-112", "name": "Hardware / EE Lab", "building": "TB", "floor": 1, "type": "Hardware Lab", "capacity": 60},
    {"id": "IET-AMP", "name": "IET Amphitheatre", "building": "IET", "floor": 0, "type": "Auditorium", "capacity": 200},
]

# Section Preferred Home Floors for Zero Walking Delay:
# Sec A-D -> EB1 Floor 1
# Sec E-G -> EB2 Floor 1
# Sec H-J -> EB2 Floor 2
SECTION_PREFERRED_FLOORS = {
    "Sec A": ("EB1", 1),
    "Sec B": ("EB1", 1),
    "Sec C": ("EB1", 1),
    "Sec D": ("EB1", 1),
    "Sec E": ("EB2", 1),
    "Sec F": ("EB2", 1),
    "Sec G": ("EB2", 1),
    "Sec H": ("EB2", 2),
    "Sec I": ("EB2", 2),
    "Sec J": ("EB2", 2),
}

DEFAULT_INTAKE = [
    {"code": "CS1139", "title": "Programming-1", "type": "theory", "teacher": "Dr. Amar Nath Patra", "sections": ["Sec A", "Sec B", "Sec I", "Sec J"], "hours": 3},
    {"code": "CS1139-L", "title": "Programming Lab", "type": "lab", "teacher": "Dr. Amar Nath Patra", "sections": ["Sec A", "Sec B", "Sec I"], "hours": 2},
    {"code": "EE1118", "title": "EE Engineering", "type": "theory", "teacher": "Dr. Rashmi Kushwaha", "sections": ["Sec A", "Sec C", "Sec E"], "hours": 3},
    {"code": "EE1118-L", "title": "EE Lab", "type": "lab", "teacher": "Dr. Rashmi Kushwaha", "sections": ["Sec A", "Sec C"], "hours": 2},
    {"code": "MA1101", "title": "Applied Math", "type": "theory", "teacher": "Prof. Devendra Bhavsar", "sections": ["Sec B", "Sec D", "Sec F"], "hours": 3},
    {"code": "CS1140", "title": "Data Structures", "type": "theory", "teacher": "Dr. Neeraj Kumar", "sections": ["Sec G", "Sec H", "Sec I", "Sec J"], "hours": 3},
    {"code": "CS1140-L", "title": "Hardware Lab", "type": "lab", "teacher": "Dr. Neeraj Kumar", "sections": ["Sec G", "Sec H"], "hours": 2},
]


def solve_timetable(intake=DEFAULT_INTAKE):
    print("=" * 70)
    print("🚀 Initializing Google OR-Tools CP-SAT Master Timetable Solver")
    print("=" * 70)

    model = cp_model.CpModel()

    # Expand intake into individual lecture unit tasks
    tasks = []
    task_id = 0
    for item in intake:
        for sec in item["sections"]:
            for h in range(item["hours"]):
                tasks.append({
                    "id": task_id,
                    "code": item["code"],
                    "title": item["title"],
                    "teacher": item["teacher"],
                    "section": sec,
                    "is_lab": item["type"] == "lab" or "lab" in item["title"].lower(),
                    "hour": h
                })
                task_id += 1

    print(f"📊 Total lecture tasks to schedule: {len(tasks)}")

    num_tasks = len(tasks)
    num_venues = len(VENUES)
    num_days = len(DAYS)
    num_slots = len(TIME_SLOTS)

    # Decision variables: x[task_idx, venue_idx, day_idx, slot_idx] in {0, 1}
    x = {}
    for i in range(num_tasks):
        t = tasks[i]
        for v in range(num_venues):
            venue = VENUES[v]
            is_venue_lab = "lab" in venue["type"].lower() or venue["id"] == "IET-AMP"

            # Domain pruning: theory cannot go into pure lab, lab must go into lab room
            if t["is_lab"] and not is_venue_lab:
                continue
            if not t["is_lab"] and "lab" in venue["type"].lower():
                continue

            for d in range(num_days):
                for s in range(num_slots):
                    x[(i, v, d, s)] = model.NewBoolVar(f"x_{i}_{v}_{d}_{s}")

    # Constraint 1: Every task must be scheduled in exactly one (venue, day, slot)
    for i in range(num_tasks):
        assigned_vars = [x[(i, v, d, s)] for v in range(num_venues) for d in range(num_days) for s in range(num_slots) if (i, v, d, s) in x]
        model.Add(sum(assigned_vars) == 1)

    # Constraint 2: No venue clash (at most 1 task per venue per day per slot)
    for v in range(num_venues):
        for d in range(num_days):
            for s in range(num_slots):
                venue_slot_vars = [x[(i, v, d, s)] for i in range(num_tasks) if (i, v, d, s) in x]
                if venue_slot_vars:
                    model.Add(sum(venue_slot_vars) <= 1)

    # Constraint 3: No teacher clash (a professor cannot teach two classes simultaneously)
    teachers = list(set(t["teacher"] for t in tasks))
    for teacher in teachers:
        teacher_tasks = [i for i in range(num_tasks) if tasks[i]["teacher"] == teacher]
        for d in range(num_days):
            for s in range(num_slots):
                teacher_slot_vars = [x[(i, v, d, s)] for i in teacher_tasks for v in range(num_venues) if (i, v, d, s) in x]
                if teacher_slot_vars:
                    model.Add(sum(teacher_slot_vars) <= 1)

    # Constraint 4: No student section clash (a section cannot attend two classes simultaneously)
    sections = list(set(t["section"] for t in tasks))
    for sec in sections:
        sec_tasks = [i for i in range(num_tasks) if tasks[i]["section"] == sec]
        for d in range(num_days):
            for s in range(num_slots):
                sec_slot_vars = [x[(i, v, d, s)] for i in sec_tasks for v in range(num_venues) if (i, v, d, s) in x]
                if sec_slot_vars:
                    model.Add(sum(sec_slot_vars) <= 1)

    # Constraint 5: Spread constraint (at most 2 lectures of same course for a section per day)
    for sec in sections:
        for code in set(t["code"] for t in tasks):
            target_tasks = [i for i in range(num_tasks) if tasks[i]["section"] == sec and tasks[i]["code"] == code]
            for d in range(num_days):
                day_vars = [x[(i, v, d, s)] for i in target_tasks for v in range(num_venues) for s in range(num_slots) if (i, v, d, s) in x]
                if day_vars:
                    model.Add(sum(day_vars) <= 2)

    # Objective: Maximize Zero Walking Delay / Floor Affinity
    # Reward scheduling classes on the section's home building and floor
    affinity_terms = []
    for i in range(num_tasks):
        sec = tasks[i]["section"]
        pref = SECTION_PREFERRED_FLOORS.get(sec)
        if not pref:
            continue
        pref_building, pref_floor = pref

        for v in range(num_venues):
            venue = VENUES[v]
            bonus = 0
            if venue["building"] == pref_building and venue["floor"] == pref_floor:
                bonus = 100  # Exact same floor: Zero Walking Delay
            elif venue["building"] == pref_building:
                bonus = 40   # Same building
            else:
                bonus = 10

            for d in range(num_days):
                for s in range(num_slots):
                    if (i, v, d, s) in x:
                        affinity_terms.append(bonus * x[(i, v, d, s)])

    model.Maximize(sum(affinity_terms))

    # Solve
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 10.0
    status = solver.Solve(model)

    if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        print(f"✅ Solver Status: {'OPTIMAL' if status == cp_model.OPTIMAL else 'FEASIBLE'}")
        print(f"🏆 Objective Value (Zero-Walk Affinity Score): {solver.ObjectiveValue()}")

        # Build schedule matrix
        schedule = {d: {v["id"]: {s: None for s in TIME_SLOTS} for v in VENUES} for d in DAYS}
        zero_walk_count = 0
        total_assigned = 0

        for (i, v, d, s), var in x.items():
            if solver.Value(var) == 1:
                task = tasks[i]
                venue = VENUES[v]
                day = DAYS[d]
                slot = TIME_SLOTS[s]

                schedule[day][venue["id"]][slot] = {
                    "code": task["code"],
                    "title": task["title"],
                    "teacher": task["teacher"],
                    "section": task["section"],
                    "is_lab": task["is_lab"]
                }
                total_assigned += 1

                pref = SECTION_PREFERRED_FLOORS.get(task["section"])
                if pref and venue["building"] == pref[0] and venue["floor"] == pref[1]:
                    zero_walk_count += 1

        zero_walk_percentage = round((zero_walk_count / total_assigned) * 100, 1) if total_assigned else 100

        print(f"🎯 Classes Scheduled: {total_assigned} / {num_tasks}")
        print(f"🚶 Zero Walking Delay Match: {zero_walk_percentage}% ({zero_walk_count}/{total_assigned} classes on home floor)")
        print(f"🍽️ Lunch Hour (12:00 - 1:00 PM): 100% Protected (0 clashes)")

        # Save to JSON
        output_data = {
            "status": "success",
            "solver": "Google OR-Tools CP-SAT",
            "total_assigned": total_assigned,
            "zero_walk_percentage": zero_walk_percentage,
            "lunch_protected": True,
            "schedule": schedule
        }

        with open("master_timetable_generated.json", "w") as f:
            json.dump(output_data, f, indent=2)

        print("📁 Result saved to master_timetable_generated.json")
        return output_data
    else:
        print("❌ No feasible schedule found within constraints.")
        return {"status": "infeasible"}


if __name__ == "__main__":
    solve_timetable()
