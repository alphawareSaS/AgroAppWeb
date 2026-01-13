
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Ene', ganado: 4000, cultivos: 2400 },
  { name: 'Feb', ganado: 3000, cultivos: 1398 },
  { name: 'Mar', ganado: 2000, cultivos: 9800 },
  { name: 'Abr', ganado: 2780, cultivos: 3908 },
  { name: 'May', ganado: 1890, cultivos: 4800 },
  { name: 'Jun', ganado: 2390, cultivos: 3800 },
];

const DashboardPreview: React.FC = () => {
  return (
    <section id="demo" className="py-24 bg-emerald-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Control Total en Tiempo Real</h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Visualiza el rendimiento de tu inversión con gráficos intuitivos y reportes generados automáticamente por nuestra IA.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-2xl text-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <div className="text-emerald-600 text-sm font-bold uppercase tracking-wider mb-2">Producción Láctea</div>
              <div className="text-3xl font-bold">1,240 L</div>
              <div className="text-sm text-emerald-600 mt-2 font-medium">↑ 12% vs mes anterior</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <div className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-2">Salud Cultivos (NDVI)</div>
              <div className="text-3xl font-bold">0.82</div>
              <div className="text-sm text-blue-600 mt-2 font-medium">Estado: Excelente</div>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <div className="text-amber-600 text-sm font-bold uppercase tracking-wider mb-2">Inventario Alimento</div>
              <div className="text-3xl font-bold">4.2 Ton</div>
              <div className="text-sm text-amber-600 mt-2 font-medium">Reordenar en 5 días</div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGanado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCultivos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="ganado" stroke="#059669" fillOpacity={1} fill="url(#colorGanado)" strokeWidth={3} />
                <Area type="monotone" dataKey="cultivos" stroke="#10b981" fillOpacity={1} fill="url(#colorCultivos)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
              <span className="text-sm font-medium text-gray-600">Rendimiento Ganadero</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-sm font-medium text-gray-600">Crecimiento Cultivos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
