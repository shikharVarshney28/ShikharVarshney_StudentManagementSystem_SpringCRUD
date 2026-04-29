import React, { useState, useEffect } from 'react';
import { studentService } from './services/studentService';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, Edit2, GraduationCap, Mail, BookOpen, Hash, Sparkles } from 'lucide-react';

const App = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ rollNo: '', name: '', email: '', course: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { loadStudents(); }, []);

    const loadStudents = async () => {
        try {
            const res = await studentService.getAll();
            setStudents(res.data);
        } catch (err) { console.error("Failed to load students", err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            editingId ? await studentService.update(editingId, formData) : await studentService.create(formData);
            setFormData({ rollNo: '', name: '', email: '', course: '' });
            setEditingId(null);
            loadStudents();
        } catch (err) { alert("Operation failed. Check backend console."); }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-10 selection:bg-indigo-500/30">
            {/* Animated Background Blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Simplified Header */}
            <header className="max-w-6xl mx-auto mb-12 text-center md:text-left">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent flex items-center justify-center md:justify-start gap-4">
                        <GraduationCap size={48} className="text-indigo-400" />
                        Nexus Edu
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium tracking-wide">Next-Gen Student Management System</p>
                </motion.div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={40}/></div>
                    <h2 className="text-2xl font-bold mb-8 text-white">
                        {editingId ? 'Modify Record' : 'Quick Register'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { label: 'Roll Number', key: 'rollNo', icon: <Hash size={18}/>, type: 'text' },
                            { label: 'Full Name', key: 'name', icon: <UserPlus size={18}/>, type: 'text' },
                            { label: 'Email', key: 'email', icon: <Mail size={18}/>, type: 'email' },
                            { label: 'Course', key: 'course', icon: <BookOpen size={18}/>, type: 'text' },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{field.label}</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">{field.icon}</span>
                                    <input
                                        type={field.type}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition duration-300"
                                        value={formData[field.key]}
                                        onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition duration-300 transform hover:scale-[1.02] active:scale-95">
                            {editingId ? 'Update Identity' : 'Securely Enroll'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {setEditingId(null); setFormData({rollNo:'', name:'', email:'', course:''});}}
                                className="w-full mt-2 text-slate-400 hover:text-white text-sm transition"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </motion.div>

                {/* List Section */}
                <div className="lg:col-span-8 space-y-4">
                    <AnimatePresence mode='popLayout'>
                        {students.map((student) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={student.id}
                                className="group bg-slate-800/20 hover:bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-5 rounded-2xl flex items-center justify-between transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg">
                                        {student.name ? student.name.charAt(0) : '?'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-white">{student.name}</h3>
                                            <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded uppercase">
                        ROLL: {student.rollNo}
                      </span>
                                        </div>
                                        <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                                            <Mail size={14}/> {student.email}
                                        </p>
                                        <p className="text-indigo-400 text-xs font-semibold mt-1 uppercase tracking-widest">{student.course}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setEditingId(student.id); setFormData(student); }}
                                        className="p-3 bg-slate-700/50 hover:bg-indigo-600 rounded-xl transition text-white shadow-lg"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => studentService.delete(student.id).then(loadStudents)}
                                        className="p-3 bg-slate-700/50 hover:bg-red-600 rounded-xl transition text-white shadow-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {students.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-64 border-2 border-dashed border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-500"
                        >
                            <p className="text-lg font-medium">Registry Empty</p>
                            <p className="text-sm italic">Add your first student to get started.</p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;