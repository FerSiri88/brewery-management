import React, { useState } from "react";
import TankGrid from "./components/TankGrid";
import ChatAssistant from "./components/ChatAssistant";
import Notification from "./components/Notification";

const App: React.FC = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/brewery/1920/1080')",
        }}
      ></div>
      <main className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Asistente de Gestión de{" "}
            <span className="text-amber-400">Bodega Cervecera</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Visualiza el estado de tu producción y consulta a nuestro asistente
            de IA para obtener información detallada.
          </p>
        </header>
        <TankGrid onShowNotification={showNotification} />
      </main>
      <ChatAssistant />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
