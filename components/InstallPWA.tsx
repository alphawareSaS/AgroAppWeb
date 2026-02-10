import React from 'react';
import { usePWA } from '../hooks/usePWA';
import PWAInstructions from './PWAInstructions';

const InstallPWA = () => {
    const { isInstalled, install, showInstructions, setShowInstructions, isIOS } = usePWA();

    if (isInstalled) return null;

    return (
        <>
            <button
                onClick={install}
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 font-bold animate-fade-in-up"
                aria-label="Instalar aplicación"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar App
            </button>

            <PWAInstructions
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
                isIOS={isIOS}
            />
        </>
    );
};

export default InstallPWA;
