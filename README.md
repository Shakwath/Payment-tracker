# Madrasa Payment Tracker — Frontend & Backend Integration Guide (SRS Compliant)

This repository contains the complete **React + Tailwind CSS v4 + DaisyUI v5** frontend for the **Madrasa Payment Tracker** built according to the System Design & Software Requirements Specification (SRS).

> **For the Backend Developer / AI Agent:**  
> This `README.md` (along with [`BACKEND_API_SPEC.md`](./BACKEND_API_SPEC.md)) provides the complete specification of **what the backend needs to build** (Node.js + TypeScript + Express + MongoDB/Mongoose + JWT + Zod) so that it connects seamlessly with this frontend out of the box.

---

## 1. How the Frontend Connects to the Backend

- **Base API URL**: Configured in [`src/Hooks/useAxios.jsx`](./src/Hooks/useAxios.jsx) and [`src/Hooks/UseAxiosSecure.jsx`](./src/Hooks/UseAxiosSecure.jsx) via:
  ```env
  VITE_API_URL=http://localhost:5000
  ```
- **JWT Authorization Header**: `UseAxiosSecure.jsx` automatically attaches:
  ```http
  Authorization: Bearer <localStorage.getItem("access-token")>
  ```
- **Central State & API Service**: [`src/Context/MadrasaContext.jsx`](./src/Context/MadrasaContext.jsx) automatically calls `GET /api/dashboard/summary` and hydrates all collections (`/api/students`, `/api/guardians`, `/api/semesters`, `/api/fees`, `/api/payments`, `/api/expenses`, `/api/teachers`, `/api/teacher-salaries`, `/api/audit-logs`, `/api/notifications`) when the backend server is online.
- **Response Format**: The frontend accepts either raw arrays `[...]` OR wrapped objects `{ success: true, data: [...] }`.

---

## 2. Core MongoDB / Mongoose Collections (SRS Section 6)

Create the following **13 Mongoose models** in TypeScript (`createdAt` and `updatedAt` enabled via `{ timestamps: true }`):

### 2.1 `users`
```ts
{
  _id: ObjectId,
  name: string,
  email: string,          // unique
  phone?: string,
  passwordHash?: string,  // bcrypt/argon2 hash
  photoURL?: string,
  role: "admin" | "guardian" | "teacher",
  status: "Active" | "Inactive",
  linkedProfileId?: string // guardianId or teacherId
}
```

### 2.2 `guardians`
```ts
{
  _id: string,
  guardianId: string,        // Unique e.g. "GRD-2026-001"
  name: string,
  phone: string,
  email?: string,
  relation: "Father" | "Mother" | "Legal Guardian",
  address?: string,
  occupation?: string,
  status: "Active" | "Inactive",
  linkedStudentIds: string[] // Array of student _ids (Guardian can manage multiple linked students)
}
```

### 2.3 `students`
```ts
{
  _id: string,
  admissionId: string,       // Unique e.g. "ADM-2026-101"
  name: string,
  classProgram: string,      // e.g. "Hifzul Quran (Level 2)"
  semesterId: string,
  semesterName: string,
  guardianId: string,
  guardianName: string,
  guardianPhone: string,
  admissionDate: string,     // YYYY-MM-DD
  monthlyFee: number,        // Active monthly fee for student
  status: "Active" | "Inactive" | "Graduated",
  photoURL?: string,
  feeHistory: Array<{
    effectiveDate: string,
    amount: number,
    note: string
  }>
}
```

### 2.4 `semesters`
```ts
{
  _id: string,
  name: string,              // e.g. "Autumn Semester 2026 (Term 2)"
  code: string,              // Unique e.g. "AUT-2026"
  academicYear: string,
  startDate: string,         // YYYY-MM-DD
  endDate: string,           // YYYY-MM-DD
  defaultMonthlyFee: number,
  status: "Active" | "Completed" | "Upcoming",
  studentCount?: number
}
```

### 2.5 `fee_configs`
```ts
{
  _id: string,
  scope: "Semester" | "Student",
  targetId: string,          // semesterId or studentId
  targetName: string,
  classProgram: string,
  monthlyAmount: number,
  effectiveDate: string,
  dueDateDay: number,        // e.g. 10
  lateFee: number,           // e.g. 150
  status: "Active" | "Archived"
}
```

### 2.6 `payments` & `payment_receipts`
```ts
{
  _id: string,
  receiptNumber: string,     // Unique when Verified e.g. "RCP-2026-1001", empty when Pending
  studentId: string,
  studentName: string,
  admissionId: string,
  guardianId: string,
  guardianName: string,
  semesterId: string,
  semesterName: string,
  month: string,             // e.g. "November 2026"
  feeType: string,           // e.g. "Monthly Tuition"
  amount: number,            // SNAPSHOT of active fee at payment time (SRS Rule 7 & 15)
  method: "bKash" | "Nagad" | "Bank" | "Offline",
  transactionId: string,     // bKash/Nagad TrxID, Bank Slip Ref, or Offline Ref
  payerInfo: string,         // Sender wallet number or depositor info
  bankName?: string,
  receivedBy?: string,       // Admin/staff name for Offline payments
  proofUrl?: string,         // Uploaded slip/screenshot URL
  status: "Pending" | "Verified" | "Rejected" | "Cancelled" | "Refunded/Adjusted",
  submittedAt: string,       // ISO Date
  verifiedAt?: string | null,
  verifiedBy?: string | null,
  note?: string,
  createdBy?: string,
  updatedBy?: string
}
```
> **Compound Uniqueness Rule (SRS Section 4.4 & 7):**  
> Prevent duplicate `Pending` or `Verified` payments for the same `{ studentId, month, feeType }` unless `isAdjustment: true` is passed by an Admin.

### 2.7 `expenses`
```ts
{
  _id: string,
  title: string,
  category: "utilities" | "food" | "maintenance" | "supplies" | "transport" | "salary" | "rent" | "other",
  month: string,             // e.g. "November 2026"
  amount: number,
  date: string,              // YYYY-MM-DD
  description?: string,
  attachmentUrl?: string,
  createdBy: string,
  isDeleted?: boolean        // Soft delete recommended (SRS Section 7)
}
```

### 2.8 `teachers`
```ts
{
  _id: string,
  teacherId: string,         // Unique e.g. "TCH-2026-01"
  name: string,
  phone: string,
  email?: string,
  address?: string,
  subjects: string[],        // One or more subjects
  assignedClasses: string[],
  fixedSalary: number,       // Fixed monthly salary
  joiningDate: string,
  status: "Active" | "Inactive",
  photoURL?: string
}
```

### 2.9 `teacher_salary_payments`
```ts
{
  _id: string,
  teacherId: string,
  teacherCode: string,
  teacherName: string,
  month: string,             // e.g. "November 2026"
  amount: number,
  method: "Bank" | "bKash" | "Nagad" | "Cash",
  reference: string,
  paidDate: string,          // YYYY-MM-DD
  status: "Paid" | "Unpaid",
  note?: string
}
```
> **Compound Uniqueness Rule (SRS Section 4.8):**  
> Prevent accidental duplicate salary payment for the same `{ teacherId, month }` where `status === "Paid"`.

### 2.10 `student_results` (SRS Section 3.2, 4.3, 12)
```ts
{
  _id: string,
  studentId: string,
  studentName: string,
  admissionId: string,
  classProgram: string,
  semesterId: string,
  semesterName: string,
  month: string,
  subject: string,
  marksObtained: number,
  totalMarks: number,
  grade: string,
  attendancePercent: number,
  monthlyProgressReport: string,
  teacherName: string,
  updatedAt: string
}
```

### 2.11 `audit_logs`
```ts
{
  _id: string,
  actor: string,             // e.g. "Admin (Zabed)"
  role: string,
  action: string,            // e.g. "PAYMENT_VERIFIED", "EXPENSE_ADDED", "SALARY_RECORDED"
  entity: string,            // e.g. "payments", "expenses", "students"
  entityId: string,
  beforeSummary: string,
  afterSummary: string,
  timestamp: string          // ISO Date
}
```

### 2.12 `notifications`
```ts
{
  _id: string,
  recipientRole: "all" | "admin" | "guardian" | "teacher",
  recipientId: string,       // "all" or specific guardianId / teacherId
  type: string,              // "PAYMENT_VERIFIED" | "PAYMENT_REJECTED" | "ANNOUNCEMENT" | "SALARY_PAID"
  title: string,
  message: string,
  read: boolean,
  createdAt: string
}
```

---

## 3. Required REST API Endpoints (SRS Section 8)

| Module | Method & Endpoint | Description & Expected Behavior |
| :--- | :--- | :--- |
| **Auth** | `POST /api/users/register` | Creates or syncs user on SignUp / Google / GitHub Firebase login (`{ name, email, photoURL }`) and returns `{ token, user }` where `user.role` is resolved from the admin-assigned email-to-role directory (`"admin" \| "guardian" \| "teacher"`). |
| **Auth** | `POST /api/auth/login` | Authenticates Firebase `{ email, uid }`, resolves role by email, returns `{ token, user }`. |
| **User Roles** | `GET /api/user-roles` | Returns all email-to-role mappings (`[{ email, role, name, linkedId, updatedAt }]`). |
| **User Roles** | `POST /api/user-roles` | Admin assigns or updates which role (`"admin" \| "guardian" \| "teacher"`) a Firebase email address receives (`{ email, role, name, linkedId }`). |
| **User Roles** | `DELETE /api/user-roles/:email` | Admin removes an email-to-role assignment. |
| **Auth** | `POST /api/auth/refresh` | Refreshes JWT token. |
| **Auth** | `POST /api/auth/forgot-password` | Accepts `{ email }`, dispatches password reset instruction. |
| **Students** | `GET /api/students` | Returns array of all students (supports optional `?search=&semesterId=&status=`). |
| **Students** | `POST /api/students` | Creates a new student, links to guardian, logs `STUDENT_CREATED` in `audit_logs`. |
| **Students** | `PATCH /api/students/:id` | Updates student profile/status/fee. If `monthlyFee` changes, appends to `feeHistory` and logs in `audit_logs`. |
| **Guardians** | `GET /api/guardians` | Returns array of all guardians. |
| **Guardians** | `POST /api/guardians` | Creates a new guardian profile. |
| **Guardians** | `PATCH /api/guardians/:id` | Updates guardian details or `linkedStudentIds`. |
| **Semesters** | `GET /api/semesters` | Returns all academic semesters. |
| **Semesters** | `POST /api/semesters` | Creates a new semester. |
| **Semesters** | `PATCH /api/semesters/:id` | Updates semester dates, fee, or status. |
| **Fees** | `GET /api/fees` | Returns all semester-wise and student-wise `fee_configs`. |
| **Fees** | `POST /api/fees` | Creates a new fee configuration rule. |
| **Fees** | `PATCH /api/fees/:id` | Updates a fee rule. |
| **Payments** | `GET /api/payments` | Returns all payments (supports `?month=&method=&status=&studentId=`). |
| **Payments** | `POST /api/payments` | Submits a payment. Enforces compound uniqueness (`studentId + month + feeType`) unless `isAdjustment: true`. If `autoVerify: true` (Admin offline entry), sets `status: "Verified"` and generates `receiptNumber`. |
| **Payments** | `POST /api/payments/:id/verify` | Body: `{ status: "Verified" \| "Rejected" \| "Refunded/Adjusted", note, amount }`. Generates unique `receiptNumber` (`RCP-2026-XXXX`) if Verified, creates an `audit_logs` entry, and creates a `notifications` entry for the guardian. |
| **Expenses** | `GET /api/expenses` | Returns all non-deleted expenses. |
| **Expenses** | `POST /api/expenses` | Creates an expense voucher and logs `EXPENSE_ADDED` in `audit_logs`. |
| **Expenses** | `PATCH /api/expenses/:id` | Updates expense and logs `EXPENSE_UPDATED` in `audit_logs`. |
| **Expenses** | `DELETE /api/expenses/:id` | Soft-deletes expense (`isDeleted: true`) and logs `EXPENSE_DELETED` in `audit_logs`. |
| **Teachers** | `GET /api/teachers` | Returns all teachers. |
| **Teachers** | `POST /api/teachers` | Creates a teacher profile. |
| **Teachers** | `PATCH /api/teachers/:id` | Updates teacher subjects, fixedSalary, or status. |
| **Salaries** | `GET /api/teacher-salaries` | Returns all monthly salary disbursement records. |
| **Salaries** | `POST /api/teacher-salaries` | Disburses salary for `{ teacherId, month }`. Blocks duplicate payout for same teacher & month. Logs in `audit_logs` & notifies teacher. |
| **Results** | `GET /api/results` | Returns student academic results & monthly progress reports. |
| **Results** | `POST /api/results` | Teacher publishes student marks, grade, attendance, and monthly progress report. |
| **Dashboard** | `GET /api/dashboard/summary` | Returns calculated summary metrics for `?month=` (Active students, paid/pending count, expected collection, verified collection, pending amount, monthly expenses, net balance, method breakdown). |
| **Reports** | `GET /api/reports/monthly-payments` | Returns monthly payment report data. |
| **Reports** | `GET /api/reports/expenses` | Returns monthly expense report data. |
| **Reports** | `GET /api/reports/summary` | Returns income vs expense & method breakdown report. |
| **Audit** | `GET /api/audit-logs` | Returns immutable administrative audit logs sorted by newest first. |
| **Notifications**| `GET /api/notifications` | Returns notifications & announcements. |
| **Notifications**| `POST /api/notifications` | Broadcasts a new announcement/notice. |

---

## 4. Important Business Logic Rules for Backend (SRS Section 15)

1. **Snapshot Fee Rule**: Keep `amount` as a snapshot in the `payments` record at the time of payment so later changes to `students.monthlyFee` or `fee_configs` never alter historical payment totals.
2. **Verified Collection Calculation**: `verifiedCollection` must sum **only** payments where `status === "Verified"`. `Pending` and `Rejected` payments must never increase `verifiedCollection`.
3. **Pending Amount Calculation**: `pendingAmount = Math.max(0, expectedCollection - verifiedCollection)`.
4. **Net Balance Calculation**: `netBalance = verifiedCollection - totalMonthlyExpenses`.
5. **Never Hard-Delete Financial Records**: Use status changes (`Cancelled`, `Refunded/Adjusted`) or soft deletion (`isDeleted: true`) with an automatic entry in `audit_logs`.

