import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Check, 
  X, 
  ShieldCheck, 
  UserCheck, 
  Download,
  Building,
  MoreVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeaderBar } from '../components/HeaderBar';
import type { UserProfile } from '../types';

export const EmployeeManagementScreen: React.FC = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, currentUser, switchUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('Semua');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [formNik, setFormNik] = useState('');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formDept, setFormDept] = useState('Technology & Product');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formJoinDate, setFormJoinDate] = useState('05 Okt 2026');
  const [formLeaveBalance, setFormLeaveBalance] = useState(12);
  const [formIsSupervisor, setFormIsSupervisor] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const departments = ['Semua', 'Technology & Product', 'Marketing & Growth', 'People Operations', 'Finance & Accounting'];

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'Semua' || emp.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormNik(`EMP-${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`);
    setFormName('');
    setFormRole('');
    setFormDept('Technology & Product');
    setFormEmail('');
    setFormPhone('');
    setFormJoinDate('05 Okt 2026');
    setFormLeaveBalance(12);
    setFormIsSupervisor(false);
    setModalOpen(true);
  };

  const handleOpenEditModal = (emp: UserProfile) => {
    setEditingId(emp.id);
    setFormNik(emp.nik);
    setFormName(emp.name);
    setFormRole(emp.role);
    setFormDept(emp.department);
    setFormEmail(emp.email);
    setFormPhone(emp.phone);
    setFormJoinDate(emp.joinDate);
    setFormLeaveBalance(emp.leaveBalance);
    setFormIsSupervisor(emp.isSupervisor);
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formNik || !formRole) return;

    if (editingId) {
      updateEmployee(editingId, {
        nik: formNik,
        name: formName,
        role: formRole,
        department: formDept,
        email: formEmail,
        phone: formPhone,
        leaveBalance: Number(formLeaveBalance),
        isSupervisor: formIsSupervisor,
      });
      setFeedbackNotice(`Data karyawan ${formName} berhasil diperbarui!`);
    } else {
      addEmployee({
        nik: formNik,
        name: formName,
        role: formRole,
        department: formDept,
        email: formEmail || `${formName.toLowerCase().replace(/\s+/g, '.')}@company.com`,
        phone: formPhone || '0812-0000-0000',
        joinDate: formJoinDate,
        leaveBalance: Number(formLeaveBalance),
        avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + (employees.length * 1000)}?auto=format&fit=crop&w=250&q=80`,
        isSupervisor: formIsSupervisor,
      });
      setFeedbackNotice(`Karyawan baru ${formName} berhasil ditambahkan!`);
    }

    setModalOpen(false);
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (employees.length <= 1) {
      alert('Minimal harus tersisa 1 data karyawan di sistem.');
      return;
    }
    if (window.confirm(`Yakin ingin menghapus data karyawan "${name}"?`)) {
      deleteEmployee(id);
      setFeedbackNotice(`Data karyawan ${name} telah dihapus.`);
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  const handleExportEmployees = () => {
    const headers = 'ID,NIK,Nama Lengkap,Departemen,Jabatan,Email,Telepon,Sisa Cuti,Supervisor\n';
    const rows = employees
      .map(e => `"${e.id}","${e.nik}","${e.name}","${e.department}","${e.role}","${e.email}","${e.phone}","${e.leaveBalance}","${e.isSupervisor ? 'Ya' : 'Tidak'}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-karyawan-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 w-full max-w-5xl mx-auto text-slate-800 dark:text-slate-100">
      <HeaderBar 
        title="Manajemen Karyawan" 
        backTo="supervisor"
        rightAction={
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95 cursor-pointer"
          >
            <UserPlus size={15} />
            <span className="hidden sm:inline">+ Tambah Karyawan</span>
            <span className="sm:hidden">+ Tambah</span>
          </button>
        }
      />

      <div className="px-3.5 sm:px-6 pt-4 space-y-4">
        {/* Toast Notice */}
        {feedbackNotice && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-2xl flex items-center gap-2 shadow-xs animate-in fade-in">
            <Check size={16} className="text-emerald-600 shrink-0" />
            <span>{feedbackNotice}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Karyawan</span>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{employees.length} Orang</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-blue-500">Tech & Product</span>
            <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
              {employees.filter(e => e.department.includes('Technology')).length} Orang
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-purple-500">Supervisor / Lead</span>
            <p className="text-xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
              {employees.filter(e => e.isSupervisor).length} Orang
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Export CSV</span>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Download Data</p>
            </div>
            <button
              onClick={handleExportEmployees}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition"
              title="Download Data Karyawan (CSV)"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, NIK, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter size={14} className="text-slate-400 shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-700 dark:text-slate-300 outline-hidden"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee List */}
        <div className="space-y-2.5">
          {filteredEmployees.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200/80 dark:border-slate-800">
              <Users size={36} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada data karyawan ditemukan</p>
              <p className="text-xs text-slate-400 mt-1">Coba kata kunci pencarian lain atau tambah karyawan baru.</p>
            </div>
          ) : (
            filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/20 shrink-0">
                    <img src={emp.avatarUrl} alt={emp.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                        {emp.name}
                      </h4>
                      {emp.isSupervisor && (
                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 shrink-0">
                          Supervisor
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {emp.nik} • {emp.role}
                    </p>
                    <span className="inline-block text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full mt-1 truncate">
                      {emp.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right text-[11px] text-slate-500">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Cuti: {emp.leaveBalance} Hari</p>
                    <p className="text-[10px] text-slate-400">{emp.phone}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(emp)}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
                      title="Edit Data Karyawan"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id, emp.name)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition cursor-pointer"
                      title="Hapus Karyawan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Tambah / Edit Karyawan */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 rounded-xl">
                  <UserPlus size={18} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {editingId ? 'Edit Data Karyawan' : 'Tambah Karyawan Baru'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">NIK</label>
                  <input
                    type="text"
                    required
                    value={formNik}
                    onChange={(e) => setFormNik(e.target.value)}
                    className="w-full text-xs font-mono font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rahmat Hidayat"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Departemen</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden"
                  >
                    <option value="Technology & Product">Technology & Product</option>
                    <option value="Marketing & Growth">Marketing & Growth</option>
                    <option value="People Operations">People Operations</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Operations & Support">Operations & Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Jabatan / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Backend Engineer"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Email Perusahaan</label>
                  <input
                    type="email"
                    placeholder="nama@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Nomor WhatsApp / HP</label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Jatah Cuti Tahunan (Hari)</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formLeaveBalance}
                    onChange={(e) => setFormLeaveBalance(Number(e.target.value))}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={formIsSupervisor}
                      onChange={(e) => setFormIsSupervisor(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Role Supervisor / Manager</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambahkan Karyawan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
