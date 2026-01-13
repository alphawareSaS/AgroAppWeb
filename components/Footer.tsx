
import React from 'react';

import logo from '../imagenes/logo/logo.png';
import avisoPrivacidad from '../Doc/AVISO DE PRIVACIDAD GANIA.pdf';
import terminosCondiciones from '../Doc/TERMINOS Y CONDICIONES GANIA.pdf';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} width={4001} height={2250} alt="ganIA Logo" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-extrabold text-emerald-900 tracking-tight">ganIA</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Transformando el sector agropecuario a través de la innovación tecnológica y la inteligencia artificial.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-50"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6">Producto</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#inicio" className="hover:text-emerald-600 transition-colors">Funcionalidades</a></li>
              <li><a href="#modulos" className="hover:text-emerald-600 transition-colors">Módulos IA</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Actualizaciones</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6">Compañía</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Blog Agrícola</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6">Boletín Informativo</h5>
            <p className="text-gray-500 mb-6">Recibe consejos de expertos e innovación para tu campo.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Tu email" className="bg-gray-100 border-none rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-md">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 Alphaware S.A.S. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href={avisoPrivacidad} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">Privacidad</a>
            <a href={terminosCondiciones} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600">Términos</a>
            <a href="#" className="hover:text-emerald-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
