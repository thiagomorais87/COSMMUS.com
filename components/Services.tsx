import React from 'react';
import { Briefcase, Users, TrendingUp, Leaf, Calculator, GraduationCap, ArrowRight, ArrowUpRight, Box, Star, Shield } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface ServicesProps {
  limit?: number;
  onViewAll?: () => void;
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

const Services: React.FC<ServicesProps> = ({ limit, onViewAll }) => {
  const { content } = useContent();
  const displayServices = limit ? content.services.slice(0, limit) : content.services;

  return (
    <section id="services-preview" className="py-32 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-brand-pink font-bold tracking-widest uppercase text-xs mb-4">Nosso Arsenal</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Soluções para quem não aceita<br/> o <span className="text-brand-pink">médio</span>.
            </h3>
          </div>
          {limit && onViewAll && (
            <button 
              onClick={onViewAll}
              className="group hidden md:flex items-center text-sm font-bold text-white hover:text-brand-cyan transition-colors"
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
                className="group relative p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 border border-white/5 hover:border-brand-purple/30"
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
                
                <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                  {service.description}
                </p>
                
                <div className="border-t border-white/5 pt-6">
                  <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                          <span className="w-1 h-1 rounded-full bg-brand-pink mr-3"></span>
                          {feature}
                      </li>
                      ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {limit && onViewAll && (
          <div className="mt-16 text-center md:hidden">
            <button 
              onClick={onViewAll}
              className="inline-flex items-center px-8 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
            >
              Explorar tudo <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Services;