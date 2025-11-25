import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demonstration
    if (password === 'cosmmus2024' || password === 'admin') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-brand-pink w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Acesso Restrito</h2>
            <p className="text-gray-400 text-sm mt-2">Painel de Gestão Cosmmus</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    placeholder="Senha de acesso"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-pink focus:outline-none transition-colors"
                />
                {error && <p className="text-red-500 text-xs mt-2">Senha incorreta.</p>}
            </div>
            
            <div className="flex gap-4">
                <button type="button" onClick={onCancel} className="flex-1 py-3 text-gray-400 hover:text-white text-sm font-medium">
                    Cancelar
                </button>
                <button type="submit" className="flex-1 bg-brand-pink hover:bg-brand-purple text-white rounded-lg py-3 font-bold transition-colors">
                    Entrar
                </button>
            </div>
        </form>
        <p className="text-center text-xs text-gray-600 mt-8">Dica: a senha é 'admin'</p>
      </div>
    </div>
  );
};

export default AdminLogin;