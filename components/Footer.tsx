import React from 'react';
import { Facebook, Instagram, Linkedin, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onViewChange: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-transparent border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-4">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10">
                    <Logo />
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-xl tracking-tight text-white leading-none">COSMMUS</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/80 leading-none mt-1">Business</span>
                </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm font-light">
              Desenvolvendo negócios, potencializando pessoas e criando o futuro através de gestão estratégica e inovação.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/cosmmus.business" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-pink hover:scale-110 transition-all duration-300"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/company/cosmmus/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-brand-dark hover:scale-110 transition-all duration-300"><Linkedin size={18} /></a>
              <a href="https://www.facebook.com/share/1DpoLCTWET/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-white font-bold mb-6">A Empresa</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onViewChange('about')} className="hover:text-brand-cyan transition-colors">Sobre Nós</button></li>
              <li><button onClick={() => onViewChange('about')} className="hover:text-brand-cyan transition-colors">Manifesto</button></li>
              <li><button onClick={() => onViewChange('cases')} className="hover:text-brand-cyan transition-colors">Cases</button></li>
              <li><button onClick={() => onViewChange('contact')} className="hover:text-brand-cyan transition-colors">Trabalhe Conosco</button></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">Soluções</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => onViewChange('services')} className="hover:text-brand-cyan transition-colors">Consultoria</button></li>
              <li><button onClick={() => onViewChange('services')} className="hover:text-brand-cyan transition-colors">Cosmmus Coop</button></li>
              <li><button onClick={() => onViewChange('services')} className="hover:text-brand-cyan transition-colors">Finanças & Vórtex</button></li>
              <li><button onClick={() => onViewChange('services')} className="hover:text-brand-cyan transition-colors">Sustentabilidade</button></li>
              <li><button onClick={() => onViewChange('services')} className="hover:text-brand-cyan transition-colors">Treinamentos</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6">Boletim Cosmmus</h4>
            <p className="text-gray-400 text-sm mb-4 font-light">Receba insights semanais sobre gestão e futuro.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Seu e-mail corporativo" 
                className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg text-sm w-full focus:outline-none focus:border-brand-pink focus:bg-white/10 transition-all"
              />
              <button className="bg-white text-brand-dark px-4 py-3 rounded-lg font-bold hover:bg-brand-cyan transition-colors text-sm uppercase tracking-wide">
                Assinar
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} COSMMUS Business. Todos os direitos reservados.</p>
          <div className="flex space-x-8 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <button onClick={() => onViewChange('admin')} className="opacity-50 hover:opacity-100 flex items-center gap-1 ml-4" title="Área Administrativa">
                <ShieldCheck size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;