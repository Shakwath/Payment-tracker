import { createContext, useContext, useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

export const MadrasaContext = createContext(null);

export const MONTHS = [
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];

export const MONTH_LABELS_BN = {
  "January 2026": "জানুয়ারি ২০২৬",
  "February 2026": "ফেব্রুয়ারি ২০২৬",
  "March 2026": "মার্চ ২০২৬",
  "April 2026": "এপ্রিল ২০২৬",
  "May 2026": "মে ২০২৬",
  "June 2026": "জুন ২০২৬",
  "July 2026": "জুলাই ২০২৬",
  "August 2026": "আগস্ট ২০২৬",
  "September 2026": "সেপ্টেম্বর ২০২৬",
  "October 2026": "অক্টোবর ২০২৬",
  "November 2026": "নভেম্বর ২০২৬",
  "December 2026": "ডিসেম্বর ২০২৬",
};

const INITIAL_SETTINGS = {
  madrasaName: "মারকাযুল ইলমি ওয়াল হুদা",
  madrasaNameEn: "Markajul Ilm Wal Huda",
  madrasaArabic: "مركز العلم والهدى",
  madrasaTagline: "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম",
  logoUrl: "/logo.png",
  headerBannerUrl: "/madrasa-header.png",
  phone: "০১৭৪১৫১২০১৮",
  email: "info@markajulilm.edu.bd",
  address: "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম। মোবাইলঃ ০১৭৪১৫১২০১৮",
  dueDateDay: 10,
  lateFeeAmount: 100,
  enableLateFee: true,
  paymentInstructions: {
    bKash: "বিকাশ মার্চেন্ট/পার্সোনাল নম্বর ০১৭৪১৫১২০১৮-এ সেন্ড মানি বা পেমেন্ট করুন। রেফারেন্সে শিক্ষার্থীর আইডি লিখুন।",
    Nagad: "নগদ নম্বর ০১৭৪১৫১২০১৮-এ সেন্ড মানি করুন এবং ৮ ডিজিটের ট্রানজেকশন আইডি (TrxID) সংরক্ষণ করুন।",
    Bank: "হিসাবের নাম: মারকাযুল ইলমি ওয়াল হুদা, ইসলামী ব্যাংক বাংলাদেশ পিএলসি, হাটহাজারী শাখা, চট্টগ্রাম।",
    Offline: "সরাসরি মাদ্রাসার হিসাব শাখায় (অফিস কক্ষে) নগদ টাকা জমা দিয়ে রশিদ গ্রহণ করুন।",
  },
};

const INITIAL_SEMESTERS = [
  {
    _id: "sem-2026-1",
    name: "প্রথম সাময়িক সেশন ২০২৬ (জানুয়ারি - জুন)",
    code: "SEM-2026-1",
    academicYear: "2026",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    defaultMonthlyFee: 2500,
    status: "Active",
    studentCount: 5,
  },
  {
    _id: "sem-2026-2",
    name: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    code: "SEM-2026-2",
    academicYear: "2026",
    startDate: "2026-07-01",
    endDate: "2026-12-31",
    defaultMonthlyFee: 2700,
    status: "Active",
    studentCount: 6,
  },
  {
    _id: "sem-2025-2",
    name: "বার্ষিক শিক্ষাবর্ষ ২০২৫",
    code: "SEM-2025",
    academicYear: "2025",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    defaultMonthlyFee: 2200,
    status: "Completed",
    studentCount: 120,
  },
];

const INITIAL_GUARDIANS = [
  {
    _id: "grd-01",
    guardianId: "GRD-2026-001",
    name: "মোঃ আব্দুল করিম",
    phone: "01712-345678",
    email: "karim.guardian@gmail.com",
    relation: "পিতা (Father)",
    address: "পশ্চিম ফটিকা, হাটহাজারী, চট্টগ্রাম",
    occupation: "ব্যবসায়ী",
    status: "Active",
    linkedStudentIds: ["stu-01", "stu-02"],
  },
  {
    _id: "grd-02",
    guardianId: "GRD-2026-002",
    name: "হাফিজুর রহমান",
    phone: "01819-876543",
    email: "hafizur.rahman@gmail.com",
    relation: "পিতা (Father)",
    address: "হাটহাজারী পৌরসভা, চট্টগ্রাম",
    occupation: "প্রকৌশলী",
    status: "Active",
    linkedStudentIds: ["stu-03"],
  },
  {
    _id: "grd-03",
    guardianId: "GRD-2026-003",
    name: "মোসাঃ ফাতেমা বেগম",
    phone: "01911-556677",
    email: "fatema.begum@gmail.com",
    relation: "মাতা (Mother)",
    address: "মুরাদপুর, চট্টগ্রাম",
    occupation: "চিকিৎসক",
    status: "Active",
    linkedStudentIds: ["stu-04", "stu-05"],
  },
  {
    _id: "grd-04",
    guardianId: "GRD-2026-004",
    name: "মাওলানা ইব্রাহিম খলিল",
    phone: "01615-998877",
    email: "ibrahim.khalil@gmail.com",
    relation: "পিতা (Father)",
    address: "ফটিকছড়ি, চট্টগ্রাম",
    occupation: "শিক্ষক",
    status: "Active",
    linkedStudentIds: ["stu-06"],
  },
];

const INITIAL_STUDENTS = [
  {
    _id: "stu-01",
    admissionId: "ADM-2026-101",
    name: "আব্দুল্লাহ আল মামুন",
    classProgram: "হিফজুল কুরআন বিভাগ (২য় বর্ষ)",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    guardianId: "grd-01",
    guardianName: "মোঃ আব্দুল করিম",
    guardianPhone: "01712-345678",
    admissionDate: "2024-01-10",
    monthlyFee: 2800,
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
    feeHistory: [
      { effectiveDate: "2025-01-01", amount: 2500, note: "প্রাথমিক হিফজ ফি" },
      { effectiveDate: "2026-07-01", amount: 2800, note: "২০২৬ সেশন হালনাগাদ" },
    ],
  },
  {
    _id: "stu-02",
    admissionId: "ADM-2026-102",
    name: "আয়েশা সিদ্দিকা",
    classProgram: "কিতাব বিভাগ (মিযান জামাত)",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    guardianId: "grd-01",
    guardianName: "মোঃ আব্দুল করিম",
    guardianPhone: "01712-345678",
    admissionDate: "2025-01-15",
    monthlyFee: 2500,
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha",
    feeHistory: [
      { effectiveDate: "2025-01-15", amount: 2500, note: "মিযান জামাত নির্ধারিত ফি" },
    ],
  },
  {
    _id: "stu-03",
    admissionId: "ADM-2026-103",
    name: "ওমর ফারুক",
    classProgram: "কিতাব বিভাগ (শরহে বেকায়া)",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    guardianId: "grd-02",
    guardianName: "হাফিজুর রহমান",
    guardianPhone: "01819-876543",
    admissionDate: "2023-01-12",
    monthlyFee: 3200,
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    feeHistory: [
      { effectiveDate: "2026-01-01", amount: 3200, note: "আবাসিক ও মাসিক টিউশন ফি" },
    ],
  },
  {
    _id: "stu-04",
    admissionId: "ADM-2026-104",
    name: "যাইনাব বিনতে তারিক",
    classProgram: "নূরানী ও নাযেরা বিভাগ",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    guardianId: "grd-03",
    guardianName: "মোসাঃ ফাতেমা বেগম",
    guardianPhone: "01911-556677",
    admissionDate: "2025-02-01",
    monthlyFee: 2000,
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
    feeHistory: [
      { effectiveDate: "2025-02-01", amount: 2000, note: "নূরানী নির্ধারিত মাসিক ফি" },
    ],
  },
  {
    _id: "stu-05",
    admissionId: "ADM-2026-105",
    name: "তালহা জুবায়ের",
    classProgram: "কিতাব বিভাগ (নাহবেমীর)",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    guardianId: "grd-03",
    guardianName: "মোসাঃ ফাতেমা বেগম",
    guardianPhone: "01911-556677",
    admissionDate: "2024-06-10",
    monthlyFee: 2700,
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Talha",
    feeHistory: [
      { effectiveDate: "2024-06-10", amount: 2700, note: "কিতাব বিভাগ ফি" },
    ],
  },
  {
    _id: "stu-06",
    admissionId: "ADM-2026-106",
    name: "সালমান আল ফারসী",
    classProgram: "হিফজুল কুরআন (সমাপনী)",
    semesterId: "sem-2025-2",
    semesterName: "বার্ষিক শিক্ষাবর্ষ ২০২৫",
    guardianId: "grd-04",
    guardianName: "মাওলানা ইব্রাহিম খলিল",
    guardianPhone: "01615-998877",
    admissionDate: "2022-01-05",
    monthlyFee: 2200,
    status: "Graduated",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salman",
    feeHistory: [
      { effectiveDate: "2022-01-05", amount: 2200, note: "বিশেষ শিক্ষাবৃত্তি ফি" },
    ],
  },
];

const INITIAL_FEE_CONFIGS = [
  {
    _id: "fee-01",
    scope: "Semester",
    targetId: "sem-2026-2",
    targetName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬",
    classProgram: "হিফজুল কুরআন বিভাগ (২য় বর্ষ)",
    monthlyAmount: 2800,
    effectiveDate: "2026-07-01",
    dueDateDay: 10,
    lateFee: 100,
    status: "Active",
  },
  {
    _id: "fee-02",
    scope: "Semester",
    targetId: "sem-2026-2",
    targetName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬",
    classProgram: "কিতাব বিভাগ (মিযান জামাত)",
    monthlyAmount: 2500,
    effectiveDate: "2026-07-01",
    dueDateDay: 10,
    lateFee: 100,
    status: "Active",
  },
  {
    _id: "fee-03",
    scope: "Semester",
    targetId: "sem-2026-2",
    targetName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬",
    classProgram: "কিতাব বিভাগ (শরহে বেকায়া)",
    monthlyAmount: 3200,
    effectiveDate: "2026-07-01",
    dueDateDay: 10,
    lateFee: 100,
    status: "Active",
  },
  {
    _id: "fee-04",
    scope: "Student",
    targetId: "stu-04",
    targetName: "যাইনাব বিনতে তারিক (ADM-2026-104)",
    classProgram: "নূরানী ও নাযেরা বিভাগ",
    monthlyAmount: 2000,
    effectiveDate: "2026-01-01",
    dueDateDay: 15,
    lateFee: 0,
    status: "Active",
  },
];

const INITIAL_PAYMENTS = [
  {
    _id: "pay-1001",
    receiptNumber: "RCP-2026-1001",
    studentId: "stu-01",
    studentName: "আব্দুল্লাহ আল মামুন",
    admissionId: "ADM-2026-101",
    guardianId: "grd-01",
    guardianName: "মোঃ আব্দুল করিম",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: 2800,
    method: "bKash",
    transactionId: "BKX982341KL",
    payerInfo: "01712-345678",
    bankName: "",
    proofUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    status: "Verified",
    submittedAt: "2026-11-02T10:15:00Z",
    verifiedAt: "2026-11-02T14:20:00Z",
    verifiedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    note: "বিকাশ মার্চেন্ট স্টেটমেন্ট যাচাইকৃত।",
  },
  {
    _id: "pay-1002",
    receiptNumber: "RCP-2026-1002",
    studentId: "stu-03",
    studentName: "ওমর ফারুক",
    admissionId: "ADM-2026-103",
    guardianId: "grd-02",
    guardianName: "হাফিজুর রহমান",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: 3200,
    method: "Bank",
    transactionId: "IBBL-SLIP-77412",
    payerInfo: "হাফিজুর রহমান • A/C 8831",
    bankName: "ইসলামী ব্যাংক বাংলাদেশ পিএলসি",
    proofUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&q=80",
    status: "Verified",
    submittedAt: "2026-11-03T09:30:00Z",
    verifiedAt: "2026-11-03T16:00:00Z",
    verifiedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    note: "ব্যাংক জমার স্লিপ নিশ্চিত করা হয়েছে।",
  },
  {
    _id: "pay-1003",
    receiptNumber: "RCP-2026-1003",
    studentId: "stu-04",
    studentName: "যাইনাব বিনতে তারিক",
    admissionId: "ADM-2026-104",
    guardianId: "grd-03",
    guardianName: "মোসাঃ ফাতেমা বেগম",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: 2000,
    method: "Offline",
    transactionId: "CASH-NOV-104",
    payerInfo: "অফিস কাউন্টারে নগদ জমা",
    receivedBy: "হিসাব রক্ষক (মাহমুদ)",
    bankName: "",
    proofUrl: "",
    status: "Verified",
    submittedAt: "2026-11-04T11:00:00Z",
    verifiedAt: "2026-11-04T11:05:00Z",
    verifiedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    note: "অফিসে সরাসরি নগদ গ্রহণ করা হয়েছে।",
  },
  {
    _id: "pay-1004",
    receiptNumber: "",
    studentId: "stu-02",
    studentName: "আয়েশা সিদ্দিকা",
    admissionId: "ADM-2026-102",
    guardianId: "grd-01",
    guardianName: "মোঃ আব্দুল করিম",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: 2500,
    method: "Nagad",
    transactionId: "NGD7741902P",
    payerInfo: "01712-345678",
    bankName: "",
    proofUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&q=80",
    status: "Pending",
    submittedAt: "2026-11-08T18:40:00Z",
    verifiedAt: null,
    verifiedBy: null,
    note: "অভিভাবক পোর্টাল থেকে প্রেরিত।",
  },
  {
    _id: "pay-1005",
    receiptNumber: "",
    studentId: "stu-05",
    studentName: "তালহা জুবায়ের",
    admissionId: "ADM-2026-105",
    guardianId: "grd-03",
    guardianName: "মোসাঃ ফাতেমা বেগম",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: 2700,
    method: "Offline",
    transactionId: "OFF-REQ-552",
    payerInfo: "আগামীকাল অফিসে নগদ জমা দেওয়া হবে",
    receivedBy: "অফিস যাচাইয়ের অপেক্ষায়",
    bankName: "",
    proofUrl: "",
    status: "Pending",
    submittedAt: "2026-11-09T08:15:00Z",
    verifiedAt: null,
    verifiedBy: null,
    note: "অভিভাবক কর্তৃক অফলাইন পেমেন্ট রিকোয়েস্ট।",
  },
  {
    _id: "pay-1006",
    receiptNumber: "RCP-2026-0988",
    studentId: "stu-01",
    studentName: "আব্দুল্লাহ আল মামুন",
    admissionId: "ADM-2026-101",
    guardianId: "grd-01",
    guardianName: "মোঃ আব্দুল করিম",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "October 2026",
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: 2800,
    method: "bKash",
    transactionId: "BKX881120OP",
    payerInfo: "01712-345678",
    bankName: "",
    proofUrl: "",
    status: "Verified",
    submittedAt: "2026-10-05T12:00:00Z",
    verifiedAt: "2026-10-05T15:10:00Z",
    verifiedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    note: "অক্টোবর মাসের মাসিক বেতন।",
  },
];

const INITIAL_EXPENSES = [
  {
    _id: "exp-01",
    title: "লিল্লাহ বোর্ডিং ও বাবুর্চিখানার চাল-ডাল ক্রয়",
    category: "food",
    month: "November 2026",
    amount: 3200,
    date: "2026-11-03",
    description: "৫০ কেজি চাল, ডাল ও সয়াবিন তেল (হিফজ ও কিতাব বিভাগ বোর্ডিং)",
    attachmentUrl: "",
    createdBy: "অ্যাডমিন (মাওলানা জাবেদ)",
  },
  {
    _id: "exp-02",
    title: "মাদ্রাসা ভবনের বিদ্যুৎ ও পানির বিল",
    category: "utilities",
    month: "November 2026",
    amount: 1450,
    date: "2026-11-05",
    description: "নভেম্বর মাসের পল্লী বিদ্যুৎ ও ওয়াসা বিল",
    attachmentUrl: "",
    createdBy: "অ্যাডমিন (মাওলানা জাবেদ)",
  },
  {
    _id: "exp-03",
    title: "শ্রেণিকক্ষের হোয়াইটবোর্ড মার্কার ও কাঠের রেহাল ক্রয়",
    category: "supplies",
    month: "November 2026",
    amount: 850,
    date: "2026-11-06",
    description: "২০টি কাঠের রেহাল ও ৩ বক্স মার্কার",
    attachmentUrl: "",
    createdBy: "অ্যাডমিন (মাওলানা জাবেদ)",
  },
  {
    _id: "exp-04",
    title: "পানির ফিল্টার ও মোটর মেরামত",
    category: "maintenance",
    month: "November 2026",
    amount: 600,
    date: "2026-11-07",
    description: "২য় তলার পানির ফিল্টার সার্ভিসিং",
    attachmentUrl: "",
    createdBy: "অ্যাডমিন (মাওলানা জাবেদ)",
  },
];

const INITIAL_TEACHERS = [
  {
    _id: "tch-01",
    teacherId: "TCH-2026-01",
    name: "মুফতি তারিকুল ইসলাম",
    phone: "01715-112233",
    email: "tariqul.islam@markajulilm.edu.bd",
    address: "হাটহাজারী পৌরসভা, চট্টগ্রাম",
    subjects: ["তাফসীরুল কুরআন", "ফিকহ ও উসূলে ফিকহ"],
    assignedClasses: ["কিতাব বিভাগ (শরহে বেকায়া)", "কিতাব বিভাগ (মিযান জামাত)"],
    fixedSalary: 18000,
    joiningDate: "2022-03-01",
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tariqul",
  },
  {
    _id: "tch-02",
    teacherId: "TCH-2026-02",
    name: "হাফেজ ক্বারী সাইফুল্লাহ মানসুর",
    phone: "01814-223344",
    email: "saifullah.mansur@markajulilm.edu.bd",
    address: "পশ্চিম ফটিকা, হাটহাজারী, চট্টগ্রাম",
    subjects: ["হিফজুল কুরআন", "তাজবীদ ও মাশক"],
    assignedClasses: ["হিফজুল কুরআন বিভাগ (২য় বর্ষ)", "নূরানী ও নাযেরা বিভাগ"],
    fixedSalary: 15000,
    joiningDate: "2023-01-15",
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saifullah",
  },
  {
    _id: "tch-03",
    teacherId: "TCH-2026-03",
    name: "মাওলানা মাহমুদুল হাসান",
    phone: "01922-334455",
    email: "mahmudul.hasan@markajulilm.edu.bd",
    address: "দারুল আনোয়ার, হাটহাজারী, চট্টগ্রাম",
    subjects: ["নাহু ও সরফ (আরবি ব্যাকরণ)", "গণিত ও বাংলা"],
    assignedClasses: ["কিতাব বিভাগ (নাহবেমীর)", "কিতাব বিভাগ (মিযান জামাত)"],
    fixedSalary: 16500,
    joiningDate: "2023-07-01",
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahmudul",
  },
  {
    _id: "tch-04",
    teacherId: "TCH-2026-04",
    name: "উস্তাযা মারইয়াম জামীলা",
    phone: "01611-445566",
    email: "maryam.jameela@markajulilm.edu.bd",
    address: "হাটহাজারী, চট্টগ্রাম",
    subjects: ["নূরানী কায়দা ও আমপারা", "আদব ও আখলাক"],
    assignedClasses: ["নূরানী ও নাযেরা বিভাগ"],
    fixedSalary: 14500,
    joiningDate: "2024-01-10",
    status: "Active",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
  },
];

const INITIAL_SALARY_PAYMENTS = [
  {
    _id: "sal-01",
    teacherId: "tch-01",
    teacherCode: "TCH-2026-01",
    teacherName: "মুফতি তারিকুল ইসলাম",
    month: "November 2026",
    amount: 18000,
    method: "Bank",
    reference: "IBBL-SAL-NOV01",
    paidDate: "2026-11-05",
    status: "Paid",
    note: "নভেম্বর মাসের পূর্ণ হাদিয়া/বেতন পরিশোধিত।",
  },
  {
    _id: "sal-02",
    teacherId: "tch-02",
    teacherCode: "TCH-2026-02",
    teacherName: "হাফেজ ক্বারী সাইফুল্লাহ মানসুর",
    month: "November 2026",
    amount: 15000,
    method: "bKash",
    reference: "BK-SAL-99201",
    paidDate: "2026-11-05",
    status: "Paid",
    note: "বিকাশের মাধ্যমে পরিশোধিত।",
  },
];

const INITIAL_STUDENT_RESULTS = [
  {
    _id: "res-01",
    studentId: "stu-01",
    studentName: "আব্দুল্লাহ আল মামুন",
    admissionId: "ADM-2026-101",
    classProgram: "হিফজুল কুরআন বিভাগ (২য় বর্ষ)",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    subject: "হিফজুল কুরআন ও তাজবীদ",
    marksObtained: 95,
    totalMarks: 100,
    grade: "মুমতায (A+)",
    attendancePercent: 98,
    monthlyProgressReport:
      "আলহামদুলিল্লাহ, ১৪ ও ১৫ তম পারা অত্যন্ত সুন্দর মাখরাজসহ মুখস্থ সম্পন্ন করেছে এবং পিছনের ইয়াদ মজবুত আছে।",
    teacherName: "হাফেজ ক্বারী সাইফুল্লাহ মানসুর",
    updatedAt: "2026-11-06",
  },
  {
    _id: "res-02",
    studentId: "stu-02",
    studentName: "আয়েশা সিদ্দিকা",
    admissionId: "ADM-2026-102",
    classProgram: "কিতাব বিভাগ (মিযান জামাত)",
    semesterId: "sem-2026-2",
    semesterName: "দ্বিতীয় সাময়িক / বার্ষিক সেশন ২০২৬ (জুলাই - ডিসেম্বর)",
    month: "November 2026",
    subject: "ফিকহ ও মিযানুস সরফ",
    marksObtained: 90,
    totalMarks: 100,
    grade: "মুমতায (A+)",
    attendancePercent: 96,
    monthlyProgressReport:
      "সরফের রূপান্তর এবং ফিকহের তহারাত অধ্যায়ে চমৎকার দখল রয়েছে। নিয়মিত সবক আদায় করে।",
    teacherName: "মুফতি তারিকুল ইসলাম",
    updatedAt: "2026-11-06",
  },
];

const INITIAL_AUDIT_LOGS = [
  {
    _id: "aud-01",
    actor: "অ্যাডমিন (মাওলানা জাবেদ)",
    role: "admin",
    action: "PAYMENT_VERIFIED",
    entity: "payments",
    entityId: "pay-1001",
    beforeSummary: "স্ট্যাটাস: পেন্ডিং (৳২,৮০০ • বিকাশ BKX982341KL)",
    afterSummary: "স্ট্যাটাস: ভেরিফাইড • রশিদ RCP-2026-1001 জেনারেট হয়েছে",
    timestamp: "2026-11-02T14:20:00Z",
  },
  {
    _id: "aud-02",
    actor: "অ্যাডমিন (মাওলানা জাবেদ)",
    role: "admin",
    action: "EXPENSE_ADDED",
    entity: "expenses",
    entityId: "exp-01",
    beforeSummary: "নতুন এন্ট্রি",
    afterSummary: "যোগ করা হয়েছে 'লিল্লাহ বোর্ডিং ও বাবুর্চিখানার চাল-ডাল ক্রয়' (৳৩,২০০)",
    timestamp: "2026-11-03T11:00:00Z",
  },
  {
    _id: "aud-03",
    actor: "অ্যাডমিন (মাওলানা জাবেদ)",
    role: "admin",
    action: "SALARY_RECORDED",
    entity: "teacher_salary_payments",
    entityId: "sal-01",
    beforeSummary: "নভেম্বর ২০২৬ স্ট্যাটাস: অপরিশোধিত",
    afterSummary: "মুফতি তারিকুল ইসলামকে ৳১৮,০০০ পরিশোধ করা হয়েছে (Ref: IBBL-SAL-NOV01)",
    timestamp: "2026-11-05T13:45:00Z",
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    _id: "notif-01",
    recipientRole: "guardian",
    recipientId: "grd-01",
    type: "PAYMENT_VERIFIED",
    title: "মাসিক ফি পরিশোধ নিশ্চিত ও রশিদ প্রদান",
    message:
      "আব্দুল্লাহ আল মামুনের নভেম্বর ২০২৬ মাসের ৳২,৮০০ টিউশন ফি (বিকাশ: BKX982341KL) যাচাই সম্পন্ন হয়েছে। রশিদ নং #RCP-2026-1001 ডাউনলোডের জন্য প্রস্তুত।",
    read: false,
    createdAt: "2026-11-02T14:21:00Z",
  },
  {
    _id: "notif-02",
    recipientRole: "all",
    recipientId: "all",
    type: "ANNOUNCEMENT",
    title: "বার্ষিক পরীক্ষার সময়সূচি ও বকেয়া পরিশোধের বিজ্ঞপ্তি",
    message:
      "আসসালামু আলাইকুম। মারকাযুল ইলমি ওয়াল হুদা-এর বার্ষিক পরীক্ষা আগামী ১০ ডিসেম্বর ২০২৬ থেকে শুরু হবে ইনশাআল্লাহ। ৫ ডিসেম্বরের মধ্যে সকল বকেয়া ফি পরিশোধের জন্য অনুরোধ করা হলো।",
    read: false,
    createdAt: "2026-11-05T09:00:00Z",
  },
  {
    _id: "notif-03",
    recipientRole: "teacher",
    recipientId: "tch-01",
    type: "SALARY_PAID",
    title: "নভেম্বর ২০২৬ মাসের বেতন/হাদিয়া প্রদান",
    message:
      "আপনার নভেম্বর ২০২৬ মাসের নির্ধারিত ৳১৮,০০০ বেতন ব্যাংক ট্রান্সফারের মাধ্যমে (Ref: IBBL-SAL-NOV01) পরিশোধ করা হয়েছে।",
    read: false,
    createdAt: "2026-11-05T13:46:00Z",
  },
];

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const MadrasaProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();

  const [selectedMonth, setSelectedMonth] = useState("November 2026");
  const [settings, setSettings] = useState(() => loadFromStorage("mpt_bn_settings", INITIAL_SETTINGS));
  const [semesters, setSemesters] = useState(() => loadFromStorage("mpt_bn_semesters", INITIAL_SEMESTERS));
  const [guardians, setGuardians] = useState(() => loadFromStorage("mpt_bn_guardians", INITIAL_GUARDIANS));
  const [students, setStudents] = useState(() => loadFromStorage("mpt_bn_students", INITIAL_STUDENTS));
  const [feeConfigs, setFeeConfigs] = useState(() => loadFromStorage("mpt_bn_fees", INITIAL_FEE_CONFIGS));
  const [payments, setPayments] = useState(() => loadFromStorage("mpt_bn_payments", INITIAL_PAYMENTS));
  const [expenses, setExpenses] = useState(() => loadFromStorage("mpt_bn_expenses", INITIAL_EXPENSES));
  const [teachers, setTeachers] = useState(() => loadFromStorage("mpt_bn_teachers", INITIAL_TEACHERS));
  const [salaryPayments, setSalaryPayments] = useState(() =>
    loadFromStorage("mpt_bn_salaries", INITIAL_SALARY_PAYMENTS)
  );
  const [studentResults, setStudentResults] = useState(() =>
    loadFromStorage("mpt_bn_results", INITIAL_STUDENT_RESULTS)
  );
  const [auditLogs, setAuditLogs] = useState(() => loadFromStorage("mpt_bn_audits", INITIAL_AUDIT_LOGS));
  const [notifications, setNotifications] = useState(() =>
    loadFromStorage("mpt_bn_notifications", INITIAL_NOTIFICATIONS)
  );
  const [backendConnected, setBackendConnected] = useState(false);

  // Sync to localStorage
  useEffect(() => localStorage.setItem("mpt_bn_settings", JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem("mpt_bn_semesters", JSON.stringify(semesters)), [semesters]);
  useEffect(() => localStorage.setItem("mpt_bn_guardians", JSON.stringify(guardians)), [guardians]);
  useEffect(() => localStorage.setItem("mpt_bn_students", JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem("mpt_bn_fees", JSON.stringify(feeConfigs)), [feeConfigs]);
  useEffect(() => localStorage.setItem("mpt_bn_payments", JSON.stringify(payments)), [payments]);
  useEffect(() => localStorage.setItem("mpt_bn_expenses", JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem("mpt_bn_teachers", JSON.stringify(teachers)), [teachers]);
  useEffect(() => localStorage.setItem("mpt_bn_salaries", JSON.stringify(salaryPayments)), [salaryPayments]);
  useEffect(() => localStorage.setItem("mpt_bn_results", JSON.stringify(studentResults)), [studentResults]);
  useEffect(() => localStorage.setItem("mpt_bn_audits", JSON.stringify(auditLogs)), [auditLogs]);
  useEffect(() => localStorage.setItem("mpt_bn_notifications", JSON.stringify(notifications)), [notifications]);

  // Attempt initial hydration from Backend REST API if backend is running
  useEffect(() => {
    const syncFromBackend = async () => {
      try {
        const res = await axiosSecure.get("/api/dashboard/summary");
        if (res?.data) {
          setBackendConnected(true);
          const [stuRes, grdRes, semRes, feeRes, payRes, expRes, tchRes, salRes, audRes, notRes] =
            await Promise.allSettled([
              axiosSecure.get("/api/students"),
              axiosSecure.get("/api/guardians"),
              axiosSecure.get("/api/semesters"),
              axiosSecure.get("/api/fees"),
              axiosSecure.get("/api/payments"),
              axiosSecure.get("/api/expenses"),
              axiosSecure.get("/api/teachers"),
              axiosSecure.get("/api/teacher-salaries"),
              axiosSecure.get("/api/audit-logs"),
              axiosSecure.get("/api/notifications"),
            ]);
          if (stuRes.status === "fulfilled" && Array.isArray(stuRes.value.data?.data || stuRes.value.data))
            setStudents(stuRes.value.data?.data || stuRes.value.data);
          if (grdRes.status === "fulfilled" && Array.isArray(grdRes.value.data?.data || grdRes.value.data))
            setGuardians(grdRes.value.data?.data || grdRes.value.data);
          if (semRes.status === "fulfilled" && Array.isArray(semRes.value.data?.data || semRes.value.data))
            setSemesters(semRes.value.data?.data || semRes.value.data);
          if (feeRes.status === "fulfilled" && Array.isArray(feeRes.value.data?.data || feeRes.value.data))
            setFeeConfigs(feeRes.value.data?.data || feeRes.value.data);
          if (payRes.status === "fulfilled" && Array.isArray(payRes.value.data?.data || payRes.value.data))
            setPayments(payRes.value.data?.data || payRes.value.data);
          if (expRes.status === "fulfilled" && Array.isArray(expRes.value.data?.data || expRes.value.data))
            setExpenses(expRes.value.data?.data || expRes.value.data);
          if (tchRes.status === "fulfilled" && Array.isArray(tchRes.value.data?.data || tchRes.value.data))
            setTeachers(tchRes.value.data?.data || tchRes.value.data);
          if (salRes.status === "fulfilled" && Array.isArray(salRes.value.data?.data || salRes.value.data))
            setSalaryPayments(salRes.value.data?.data || salRes.value.data);
          if (audRes.status === "fulfilled" && Array.isArray(audRes.value.data?.data || audRes.value.data))
            setAuditLogs(audRes.value.data?.data || audRes.value.data);
          if (notRes.status === "fulfilled" && Array.isArray(notRes.value.data?.data || notRes.value.data))
            setNotifications(notRes.value.data?.data || notRes.value.data);
        }
      } catch {
        setBackendConnected(false);
      }
    };
    syncFromBackend();
  }, [axiosSecure]);

  const recordAudit = (
    action,
    entity,
    entityId,
    beforeSummary,
    afterSummary,
    actor = "অ্যাডমিন (মাওলানা জাবেদ)"
  ) => {
    const newLog = {
      _id: `aud-${Date.now()}`,
      actor,
      role: "admin",
      action,
      entity,
      entityId,
      beforeSummary,
      afterSummary,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    return newLog;
  };

  const pushNotification = ({ recipientRole = "all", recipientId = "all", type, title, message }) => {
    const newNotif = {
      _id: `notif-${Date.now()}`,
      recipientRole,
      recipientId,
      type,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
    axiosSecure.post("/api/notifications", newNotif).catch(() => {});
    return newNotif;
  };

  // ─── 1. STUDENT OPERATIONS ─────────────────────────────────────────────────
  const addStudent = async (studentData) => {
    const sem = semesters.find((s) => s._id === studentData.semesterId) || semesters[0];
    const grd = guardians.find((g) => g._id === studentData.guardianId) || guardians[0];
    const newStudent = {
      _id: `stu-${Date.now()}`,
      admissionId: studentData.admissionId || `ADM-2026-${100 + students.length + 1}`,
      name: studentData.name,
      classProgram: studentData.classProgram,
      semesterId: sem?._id || "sem-2026-2",
      semesterName: sem?.name || "দ্বিতীয় সাময়িক সেশন ২০২৬",
      guardianId: grd?._id || "grd-01",
      guardianName: grd?.name || studentData.guardianName || "অভিভাবক",
      guardianPhone: grd?.phone || studentData.guardianPhone || "",
      admissionDate: studentData.admissionDate || new Date().toISOString().slice(0, 10),
      monthlyFee: Number(studentData.monthlyFee) || 2500,
      status: studentData.status || "Active",
      photoURL:
        studentData.photoURL ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(studentData.name)}`,
      feeHistory: [
        {
          effectiveDate: new Date().toISOString().slice(0, 10),
          amount: Number(studentData.monthlyFee) || 2500,
          note: "প্রাথমিক ভর্তি ফি নির্ধারণ",
        },
      ],
    };

    try {
      await axiosSecure.post("/api/students", newStudent);
    } catch {}

    setStudents((prev) => [newStudent, ...prev]);
    if (grd) {
      setGuardians((prev) =>
        prev.map((g) =>
          g._id === grd._id
            ? { ...g, linkedStudentIds: [...new Set([...(g.linkedStudentIds || []), newStudent._id])] }
            : g
        )
      );
    }
    recordAudit(
      "STUDENT_CREATED",
      "students",
      newStudent._id,
      "নতুন ভর্তি",
      `ভর্তি সম্পন্ন: ${newStudent.name} (${newStudent.admissionId}) • মাসিক ফি: ৳${newStudent.monthlyFee}`
    );
    return newStudent;
  };

  const updateStudent = async (id, updates) => {
    const existing = students.find((s) => s._id === id);
    if (!existing) return;

    const feeChanged =
      updates.monthlyFee !== undefined && Number(updates.monthlyFee) !== Number(existing.monthlyFee);
    const updatedFeeHistory = feeChanged
      ? [
          ...(existing.feeHistory || []),
          {
            effectiveDate: new Date().toISOString().slice(0, 10),
            amount: Number(updates.monthlyFee),
            note: "অ্যাডমিন কর্তৃক মাসিক ফি হালনাগাদ",
          },
        ]
      : existing.feeHistory;

    const updatedStudent = {
      ...existing,
      ...updates,
      monthlyFee: updates.monthlyFee !== undefined ? Number(updates.monthlyFee) : existing.monthlyFee,
      feeHistory: updatedFeeHistory,
    };

    try {
      await axiosSecure.patch(`/api/students/${id}`, updatedStudent);
    } catch {}

    setStudents((prev) => prev.map((s) => (s._id === id ? updatedStudent : s)));
    recordAudit(
      "STUDENT_UPDATED",
      "students",
      id,
      `${existing.name} • ফি: ৳${existing.monthlyFee} • স্ট্যাটাস: ${existing.status}`,
      `${updatedStudent.name} • ফি: ৳${updatedStudent.monthlyFee} • স্ট্যাটাস: ${updatedStudent.status}`
    );
    return updatedStudent;
  };

  // ─── 2. GUARDIAN OPERATIONS ────────────────────────────────────────────────
  const addGuardian = async (guardianData) => {
    const newGuardian = {
      _id: `grd-${Date.now()}`,
      guardianId: guardianData.guardianId || `GRD-2026-00${guardians.length + 1}`,
      name: guardianData.name,
      phone: guardianData.phone,
      email: guardianData.email,
      relation: guardianData.relation || "পিতা (Father)",
      address: guardianData.address || "",
      occupation: guardianData.occupation || "",
      status: guardianData.status || "Active",
      linkedStudentIds: guardianData.linkedStudentIds || [],
    };
    try {
      await axiosSecure.post("/api/guardians", newGuardian);
    } catch {}
    setGuardians((prev) => [newGuardian, ...prev]);
    recordAudit("GUARDIAN_CREATED", "guardians", newGuardian._id, "নতুন", `অভিভাবক যোগ: ${newGuardian.name}`);
    return newGuardian;
  };

  const updateGuardian = async (id, updates) => {
    try {
      await axiosSecure.patch(`/api/guardians/${id}`, updates);
    } catch {}
    setGuardians((prev) => prev.map((g) => (g._id === id ? { ...g, ...updates } : g)));
    recordAudit("GUARDIAN_UPDATED", "guardians", id, "অভিভাবক তথ্য পরিবর্তন", JSON.stringify(updates));
  };

  // ─── 3. SEMESTER OPERATIONS ────────────────────────────────────────────────
  const addSemester = async (semData) => {
    const newSem = {
      _id: `sem-${Date.now()}`,
      name: semData.name,
      code: semData.code,
      academicYear: semData.academicYear || "2026",
      startDate: semData.startDate,
      endDate: semData.endDate,
      defaultMonthlyFee: Number(semData.defaultMonthlyFee) || 2500,
      status: semData.status || "Active",
      studentCount: 0,
    };
    try {
      await axiosSecure.post("/api/semesters", newSem);
    } catch {}
    setSemesters((prev) => [newSem, ...prev]);
    recordAudit("SEMESTER_CREATED", "semesters", newSem._id, "নতুন", `সেমিস্টার তৈরি: ${newSem.name}`);
    return newSem;
  };

  const updateSemester = async (id, updates) => {
    try {
      await axiosSecure.patch(`/api/semesters/${id}`, updates);
    } catch {}
    setSemesters((prev) => prev.map((s) => (s._id === id ? { ...s, ...updates } : s)));
  };

  // ─── 4. FEE CONFIGURATION ──────────────────────────────────────────────────
  const addFeeConfig = async (feeData) => {
    const newFee = {
      _id: `fee-${Date.now()}`,
      scope: feeData.scope || "Semester",
      targetId: feeData.targetId,
      targetName: feeData.targetName,
      classProgram: feeData.classProgram,
      monthlyAmount: Number(feeData.monthlyAmount),
      effectiveDate: feeData.effectiveDate || new Date().toISOString().slice(0, 10),
      dueDateDay: Number(feeData.dueDateDay) || settings.dueDateDay,
      lateFee: Number(feeData.lateFee) || 0,
      status: "Active",
    };
    try {
      await axiosSecure.post("/api/fees", newFee);
    } catch {}
    setFeeConfigs((prev) => [newFee, ...prev]);
    recordAudit(
      "FEE_CONFIG_CREATED",
      "fee_configs",
      newFee._id,
      "নতুন",
      `${newFee.scope} ফি রুল: ${newFee.classProgram} -> ৳${newFee.monthlyAmount}`
    );
    return newFee;
  };

  // ─── 5. PAYMENTS & MANUAL ADMIN PAYMENT UPDATE ─────────────────────────────
  const submitPayment = async (paymentPayload) => {
    const student = students.find((s) => s._id === paymentPayload.studentId);
    if (!student) throw new Error("শিক্ষার্থী খুঁজে পাওয়া যায়নি।");

    const feeType = paymentPayload.feeType || "মাসিক টিউশন ও আবাসিক ফি";
    const isAdminAdjustment = Boolean(paymentPayload.isAdjustment);

    const duplicate = payments.find(
      (p) =>
        p.studentId === student._id &&
        p.month === paymentPayload.month &&
        ["Pending", "Verified"].includes(p.status)
    );
    if (duplicate && !isAdminAdjustment) {
      throw new Error(
        `ডুপ্লিকেট পেমেন্ট প্রতিরোধ: ${student.name}-এর ${MONTH_LABELS_BN[paymentPayload.month] || paymentPayload.month} মাসের ফি ইতিমধ্যে (${duplicate.status}) হিসেবে জমা আছে।`
      );
    }

    const autoVerify = Boolean(paymentPayload.autoVerify);
    const receiptNum = autoVerify ? `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}` : "";

    const newPayment = {
      _id: `pay-${Date.now()}`,
      receiptNumber: receiptNum,
      studentId: student._id,
      studentName: student.name,
      admissionId: student.admissionId,
      guardianId: student.guardianId,
      guardianName: student.guardianName,
      semesterId: paymentPayload.semesterId || student.semesterId,
      semesterName: paymentPayload.semesterName || student.semesterName,
      month: paymentPayload.month,
      feeType,
      amount: Number(paymentPayload.amount) || student.monthlyFee,
      method: paymentPayload.method,
      transactionId:
        paymentPayload.transactionId ||
        (paymentPayload.method === "Offline" ? `CASH-${Date.now().toString().slice(-5)}` : ""),
      payerInfo: paymentPayload.payerInfo || student.guardianPhone,
      bankName: paymentPayload.bankName || "",
      receivedBy: paymentPayload.receivedBy || (autoVerify ? "অ্যাডমিন (মাওলানা জাবেদ)" : "অফিস যাচাইয়ের অপেক্ষায়"),
      proofUrl: paymentPayload.proofUrl || "",
      status: autoVerify ? "Verified" : "Pending",
      submittedAt: new Date().toISOString(),
      verifiedAt: autoVerify ? new Date().toISOString() : null,
      verifiedBy: autoVerify ? "অ্যাডমিন (মাওলানা জাবেদ)" : null,
      note: paymentPayload.note || "",
    };

    try {
      await axiosSecure.post("/api/payments", newPayment);
    } catch {}

    setPayments((prev) => [newPayment, ...prev]);

    if (autoVerify) {
      recordAudit(
        "OFFLINE_PAYMENT_RECORDED",
        "payments",
        newPayment._id,
        "নতুন এন্ট্রি",
        `অ্যাডমিন কর্তৃক ${student.name}-এর ${newPayment.month} মাসের ৳${newPayment.amount} (${newPayment.method}) পেমেন্ট ভেরিফাইড`
      );
      pushNotification({
        recipientRole: "guardian",
        recipientId: student.guardianId,
        type: "PAYMENT_VERIFIED",
        title: "মাসিক ফি জমা ও রশিদ প্রদান",
        message: `${student.name}-এর ${newPayment.month} মাসের ৳${newPayment.amount} ফি জমা হয়েছে। রশিদ নং: ${receiptNum}।`,
      });
    } else {
      pushNotification({
        recipientRole: "admin",
        recipientId: "admin",
        type: "PAYMENT_SUBMITTED",
        title: `নতুন ${newPayment.method} পেমেন্ট জমা হয়েছে`,
        message: `${student.guardianName} (${student.name})-এর জন্য ৳${newPayment.amount} জমা দিয়েছেন (${newPayment.month})। TrxID: ${newPayment.transactionId}`,
      });
    }

    return newPayment;
  };

  // Admin can manually edit/update any existing payment record (amount, method, month, status, transactionId, note)
  const updatePaymentManually = async (paymentId, updates) => {
    const existing = payments.find((p) => p._id === paymentId);
    if (!existing) return;

    const nextStatus = updates.status || existing.status;
    const receiptNumber =
      nextStatus === "Verified" && !existing.receiptNumber
        ? `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`
        : existing.receiptNumber;

    const updated = {
      ...existing,
      ...updates,
      amount: updates.amount !== undefined ? Number(updates.amount) : existing.amount,
      status: nextStatus,
      receiptNumber,
      verifiedAt: nextStatus === "Verified" ? new Date().toISOString() : existing.verifiedAt,
      verifiedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    };

    try {
      await axiosSecure.patch(`/api/payments/${paymentId}`, updated);
    } catch {}

    setPayments((prev) => prev.map((p) => (p._id === paymentId ? updated : p)));

    recordAudit(
      "PAYMENT_MANUAL_UPDATE",
      "payments",
      paymentId,
      `${existing.studentName} (${existing.month}) • ৳${existing.amount} • ${existing.status}`,
      `${updated.studentName} (${updated.month}) • ৳${updated.amount} • ${updated.method} • ${updated.status}`
    );

    return updated;
  };

  // Admin can manually create OR update a student's monthly payment from the Student Monthly Payment Matrix
  const upsertStudentMonthlyPayment = async ({
    studentId,
    month,
    amount,
    method = "Offline",
    status = "Verified",
    transactionId,
    note,
  }) => {
    const student = students.find((s) => s._id === studentId);
    if (!student) throw new Error("শিক্ষার্থী পাওয়া যায়নি");

    const existing = payments.find((p) => p.studentId === studentId && p.month === month);

    if (existing) {
      return await updatePaymentManually(existing._id, {
        amount: Number(amount),
        method,
        status,
        transactionId: transactionId || existing.transactionId,
        note: note !== undefined ? note : "অ্যাডমিন কর্তৃক ম্যানুয়ালি আপডেটকৃত",
      });
    } else {
      const receiptNum =
        status === "Verified" ? `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}` : "";
      const newPay = {
        _id: `pay-${Date.now()}`,
        receiptNumber: receiptNum,
        studentId: student._id,
        studentName: student.name,
        admissionId: student.admissionId,
        guardianId: student.guardianId,
        guardianName: student.guardianName,
        semesterId: student.semesterId,
        semesterName: student.semesterName,
        month,
        feeType: "মাসিক টিউশন ও আবাসিক ফি",
        amount: Number(amount) || student.monthlyFee,
        method,
        transactionId: transactionId || `MANUAL-${Date.now().toString().slice(-4)}`,
        payerInfo: student.guardianPhone || "অফিস কাউন্টার",
        receivedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
        bankName: "",
        proofUrl: "",
        status,
        submittedAt: new Date().toISOString(),
        verifiedAt: status === "Verified" ? new Date().toISOString() : null,
        verifiedBy: status === "Verified" ? "অ্যাডমিন (মাওলানা জাবেদ)" : null,
        note: note || "অ্যাডমিন কর্তৃক ম্যানুয়ালি এন্ট্রিকৃত",
      };

      try {
        await axiosSecure.post("/api/payments", newPay);
      } catch {}

      setPayments((prev) => [newPay, ...prev]);
      recordAudit(
        "PAYMENT_MANUAL_ENTRY",
        "payments",
        newPay._id,
        `${student.name} (${month}): অপরিশোধিত`,
        `ম্যানুয়াল এন্ট্রি: ৳${newPay.amount} • ${newPay.method} • স্ট্যাটাস: ${newPay.status}`
      );
      return newPay;
    }
  };

  const verifyOrUpdatePayment = async (
    paymentId,
    { status, note, adjustedAmount, actor = "অ্যাডমিন (মাওলানা জাবেদ)" }
  ) => {
    const existing = payments.find((p) => p._id === paymentId);
    if (!existing) return;

    const receiptNumber =
      status === "Verified" && !existing.receiptNumber
        ? `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`
        : existing.receiptNumber;

    const updated = {
      ...existing,
      status,
      amount: adjustedAmount !== undefined ? Number(adjustedAmount) : existing.amount,
      receiptNumber,
      verifiedAt: new Date().toISOString(),
      verifiedBy: actor,
      note: note !== undefined ? note : existing.note,
    };

    try {
      await axiosSecure.post(`/api/payments/${paymentId}/verify`, {
        status,
        note: updated.note,
        amount: updated.amount,
      });
    } catch {}

    setPayments((prev) => prev.map((p) => (p._id === paymentId ? updated : p)));

    recordAudit(
      `PAYMENT_${status.toUpperCase()}`,
      "payments",
      paymentId,
      `স্ট্যাটাস: ${existing.status} • পরিমাণ: ৳${existing.amount}`,
      `স্ট্যাটাস: ${updated.status} • পরিমাণ: ৳${updated.amount} • নোট: ${updated.note || "N/A"}`,
      actor
    );

    if (status === "Verified" || status === "Rejected") {
      pushNotification({
        recipientRole: "guardian",
        recipientId: existing.guardianId,
        type: `PAYMENT_${status.toUpperCase()}`,
        title:
          status === "Verified"
            ? "মাসিক ফি পেমেন্ট ভেরিফাইড হয়েছে"
            : "পেমেন্ট রিকোয়েস্ট বাতিল (Rejected) হয়েছে",
        message:
          status === "Verified"
            ? `${existing.studentName}-এর ${existing.month} মাসের ৳${updated.amount} (${existing.method}) পেমেন্ট নিশ্চিত হয়েছে। রশিদ নং #${receiptNumber}।`
            : `${existing.studentName}-এর ${existing.month} মাসের পেমেন্ট বাতিল করা হয়েছে। কারণ: ${updated.note || "ট্রানজেকশন আইডি সঠিক নয়"}।`,
      });
    }

    return updated;
  };

  // ─── 6. EXPENSE OPERATIONS ─────────────────────────────────────────────────
  const addExpense = async (expData) => {
    const newExp = {
      _id: `exp-${Date.now()}`,
      title: expData.title,
      category: expData.category || "other",
      month: expData.month || selectedMonth,
      amount: Number(expData.amount),
      date: expData.date || new Date().toISOString().slice(0, 10),
      description: expData.description || "",
      attachmentUrl: expData.attachmentUrl || "",
      createdBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    };
    try {
      await axiosSecure.post("/api/expenses", newExp);
    } catch {}
    setExpenses((prev) => [newExp, ...prev]);
    recordAudit(
      "EXPENSE_ADDED",
      "expenses",
      newExp._id,
      "নতুন খরচ",
      `খরচ যুক্ত: '${newExp.title}' (৳${newExp.amount} • ${newExp.category})`
    );
    return newExp;
  };

  const updateExpense = async (id, updates) => {
    const existing = expenses.find((e) => e._id === id);
    if (!existing) return;
    const updated = { ...existing, ...updates, amount: Number(updates.amount ?? existing.amount) };
    try {
      await axiosSecure.patch(`/api/expenses/${id}`, updated);
    } catch {}
    setExpenses((prev) => prev.map((e) => (e._id === id ? updated : e)));
    recordAudit(
      "EXPENSE_UPDATED",
      "expenses",
      id,
      `${existing.title}: ৳${existing.amount}`,
      `${updated.title}: ৳${updated.amount}`
    );
  };

  const deleteExpense = async (id) => {
    const existing = expenses.find((e) => e._id === id);
    if (!existing) return;
    try {
      await axiosSecure.delete(`/api/expenses/${id}`);
    } catch {}
    setExpenses((prev) => prev.filter((e) => e._id !== id));
    recordAudit("EXPENSE_DELETED", "expenses", id, `${existing.title} (৳${existing.amount})`, "মুছে ফেলা হয়েছে");
  };

  // ─── 7. TEACHERS & SALARIES ────────────────────────────────────────────────
  const addTeacher = async (tchData) => {
    const newTeacher = {
      _id: `tch-${Date.now()}`,
      teacherId: tchData.teacherId || `TCH-2026-0${teachers.length + 1}`,
      name: tchData.name,
      phone: tchData.phone,
      email: tchData.email || "",
      address: tchData.address || "",
      subjects: Array.isArray(tchData.subjects)
        ? tchData.subjects
        : String(tchData.subjects || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      assignedClasses: Array.isArray(tchData.assignedClasses)
        ? tchData.assignedClasses
        : String(tchData.assignedClasses || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      fixedSalary: Number(tchData.fixedSalary) || 15000,
      joiningDate: tchData.joiningDate || new Date().toISOString().slice(0, 10),
      status: tchData.status || "Active",
      photoURL:
        tchData.photoURL ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(tchData.name)}`,
    };
    try {
      await axiosSecure.post("/api/teachers", newTeacher);
    } catch {}
    setTeachers((prev) => [newTeacher, ...prev]);
    recordAudit(
      "TEACHER_ADDED",
      "teachers",
      newTeacher._id,
      "নতুন নিয়োগ",
      `শিক্ষক যুক্ত: ${newTeacher.name} (${newTeacher.teacherId}) • মাসিক হাদিয়া: ৳${newTeacher.fixedSalary}`
    );
    return newTeacher;
  };

  const updateTeacher = async (id, updates) => {
    try {
      await axiosSecure.patch(`/api/teachers/${id}`, updates);
    } catch {}
    setTeachers((prev) => prev.map((t) => (t._id === id ? { ...t, ...updates } : t)));
    recordAudit("TEACHER_UPDATED", "teachers", id, "শিক্ষক তথ্য পরিবর্তন", JSON.stringify(updates));
  };

  const payTeacherSalary = async ({ teacherId, month, amount, method, reference, note }) => {
    const teacher = teachers.find((t) => t._id === teacherId);
    if (!teacher) throw new Error("শিক্ষক খুঁজে পাওয়া যায়নি।");

    const duplicate = salaryPayments.find(
      (s) => s.teacherId === teacherId && s.month === month && s.status === "Paid"
    );
    if (duplicate) {
      throw new Error(
        `ডুপ্লিকেট বেতন প্রতিরোধ: ${teacher.name}-কে ইতিমধ্যে ${month} মাসের বেতন পরিশোধ করা হয়েছে (Ref: ${duplicate.reference})।`
      );
    }

    const newSal = {
      _id: `sal-${Date.now()}`,
      teacherId: teacher._id,
      teacherCode: teacher.teacherId,
      teacherName: teacher.name,
      month,
      amount: Number(amount) || teacher.fixedSalary,
      method: method || "Bank",
      reference: reference || `SAL-${Date.now().toString().slice(-5)}`,
      paidDate: new Date().toISOString().slice(0, 10),
      status: "Paid",
      note: note || "",
    };

    try {
      await axiosSecure.post("/api/teacher-salaries", newSal);
    } catch {}

    setSalaryPayments((prev) => [newSal, ...prev]);

    recordAudit(
      "SALARY_RECORDED",
      "teacher_salary_payments",
      newSal._id,
      `${month}: অপরিশোধিত`,
      `${teacher.name}-কে ৳${newSal.amount} পরিশোধ করা হয়েছে (${newSal.method} • ${newSal.reference})`
    );

    pushNotification({
      recipientRole: "teacher",
      recipientId: teacher._id,
      type: "SALARY_PAID",
      title: `${MONTH_LABELS_BN[month] || month} মাসের বেতন পরিশোধিত`,
      message: `আপনার ${MONTH_LABELS_BN[month] || month} মাসের ৳${newSal.amount} বেতন ${newSal.method}-এর মাধ্যমে (Ref: ${newSal.reference}) প্রদান করা হয়েছে।`,
    });

    return newSal;
  };

  // ─── 8. STUDENT RESULTS ────────────────────────────────────────────────────
  const saveStudentResult = async (resultData) => {
    const student = students.find((s) => s._id === resultData.studentId);
    const newRes = {
      _id: `res-${Date.now()}`,
      studentId: student?._id || resultData.studentId,
      studentName: student?.name || resultData.studentName,
      admissionId: student?.admissionId || "",
      classProgram: student?.classProgram || "",
      semesterId: student?.semesterId || "sem-2026-2",
      semesterName: student?.semesterName || "দ্বিতীয় সাময়িক সেশন ২০২৬",
      month: resultData.month || selectedMonth,
      subject: resultData.subject,
      marksObtained: Number(resultData.marksObtained),
      totalMarks: Number(resultData.totalMarks) || 100,
      grade: resultData.grade || "মুমতায (A+)",
      attendancePercent: Number(resultData.attendancePercent) || 95,
      monthlyProgressReport: resultData.monthlyProgressReport || "",
      teacherName: resultData.teacherName || "মুফতি তারিকুল ইসলাম",
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setStudentResults((prev) => [newRes, ...prev]);
    pushNotification({
      recipientRole: "guardian",
      recipientId: student?.guardianId || "all",
      type: "RESULT_PUBLISHED",
      title: `ফলাফল ও মাসিক অগ্রগতি প্রতিবেদন প্রকাশিত (${MONTH_LABELS_BN[newRes.month] || newRes.month})`,
      message: `${newRes.studentName} '${newRes.subject}' বিষয়ে ${newRes.marksObtained}/${newRes.totalMarks} (${newRes.grade}) অর্জন করেছে।`,
    });
    return newRes;
  };

  // ─── 9. DASHBOARD SUMMARY COMPUTATION ──────────────────────────────────────
  const getDashboardMetrics = (month = selectedMonth) => {
    const activeStudents = students.filter((s) => s.status === "Active");
    const monthPayments = payments.filter((p) => p.month === month);
    const verifiedMonthPayments = monthPayments.filter((p) => p.status === "Verified");
    const pendingVerificationQueue = payments.filter((p) => p.status === "Pending");

    const paidStudentIds = new Set(verifiedMonthPayments.map((p) => p.studentId));
    const paidStudentsCount = activeStudents.filter((s) => paidStudentIds.has(s._id)).length;
    const pendingStudentsCount = Math.max(0, activeStudents.length - paidStudentsCount);

    const expectedCollection = activeStudents.reduce((sum, s) => sum + Number(s.monthlyFee || 0), 0);
    const verifiedCollection = verifiedMonthPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const pendingAmount = Math.max(0, expectedCollection - verifiedCollection);

    const monthExpenses = expenses.filter((e) => e.month === month);
    const totalMonthlyExpenses = monthExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const netBalance = verifiedCollection - totalMonthlyExpenses;

    const methodBreakdown = ["bKash", "Nagad", "Bank", "Offline"].map((m) => {
      const mPays = verifiedMonthPayments.filter((p) => p.method === m);
      return {
        method: m,
        count: mPays.length,
        total: mPays.reduce((s, p) => s + Number(p.amount || 0), 0),
      };
    });

    const activeTeachers = teachers.filter((t) => t.status === "Active");
    const totalExpectedSalary = activeTeachers.reduce((s, t) => s + Number(t.fixedSalary || 0), 0);
    const monthSalaries = salaryPayments.filter((s) => s.month === month && s.status === "Paid");
    const totalSalaryPaid = monthSalaries.reduce((s, p) => s + Number(p.amount || 0), 0);
    const totalSalaryDue = Math.max(0, totalExpectedSalary - totalSalaryPaid);

    return {
      totalActiveStudents: activeStudents.length,
      paidStudentsCount,
      pendingStudentsCount,
      expectedCollection,
      verifiedCollection,
      pendingAmount,
      totalMonthlyExpenses,
      netBalance,
      methodBreakdown,
      pendingVerificationQueue,
      recentPayments: [...payments].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      ),
      monthExpenses,
      activeTeachersCount: activeTeachers.length,
      paidTeachersCount: monthSalaries.length,
      totalExpectedSalary,
      totalSalaryPaid,
      totalSalaryDue,
    };
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <MadrasaContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        MONTHS,
        MONTH_LABELS_BN,
        settings,
        setSettings,
        semesters,
        addSemester,
        updateSemester,
        guardians,
        addGuardian,
        updateGuardian,
        students,
        addStudent,
        updateStudent,
        feeConfigs,
        addFeeConfig,
        payments,
        submitPayment,
        updatePaymentManually,
        upsertStudentMonthlyPayment,
        verifyOrUpdatePayment,
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        teachers,
        addTeacher,
        updateTeacher,
        salaryPayments,
        payTeacherSalary,
        studentResults,
        saveStudentResult,
        auditLogs,
        recordAudit,
        notifications,
        pushNotification,
        markNotificationRead,
        markAllNotificationsRead,
        getDashboardMetrics,
        backendConnected,
      }}
    >
      {children}
    </MadrasaContext.Provider>
  );
};

export const useMadrasa = () => {
  const context = useContext(MadrasaContext);
  if (!context) {
    throw new Error("useMadrasa must be used within a MadrasaProvider");
  }
  return context;
};
