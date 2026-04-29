import React from 'react';
import { usePWA } from '../hooks/usePWA';
import PWAInstructions from './PWAInstructions';

const InstallPWA = () => {
    const { isInstalled, install, showInstructions, setShowInstructions, isIOS } = usePWA();

    if (isInstalled) return null;

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 animate-fade-in-up">
                <a
                    href="https://www.instagram.com/ganiaapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                    aria-label="Síguenos en Instagram"
                    title="Síguenos en Instagram"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07-3.205 0-3.584-.012-4.849-.07-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.502.012-4.737.068-1.054.048-1.626.222-2.006.37-.504.196-.864.43-1.243.81-.379.378-.613.738-.81 1.242-.147.38-.32.952-.37 2.006-.056 1.235-.067 1.596-.067 4.737 0 3.142.011 3.503.067 4.738.05 1.054.223 1.626.37 2.006.197.504.431.864.81 1.243.379.379.739.613 1.243.81.38.147.952.32 2.006.37 1.235.056 1.596.067 4.737.067 3.142 0 3.503-.011 4.738-.067 1.054-.05 1.626-.223 2.006-.37.504-.197.864-.431 1.243-.81.379-.379.613-.739.81-1.243.147-.38.32-.952.37-2.006.056-1.235.067-1.596.067-4.738 0-3.141-.011-3.502-.067-4.737-.05-1.054-.223-1.626-.37-2.006-.197-.504-.431-.864-.81-1.243-.379-.379-.739-.613-1.243-.81-.38-.147-.952-.32-2.006-.37-1.235-.056-1.596-.068-4.738-.068zm0 3.064A4.971 4.971 0 1 1 12 17a4.971 4.971 0 0 1 0-9.971zm0 8.198A3.227 3.227 0 1 0 12 8.773a3.227 3.227 0 0 0 0 6.454zm6.406-8.39a1.161 1.161 0 1 1-2.323 0 1.161 1.161 0 0 1 2.323 0z"/>
                    </svg>
                </a>
                <button
                    onClick={install}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
                    aria-label="Instalar aplicación"
                    title="Descargar App"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
            </div>

            <PWAInstructions
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
                isIOS={isIOS}
            />
        </>
    );
};

export default InstallPWA;
