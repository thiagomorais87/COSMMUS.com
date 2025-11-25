import React, { useState } from 'react';
import { Mail, ArrowRight, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [interest, setInterest] = useState('consultoria');

  return (
    <div className="bg-brand-dark py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Narrative Side */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white leading-none">
              Pronto para o <br/>
              <span className="text-brand-pink">próximo nível?</span>
            </h1>
            <p className="text-gray-400 text-xl mb-12 font-light leading-relaxed">
              A transformação começa com uma decisão. Se você está cansado de resultados medianos e quer escalar seu negócio com inteligência, fale conosco.
            </p>

            <div className="space-y-8 border-l border-white/10 pl-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Contato Direto</h3>
                <a href="mailto:contato@cosmmus.com.br" className="text-gray-400 hover:text-brand-cyan transition-colors flex items-center gap-2">
                   contato@cosmmus.com.br
                </a>
                <p className="text-gray-400 mt-1">+55 (11) 99999-9999</p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-1">Base de Operações</h3>
                <p className="text-gray-400">São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>

          {/* Minimal Form */}
          <div className="bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-xs font-bold text-brand-cyan uppercase tracking-widest mb-2">Quem é você</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-brand-pink focus:outline-none transition-colors placeholder-white/20" placeholder="Seu nome" />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-brand-cyan uppercase tracking-widest mb-2">Sua Empresa</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-brand-pink focus:outline-none transition-colors placeholder-white/20" placeholder="Nome do negócio" />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-brand-cyan uppercase tracking-widest mb-2">Contato</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-brand-pink focus:outline-none transition-colors placeholder-white/20" placeholder="E-mail corporativo ou telefone" />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-brand-cyan uppercase tracking-widest mb-2">O Desafio</label>
                <select 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-brand-pink focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option className="bg-brand-dark" value="consultoria">Quero escalar meu negócio</option>
                  <option className="bg-brand-dark" value="plano_negocios">Preciso de um Plano de Negócios</option>
                  <option className="bg-brand-dark" value="financas">Preciso organizar minhas Finanças</option>
                  <option className="bg-brand-dark" value="cooperativa">Gestão para Cooperativas</option>
                  <option className="bg-brand-dark" value="palestra">Palestras e Treinamentos</option>
                </select>
              </div>

              <button type="submit" className="w-full py-5 rounded-full bg-white text-brand-dark font-bold text-lg hover:bg-brand-cyan transition-colors flex justify-center items-center gap-3 group">
                Iniciar Conversa <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;