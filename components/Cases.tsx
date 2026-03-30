import React from 'react';
import { useContent } from '../context/ContentContext';

interface CasesProps {
  onViewCase?: (id: string) => void;
}

const Cases: React.FC<CasesProps> = ({ onViewCase }) => {
  const { content } = useContent();
  const { cases } = content;

  return (
    <div className="bg-transparent py-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-brand-pink/5 rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-center">Cases e Projetos</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
          {cases.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer relative"
              onClick={() => onViewCase?.(item.id)}
            >
              <div className="overflow-hidden rounded-2xl mb-6 border border-white/10 bg-brand-surface/40 backdrop-blur-xl shadow-2xl shadow-brand-purple/10 group-hover:shadow-brand-purple/30 transition-all duration-700 relative aspect-video">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                />
                
                {/* Category Tag in the corner */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                    <div className="w-1 h-1 bg-brand-cyan rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-mono text-white/90 uppercase tracking-[0.15em] leading-none">{item.category}</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors leading-tight">{item.title}</h3>
                </div>
              </div>
              <div className="flex items-center text-brand-cyan font-medium group-hover:translate-x-2 transition-transform">
                Ver detalhes do case
                <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;