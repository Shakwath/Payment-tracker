import { useState } from "react";
import { TrendingDown, Plus, Search, Calendar, FileSpreadsheet, X } from "lucide-react";
import { INITIAL_EXPENSES } from "../../../data/mockData";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newExpense, setNewExpense] = useState({
    title: "",
    category: "Utilities",
    amount: 5000,
    date: new Date().toISOString().split("T")[0],
  });

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.voucherId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExpense = (e) => {
    e.preventDefault();
    const created = {
      id: `EXP-${500 + expenses.length + 1}`,
      voucherId: `VCH-2026-${0 + expenses.length + 84}`,
      title: newExpense.title,
      category: newExpense.category,
      amount: Number(newExpense.amount) || 0,
      date: newExpense.date,
      approvedBy: "Zabed (Admin)",
      status: "Approved",
    };
    setExpenses([created, ...expenses]);
    setIsAddModalOpen(false);
    setNewExpense({ title: "", category: "Utilities", amount: 5000, date: new Date().toISOString().split("T")[0] });
  };

  const totalExpenseAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase mb-1">
            <TrendingDown className="h-4 w-4" />
            <span>Finance & Expenditure</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Institutional Expenses</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Record operational costs, lab maintenance, utility bills, and approved voucher logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-right">
            <p className="text-[10px] font-mono uppercase text-rose-500 font-bold">Total Expenditures</p>
            <p className="text-xl font-black text-rose-500 font-mono">৳ {totalExpenseAmount.toLocaleString()}</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
          >
            <Plus className="h-4 w-4" />
            <span>New Expense Voucher</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search expenses by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">Voucher Ref</th>
                <th className="py-4 px-6">Expense Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Approved By</th>
                <th className="py-4 px-6 text-right">Amount (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="py-4 px-6 font-mono font-bold text-primary">{exp.voucherId}</td>
                  <td className="py-4 px-6 font-bold text-base-content">{exp.title}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-base-content">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-base-content/70">{exp.date}</td>
                  <td className="py-4 px-6 font-medium text-base-content">{exp.approvedBy}</td>
                  <td className="py-4 px-6 text-right font-mono font-black text-rose-500 text-sm">
                    ৳ {exp.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-extrabold text-base-content">Record Expense Voucher</h3>
            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Generator Fuel & Maintenance"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  >
                    <option value="Utilities">Utilities</option>
                    <option value="Lab Supplies">Lab Supplies</option>
                    <option value="IT & Infrastructure">IT & Infrastructure</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Office Supplies">Office Supplies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Amount (৳)</label>
                  <input
                    type="number"
                    required
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Voucher Date</label>
                <input
                  type="date"
                  required
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-base-content/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
                >
                  Save Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
