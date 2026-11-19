// JKLU First-Semester Official Timetable & Campus Venue Dataset
// Sourced directly from official Academic Timetable (Design Thinking with AI & Physics Groups)
// Operating hours: 9:00 AM to 5:00 PM (8 one-hour academic slots)
// Full 5-Day Weekly Coverage: Monday through Friday

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TIME_SLOTS = [
  { id: '09:00', label: '9 AM', range: '9:00 - 10:00 AM', startHour: 9, endHour: 10 },
  { id: '10:00', label: '10 AM', range: '10:00 - 11:00 AM', startHour: 10, endHour: 11 },
  { id: '11:00', label: '11 AM', range: '11:00 AM - 12:00 PM', startHour: 11, endHour: 12 },
  { id: '12:00', label: '12 PM (Lunch)', range: '12:00 - 1:00 PM', startHour: 12, endHour: 13, isLunch: true, title: 'Campus Lunch Break' },
  { id: '13:00', label: '1 PM', range: '1:00 - 2:00 PM', startHour: 13, endHour: 14 },
  { id: '14:00', label: '2 PM', range: '2:00 - 3:00 PM', startHour: 14, endHour: 15 },
  { id: '15:00', label: '3 PM', range: '3:00 - 4:00 PM', startHour: 15, endHour: 16 },
  { id: '16:00', label: '4 PM', range: '4:00 - 5:00 PM', startHour: 16, endHour: 17 }
];

export const VENUES = [
  {
    "id": "EB1-002",
    "name": "EB1-002",
    "type": "Classroom",
    "building": "EB1",
    "floor": 0,
    "floorLabel": "Ground",
    "capacity": 30,
    "displayTech": "Projector",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Tutorial"
  },
  {
    "id": "EB1-101",
    "name": "EB1-101",
    "type": "Classroom",
    "building": "EB1",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec A"
  },
  {
    "id": "EB1-102",
    "name": "EB1-102",
    "type": "Classroom",
    "building": "EB1",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec B"
  },
  {
    "id": "EB1-103",
    "name": "EB1-103",
    "type": "Classroom",
    "building": "EB1",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec C"
  },
  {
    "id": "EB1-104",
    "name": "EB1-104",
    "type": "Classroom",
    "building": "EB1",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec D"
  },
  {
    "id": "EB2-104",
    "name": "EB2-104",
    "type": "Classroom",
    "building": "EB2",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec E"
  },
  {
    "id": "EB2-105",
    "name": "EB2-105",
    "type": "Classroom",
    "building": "EB2",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec F"
  },
  {
    "id": "EB2-106",
    "name": "EB2-106",
    "type": "Classroom",
    "building": "EB2",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec G"
  },
  {
    "id": "EB2-202",
    "name": "EB2-202",
    "type": "Classroom",
    "building": "EB2",
    "floor": 2,
    "floorLabel": "Floor 2",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec J"
  },
  {
    "id": "EB2-204",
    "name": "EB2-204",
    "type": "Classroom",
    "building": "EB2",
    "floor": 2,
    "floorLabel": "Floor 2",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec I"
  },
  {
    "id": "EB2-205",
    "name": "EB2-205",
    "type": "Classroom",
    "building": "EB2",
    "floor": 2,
    "floorLabel": "Floor 2",
    "capacity": 60,
    "displayTech": "Smart Board",
    "powerSockets": "Medium",
    "pcs": 0,
    "homeSection": "Sec H"
  },
  {
    "id": "TB-102",
    "name": "TB-102",
    "type": "EE / Comp Lab",
    "building": "TB",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 30,
    "displayTech": "Projector",
    "powerSockets": "High (Every Seat)",
    "pcs": 30,
    "homeSection": "Sem 1 Labs"
  },
  {
    "id": "TB-106",
    "name": "TB-106",
    "type": "Programming Lab",
    "building": "TB",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 70,
    "displayTech": "Projector",
    "powerSockets": "High (Every Seat)",
    "pcs": 70,
    "homeSection": "CS1139 Labs"
  },
  {
    "id": "TB-112",
    "name": "TB-112",
    "type": "Hardware Lab",
    "building": "TB",
    "floor": 1,
    "floorLabel": "Floor 1",
    "capacity": 60,
    "displayTech": "Projector",
    "powerSockets": "High (Every Seat)",
    "pcs": 30,
    "homeSection": "EE / VLSI"
  },
  {
    "id": "IET-AMP",
    "name": "IET Amphitheatre",
    "type": "Amphitheatre",
    "building": "IET",
    "floor": 0,
    "floorLabel": "Ground",
    "capacity": 200,
    "displayTech": "Projector",
    "powerSockets": "None / Low",
    "pcs": 0,
    "homeSection": "Sem 1 Events"
  }
];

export const FIRST_SEM_BATCHES = [
  'General',
  'Sec A (EB1-101)',
  'Sec B (EB1-102)',
  'Sec C (EB1-103)',
  'Sec D (EB1-104)',
  'Sec E (EB2-104)',
  'Sec F (EB2-105)',
  'Sec G (EB2-106)',
  'Sec H (EB2-205)',
  'Sec I (EB2-204)',
  'Sec J (EB2-202)'
];

// Faculty roster with day-by-day scheduled assignments directly from official timetable
export const INITIAL_FACULTY = [
  {
    "id": "fac-1",
    "name": "Dr. Amar Nath Patra",
    "department": "Computer Science & Engineering",
    "course": "Programming-1 (CS1139)",
    "avatar": "AN",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "TB-106",
          "time": "09:00",
          "course": "Programming-1 Lab (CS1139) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "TB-106",
          "time": "10:00",
          "course": "Programming-1 Lab (CS1139) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB1-101",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-204",
          "time": "15:00",
          "course": "Programming-1 (CS1139) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-204",
          "time": "10:00",
          "course": "Programming-1 (CS1139) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB1-101",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-204",
          "time": "14:00",
          "course": "Programming-1 (CS1139) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-101",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "TB-106",
          "time": "15:00",
          "course": "Programming-1 Lab (CS1139) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "TB-106",
          "time": "16:00",
          "course": "Programming-1 Lab (CS1139) (Sec I)",
          "batch": "Sec I"
        }
      ]
    }
  },
  {
    "id": "fac-2",
    "name": "Dr. Ankush Soni",
    "department": "Computer Science & Engineering",
    "course": "Programming-1 (CS1139)",
    "avatar": "AS",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-102",
          "time": "14:00",
          "course": "Programming-1 (CS1139) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Tuesday": [
        {
          "roomId": "TB-106",
          "time": "09:00",
          "course": "Programming-1 Lab (CS1139) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "TB-106",
          "time": "10:00",
          "course": "Programming-1 Lab (CS1139) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-104",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-102",
          "time": "09:00",
          "course": "Programming-1 (CS1139) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-104",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Thursday": [
        {
          "roomId": "TB-106",
          "time": "09:00",
          "course": "Programming-1 Lab (CS1139) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "TB-106",
          "time": "10:00",
          "course": "Programming-1 Lab (CS1139) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB1-102",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-104",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec D)",
          "batch": "Sec D"
        }
      ]
    }
  },
  {
    "id": "fac-3",
    "name": "Dr. Devika Kataria",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "DK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-202",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-106",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Tuesday": [],
      "Wednesday": [
        {
          "roomId": "TB-102",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "TB-102",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-106",
          "time": "11:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-202",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-106",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-202",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "TB-102",
          "time": "16:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
          "batch": "Sec J"
        }
      ]
    }
  },
  {
    "id": "fac-4",
    "name": "Dr. Surbhi Chhabra",
    "department": "Computer Science & Engineering",
    "course": "Programming-1 (CS1139)",
    "avatar": "SC",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-205",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-202",
          "time": "10:00",
          "course": "Programming-1 (CS1139) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-205",
          "time": "14:00",
          "course": "Programming-1 (CS1139) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-202",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "TB-106",
          "time": "15:00",
          "course": "Programming-1 Lab (CS1139) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "TB-106",
          "time": "16:00",
          "course": "Programming-1 Lab (CS1139) (Sec J)",
          "batch": "Sec J"
        }
      ],
      "Thursday": [
        {
          "roomId": "TB-106",
          "time": "13:00",
          "course": "Programming-1 Lab (CS1139) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "TB-106",
          "time": "14:00",
          "course": "Programming-1 Lab (CS1139) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Friday": [
        {
          "roomId": "TB-106",
          "time": "09:00",
          "course": "Programming-1 Lab (CS1139) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB2-205",
          "time": "09:00",
          "course": "Programming-1 (CS1139) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "TB-106",
          "time": "10:00",
          "course": "Programming-1 Lab (CS1139) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB2-202",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec J)",
          "batch": "Sec J"
        }
      ]
    }
  },
  {
    "id": "fac-5",
    "name": "DR. MANJU RANA",
    "department": "Design & Engineering",
    "course": "Design Thinking with AI (AI0000)",
    "avatar": "MR",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-104",
          "time": "09:00",
          "course": "Design Thinking with AI (AI0000) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB1-102",
          "time": "13:00",
          "course": "Design Thinking with AI (AI0000) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-104",
          "time": "14:00",
          "course": "Design Thinking with AI (AI0000) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-104",
          "time": "15:00",
          "course": "Design Thinking with AI (AI0000) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-104",
          "time": "09:00",
          "course": "Design Thinking with AI (AI0000) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB1-102",
          "time": "15:00",
          "course": "Design Thinking with AI (AI0000) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-104",
          "time": "10:00",
          "course": "Design Thinking with AI (AI0000) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB1-104",
          "time": "11:00",
          "course": "Design Thinking with AI (AI0000) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-102",
          "time": "09:00",
          "course": "Design Thinking with AI (AI0000) (Sec B)",
          "batch": "Sec B"
        }
      ]
    }
  },
  {
    "id": "fac-6",
    "name": "Dr. Rashmi Kushwaha",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "RK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-103",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "TB-102",
          "time": "16:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Tuesday": [
        {
          "roomId": "TB-102",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "TB-102",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB1-101",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-103",
          "time": "11:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "TB-102",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-101",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "TB-112",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "TB-112",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-103",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-101",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec A)",
          "batch": "Sec A"
        }
      ]
    }
  },
  {
    "id": "fac-7",
    "name": "Dr. Megha Sahu",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "MS",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-104",
          "time": "11:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "TB-102",
          "time": "16:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-104",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "TB-102",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB2-105",
          "time": "16:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-105",
          "time": "11:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "TB-102",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "TB-102",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-105",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "TB-112",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "TB-112",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-104",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec D)",
          "batch": "Sec D"
        }
      ]
    }
  },
  {
    "id": "fac-8",
    "name": "Dr. Rajnish Kumar",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "RK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-102",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Tuesday": [
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "TB-102",
          "time": "16:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-102",
          "time": "11:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "TB-112",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "TB-112",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "TB-102",
          "time": "15:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "TB-102",
          "time": "16:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-102",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Friday": [
        {
          "roomId": "TB-112",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "TB-112",
          "time": "11:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
          "batch": "Sec H"
        }
      ]
    }
  },
  {
    "id": "fac-9",
    "name": "Dr. H. P. Agrawal",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "HP",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "TB-102",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "TB-102",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "TB-112",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "TB-112",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-104",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "TB-102",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "TB-102",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-104",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-104",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB2-104",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Friday": [
        {
          "roomId": "TB-112",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "TB-112",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
          "batch": "Sec G"
        }
      ]
    }
  },
  {
    "id": "fac-10",
    "name": "Mr. Vishwajeet Sehwag",
    "department": "Communication & Humanities",
    "course": "Fundamentals of Prof. Communication (CC1110)",
    "avatar": "VS",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-104",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB1-104",
          "time": "13:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB1-102",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-103",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-102",
          "time": "13:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-101",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-104",
          "time": "10:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB1-103",
          "time": "13:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-104",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-101",
          "time": "11:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB2-104",
          "time": "11:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB2-104",
          "time": "14:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-101",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB1-102",
          "time": "11:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-103",
          "time": "14:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec C)",
          "batch": "Sec C"
        }
      ]
    }
  },
  {
    "id": "fac-11",
    "name": "Dr. Anant Pratap Singh",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "AP",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-101",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-103",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-101",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB1-103",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-101",
          "time": "15:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-103",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-101",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-103",
          "time": "09:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec C)",
          "batch": "Sec C"
        }
      ]
    }
  },
  {
    "id": "fac-12",
    "name": "Dr. Shahnawaz Khan",
    "department": "Environmental & Chemical Sc",
    "course": "Environmental Sc. & Sustainability (ES1115)",
    "avatar": "SK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-104",
          "time": "11:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB1-103",
          "time": "14:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-101",
          "time": "11:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB1-102",
          "time": "14:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-104",
          "time": "16:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-101",
          "time": "09:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB1-104",
          "time": "14:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB2-104",
          "time": "16:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Thursday": [],
      "Friday": [
        {
          "roomId": "EB1-103",
          "time": "11:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-102",
          "time": "13:00",
          "course": "Environmental Sc. & Sustainability (ES1115) (Sec B)",
          "batch": "Sec B"
        }
      ]
    }
  },
  {
    "id": "fac-13",
    "name": "Dr. Devisha Tiwari",
    "department": "Design & Engineering",
    "course": "Design Thinking with AI (AI0000)",
    "avatar": "DT",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-103",
          "time": "09:00",
          "course": "Design Thinking with AI (AI0000) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-103",
          "time": "11:00",
          "course": "Design Thinking with AI (AI0000) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB1-101",
          "time": "13:00",
          "course": "Design Thinking with AI (AI0000) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-101",
          "time": "11:00",
          "course": "Design Thinking with AI (AI0000) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-101",
          "time": "13:00",
          "course": "Design Thinking with AI (AI0000) (Sec A)",
          "batch": "Sec A"
        }
      ],
      "Friday": [
        {
          "roomId": "EB1-103",
          "time": "13:00",
          "course": "Design Thinking with AI (AI0000) (Sec C)",
          "batch": "Sec C"
        }
      ]
    }
  },
  {
    "id": "fac-14",
    "name": "Dr. Abhinav Kumar Khorwal",
    "department": "Applied Sciences (Physics)",
    "course": "Applied Physics (AS1108)",
    "avatar": "AK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-202",
          "time": "09:00",
          "course": "Applied Physics (AS1108) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-105",
          "time": "13:00",
          "course": "Applied Physics (AS1108) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-202",
          "time": "11:00",
          "course": "Applied Physics (AS1108) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-106",
          "time": "13:00",
          "course": "Applied Physics (AS1108) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-105",
          "time": "09:00",
          "course": "Applied Physics (AS1108) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-106",
          "time": "13:00",
          "course": "Applied Physics (AS1108) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-105",
          "time": "11:00",
          "course": "Applied Physics (AS1108) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-106",
          "time": "13:00",
          "course": "Applied Physics (AS1108) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-202",
          "time": "11:00",
          "course": "Applied Physics (AS1108) (Sec J)",
          "batch": "Sec J"
        }
      ]
    }
  },
  {
    "id": "fac-15",
    "name": "Mr. Mayank Kundalwal",
    "department": "Computer Science & Engineering",
    "course": "Programming-1 (CS1139)",
    "avatar": "MK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-104",
          "time": "10:00",
          "course": "Programming-1 (CS1139) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-106",
          "time": "09:00",
          "course": "Programming-1 (CS1139) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "EB2-104",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "TB-106",
          "time": "15:00",
          "course": "Programming-1 Lab (CS1139) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "TB-106",
          "time": "16:00",
          "course": "Programming-1 Lab (CS1139) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-106",
          "time": "10:00",
          "course": "Programming-1 (CS1139) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-106",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-104",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec E)",
          "batch": "Sec E"
        }
      ]
    }
  },
  {
    "id": "fac-16",
    "name": "DR. AKSHAY",
    "department": "Communication & Humanities",
    "course": "Fundamentals of Prof. Communication (CC1110)",
    "avatar": "A",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-105",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-202",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-202",
          "time": "16:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec J)",
          "batch": "Sec J"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-106",
          "time": "10:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "EB2-204",
          "time": "13:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB2-105",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-204",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB2-205",
          "time": "13:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-106",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-105",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-205",
          "time": "11:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-202",
          "time": "14:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec J)",
          "batch": "Sec J"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-204",
          "time": "09:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB2-106",
          "time": "11:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "EB2-205",
          "time": "11:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-205",
          "time": "15:00",
          "course": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
          "batch": "Sec H"
        }
      ]
    }
  },
  {
    "id": "fac-17",
    "name": "Dr. Manushi Gupta",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "MG",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-102",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Tuesday": [],
      "Wednesday": [
        {
          "roomId": "EB1-102",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec B)",
          "batch": "Sec B"
        },
        {
          "roomId": "EB1-102",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-102",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Friday": []
    }
  },
  {
    "id": "fac-18",
    "name": "Dr. Anshu Yadav",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "AY",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-106",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "EB2-106",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "EB1-103",
          "time": "16:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-106",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Wednesday": [],
      "Thursday": [
        {
          "roomId": "EB2-106",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-106",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec G)",
          "batch": "Sec G"
        }
      ]
    }
  },
  {
    "id": "fac-19",
    "name": "Dr. Rabia Kamra",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "RK",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-204",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-104",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB1-104",
          "time": "15:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB1-104",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec D)",
          "batch": "Sec D"
        },
        {
          "roomId": "EB2-204",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-204",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB1-104",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-204",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec I)",
          "batch": "Sec I"
        }
      ]
    }
  },
  {
    "id": "fac-20",
    "name": "Dr. Sushant Pokhriyal",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "SP",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-104",
          "time": "14:00",
          "course": "Calculus and Differential Equation (AS1109) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB1-104",
          "time": "16:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec D)",
          "batch": "Sec D"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-104",
          "time": "09:00",
          "course": "Calculus and Differential Equation (AS1109) (Sec E)",
          "batch": "Sec E"
        },
        {
          "roomId": "EB2-104",
          "time": "14:00",
          "course": "Calculus and Differential Equation (AS1109) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-104",
          "time": "11:00",
          "course": "Calculus and Differential Equation (AS1109) (Sec E)",
          "batch": "Sec E"
        }
      ],
      "Thursday": [],
      "Friday": [
        {
          "roomId": "EB2-104",
          "time": "14:00",
          "course": "Calculus and Differential Equation (AS1109) (Sec E)",
          "batch": "Sec E"
        }
      ]
    }
  },
  {
    "id": "fac-21",
    "name": "Mr. Aman Mishra",
    "department": "Communication & Humanities",
    "course": "Into. to Indian Know. Systems (IL1107)",
    "avatar": "AM",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-205",
          "time": "09:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-202",
          "time": "13:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec J)",
          "batch": "Sec J"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-202",
          "time": "13:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec J)",
          "batch": "Sec J"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-106",
          "time": "09:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec G)",
          "batch": "Sec G"
        },
        {
          "roomId": "EB2-205",
          "time": "11:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-106",
          "time": "14:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec G)",
          "batch": "Sec G"
        }
      ],
      "Thursday": [],
      "Friday": [
        {
          "roomId": "EB2-105",
          "time": "09:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-105",
          "time": "13:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec F)",
          "batch": "Sec F"
        }
      ]
    }
  },
  {
    "id": "fac-22",
    "name": "Dr. Gaurav Mani Khanal",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "GM",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-205",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-205",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-205",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Thursday": [],
      "Friday": []
    }
  },
  {
    "id": "fac-23",
    "name": "DR. SUPRITA TALNIKAR",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "ST",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-205",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-205",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-205",
          "time": "13:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-205",
          "time": "16:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-205",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-205",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec H)",
          "batch": "Sec H"
        },
        {
          "roomId": "EB2-202",
          "time": "16:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec J)",
          "batch": "Sec J"
        }
      ]
    }
  },
  {
    "id": "fac-24",
    "name": "Mr. Divanshu Jain",
    "department": "Electrical Engineering",
    "course": "Fundamentals of E. & E. Engineering (EE1118)",
    "avatar": "DJ",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-204",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "TB-112",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "TB-112",
          "time": "14:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-204",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Wednesday": [],
      "Thursday": [
        {
          "roomId": "TB-102",
          "time": "09:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "TB-102",
          "time": "10:00",
          "course": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB2-204",
          "time": "13:00",
          "course": "Fundamentals of E. & E. Engineering (EE1118) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Friday": []
    }
  },
  {
    "id": "fac-25",
    "name": "Dr. Krishna Chaitanya Solasa",
    "department": "Applied Sciences (Physics)",
    "course": "Applied Physics (AS1108)",
    "avatar": "KC",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-204",
          "time": "11:00",
          "course": "Applied Physics (AS1108) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-204",
          "time": "09:00",
          "course": "Applied Physics (AS1108) (Sec I)",
          "batch": "Sec I"
        },
        {
          "roomId": "EB2-205",
          "time": "15:00",
          "course": "Applied Physics (AS1108) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-205",
          "time": "09:00",
          "course": "Applied Physics (AS1108) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-205",
          "time": "09:00",
          "course": "Applied Physics (AS1108) (Sec H)",
          "batch": "Sec H"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-204",
          "time": "11:00",
          "course": "Applied Physics (AS1108) (Sec I)",
          "batch": "Sec I"
        }
      ]
    }
  },
  {
    "id": "fac-26",
    "name": "Dr. Amit Sinhal",
    "department": "Computer Science & Engineering",
    "course": "Programming-1 (CS1139)",
    "avatar": "AS",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB1-103",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "TB-106",
          "time": "15:00",
          "course": "Programming-1 Lab (CS1139) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "TB-106",
          "time": "16:00",
          "course": "Programming-1 Lab (CS1139) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB2-105",
          "time": "10:00",
          "course": "Programming-1 (CS1139) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB1-103",
          "time": "13:00",
          "course": "Programming-1 (CS1139) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Wednesday": [
        {
          "roomId": "TB-106",
          "time": "09:00",
          "course": "Programming-1 Lab (CS1139) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "TB-106",
          "time": "10:00",
          "course": "Programming-1 Lab (CS1139) (Sec C)",
          "batch": "Sec C"
        },
        {
          "roomId": "EB2-105",
          "time": "15:00",
          "course": "Programming-1 (CS1139) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB1-103",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec C)",
          "batch": "Sec C"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-105",
          "time": "11:00",
          "course": "Programming-1 (CS1139) (Sec F)",
          "batch": "Sec F"
        }
      ]
    }
  },
  {
    "id": "fac-27",
    "name": "Ms. Shobha Mangal",
    "department": "Applied Sciences (Math)",
    "course": "Calculus and Differential Equations (AS1109)",
    "avatar": "SM",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [
        {
          "roomId": "EB2-105",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-204",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Tuesday": [
        {
          "roomId": "EB1-101",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec A)",
          "batch": "Sec A"
        },
        {
          "roomId": "EB2-105",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-202",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB1-102",
          "time": "16:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec B)",
          "batch": "Sec B"
        }
      ],
      "Wednesday": [
        {
          "roomId": "EB2-105",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec F)",
          "batch": "Sec F"
        },
        {
          "roomId": "EB2-202",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-202",
          "time": "13:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec J)",
          "batch": "Sec J"
        }
      ],
      "Thursday": [
        {
          "roomId": "EB2-202",
          "time": "11:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec J)",
          "batch": "Sec J"
        },
        {
          "roomId": "EB2-105",
          "time": "14:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec F)",
          "batch": "Sec F"
        }
      ],
      "Friday": [
        {
          "roomId": "EB2-105",
          "time": "10:00",
          "course": "Calculus and Differential Equations (AS1109) (Sec F)",
          "batch": "Sec F"
        }
      ]
    }
  },
  {
    "id": "fac-28",
    "name": "Dr. Nitya Pawar",
    "department": "Communication & Humanities",
    "course": "Into. to Indian Know. Systems (IL1107)",
    "avatar": "NP",
    "onLeave": false,
    "assignedSlots": {
      "Monday": [],
      "Tuesday": [
        {
          "roomId": "EB2-204",
          "time": "11:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Wednesday": [],
      "Thursday": [
        {
          "roomId": "EB2-204",
          "time": "11:00",
          "course": "Into. to Indian Know. Systems (IL1107) (Sec I)",
          "batch": "Sec I"
        }
      ],
      "Friday": []
    }
  }
];

export const INITIAL_WEEKLY_TIMETABLES = {
  "Monday": {
    "EB1-002": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-101": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec A)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec A"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec A)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec A"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-102": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec B)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec B"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec B)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17",
        "batch": "Sec B"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec B)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec B"
      },
      "14:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec B)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec B"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec B)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec B"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-103": {
      "09:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec C)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13",
        "batch": "Sec C"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec C)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec C"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec C)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec C"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec C)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec C"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec C)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18",
        "batch": "Sec C"
      }
    },
    "EB1-104": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec D)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec D"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec D)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec D"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec D)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec D"
      },
      "14:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec D)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec D"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec D)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20",
        "batch": "Sec D"
      }
    },
    "EB2-104": {
      "09:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec E)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec E"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec E)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec E"
      },
      "11:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec E)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec E"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equation (AS1109) (Sec E)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20",
        "batch": "Sec E"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec E)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec E"
      }
    },
    "EB2-105": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec F)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec F"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec F)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec F"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec F)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec F"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-106": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec G)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18",
        "batch": "Sec G"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec G)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18",
        "batch": "Sec G"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec G)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec G"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-202": {
      "09:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec J)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec J"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec J)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec J"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec J)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec J"
      },
      "16:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec J)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec J"
      }
    },
    "EB2-204": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec I)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec I"
      },
      "11:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec I)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25",
        "batch": "Sec I"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec I)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec I"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec I)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec I"
      }
    },
    "EB2-205": {
      "09:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec H)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec H"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec H)",
        "teacher": "Dr. Gaurav Mani Khanal",
        "facultyId": "fac-22",
        "batch": "Sec H"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec H)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec H"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec H)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec H"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "TB-102": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec G"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec G"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec D"
      },
      "16:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec D"
      }
    },
    "TB-106": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec A)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec A"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec A)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec A"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec F)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec F"
      },
      "16:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec F)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec F"
      }
    },
    "TB-112": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "IET-AMP": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    }
  },
  "Tuesday": {
    "EB1-002": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-101": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec A)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec A"
      },
      "11:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec A)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec A"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec A)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13",
        "batch": "Sec A"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec A)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec A"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec A)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec A"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec A)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec A"
      }
    },
    "EB1-102": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec B)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec B"
      },
      "14:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec B)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec B"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec B)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec B"
      }
    },
    "EB1-103": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec C)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec C"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec C)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13",
        "batch": "Sec C"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec C)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec C"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec C)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec C"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-104": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec D)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec D"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec D)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec D"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec D)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec D"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec D)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec D"
      },
      "16:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec D)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec D"
      }
    },
    "EB2-104": {
      "09:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equation (AS1109) (Sec E)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20",
        "batch": "Sec E"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec E"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec E)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec E"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equation (AS1109) (Sec E)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20",
        "batch": "Sec E"
      },
      "15:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec E)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec E"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-105": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec F)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec F"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec F)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec F"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec F)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec F"
      },
      "16:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      }
    },
    "EB2-106": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec G)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec G"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec G)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec G"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec G)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18",
        "batch": "Sec G"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec G)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec G"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-202": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec J)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec J"
      },
      "11:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec J)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec J"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec J)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec J"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec J)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec J"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec J)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec J"
      }
    },
    "EB2-204": {
      "09:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec I)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25",
        "batch": "Sec I"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "11:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec I)",
        "teacher": "Dr. Nitya Pawar",
        "facultyId": "fac-28",
        "batch": "Sec I"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec I)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec I"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec I)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec I"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-205": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec H)",
        "teacher": "Dr. Gaurav Mani Khanal",
        "facultyId": "fac-22",
        "batch": "Sec H"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec H)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec H"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec H)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec H"
      },
      "14:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec H)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec H"
      },
      "15:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec H)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25",
        "batch": "Sec H"
      },
      "16:00": {
        "status": "free"
      }
    },
    "TB-102": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec A)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec A"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec A)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec A"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec E)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec E"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec E)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec E"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec D)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec D"
      },
      "16:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec B"
      }
    },
    "TB-106": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec B)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec B"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec B)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec B"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec G)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec G"
      },
      "16:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec G)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec G"
      }
    },
    "TB-112": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "IET-AMP": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    }
  },
  "Wednesday": {
    "EB1-002": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-101": {
      "09:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec A)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec A"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec A)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec A"
      },
      "11:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec A)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13",
        "batch": "Sec A"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec A)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec A"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec A)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec A"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-102": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec B)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec B"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec B)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17",
        "batch": "Sec B"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec B)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec B"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec B)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17",
        "batch": "Sec B"
      },
      "15:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec B)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec B"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec B)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec B"
      }
    },
    "EB1-103": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec C)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec C"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec C)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec C"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec C)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec C"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-104": {
      "09:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec D)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec D"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec D)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec D"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec D)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec D"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec D)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec D"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec D)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec D"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-104": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec E)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec E"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equation (AS1109) (Sec E)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20",
        "batch": "Sec E"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec E"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec E)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec E"
      }
    },
    "EB2-105": {
      "09:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec F)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec F"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec F)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec F"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec F)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec F"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec F)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec F"
      }
    },
    "EB2-106": {
      "09:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec G)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec G"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec G)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec G"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec G)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec G"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec G)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec G"
      },
      "14:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec G)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec G"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec G)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec G"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec G)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec G"
      }
    },
    "EB2-202": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec J)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec J"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec J)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec J"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec J)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec J"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-204": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec I)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec I"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec I)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec I"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec I)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec I"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-205": {
      "09:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec H)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25",
        "batch": "Sec H"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec H)",
        "teacher": "Dr. Gaurav Mani Khanal",
        "facultyId": "fac-22",
        "batch": "Sec H"
      },
      "11:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec H)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec H"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec H"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec H)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec H"
      }
    },
    "TB-102": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec H"
      },
      "16:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec H"
      }
    },
    "TB-106": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec C)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec C"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec C)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec C"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec J)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec J"
      },
      "16:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec J)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec J"
      }
    },
    "TB-112": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec B"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec B)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec B"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "IET-AMP": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    }
  },
  "Thursday": {
    "EB1-002": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-101": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec A)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec A"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec A)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec A"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec A)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13",
        "batch": "Sec A"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec A)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec A"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec A)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec A"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec A)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec A"
      }
    },
    "EB1-102": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec B)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec B"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec B)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17",
        "batch": "Sec B"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec B)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec B"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec B)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec B"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec B)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec B"
      }
    },
    "EB1-103": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec C)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec C"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec C)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec C"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec C)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec C"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec C)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec C"
      }
    },
    "EB1-104": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec D)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec D"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec D)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec D"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec D)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec D"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec D)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec D"
      }
    },
    "EB2-104": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec E"
      },
      "10:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec E)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec E"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec E)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec E"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec E)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec E"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec E)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec E"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec E)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec E"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec E)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec E"
      }
    },
    "EB2-105": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec F)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec F"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      },
      "11:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec F)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec F"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec F)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec F"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec F)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec F"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec F)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec F"
      }
    },
    "EB2-106": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec G)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18",
        "batch": "Sec G"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec G)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec G"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec G)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec G"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec G)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec G"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec G)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec G"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec G)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec G"
      }
    },
    "EB2-202": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      },
      "11:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec J)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec J"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec J)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec J"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec J)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec J"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec J)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec J"
      }
    },
    "EB2-204": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec I)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec I"
      },
      "11:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec I)",
        "teacher": "Dr. Nitya Pawar",
        "facultyId": "fac-28",
        "batch": "Sec I"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "14:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec I)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec I"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec I)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec I"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec I)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec I"
      }
    },
    "EB2-205": {
      "09:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec H)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25",
        "batch": "Sec H"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec H)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec H"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec H"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec H)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec H"
      },
      "16:00": {
        "status": "occupied",
        "title": "Coding Hours (Sec H)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec H"
      }
    },
    "TB-102": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec I)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24",
        "batch": "Sec I"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "TB-106": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec D)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec D"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec D)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec D"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec H)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec H"
      },
      "14:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec H)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec H"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "TB-112": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec F)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec F"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "IET-AMP": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    }
  },
  "Friday": {
    "EB1-002": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-101": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec A)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec A"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec A)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec A"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec A)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec A"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-102": {
      "09:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec B)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5",
        "batch": "Sec B"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec B)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec B"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec B)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec B"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-103": {
      "09:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec C)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11",
        "batch": "Sec C"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec C)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6",
        "batch": "Sec C"
      },
      "11:00": {
        "status": "occupied",
        "title": "Environmental Sc. & Sustainability (ES1115) (Sec C)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12",
        "batch": "Sec C"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Design Thinking with AI (AI0000) (Sec C)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13",
        "batch": "Sec C"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec C)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10",
        "batch": "Sec C"
      },
      "15:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec C)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec C"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB1-104": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec D)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7",
        "batch": "Sec D"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec D)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2",
        "batch": "Sec D"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec D)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec D"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-104": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec E)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15",
        "batch": "Sec E"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equation (AS1109) (Sec E)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20",
        "batch": "Sec E"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-105": {
      "09:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec F)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec F"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec F)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27",
        "batch": "Sec F"
      },
      "11:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec F)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26",
        "batch": "Sec F"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Into. to Indian Know. Systems (IL1107) (Sec F)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21",
        "batch": "Sec F"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-106": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec G)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec G"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec G)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18",
        "batch": "Sec G"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-202": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      },
      "11:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec J)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14",
        "batch": "Sec J"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec J)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec J"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec J)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec J"
      }
    },
    "EB2-204": {
      "09:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec I)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec I"
      },
      "10:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec I)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19",
        "batch": "Sec I"
      },
      "11:00": {
        "status": "occupied",
        "title": "Applied Physics (AS1108) (Sec I)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25",
        "batch": "Sec I"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "EB2-205": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 (CS1139) (Sec H)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec H"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec H"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "occupied",
        "title": "Calculus and Differential Equations (AS1109) (Sec H)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23",
        "batch": "Sec H"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of Prof. Communication (CC1110) (Sec H)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16",
        "batch": "Sec H"
      },
      "16:00": {
        "status": "occupied",
        "title": "Project Based Learning (PBL) (Sec H)",
        "teacher": "Faculty Mentor",
        "facultyId": null,
        "batch": "Sec H"
      }
    },
    "TB-102": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      },
      "16:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec J)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3",
        "batch": "Sec J"
      }
    },
    "TB-106": {
      "09:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec E)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec E"
      },
      "10:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec E)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4",
        "batch": "Sec E"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec I)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec I"
      },
      "16:00": {
        "status": "occupied",
        "title": "Programming-1 Lab (CS1139) (Sec I)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1",
        "batch": "Sec I"
      }
    },
    "TB-112": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec H"
      },
      "11:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec H)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8",
        "batch": "Sec H"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec G"
      },
      "14:00": {
        "status": "occupied",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118) (Sec G)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9",
        "batch": "Sec G"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    },
    "IET-AMP": {
      "09:00": {
        "status": "free"
      },
      "10:00": {
        "status": "free"
      },
      "11:00": {
        "status": "free"
      },
      "12:00": {
        "status": "occupied",
        "title": "Lunch Break (Protected)",
        "teacher": "Campus Protected",
        "batch": "All Batches",
        "isLunch": true
      },
      "13:00": {
        "status": "free"
      },
      "14:00": {
        "status": "free"
      },
      "15:00": {
        "status": "free"
      },
      "16:00": {
        "status": "free"
      }
    }
  }
};

export const INITIAL_TIMETABLE = INITIAL_WEEKLY_TIMETABLES.Monday;

export const WEEKLY_BATCH_SCHEDULES = {
  "Sec A": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "10:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "13:00",
        "roomId": "EB1-101",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "14:00",
        "roomId": "EB1-101",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "10:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "10:00",
        "roomId": "EB1-101",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "11:00",
        "roomId": "EB1-101",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "13:00",
        "roomId": "EB1-101",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13"
      },
      {
        "time": "14:00",
        "roomId": "EB1-101",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "15:00",
        "roomId": "EB1-101",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "16:00",
        "roomId": "EB1-101",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB1-101",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "10:00",
        "roomId": "EB1-101",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      },
      {
        "time": "11:00",
        "roomId": "EB1-101",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13"
      },
      {
        "time": "13:00",
        "roomId": "EB1-101",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "14:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "15:00",
        "roomId": "EB1-101",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      }
    ],
    "Thursday": [
      {
        "time": "10:00",
        "roomId": "EB1-101",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "11:00",
        "roomId": "EB1-101",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "13:00",
        "roomId": "EB1-101",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13"
      },
      {
        "time": "14:00",
        "roomId": "EB1-101",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      },
      {
        "time": "15:00",
        "roomId": "EB1-101",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB1-101",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "EB1-101",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "13:00",
        "roomId": "EB1-101",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "14:00",
        "roomId": "EB1-101",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      }
    ]
  },
  "Sec B": {
    "Monday": [
      {
        "time": "10:00",
        "roomId": "EB1-102",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "11:00",
        "roomId": "EB1-102",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17"
      },
      {
        "time": "13:00",
        "roomId": "EB1-102",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "14:00",
        "roomId": "EB1-102",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "15:00",
        "roomId": "EB1-102",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "10:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "13:00",
        "roomId": "EB1-102",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "14:00",
        "roomId": "EB1-102",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "16:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "16:00",
        "roomId": "EB1-102",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB1-102",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "10:00",
        "roomId": "EB1-102",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17"
      },
      {
        "time": "11:00",
        "roomId": "EB1-102",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "13:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "14:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "14:00",
        "roomId": "EB1-102",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17"
      },
      {
        "time": "15:00",
        "roomId": "EB1-102",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "16:00",
        "roomId": "EB1-102",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Thursday": [
      {
        "time": "09:00",
        "roomId": "EB1-102",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "11:00",
        "roomId": "EB1-102",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Manushi Gupta",
        "facultyId": "fac-17"
      },
      {
        "time": "13:00",
        "roomId": "EB1-102",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "15:00",
        "roomId": "EB1-102",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB1-102",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "EB1-102",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "11:00",
        "roomId": "EB1-102",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "13:00",
        "roomId": "EB1-102",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      }
    ]
  },
  "Sec C": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB1-103",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13"
      },
      {
        "time": "10:00",
        "roomId": "EB1-103",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "11:00",
        "roomId": "EB1-103",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "14:00",
        "roomId": "EB1-103",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "16:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "16:00",
        "roomId": "EB1-103",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18"
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "EB1-103",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "11:00",
        "roomId": "EB1-103",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13"
      },
      {
        "time": "13:00",
        "roomId": "EB1-103",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "14:00",
        "roomId": "EB1-103",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "10:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "11:00",
        "roomId": "EB1-103",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "13:00",
        "roomId": "EB1-103",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "14:00",
        "roomId": "EB1-103",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      }
    ],
    "Thursday": [
      {
        "time": "10:00",
        "roomId": "EB1-103",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      },
      {
        "time": "11:00",
        "roomId": "EB1-103",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "13:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "14:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "15:00",
        "roomId": "EB1-103",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB1-103",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "EB1-103",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anant Pratap Singh",
        "facultyId": "fac-11"
      },
      {
        "time": "10:00",
        "roomId": "EB1-103",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Rashmi Kushwaha",
        "facultyId": "fac-6"
      },
      {
        "time": "11:00",
        "roomId": "EB1-103",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "13:00",
        "roomId": "EB1-103",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "Dr. Devisha Tiwari",
        "facultyId": "fac-13"
      },
      {
        "time": "14:00",
        "roomId": "EB1-103",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "15:00",
        "roomId": "EB1-103",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ]
  },
  "Sec D": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB1-104",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "11:00",
        "roomId": "EB1-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "13:00",
        "roomId": "EB1-104",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "14:00",
        "roomId": "EB1-104",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "16:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "16:00",
        "roomId": "EB1-104",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20"
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "EB1-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "10:00",
        "roomId": "EB1-104",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "11:00",
        "roomId": "EB1-104",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "14:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "15:00",
        "roomId": "EB1-104",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "16:00",
        "roomId": "EB1-104",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB1-104",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "10:00",
        "roomId": "EB1-104",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "11:00",
        "roomId": "EB1-104",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "14:00",
        "roomId": "EB1-104",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "15:00",
        "roomId": "EB1-104",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      }
    ],
    "Thursday": [
      {
        "time": "09:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "10:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "11:00",
        "roomId": "EB1-104",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "14:00",
        "roomId": "EB1-104",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "15:00",
        "roomId": "EB1-104",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB1-104",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "10:00",
        "roomId": "EB1-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "13:00",
        "roomId": "EB1-104",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Ankush Soni",
        "facultyId": "fac-2"
      },
      {
        "time": "15:00",
        "roomId": "EB1-104",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ]
  },
  "Sec E": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB2-104",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "10:00",
        "roomId": "EB2-104",
        "title": "Programming-1 (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "11:00",
        "roomId": "EB2-104",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      },
      {
        "time": "13:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "EB2-104",
        "title": "Calculus and Differential Equation (AS1109)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20"
      },
      {
        "time": "16:00",
        "roomId": "EB2-104",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "EB2-104",
        "title": "Calculus and Differential Equation (AS1109)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20"
      },
      {
        "time": "10:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "11:00",
        "roomId": "EB2-104",
        "title": "Programming-1 (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "13:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "EB2-104",
        "title": "Calculus and Differential Equation (AS1109)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20"
      },
      {
        "time": "15:00",
        "roomId": "EB2-104",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      }
    ],
    "Wednesday": [
      {
        "time": "10:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "11:00",
        "roomId": "EB2-104",
        "title": "Calculus and Differential Equation (AS1109)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20"
      },
      {
        "time": "13:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "16:00",
        "roomId": "EB2-104",
        "title": "Environmental Sc. & Sustainability (ES1115)",
        "teacher": "Dr. Shahnawaz Khan",
        "facultyId": "fac-12"
      }
    ],
    "Thursday": [
      {
        "time": "09:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "10:00",
        "roomId": "EB2-104",
        "title": "Design Thinking with AI (AI0000)",
        "teacher": "DR. MANJU RANA",
        "facultyId": "fac-5"
      },
      {
        "time": "11:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "13:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "EB2-104",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "Mr. Vishwajeet Sehwag",
        "facultyId": "fac-10"
      },
      {
        "time": "15:00",
        "roomId": "EB2-104",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB2-104",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "10:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "13:00",
        "roomId": "EB2-104",
        "title": "Programming-1 (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "14:00",
        "roomId": "EB2-104",
        "title": "Calculus and Differential Equation (AS1109)",
        "teacher": "Dr. Sushant Pokhriyal",
        "facultyId": "fac-20"
      }
    ]
  },
  "Sec F": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB2-105",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "11:00",
        "roomId": "EB2-105",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "13:00",
        "roomId": "EB2-105",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "15:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "16:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      }
    ],
    "Tuesday": [
      {
        "time": "10:00",
        "roomId": "EB2-105",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "11:00",
        "roomId": "EB2-105",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "15:00",
        "roomId": "EB2-105",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "16:00",
        "roomId": "EB2-105",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB2-105",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "10:00",
        "roomId": "EB2-105",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "11:00",
        "roomId": "EB2-105",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "13:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "14:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "15:00",
        "roomId": "EB2-105",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "16:00",
        "roomId": "EB2-105",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Thursday": [
      {
        "time": "09:00",
        "roomId": "EB2-105",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "10:00",
        "roomId": "EB2-105",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "11:00",
        "roomId": "EB2-105",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "13:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "14:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Megha Sahu",
        "facultyId": "fac-7"
      },
      {
        "time": "14:00",
        "roomId": "EB2-105",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "15:00",
        "roomId": "EB2-105",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB2-105",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "EB2-105",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "10:00",
        "roomId": "EB2-105",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "11:00",
        "roomId": "EB2-105",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amit Sinhal",
        "facultyId": "fac-26"
      },
      {
        "time": "13:00",
        "roomId": "EB2-105",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      }
    ]
  },
  "Sec G": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "10:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "10:00",
        "roomId": "EB2-106",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18"
      },
      {
        "time": "11:00",
        "roomId": "EB2-106",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18"
      },
      {
        "time": "15:00",
        "roomId": "EB2-106",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "EB2-106",
        "title": "Programming-1 (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "10:00",
        "roomId": "EB2-106",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "11:00",
        "roomId": "EB2-106",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18"
      },
      {
        "time": "13:00",
        "roomId": "EB2-106",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "15:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "16:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB2-106",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "10:00",
        "roomId": "EB2-106",
        "title": "Programming-1 (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "11:00",
        "roomId": "EB2-106",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "13:00",
        "roomId": "EB2-106",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "14:00",
        "roomId": "EB2-106",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "15:00",
        "roomId": "EB2-106",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "16:00",
        "roomId": "EB2-106",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Thursday": [
      {
        "time": "10:00",
        "roomId": "EB2-106",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18"
      },
      {
        "time": "11:00",
        "roomId": "EB2-106",
        "title": "Programming-1 (CS1139)",
        "teacher": "Mr. Mayank Kundalwal",
        "facultyId": "fac-15"
      },
      {
        "time": "13:00",
        "roomId": "EB2-106",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "14:00",
        "roomId": "EB2-106",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "15:00",
        "roomId": "EB2-106",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB2-106",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "11:00",
        "roomId": "EB2-106",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "13:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. H. P. Agrawal",
        "facultyId": "fac-9"
      },
      {
        "time": "14:00",
        "roomId": "EB2-106",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Anshu Yadav",
        "facultyId": "fac-18"
      }
    ]
  },
  "Sec H": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB2-205",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "10:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Gaurav Mani Khanal",
        "facultyId": "fac-22"
      },
      {
        "time": "11:00",
        "roomId": "EB2-205",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      },
      {
        "time": "13:00",
        "roomId": "EB2-205",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      }
    ],
    "Tuesday": [
      {
        "time": "10:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Gaurav Mani Khanal",
        "facultyId": "fac-22"
      },
      {
        "time": "11:00",
        "roomId": "EB2-205",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      },
      {
        "time": "13:00",
        "roomId": "EB2-205",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      },
      {
        "time": "14:00",
        "roomId": "EB2-205",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "15:00",
        "roomId": "EB2-205",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB2-205",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25"
      },
      {
        "time": "10:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Gaurav Mani Khanal",
        "facultyId": "fac-22"
      },
      {
        "time": "11:00",
        "roomId": "EB2-205",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "13:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "16:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "16:00",
        "roomId": "EB2-205",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      }
    ],
    "Thursday": [
      {
        "time": "09:00",
        "roomId": "EB2-205",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25"
      },
      {
        "time": "10:00",
        "roomId": "EB2-205",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      },
      {
        "time": "11:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "13:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "14:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "15:00",
        "roomId": "EB2-205",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB2-205",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "EB2-205",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "10:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "11:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Rajnish Kumar",
        "facultyId": "fac-8"
      },
      {
        "time": "11:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "14:00",
        "roomId": "EB2-205",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      },
      {
        "time": "15:00",
        "roomId": "EB2-205",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "16:00",
        "roomId": "EB2-205",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ]
  },
  "Sec I": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB2-204",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "10:00",
        "roomId": "EB2-204",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "11:00",
        "roomId": "EB2-204",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25"
      },
      {
        "time": "13:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "14:00",
        "roomId": "TB-112",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "14:00",
        "roomId": "EB2-204",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "16:00",
        "roomId": "EB2-204",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Tuesday": [
      {
        "time": "09:00",
        "roomId": "EB2-204",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25"
      },
      {
        "time": "10:00",
        "roomId": "EB2-204",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "11:00",
        "roomId": "EB2-204",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Dr. Nitya Pawar",
        "facultyId": "fac-28"
      },
      {
        "time": "13:00",
        "roomId": "EB2-204",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "15:00",
        "roomId": "EB2-204",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "EB2-204",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "10:00",
        "roomId": "EB2-204",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "14:00",
        "roomId": "EB2-204",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      }
    ],
    "Thursday": [
      {
        "time": "09:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "10:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "10:00",
        "roomId": "EB2-204",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "11:00",
        "roomId": "EB2-204",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Dr. Nitya Pawar",
        "facultyId": "fac-28"
      },
      {
        "time": "13:00",
        "roomId": "EB2-204",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Mr. Divanshu Jain",
        "facultyId": "fac-24"
      },
      {
        "time": "14:00",
        "roomId": "EB2-204",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "15:00",
        "roomId": "EB2-204",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB2-204",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "09:00",
        "roomId": "EB2-204",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "10:00",
        "roomId": "EB2-204",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Dr. Rabia Kamra",
        "facultyId": "fac-19"
      },
      {
        "time": "11:00",
        "roomId": "EB2-204",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Krishna Chaitanya Solasa",
        "facultyId": "fac-25"
      },
      {
        "time": "15:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      },
      {
        "time": "16:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Amar Nath Patra",
        "facultyId": "fac-1"
      }
    ]
  },
  "Sec J": {
    "Monday": [
      {
        "time": "09:00",
        "roomId": "EB2-202",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "10:00",
        "roomId": "EB2-202",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "13:00",
        "roomId": "EB2-202",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "15:00",
        "roomId": "EB2-202",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "16:00",
        "roomId": "EB2-202",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      }
    ],
    "Tuesday": [
      {
        "time": "10:00",
        "roomId": "EB2-202",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "11:00",
        "roomId": "EB2-202",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "13:00",
        "roomId": "EB2-202",
        "title": "Into. to Indian Know. Systems (IL1107)",
        "teacher": "Mr. Aman Mishra",
        "facultyId": "fac-21"
      },
      {
        "time": "14:00",
        "roomId": "EB2-202",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "16:00",
        "roomId": "EB2-202",
        "title": "Project Based Learning (PBL)",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Wednesday": [
      {
        "time": "09:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "10:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "10:00",
        "roomId": "EB2-202",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "11:00",
        "roomId": "EB2-202",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "13:00",
        "roomId": "EB2-202",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "15:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "16:00",
        "roomId": "TB-106",
        "title": "Programming-1 Lab (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      }
    ],
    "Thursday": [
      {
        "time": "10:00",
        "roomId": "EB2-202",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "11:00",
        "roomId": "EB2-202",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "Ms. Shobha Mangal",
        "facultyId": "fac-27"
      },
      {
        "time": "14:00",
        "roomId": "EB2-202",
        "title": "Fundamentals of Prof. Communication (CC1110)",
        "teacher": "DR. AKSHAY",
        "facultyId": "fac-16"
      },
      {
        "time": "15:00",
        "roomId": "EB2-202",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      },
      {
        "time": "16:00",
        "roomId": "EB2-202",
        "title": "Coding Hours",
        "teacher": "Faculty Mentor",
        "facultyId": null
      }
    ],
    "Friday": [
      {
        "time": "10:00",
        "roomId": "EB2-202",
        "title": "Fundamentals of E. & E. Engineering (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "11:00",
        "roomId": "EB2-202",
        "title": "Applied Physics (AS1108)",
        "teacher": "Dr. Abhinav Kumar Khorwal",
        "facultyId": "fac-14"
      },
      {
        "time": "13:00",
        "roomId": "EB2-202",
        "title": "Programming-1 (CS1139)",
        "teacher": "Dr. Surbhi Chhabra",
        "facultyId": "fac-4"
      },
      {
        "time": "15:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "16:00",
        "roomId": "TB-102",
        "title": "Fundamentals of E. & E. Engineering Lab (EE1118)",
        "teacher": "Dr. Devika Kataria",
        "facultyId": "fac-3"
      },
      {
        "time": "16:00",
        "roomId": "EB2-202",
        "title": "Calculus and Differential Equations (AS1109)",
        "teacher": "DR. SUPRITA TALNIKAR",
        "facultyId": "fac-23"
      }
    ]
  }
};

export const BATCH_SCHEDULES = Object.fromEntries(
  Object.entries(WEEKLY_BATCH_SCHEDULES).map(([batchKey, days]) => [batchKey, days.Monday || []])
);

export const INITIAL_BOOKINGS = [
  {
    id: 'req-mock-1',
    roomId: 'EB1-101',
    roomName: 'EB1-101',
    timeSlot: '11:00',
    startTime: '11:00',
    duration: 1,
    day: 'Monday',
    title: 'ACM Coding Sprint & Algorithm Workshop',
    organizer: 'Dr. Amar Nath Patra',
    facultyName: 'Dr. Amar Nath Patra',
    requestedBy: 'Dr. Amar Nath Patra',
    batch: 'Sec A',
    attendees: 45,
    timestamp: '10 mins ago',
    status: 'pending',
    type: 'Academic Event',
    purpose: 'ACM Student Chapter competitive programming workshop',
    isPermanent: false
  },
  {
    id: 'req-mock-2',
    roomId: 'EB2-204',
    roomName: 'EB2-204',
    timeSlot: '13:00',
    startTime: '13:00',
    duration: 1,
    day: 'Monday',
    title: 'Robotics Team Sensor Calibration',
    organizer: 'Mr. Divanshu Jain',
    facultyName: 'Mr. Divanshu Jain',
    requestedBy: 'Mr. Divanshu Jain',
    batch: 'Sec I',
    attendees: 30,
    timestamp: '25 mins ago',
    status: 'pending',
    type: 'Lab Session',
    purpose: 'Robotics Club hardware calibration & debugging',
    isPermanent: false
  }
];
