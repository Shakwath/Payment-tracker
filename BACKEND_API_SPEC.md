# Backend Implementation Blueprint (TypeScript + Express + MongoDB + Mongoose)

> **Prompt / Instruction for Backend Agent:**  
> Read this file and [`README.md`](./README.md) to build the complete backend for **Madrasa Payment Tracker**. The React frontend is already 100% built and wired to call these exact endpoints on `http://localhost:5000` (via `VITE_API_URL`).

---

## 1. Recommended Backend Folder Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.ts                  # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middleware.ts     # JWT verification & role guard (admin, guardian, teacher)
│   │   └── validate.middleware.ts # Zod schema validation
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── Guardian.model.ts
│   │   ├── Student.model.ts
│   │   ├── Semester.model.ts
│   │   ├── FeeConfig.model.ts
│   │   ├── Payment.model.ts
│   │   ├── Expense.model.ts
│   │   ├── Teacher.model.ts
│   │   ├── TeacherSalary.model.ts
│   │   ├── StudentResult.model.ts
│   │   ├── AuditLog.model.ts
│   │   ├── Notification.model.ts
│   │   └── SystemSetting.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts         # /api/auth & /api/users
│   │   ├── student.routes.ts      # /api/students
│   │   ├── guardian.routes.ts     # /api/guardians
│   │   ├── semester.routes.ts     # /api/semesters
│   │   ├── fee.routes.ts          # /api/fees
│   │   ├── payment.routes.ts      # /api/payments
│   │   ├── expense.routes.ts      # /api/expenses
│   │   ├── teacher.routes.ts      # /api/teachers
│   │   ├── salary.routes.ts       # /api/teacher-salaries
│   │   ├── result.routes.ts       # /api/results
│   │   ├── dashboard.routes.ts    # /api/dashboard/summary
│   │   ├── report.routes.ts       # /api/reports/*
│   │   ├── audit.routes.ts        # /api/audit-logs
│   │   └── notification.routes.ts # /api/notifications
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

---

## 2. Environment Variables (`.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/madrasa_payment_tracker
JWT_SECRET=super_secret_madrasa_jwt_key_2026
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

## 3. Exact Request & Response Payloads Expected by Frontend

### 3.1 `GET /api/dashboard/summary?month=November%202026`
Used by [`MadrasaContext.jsx`](./src/Context/MadrasaContext.jsx) and [`DashboardOverview.jsx`](./src/Pages/Dashboard/DashboardOverview.jsx).
```json
{
  "success": true,
  "data": {
    "totalActiveStudents": 5,
    "paidStudentsCount": 3,
    "pendingStudentsCount": 2,
    "expectedCollection": 13200,
    "verifiedCollection": 8000,
    "pendingAmount": 5200,
    "totalMonthlyExpenses": 6100,
    "netBalance": 1900,
    "methodBreakdown": [
      { "method": "bKash", "count": 1, "total": 2800 },
      { "method": "Nagad", "count": 0, "total": 0 },
      { "method": "Bank", "count": 1, "total": 3200 },
      { "method": "Offline", "count": 1, "total": 2000 }
    ]
  }
}
```

### 3.2 `POST /api/payments` (Guardian & Admin Offline Submission)
**Request Body sent by Frontend:**
```json
{
  "studentId": "stu-01",
  "studentName": "Abdullah Al Mamun",
  "admissionId": "ADM-2026-101",
  "guardianId": "grd-01",
  "guardianName": "Md. Abdul Karim",
  "semesterId": "sem-2026-2",
  "semesterName": "Autumn Semester 2026 (Term 2)",
  "month": "November 2026",
  "feeType": "Monthly Tuition",
  "amount": 2800,
  "method": "bKash",
  "transactionId": "BKX982341KL",
  "payerInfo": "01712-345678",
  "bankName": "",
  "proofUrl": "",
  "note": "Monthly fee",
  "autoVerify": false,
  "isAdjustment": false
}
```
**Backend Validation Logic:**
1. Check if a payment with `{ studentId, month, feeType, status: { $in: ["Pending", "Verified"] } }` already exists.
2. If it exists and `isAdjustment !== true`, return `400 Bad Request` with `{ message: "Duplicate payment blocked for this student and month." }`.
3. Snapshot the `amount` from the student's active fee configuration at the time of submission.
4. If `autoVerify === true` (Admin direct offline entry), set `status = "Verified"`, `verifiedAt = new Date()`, and generate a unique `receiptNumber` (`RCP-2026-XXXX`).

### 3.3 `POST /api/payments/:id/verify` (Admin Verification & Reconciliation)
**Request Body sent by Frontend:**
```json
{
  "status": "Verified",
  "note": "Verified against bKash statement",
  "amount": 2800
}
```
**Backend Logic:**
1. Update payment `status`, `note`, `amount`, `verifiedAt`, and `verifiedBy`.
2. If `status === "Verified"` and `receiptNumber` is empty, generate `RCP-2026-${random4Digits}`.
3. Insert an entry into `audit_logs`:
   - `action`: `"PAYMENT_VERIFIED"` (or `"PAYMENT_REJECTED"` / `"PAYMENT_REFUNDED/ADJUSTED"`)
   - `entity`: `"payments"`
   - `beforeSummary` & `afterSummary`
4. Insert a notification into `notifications` for `recipientId: payment.guardianId` so the guardian sees the verification/rejection alert immediately.

### 3.4 `POST /api/teacher-salaries` (Teacher Salary Payout)
**Request Body sent by Frontend:**
```json
{
  "teacherId": "tch-01",
  "teacherCode": "TCH-2026-01",
  "teacherName": "Maulana Mufti Tariqul Islam",
  "month": "November 2026",
  "amount": 18000,
  "method": "Bank",
  "reference": "IBBL-SAL-NOV01",
  "paidDate": "2026-11-05",
  "status": "Paid",
  "note": "November salary"
}
```
**Backend Validation Logic:**
1. Check compound uniqueness `{ teacherId, month, status: "Paid" }`.
2. If already paid, return `400 Bad Request` to prevent accidental duplicate salary payout.
3. Log `"SALARY_RECORDED"` in `audit_logs` and notify the teacher in `notifications`.

---

## 4. Mongoose Compound Indexes to Add

```ts
// 1. Prevent duplicate verified/pending monthly payment for same student + month + feeType
PaymentSchema.index(
  { studentId: 1, month: 1, feeType: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["Pending", "Verified"] },
      isAdjustment: { $ne: true }
    }
  }
);

// 2. Prevent duplicate salary payout for same teacher + month
TeacherSalarySchema.index(
  { teacherId: 1, month: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "Paid" }
  }
);
```

