import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Target, Zap, ActivitySquare, RefreshCw, Crosshair, BarChart2, ShoppingCart, MessageSquare, Settings, CheckCircle2 } from 'lucide-react';

interface MethodologyProps {
  preview?: boolean;
}

const Methodology: React.FC<MethodologyProps> = ({ preview }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax line height
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const steps = [
    { num: '01', title: 'Diagnóstico de Precisão', desc: 'Entramos no núcleo da operação para entender onde a energia está sendo dissipada.', icon: Crosshair },
    { num: '02', title: 'Arquitetura do Plano', desc: 'Construímos o Plano de Negócios — o mapa técnico que define o destino e os recursos necessários.', icon: Target },
    { num: '03', title: 'Ativação Tática', desc: 'A fase de implementação. Onde o plano ganha massa e as ações saem do papel para o mercado.', icon: Zap },
    { num: '04', title: 'Monitoramento de Órbita', desc: 'Acompanhamento de 6 meses via indicadores. Se não medimos, não gerenciamos.', icon: Activity },
    { num: '05', title: 'Evolução e Ciclo', desc: 'Revisão de rota e continuidade. O sucesso não é um ponto de chegada, é um movimento constante.', icon: RefreshCw },
  ];

  const axes = [
    { id: 'mercado', title: 'Mercado', desc: 'Análise de ambiente e posicionamento de vanguarda.', icon: Target, angle: -90 },
    { id: 'financas', title: 'Finanças', desc: 'Inteligência de capital, custos e precificação estratégica.', icon: BarChart2, angle: -18 },
    { id: 'comercial', title: 'Comercial', desc: 'A máquina de vendas: processos escaláveis e conversão.', icon: ShoppingCart, angle: 54 },
    { id: 'comunicacao', title: 'Comunicação', desc: 'Branding e voz: como o mercado percebe o seu valor.', icon: MessageSquare, angle: 126 },
    { id: 'operacao', title: 'Operação', desc: 'Eficiência interna: processos que rodam sem fricção.', icon: Settings, angle: 198 },
  ];

  const [activeAxis, setActiveAxis] = useState<string | null>(null);

  const differentials = [
    { title: 'Personalização Cirúrgica', desc: 'Negócios são organismos vivos; não usamos fórmulas prontas.' },
    { title: 'Presença de Cabine', desc: 'Não somos consultores de relatório. Estamos ao seu lado no acompanhamento contínuo.' },
    { title: 'Equipe Multidisciplinar', desc: 'Uma fusão de expertises (Finanças, Marketing, Operação e Gestão).' },
    { title: 'Base em Dados e Propósito', desc: 'Decisões frias em dados, mas guiadas pelo calor do seu propósito.' },
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-cyan font-bold tracking-widest uppercase text-sm mb-4 font-mono"
          >
            Metodologia: O Blueprint do Crescimento
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
          >
            Transformamos complexidade em método.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-3xl mx-auto text-lg md:text-xl font-light"
          >
            Não entregamos apenas planos, desenhamos a estrutura que sustenta a sua expansão.
          </motion.p>
        </div>

        {/* Section 1: A Linha de Tração */}
        <div className="mb-32 relative">
          <div className="text-center mb-16">
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">1. A Linha de Tração</h4>
            <p className="text-white/50 font-mono text-sm">As Etapas do Circuito</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Continuous Flow Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-pink"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-16 md:space-y-24 relative">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 md:w-1/2 ${isEven ? 'md:text-left pl-16 md:pl-0' : 'md:text-right pl-16 md:pl-0 md:pr-16'}`}>
                      <div className="bg-brand-surface/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-colors group">
                        <div className={`flex items-center gap-4 mb-4 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                          <span className="font-mono text-brand-cyan text-lg font-bold">{step.num}</span>
                          <h5 className="text-xl md:text-2xl font-bold text-white">{step.title}</h5>
                        </div>
                        <p className="text-white/60 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Node */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-brand-dark border-2 border-brand-purple flex items-center justify-center z-10 shadow-[0_0_20px_rgba(139,0,255,0.3)]">
                      <Icon className="w-6 h-6 text-brand-cyan" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1 md:w-1/2"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 2: O Núcleo do Ecossistema */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">2. O Núcleo do Ecossistema</h4>
            <p className="text-white/50 font-mono text-sm">Os 5 Eixos Estratégicos</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
            {/* Interactive Pentagon */}
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex-shrink-0">
              {/* Center Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-brand-dark border border-brand-cyan/30 flex items-center justify-center z-20 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan animate-pulse opacity-50 blur-sm absolute"></div>
                <ActivitySquare className="w-8 h-8 text-white relative z-10" />
              </div>

              {/* Connecting Lines (Pentagon shape) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
                <polygon 
                  points="200,40 352,151 294,329 106,329 48,151" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="2"
                />
                {/* Lines to center */}
                <line x1="200" y1="40" x2="200" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <line x1="352" y1="151" x2="200" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <line x1="294" y1="329" x2="200" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <line x1="106" y1="329" x2="200" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <line x1="48" y1="151" x2="200" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              </svg>

              {/* Axis Nodes */}
              {axes.map((axis) => {
                const radiusPercent = 40; // 40% of container width/height
                const radian = (axis.angle * Math.PI) / 180;
                const xPercent = Math.cos(radian) * radiusPercent;
                const yPercent = Math.sin(radian) * radiusPercent;
                const isActive = activeAxis === axis.id;
                const Icon = axis.icon;

                return (
                  <motion.div
                    key={axis.id}
                    className="absolute z-10"
                    style={{ 
                      left: `calc(50% + ${xPercent}%)`, 
                      top: `calc(50% + ${yPercent}%)`,
                      x: '-50%', 
                      y: '-50%' 
                    }}
                    onMouseEnter={() => setActiveAxis(axis.id)}
                    onMouseLeave={() => setActiveAxis(null)}
                    onClick={() => setActiveAxis(isActive ? null : axis.id)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'bg-brand-cyan shadow-[0_0_20px_rgba(0,255,255,0.5)] border-none' 
                        : 'bg-brand-dark border border-white/20 hover:border-brand-cyan/50'
                    }`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-brand-dark' : 'text-white/70'}`} />
                    </div>
                    {/* Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center w-24">
                      <span className={`text-[10px] md:text-xs font-mono font-bold transition-colors ${isActive ? 'text-brand-cyan' : 'text-white/50'}`}>
                        {axis.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Description Panel */}
            <div className="w-full lg:w-1/3 min-h-[200px]">
              <div className="bg-brand-surface/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full flex flex-col justify-center relative overflow-hidden">
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                
                {activeAxis ? (
                  <motion.div
                    key={activeAxis}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></div>
                      <h5 className="text-2xl font-bold text-white font-mono uppercase tracking-wider">
                        {axes.find(a => a.id === activeAxis)?.title}
                      </h5>
                    </div>
                    <p className="text-white/70 text-lg leading-relaxed font-mono">
                      {axes.find(a => a.id === activeAxis)?.desc}
                    </p>
                  </motion.div>
                ) : (
                  <div className="relative z-10 text-center opacity-50">
                    <ActivitySquare className="w-12 h-12 mx-auto mb-4 text-white/30" />
                    <p className="font-mono text-sm uppercase tracking-widest">Inicie a varredura<br/>(Passe o mouse sobre os eixos)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Nosso Diferencial */}
        <div>
          <div className="text-center mb-16">
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono">3. A Ciência por Trás do Propósito</h4>
            <p className="text-white/50 font-mono text-sm">Especificações de Sistema</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {differentials.map((diff, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-surface/40 backdrop-blur-xl p-6 md:p-8 rounded-xl border border-white/5 hover:border-brand-purple/30 transition-colors relative overflow-hidden group"
              >
                {/* Techy corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-pink/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="text-lg font-bold text-white mb-2 font-mono">{diff.title}</h5>
                    <p className="text-white/60 text-sm leading-relaxed font-mono">{diff.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Methodology;