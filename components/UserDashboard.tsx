
import React, { useState } from 'react';
import { User, UserStats } from '../types';
import { auth } from '../firebaseConfig';
import { signOut, updateProfile, updatePassword } from 'firebase/auth';

interface UserDashboardProps {
  user: User;
  stats: UserStats;
  onUpdateProfile: (name: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, stats, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'history'>('profile');
  const [newName, setNewName] = useState(user.displayName);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.hash = '#/setup';
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setIsUpdating(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      onUpdateProfile(newName);
      setMessage({ text: 'ព័ត៌មានត្រូវបានរក្សាទុក!', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: 'ការរក្សាទុកព័ត៌មានមិនជោគជ័យ', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    if (passwords.new !== passwords.confirm) {
      setMessage({ text: 'លេខសម្ងាត់ថ្មីមិនស៊ីគ្នា!', type: 'error' });
      return;
    }
    setIsUpdating(true);
    try {
      await updatePassword(auth.currentUser, passwords.new);
      setPasswords({ old: '', new: '', confirm: '' });
      setMessage({ text: 'លេខសម្ងាត់ត្រូវបានប្តូរដោយជោគជ័យ!', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: 'កំហុស៖ ' + err.message, type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-8 py-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-4xl font-black border-4 border-white/10">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left space-y-1">
              <h2 className="text-3xl font-black khmer-font">{user.displayName}</h2>
              <p className="text-slate-400 font-medium">{user.email}</p>
            </div>
            <div className="md:ml-auto">
              <button onClick={handleLogout} className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all khmer-font">ចាកចេញ</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          <div className="w-full md:w-64 border-r border-slate-100 p-6 space-y-2">
            {[
              { id: 'profile', label: 'ព័ត៌មានផ្ទាល់ខ្លួន', icon: '👤' },
              { id: 'security', label: 'សុវត្ថិភាពគណនី', icon: '🔒' },
              { id: 'history', label: 'ប្រវត្តិកម្រងសំណួរ', icon: '📜' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl khmer-font font-bold text-sm ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                <span className="text-lg">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-8 md:p-10">
            {message && <div className={`mb-8 p-4 rounded-2xl khmer-font text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>{message.text}</div>}
            
            {activeTab === 'profile' && (
              <form onSubmit={handleUpdateName} className="max-w-md space-y-6">
                <div><h3 className="text-xl font-black text-slate-800 khmer-font mb-2">កែសម្រួលព័ត៌មាន</h3></div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl transition-all outline-none font-bold" />
                </div>
                <button disabled={isUpdating} className="px-8 py-3.5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 active:scale-95 disabled:opacity-50">{isUpdating ? 'រក្សាទុក...' : 'រក្សាទុកការផ្លាស់ប្តូរ'}</button>
              </form>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div><h3 className="text-xl font-black text-slate-800 khmer-font mb-2">ប្តូរលេខសម្ងាត់</h3></div>
                {user.provider === 'google' ? (
                  <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed text-center font-medium"><p className="text-slate-500 khmer-font text-sm">គណនីនេះត្រូវបានភ្ជាប់ជាមួយ Google។</p></div>
                ) : (
                  <form onSubmit={handleResetPassword} className="max-w-md space-y-5">
                    <div className="space-y-2"><label className="text-xs font-black text-slate-400 khmer-font">លេខសម្ងាត់ថ្មី</label><input type="password" required value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl" placeholder="••••••••" /></div>
                    <div className="space-y-2"><label className="text-xs font-black text-slate-400 khmer-font">បញ្ជាក់លេខសម្ងាត់ថ្មី</label><input type="password" required value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl" placeholder="••••••••" /></div>
                    <button disabled={isUpdating} className="w-full py-4 bg-slate-800 text-white font-black rounded-2xl">{isUpdating ? 'កំពុងប្តូរ...' : 'ប្តូរលេខសម្ងាត់ឥឡូវនេះ'}</button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div><h3 className="text-xl font-black text-slate-800 khmer-font mb-2">ប្រវត្តិកម្រងសំណួរ</h3></div>
                {stats.history.length === 0 ? (
                  <div className="py-20 text-center text-slate-400"><p className="khmer-font">មិនទាន់មានប្រវត្តិលំហាត់នៅឡើយទេ</p></div>
                ) : (
                  <div className="grid gap-3">{stats.history.slice().reverse().map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div><h4 className="font-bold text-slate-800 text-sm khmer-font line-clamp-1">{h.chapter}</h4><p className="text-[10px] text-slate-400 font-bold uppercase">{h.subject}</p></div>
                      <span className="text-lg font-black text-indigo-600">{h.score}/{h.totalQuestions}</span>
                    </div>
                  ))}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
