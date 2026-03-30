import React from 'react';
import { Briefcase, Users, TrendingUp, Leaf, Calculator, GraduationCap, ArrowRight, ArrowUpRight, Box, Star, Shield } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface ServicesProps {
  limit?: number;
  onViewAll?: () => void;
  onViewService?: (serviceId: string) => void;
}

// Icon mapper to convert string names to components
const IconMap: Record<string, React.ElementType> = {
  'Briefcase': Briefcase,
  'Users': Users,
  'TrendingUp': TrendingUp,
  'Leaf': Leaf,
  'Calculator': Calculator,
  'GraduationCap': GraduationCap,
  'Box': Box,
  'Star': Star,
  'Shield': Shield
};

const Services: React.FC<ServicesProps> = ({ limit, onViewAll, onViewService }) => {
  const { content } = useContent();
  const displayServices = limit ? content.services.slice(0, limit) : content.services;

  return (
    <section id="services-preview" className="py-32 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-brand-pink font-bold tracking-widest uppercase text-xs mb-4">Nosso Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Soluções para quem não aceita<br/> o <span className="text-brand-pink">médio</span>.
            </h3>
          </div>
          {limit && onViewAll && (
            <button 
              onClick={onViewAll}
              className="group flex items-center text-sm font-bold text-white hover:text-brand-cyan transition-colors"
            >
              Ver todo o ecossistema
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayServices.map((service) => {
            const IconComponent = IconMap[service.iconName] || Box;
            return (
              <div 
                key={service.id} 
                className="group relative p-8 rounded-2xl bg-brand-surface/40 backdrop-blur-xl hover:bg-brand-surface/60 transition-all duration-500 border border-white/5 hover:border-brand-purple/30 flex flex-col items-center text-center h-full shadow-2xl"
              >
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="text-brand-cyan w-6 h-6" />
                </div>

                <div className="w-12 h-12 rounded-lg bg-brand-surface flex items-center justify-center mb-8 text-brand-cyan group-hover:text-brand-pink group-hover:scale-110 transition-all duration-500">
                  <IconComponent strokeWidth={1.5} />
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {service.title}
                </h4>
                
                <p className="text-white/70 text-base leading-relaxed mb-8 font-light">
                  {service.description}
                </p>
                
                <div className="border-t border-white/5 pt-6 w-full flex-grow">
                  <ul className="space-y-3 flex flex-col items-center">
                      {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-white/50 group-hover:text-white/90 transition-colors text-center">
                          <span className="w-1 h-1 rounded-full bg-brand-pink mr-3 flex-shrink-0"></span>
                          {feature}
                      </li>
                      ))}
                  </ul>
                </div>
                
                {service.ctaText && (
                  <div className="mt-8 w-full pt-6 border-t border-white/5">
                    <button 
                      onClick={() => onViewService && onViewService(service.id)}
                      className="w-full py-3 px-6 rounded-full border border-brand-cyan/30 text-brand-cyan font-bold text-sm hover:bg-brand-cyan hover:text-brand-surface transition-all duration-300"
                    >
                      {service.ctaText}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
};

export default Services;