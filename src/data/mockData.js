export const INITIAL_STUDENTS = [
  {
    id: "STU-1001",
    name: "Arif Rahman",
    roll: "101",
    class: "Grade 10",
    section: "A",
    gender: "Male",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    paymentStatus: "Paid",
    dues: 0,
    monthlyFee: 4500,
    lastPaymentDate: "2026-03-01",
    guardian: {
      id: "GRD-201",
      name: "Rafiqul Islam Rahman",
      relation: "Father",
      phone: "+880 1711-234567",
      email: "rafiq.rahman@gmail.com",
      occupation: "Senior Software Engineer",
      address: "House 42, Road 11, Dhanmondi, Dhaka"
    }
  },
  {
    id: "STU-1002",
    name: "Nusrat Jahan",
    roll: "102",
    class: "Grade 10",
    section: "A",
    gender: "Female",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    paymentStatus: "Pending",
    dues: 4500,
    monthlyFee: 4500,
    lastPaymentDate: "2026-02-02",
    guardian: {
      id: "GRD-202",
      name: "Farhana Begum",
      relation: "Mother",
      phone: "+880 1819-876543",
      email: "farhana.begum@yahoo.com",
      occupation: "High School Teacher",
      address: "Flat B4, Sector 7, Uttara, Dhaka"
    }
  },
  {
    id: "STU-1003",
    name: "Tanvir Ahmed",
    roll: "103",
    class: "Grade 9",
    section: "B",
    gender: "Male",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    paymentStatus: "Overdue",
    dues: 9000,
    monthlyFee: 4500,
    lastPaymentDate: "2026-01-15",
    guardian: {
      id: "GRD-203",
      name: "Khorshed Alam",
      relation: "Father",
      phone: "+880 1912-345678",
      email: "k.alam@corporate.com.bd",
      occupation: "Business Executive",
      address: "Plot 15, Block C, Banani, Dhaka"
    }
  },
  {
    id: "STU-1004",
    name: "Sumiya Akhtar",
    roll: "104",
    class: "Grade 8",
    section: "A",
    gender: "Female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    paymentStatus: "Paid",
    dues: 0,
    monthlyFee: 4000,
    lastPaymentDate: "2026-03-02",
    guardian: {
      id: "GRD-204",
      name: "Nazrul Islam",
      relation: "Father",
      phone: "+880 1611-998877",
      email: "nazrul.islam@gmail.com",
      occupation: "Civil Engineer",
      address: "House 12, Main Road, Mirpur-10, Dhaka"
    }
  },
  {
    id: "STU-1005",
    name: "Siam Hossain",
    roll: "105",
    class: "Grade 8",
    section: "B",
    gender: "Male",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    paymentStatus: "Paid",
    dues: 0,
    monthlyFee: 4000,
    lastPaymentDate: "2026-03-03",
    guardian: {
      id: "GRD-205",
      name: "Dr. Shahana Parveen",
      relation: "Mother",
      phone: "+880 1733-445566",
      email: "dr.shahana@medicare.bd",
      occupation: "Physician",
      address: "Lane 4, DOHS Mohakhali, Dhaka"
    }
  },
  {
    id: "STU-1006",
    name: "Mehedi Hasan",
    roll: "106",
    class: "Grade 7",
    section: "A",
    gender: "Male",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    paymentStatus: "Pending",
    dues: 3800,
    monthlyFee: 3800,
    lastPaymentDate: "2026-02-10",
    guardian: {
      id: "GRD-206",
      name: "Zahir Khan",
      relation: "Father",
      phone: "+880 1822-112233",
      email: "zahir.khan@logistics.bd",
      occupation: "Merchant Banker",
      address: "Gulshan Avenue, Dhaka"
    }
  }
];

export const INITIAL_GUARDIANS = [
  {
    id: "GRD-201",
    name: "Rafiqul Islam Rahman",
    phone: "+880 1711-234567",
    email: "rafiq.rahman@gmail.com",
    occupation: "Senior Software Engineer",
    address: "House 42, Road 11, Dhanmondi, Dhaka",
    students: ["Arif Rahman (Grade 10, Roll 101)"],
    status: "Active",
    totalPaid: "৳ 45,000",
    pendingDues: "৳ 0"
  },
  {
    id: "GRD-202",
    name: "Farhana Begum",
    phone: "+880 1819-876543",
    email: "farhana.begum@yahoo.com",
    occupation: "High School Teacher",
    address: "Flat B4, Sector 7, Uttara, Dhaka",
    students: ["Nusrat Jahan (Grade 10, Roll 102)"],
    status: "Active",
    totalPaid: "৳ 36,000",
    pendingDues: "৳ 4,500"
  },
  {
    id: "GRD-203",
    name: "Khorshed Alam",
    phone: "+880 1912-345678",
    email: "k.alam@corporate.com.bd",
    occupation: "Business Executive",
    address: "Plot 15, Block C, Banani, Dhaka",
    students: ["Tanvir Ahmed (Grade 9, Roll 103)"],
    status: "Active",
    totalPaid: "৳ 27,000",
    pendingDues: "৳ 9,000"
  },
  {
    id: "GRD-204",
    name: "Nazrul Islam",
    phone: "+880 1611-998877",
    email: "nazrul.islam@gmail.com",
    occupation: "Civil Engineer",
    address: "House 12, Main Road, Mirpur-10, Dhaka",
    students: ["Sumiya Akhtar (Grade 8, Roll 104)"],
    status: "Active",
    totalPaid: "৳ 40,000",
    pendingDues: "৳ 0"
  }
];

export const INITIAL_TEACHERS = [
  {
    id: "TCH-301",
    name: "Dr. Mahmudul Hasan",
    designation: "Senior Mathematics Lecturer",
    department: "Science & Mathematics",
    subject: "Higher Mathematics",
    phone: "+880 1712-990011",
    email: "mahmudul.hasan@school.edu.bd",
    salary: 45000,
    status: "Active",
    joiningDate: "2021-01-10",
    classesAssigned: ["Grade 10-A", "Grade 9-B"]
  },
  {
    id: "TCH-302",
    name: "Shahnaz Parveen",
    designation: "Assistant Professor",
    department: "Languages",
    subject: "English Literature",
    phone: "+880 1811-223344",
    email: "shahnaz.p@school.edu.bd",
    salary: 38000,
    status: "Active",
    joiningDate: "2022-03-15",
    classesAssigned: ["Grade 10-A", "Grade 8-A"]
  },
  {
    id: "TCH-303",
    name: "Kamrul Ahsan",
    designation: "Head of Science Dept.",
    department: "Physics & Chemistry",
    subject: "Physics",
    phone: "+880 1913-445566",
    email: "kamrul.a@school.edu.bd",
    salary: 50000,
    status: "Active",
    joiningDate: "2019-08-01",
    classesAssigned: ["Grade 10-A", "Grade 9-A", "Grade 8-B"]
  }
];

export const INITIAL_SEMESTERS = [
  {
    id: "SEM-2026-A",
    title: "Spring Term 2026",
    academicYear: "2026",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    status: "Active",
    enrolledStudents: 1248,
    totalTargetCollection: 5616000,
    collectedAmount: 4890000
  },
  {
    id: "SEM-2026-B",
    title: "Fall Term 2026",
    academicYear: "2026",
    startDate: "2026-07-01",
    endDate: "2026-12-31",
    status: "Upcoming",
    enrolledStudents: 1250,
    totalTargetCollection: 5750000,
    collectedAmount: 0
  },
  {
    id: "SEM-2025-B",
    title: "Fall Term 2025",
    academicYear: "2025",
    startDate: "2025-07-01",
    endDate: "2025-12-31",
    status: "Completed",
    enrolledStudents: 1210,
    totalTargetCollection: 5445000,
    collectedAmount: 5410000
  }
];

export const INITIAL_FEE_STRUCTURES = [
  {
    id: "FEE-G10",
    className: "Grade 10",
    tuitionFee: 3500,
    admissionFee: 5000,
    labFee: 500,
    examFee: 500,
    totalMonthly: 4500
  },
  {
    id: "FEE-G09",
    className: "Grade 9",
    tuitionFee: 3500,
    admissionFee: 5000,
    labFee: 500,
    examFee: 500,
    totalMonthly: 4500
  },
  {
    id: "FEE-G08",
    className: "Grade 8",
    tuitionFee: 3200,
    admissionFee: 4500,
    labFee: 400,
    examFee: 400,
    totalMonthly: 4000
  },
  {
    id: "FEE-G07",
    className: "Grade 7",
    tuitionFee: 3000,
    admissionFee: 4000,
    labFee: 400,
    examFee: 400,
    totalMonthly: 3800
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "PAY-9001",
    trxId: "BK-8841209",
    studentName: "Arif Rahman",
    guardianName: "Rafiqul Islam Rahman",
    class: "Grade 10",
    amount: 4500,
    method: "bKash",
    date: "2026-03-01 10:24 AM",
    feeType: "Monthly Tuition Fee - March",
    status: "Successful"
  },
  {
    id: "PAY-9002",
    trxId: "NG-7731940",
    studentName: "Sumiya Akhtar",
    guardianName: "Nazrul Islam",
    class: "Grade 8",
    amount: 4000,
    method: "Nagad",
    date: "2026-03-02 02:15 PM",
    feeType: "Monthly Tuition Fee - March",
    status: "Successful"
  },
  {
    id: "PAY-9003",
    trxId: "CRD-551920",
    studentName: "Siam Hossain",
    guardianName: "Dr. Shahana Parveen",
    class: "Grade 8",
    amount: 4000,
    method: "Visa Card",
    date: "2026-03-03 11:05 AM",
    feeType: "Monthly Tuition Fee - March",
    status: "Successful"
  },
  {
    id: "PAY-9004",
    trxId: "CSH-110488",
    studentName: "Mehedi Hasan",
    guardianName: "Zahir Khan",
    class: "Grade 7",
    amount: 3800,
    method: "Cash",
    date: "2026-02-10 09:40 AM",
    feeType: "Monthly Tuition Fee - Feb",
    status: "Successful"
  }
];

export const INITIAL_PENDING_VERIFICATIONS = [
  {
    id: "PV-701",
    trxId: "BK-9912048",
    studentName: "Nusrat Jahan",
    guardianName: "Farhana Begum",
    class: "Grade 10",
    amount: 4500,
    paymentMethod: "bKash Merchant Direct",
    submittedDate: "2026-03-04 04:30 PM",
    proofImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80",
    status: "Pending",
    notes: "Reference ID typed by parent matches bKash SMS counter."
  },
  {
    id: "PV-702",
    trxId: "BNK-449102",
    studentName: "Tanvir Ahmed",
    guardianName: "Khorshed Alam",
    class: "Grade 9",
    amount: 9000,
    paymentMethod: "Bank Wire Transfer (City Bank)",
    submittedDate: "2026-03-05 09:10 AM",
    proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
    status: "Pending",
    notes: "Deposit slip uploaded for 2 months overdue tuition."
  }
];

export const INITIAL_EXPENSES = [
  {
    id: "EXP-501",
    voucherId: "VCH-2026-081",
    title: "Electricity & Utility Bill - Feb",
    category: "Utilities",
    amount: 32500,
    date: "2026-02-28",
    approvedBy: "Zabed (Admin)",
    status: "Approved"
  },
  {
    id: "EXP-502",
    voucherId: "VCH-2026-082",
    title: "Science Lab Chemicals & Equipment",
    category: "Lab Supplies",
    amount: 18400,
    date: "2026-03-01",
    approvedBy: "Zabed (Admin)",
    status: "Approved"
  },
  {
    id: "EXP-503",
    voucherId: "VCH-2026-083",
    title: "High-speed Fiber Internet Renewal",
    category: "IT & Infrastructure",
    amount: 8500,
    date: "2026-03-02",
    approvedBy: "Zabed (Admin)",
    status: "Approved"
  }
];

export const INITIAL_TEACHER_SALARIES = [
  {
    id: "SAL-601",
    teacherId: "TCH-301",
    teacherName: "Dr. Mahmudul Hasan",
    department: "Science & Mathematics",
    month: "February 2026",
    baseSalary: 45000,
    bonus: 2000,
    deductions: 0,
    netPayable: 47000,
    status: "Paid",
    disbursementDate: "2026-02-28"
  },
  {
    id: "SAL-602",
    teacherId: "TCH-302",
    teacherName: "Shahnaz Parveen",
    department: "Languages",
    month: "February 2026",
    baseSalary: 38000,
    bonus: 1500,
    deductions: 0,
    netPayable: 39500,
    status: "Paid",
    disbursementDate: "2026-02-28"
  },
  {
    id: "SAL-603",
    teacherId: "TCH-303",
    teacherName: "Kamrul Ahsan",
    department: "Physics & Chemistry",
    month: "February 2026",
    baseSalary: 50000,
    bonus: 3000,
    deductions: 0,
    netPayable: 53000,
    status: "Pending",
    disbursementDate: "Scheduled Mar 5"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG-801",
    timestamp: "2026-03-05 10:45 AM",
    user: "Zabed (Admin)",
    role: "Admin",
    action: "Fee Payment Verified",
    details: "Approved bKash transaction #BK-8841209 for Arif Rahman (Grade 10)",
    ip: "103.14.28.12",
    severity: "Info"
  },
  {
    id: "LOG-802",
    timestamp: "2026-03-04 03:20 PM",
    user: "Zabed (Admin)",
    role: "Admin",
    action: "Updated Fee Structure",
    details: "Modified monthly tuition fee for Grade 10 to ৳ 4,500",
    ip: "103.14.28.12",
    severity: "Warning"
  },
  {
    id: "LOG-803",
    timestamp: "2026-03-03 11:15 AM",
    user: "Farhana Begum",
    role: "Guardian",
    action: "Payment Proof Submitted",
    details: "Uploaded bank receipt copy for student Nusrat Jahan",
    ip: "27.147.190.5",
    severity: "Info"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-101",
    title: "March Tuition Fee Notice",
    message: "Dear Guardians, please settle March 2026 tuition fees by March 10th to avoid late fee charges.",
    target: "All Guardians",
    channel: "SMS & In-App",
    date: "2026-03-01 09:00 AM",
    status: "Sent"
  },
  {
    id: "NOTIF-102",
    title: "Mid-Term Examination Schedule Released",
    message: "Mid-Term exams begin from March 20th. Schedules are viewable in the student result portal.",
    target: "All Students & Guardians",
    channel: "In-App Announcement",
    date: "2026-03-02 02:00 PM",
    status: "Sent"
  }
];
