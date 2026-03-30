import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface CasePageProps {
  caseId: string;
  onBack: () => void;
}

const CasePage: React.FC<CasePageProps> = ({ caseId, onBack }) => {
  const { content } = useContent();
  const caseItem = content.cases.find(c => c.id === caseId);

  if (!caseItem) return null;

  return (
    <div className="container mx-auto px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[150px] opacity-20"></div>
      </div>

      <button 
        onClick={onBack}
        className="flex items-center text-brand-purple hover:text-brand-pink transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Voltar para Cases
      </button>

      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 w-full text-center flex flex-col items-center"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-brand-cyan/10 backdrop-blur-md border border-brand-cyan/20 px-4 py-2 rounded-full">
                <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-[0.2em] leading-none">{caseItem.category}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">{caseItem.title}</h1>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video w-full relative z-10 hover:scale-[1.01] transition-all duration-700 ease-out shadow-brand-purple/20">
            <img 
              src={caseItem.img} 
              alt={caseItem.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
            <div className="bg-brand-surface/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-brand-purple mb-3 flex items-center">
                  <span className="w-8 h-1 bg-brand-purple mr-3 rounded-full"></span>
                  Desafio Inicial
                </h2>
                <p className="text-gray-300 leading-relaxed">{caseItem.challenge}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-brand-purple mb-3 flex items-center">
                  <span className="w-8 h-1 bg-brand-purple mr-3 rounded-full"></span>
                  Estratégia Aplicada
                </h2>
                <p className="text-gray-300 leading-relaxed">{caseItem.strategy}</p>
              </div>
            </div>

            <div className="bg-brand-surface/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl">
              <h2 className="text-xl font-semibold text-brand-pink mb-6">Resultados e Indicadores</h2>
              <div className="grid grid-cols-1 gap-4">
                {caseItem.results.map((result, index) => (
                  <div key={index} className="flex items-start p-4 bg-white/5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-4 flex-shrink-0 mt-1" />
                    <span className="text-gray-200 font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative p-8 md:p-12 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-3xl">
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-brand-pink/40" />
            <p className="text-2xl italic text-gray-100 leading-relaxed mb-8">
              "{caseItem.testimony}"
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-purple flex items-center justify-center text-2xl font-bold mb-4">
                {caseItem.author.charAt(0)}
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-lg">{caseItem.author}</p>
                <p className="text-sm text-brand-pink uppercase tracking-widest">Cliente Satisfeito</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CasePage;
