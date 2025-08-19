
import React from 'react';
import TankGrid from './components/TankGrid';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://picsum.photos/seed/brewery/1920/1080')"}}
      ></div>
      <main className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Asistente de Gestión de <span className="text-amber-400">Bodega Cervecera</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Visualiza el estado de tu producción y consulta a nuestro asistente de IA para obtener información detallada.
          </p>
        </header>
        <TankGrid />
      </main>
      <ChatAssistant />
    </div>
  );
}

export default App;
