import React from 'react';
import { useContent } from '../context/ContentContext';

const Cases: React.FC = () => {
  const { content } = useContent();
  const { cases } = content;

  return (
    <div className="bg-brand-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Cases e Projetos</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-4 border border-white/10 bg-white/5">
                <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <span className="text-brand-pink text-sm font-bold uppercase tracking-wider">{item.category}</span>
              <h3 className="text-xl font-bold text-white mt-2 group-hover:text-brand-cyan transition-colors">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;