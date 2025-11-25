import React from 'react';

interface MethodologyProps {
  preview?: boolean;
}

const Methodology: React.FC<MethodologyProps> = ({ preview }) => {
  const steps = [
    { num: '01', title: 'Imersão', desc: 'Mergulhamos na sua realidade para encontrar as alavancas ocultas.' },
    { num: '02', title: 'Desconstrução', desc: 'Quebramos crenças limitantes e processos obsoletos.' },
    { num: '03', title: 'Estratégia', desc: 'Desenhamos o mapa para o estado desejado.' },
    { num: '04', title: 'Aceleração', desc: 'Execução agressiva com acompanhamento tático.' },
    { num: '05', title: 'Evolução', desc: 'Análise de dados para o próximo salto de crescimento.' },
  ];

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden">
      
      {/* Subtle background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-24">
          <h2 className="text-brand-cyan font-bold tracking-widest uppercase text-xs mb-4">O Código Cosmmus</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Engenharia de Resultado
          </h3>
          {!preview && (
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                Não acreditamos em sorte. Acreditamos em método, disciplina e dados.
                Nosso processo é desenhado para eliminar o acaso da equação.
            </p>
          )}
        </div>

        <div className="relative">
          {/* Desktop Line */}
          <div className="hidden md:block absolute top-[2rem] left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group relative text-center">
                <div className="w-16 h-16 mx-auto bg-brand-dark rounded-full border border-brand-pink/30 flex items-center justify-center mb-8 group-hover:border-brand-cyan group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(217,0,255,0.1)] z-10 relative">
                  <span className="font-bold text-xl text-white group-hover:text-brand-cyan transition-colors">{step.num}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Methodology;