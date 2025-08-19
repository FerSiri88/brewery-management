import React, { useState, useEffect } from "react";
import type { Tank } from "../types";
import { TankService } from "../services/tankService";
import TankCard from "./TankCard";

const TankGrid: React.FC = () => {
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        setLoading(true);
        const fetchedTanks = await TankService.getAllTanks();
        setTanks(fetchedTanks);
        setError(null);
      } catch (err) {
        console.error("Error fetching tanks:", err);
        setError(
          "Error al cargar los datos de los tanques. Verificando conexión..."
        );
        // Fallback to empty array or show retry option
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-left mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-3xl font-bold text-white">
            Estado de los Tanques
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <span className="ml-3 text-gray-400">
            Cargando datos de los tanques...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-left mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-3xl font-bold text-white">
            Estado de los Tanques
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="text-red-400 mb-4">⚠️</div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-left mb-8 border-b border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-white">Estado de los Tanques</h2>
        <p className="mt-2 text-gray-400">
          Estado en tiempo real de los tanques conectados a la base de datos
          PostgreSQL de Netlify. Los datos se actualizan automáticamente desde
          el servidor.
        </p>
      </div>
      {tanks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No hay tanques registrados en el sistema.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tanks.map((tank) => (
            <TankCard key={tank.id} tank={tank} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TankGrid;
