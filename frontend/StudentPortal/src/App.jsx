import React, { useState, useEffect } from 'react';
import { studentService } from './services/studentService';
import { UserPlus, Trash2, Edit2, GraduationCap, Mail, BookOpen, Hash } from 'lucide-react';

const App = () => {
    const [students, setStudents] = useState([]);
    // Added rollNo to the state
    const [formData, setFormData] = useState({ rollNo: '', name: '', email: '', course: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { loadStudents(); }, []);

    const loadStudents = async () => {
        const res = await studentService.getAll();
        setStudents(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await studentService.update(editingId, formData);
        } else {
            await studentService.create(formData);
        }
        setFormData({ rollNo: '', name: '', email: '', course: '' });
        setEditingId(null);
        loadStudents();
    };

    const handleEdit = (student) => {
        setEditingId(student.id);
        setFormData({
            rollNo: student.rollNo,
            name: student.name,
            email: student.email,
            course: student.course
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this record?")) {
            await studentService.delete(id);
            loadStudents();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-800 flex justify-center items-center gap-3">
                    <GraduationCap size={40} className="text-indigo-600" />
                    Student Management System
                </h1>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Form Section */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold mb-6 text-slate-700">
                        {editingId ? 'Update Student' : 'Register Student'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New Roll No Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Roll Number</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><Hash size={18}/></span>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="e.g. 101"
                                    value={formData.rollNo}
                                    onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><UserPlus size={18}/></span>
                                <input
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><Mail size={18}/></span>
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="john@university.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Course</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><BookOpen size={18}/></span>
                                <input
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    placeholder="Computer Science"
                                    value={formData.course}
                                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                                    required
                                />
                            </div>
                        </div>

                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-200">
                            {editingId ? 'Save Changes' : 'Add Student'}
                        </button>
                    </form>
                </div>

                {/* Table Section */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Roll No</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Student Details</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase">Course</th>
                            <th className="px-6 py-4 text-sm font-semibold uppercase text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-indigo-50 transition">
                                <td className="px-6 py-4">
                    <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                      #{student.rollNo}
                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800">{student.name}</div>
                                    <div className="text-xs text-slate-500">{student.email}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">{student.course}</td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button onClick={() => handleEdit(student)} className="text-blue-500 hover:text-blue-700 transition">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(student.id)} className="text-red-400 hover:text-red-600 transition">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {students.length === 0 && (
                        <div className="p-20 text-center text-slate-400 italic">Database is currently empty.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;