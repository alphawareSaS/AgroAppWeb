import React from 'react';

interface PWAInstructionsProps {
    isOpen: boolean;
    onClose: () => void;
    isIOS: boolean;
}

const PWAInstructions: React.FC<PWAInstructionsProps> = ({ isOpen, onClose, isIOS }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Instalar GanIA</h3>
                    <p className="text-gray-500 mt-2">Sigue estos pasos para instalar la aplicación en tu dispositivo:</p>
                </div>

                <div className="space-y-4 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {isIOS ? (
                        <>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                <p className="text-sm text-gray-700">Toca el botón <strong>Compartir</strong> <span className="inline-block px-1 align-middle"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg></span> en la barra inferior de Safari.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                <p className="text-sm text-gray-700">Desliza hacia abajo y selecciona <strong>"Agregar al inicio"</strong>.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                <p className="text-sm text-gray-700">Confirma tocando <strong>Agregar</strong> en la esquina superior derecha.</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                <p className="text-sm text-gray-700">Abre el menú de opciones de tu navegador (tres puntos).</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                <p className="text-sm text-gray-700">Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pa pantalla principal"</strong>.</p>
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default PWAInstructions;
