import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, RefreshCcw, LogOut, Layout, Briefcase, FileText, Folder, Cloud, HardDrive, Wifi, AlertTriangle } from 'lucide-react';
import { ViewState } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
  onExit: () => void;
}

type Tab = 'hero' | 'services' | 'blog' | 'cases';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onExit }) => {
  const { content, updateContent, resetToDefaults, storageType } = useContent();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Local state handling for form inputs before committing to context
  // Note: For simplicity in this demo, we are editing directly, but in a larger app we might use local state buffers.
  
  const handleSave = () => {
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleServiceChange = (index: number, field: string, value: any) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    updateContent('services', newServices);
  };

  const handleFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
      const newServices = [...content.services];
      const newFeatures = [...newServices[serviceIndex].features];
      newFeatures[featureIndex] = value;
      newServices[serviceIndex] = { ...newServices[serviceIndex], features: newFeatures };
      updateContent('services', newServices);
  }

  const handleBlogChange = (index: number, field: string, value: any) => {
    const newBlog = [...content.blog];
    newBlog[index] = { ...newBlog[index], [field]: value };
    updateContent('blog', newBlog);
  };

  const handleCaseChange = (index: number, field: string, value: any) => {
    const newCases = [...content.cases];
    newCases[index] = { ...newCases[index], [field]: value };
    updateContent('cases', newCases);
  };

  const InputClass = "w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-white focus:border-brand-pink focus:outline-none mb-4";
  const LabelClass = "block text-xs uppercase tracking-wider text-brand-cyan mb-1 font-bold";

  return (
    <div className="min-h-screen bg-brand-navy text-white flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-brand-dark border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-white">Cosmmus <span className="text-brand-pink">Admin</span></h2>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'hero' ? 'bg-brand-pink text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Layout size={18} /> Hero & Stats
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'services' ? 'bg-brand-pink text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Briefcase size={18} /> Serviços
          </button>
          <button 
            onClick={() => setActiveTab('cases')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'cases' ? 'bg-brand-pink text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Folder size={18} /> Cases
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'blog' ? 'bg-brand-pink text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <FileText size={18} /> Blog
          </button>
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-3">
            <button onClick={resetToDefaults} className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 w-full px-2">
                <RefreshCcw size={14} /> Resetar Tudo
            </button>
            <button onClick={onExit} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white w-full px-2">
                <LogOut size={14} /> Voltar ao Site
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <h3 className="font-bold text-lg capitalize">{activeTab} Edit</h3>
                
                {/* Storage Indicator */}
                <div 
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        storageType === 'cloud' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 cursor-help'
                    }`}
                    title={storageType === 'local' ? "Conectado apenas localmente. Verifique as Regras de Segurança no Console do Firebase se quiser salvar na nuvem." : "Conectado ao Firebase"}
                >
                    {storageType === 'cloud' ? <Cloud size={12} /> : <HardDrive size={12} />}
                    {storageType === 'cloud' ? 'NUVEM CONECTADA' : 'MODO LOCAL'}
                </div>
                
                {storageType === 'local' && (
                    <div className="hidden md:flex items-center text-xs text-yellow-500 gap-1 bg-yellow-500/10 px-2 py-1 rounded">
                        <AlertTriangle size={10} />
                        <span>Verifique as Permissões do Firebase</span>
                    </div>
                )}
            </div>

            <button onClick={handleSave} className="bg-brand-cyan text-brand-dark px-6 py-2 rounded-full font-bold hover:bg-white transition-colors flex items-center gap-2">
                <Save size={18} /> {saveStatus === 'saved' ? 'Salvo!' : 'Salvar Alterações'}
            </button>
        </header>

        <div className="p-8 max-w-4xl">
            
            {activeTab === 'hero' && (
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h4 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">Conteúdo Principal</h4>
                        <div>
                            <label className={LabelClass}>Badge</label>
                            <input type="text" className={InputClass} value={content.hero.badge} onChange={(e) => updateContent('hero', {...content.hero, badge: e.target.value})} />
                        </div>
                        <div>
                            <label className={LabelClass}>Título Linha 1</label>
                            <input type="text" className={InputClass} value={content.hero.titleLine1} onChange={(e) => updateContent('hero', {...content.hero, titleLine1: e.target.value})} />
                        </div>
                        <div>
                            <label className={LabelClass}>Título Linha 2 (Gradiente)</label>
                            <input type="text" className={InputClass} value={content.hero.titleLine2} onChange={(e) => updateContent('hero', {...content.hero, titleLine2: e.target.value})} />
                        </div>
                        <div>
                            <label className={LabelClass}>Subtítulo</label>
                            <textarea className={`${InputClass} h-24`} value={content.hero.subtitle} onChange={(e) => updateContent('hero', {...content.hero, subtitle: e.target.value})} />
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/5 grid grid-cols-2 gap-6">
                         <h4 className="text-xl font-bold mb-2 text-white border-b border-white/10 pb-2 col-span-2">Estatísticas</h4>
                         <div>
                            <label className={LabelClass}>Valor 1</label>
                            <input type="text" className={InputClass} value={content.hero.stat1Value} onChange={(e) => updateContent('hero', {...content.hero, stat1Value: e.target.value})} />
                            <label className={LabelClass}>Rótulo 1</label>
                            <input type="text" className={InputClass} value={content.hero.stat1Label} onChange={(e) => updateContent('hero', {...content.hero, stat1Label: e.target.value})} />
                         </div>
                         <div>
                            <label className={LabelClass}>Valor 2</label>
                            <input type="text" className={InputClass} value={content.hero.stat2Value} onChange={(e) => updateContent('hero', {...content.hero, stat2Value: e.target.value})} />
                            <label className={LabelClass}>Rótulo 2</label>
                            <input type="text" className={InputClass} value={content.hero.stat2Label} onChange={(e) => updateContent('hero', {...content.hero, stat2Label: e.target.value})} />
                         </div>
                         <div>
                            <label className={LabelClass}>Valor 3</label>
                            <input type="text" className={InputClass} value={content.hero.stat3Value} onChange={(e) => updateContent('hero', {...content.hero, stat3Value: e.target.value})} />
                            <label className={LabelClass}>Rótulo 3</label>
                            <input type="text" className={InputClass} value={content.hero.stat3Label} onChange={(e) => updateContent('hero', {...content.hero, stat3Label: e.target.value})} />
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div className="space-y-8">
                    {content.services.map((service, idx) => (
                        <div key={service.id} className="bg-white/5 p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                <h4 className="font-bold text-white">Serviço #{idx + 1}</h4>
                                <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">ID: {service.id}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LabelClass}>Título</label>
                                    <input type="text" className={InputClass} value={service.title} onChange={(e) => handleServiceChange(idx, 'title', e.target.value)} />
                                </div>
                                <div>
                                    <label className={LabelClass}>Ícone (Nome)</label>
                                    <select className={InputClass} value={service.iconName} onChange={(e) => handleServiceChange(idx, 'iconName', e.target.value)}>
                                        <option value="Briefcase">Briefcase</option>
                                        <option value="Users">Users</option>
                                        <option value="TrendingUp">TrendingUp</option>
                                        <option value="Leaf">Leaf</option>
                                        <option value="Calculator">Calculator</option>
                                        <option value="GraduationCap">GraduationCap</option>
                                    </select>
                                </div>
                            </div>
                            
                            <label className={LabelClass}>Descrição</label>
                            <textarea className={`${InputClass} h-20`} value={service.description} onChange={(e) => handleServiceChange(idx, 'description', e.target.value)} />

                            <label className={LabelClass}>Características</label>
                            <div className="space-y-2">
                                {service.features.map((feat, fIdx) => (
                                    <input key={fIdx} type="text" className={InputClass} value={feat} onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'cases' && (
                <div className="space-y-8">
                    {content.cases.map((item, idx) => (
                        <div key={item.id} className="bg-white/5 p-6 rounded-xl border border-white/5">
                             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                <h4 className="font-bold text-white">Case #{idx + 1}</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LabelClass}>Título</label>
                                    <input type="text" className={InputClass} value={item.title} onChange={(e) => handleCaseChange(idx, 'title', e.target.value)} />
                                </div>
                                <div>
                                    <label className={LabelClass}>Categoria</label>
                                    <input type="text" className={InputClass} value={item.category} onChange={(e) => handleCaseChange(idx, 'category', e.target.value)} />
                                </div>
                            </div>
                             <label className={LabelClass}>URL da Imagem</label>
                             <input type="text" className={InputClass} value={item.img} onChange={(e) => handleCaseChange(idx, 'img', e.target.value)} />
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'blog' && (
                <div className="space-y-8">
                    {content.blog.map((post, idx) => (
                        <div key={post.id} className="bg-white/5 p-6 rounded-xl border border-white/5">
                             <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                                <h4 className="font-bold text-white">Post #{idx + 1}</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LabelClass}>Título</label>
                                    <input type="text" className={InputClass} value={post.title} onChange={(e) => handleBlogChange(idx, 'title', e.target.value)} />
                                </div>
                                <div>
                                    <label className={LabelClass}>Categoria</label>
                                    <input type="text" className={InputClass} value={post.category} onChange={(e) => handleBlogChange(idx, 'category', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LabelClass}>Data</label>
                                    <input type="text" className={InputClass} value={post.date} onChange={(e) => handleBlogChange(idx, 'date', e.target.value)} />
                                </div>
                            </div>
                             <label className={LabelClass}>Resumo</label>
                             <textarea className={`${InputClass} h-20`} value={post.excerpt} onChange={(e) => handleBlogChange(idx, 'excerpt', e.target.value)} />
                        </div>
                    ))}
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;