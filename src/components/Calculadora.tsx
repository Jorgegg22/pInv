import { useState } from 'react';

export default function Calculadora() {
  const [inicial, setInicial] = useState(10000);
  const [mensual, setMensual] = useState(300);
  const [anios, setAnios] = useState(20);
  const [tasa, setTasa] = useState(7);

  const calcularInteres = () => {
    let total = inicial;
    let invertido = inicial;
    const tasaMensual = tasa / 100 / 12;
    const meses = anios * 12;

    for (let i = 0; i < meses; i++) {
      total = (total + mensual) * (1 + tasaMensual);
      invertido += mensual;
    }

    return {
      total: Math.round(total),
      invertido: Math.round(invertido),
      intereses: Math.round(total - invertido)
    };
  };

  const resultado = calcularInteres();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-bg-card border-2 border-border-ui my-10 not-prose shadow-xl">
      <h3 className="text-3xl font-serif mb-8 text-tx-main border-b border-border-ui pb-4">Calculadora de Interés Compuesto</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-tx-sec mb-2 uppercase tracking-wider">Inversión inicial (€)</label>
            <input 
              type="number" 
              value={inicial} 
              onChange={(e) => setInicial(Number(e.target.value))} 
              className="w-full bg-bg-main border-2 border-border-ui rounded-xl px-4 py-3 text-tx-main text-lg focus:border-acc-primary outline-none transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-tx-sec mb-2 uppercase tracking-wider">Aportación mensual (€)</label>
            <input 
              type="number" 
              value={mensual} 
              onChange={(e) => setMensual(Number(e.target.value))} 
              className="w-full bg-bg-main border-2 border-border-ui rounded-xl px-4 py-3 text-tx-main text-lg focus:border-acc-primary outline-none transition-colors" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-tx-sec mb-2 uppercase tracking-wider">Años</label>
              <input 
                type="number" 
                value={anios} 
                onChange={(e) => setAnios(Number(e.target.value))} 
                className="w-full bg-bg-main border-2 border-border-ui rounded-xl px-4 py-3 text-tx-main text-lg focus:border-acc-primary outline-none transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-tx-sec mb-2 uppercase tracking-wider">Rentabilidad (%)</label>
              <input 
                type="number" 
                value={tasa} 
                step="0.1"
                onChange={(e) => setTasa(Number(e.target.value))} 
                className="w-full bg-bg-main border-2 border-border-ui rounded-xl px-4 py-3 text-tx-main text-lg focus:border-acc-primary outline-none transition-colors" 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 p-8 bg-bg-main rounded-2xl border-2 border-border-ui">
          <div className="border-b border-border-ui pb-6">
            <span className="block text-sm font-bold text-tx-sec mb-2 uppercase tracking-wider">Patrimonio Final Estimado</span>
            <span className="text-5xl font-serif font-bold text-acc-primary">{resultado.total.toLocaleString('es-ES')} €</span>
          </div>
          <div className="flex justify-between items-end pt-2">
            <div>
              <span className="block text-xs font-bold text-tx-sec mb-1 uppercase tracking-wider">Total Aportado</span>
              <span className="text-2xl font-bold text-tx-main">{resultado.invertido.toLocaleString('es-ES')} €</span>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-tx-sec mb-1 uppercase tracking-wider">Intereses Generados</span>
              <span className="text-2xl font-bold text-acc-secondary">+{resultado.intereses.toLocaleString('es-ES')} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}