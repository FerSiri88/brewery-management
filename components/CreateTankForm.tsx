import React, { useState } from "react";
import { Tank, ProcessStatus } from "../types";
import { TankService } from "../services/tankService";

interface CreateTankFormProps {
  onTankCreated: () => void;
  onCancel: () => void;
  onShowNotification?: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
}

const CreateTankForm: React.FC<CreateTankFormProps> = ({
  onTankCreated,
  onCancel,
  onShowNotification,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    beerType: "",
    volumeLiters: "",
    capacityLiters: "",
    status: ProcessStatus.Empty,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.id.trim() || !formData.beerType.trim()) {
        throw new Error("ID y tipo de cerveza son obligatorios");
      }

      const volume = parseFloat(formData.volumeLiters);
      const capacity = parseFloat(formData.capacityLiters);

      if (isNaN(volume) || isNaN(capacity)) {
        throw new Error("Volumen y capacidad deben ser números válidos");
      }

      if (volume > capacity) {
        throw new Error("El volumen no puede ser mayor que la capacidad");
      }

      if (volume < 0 || capacity <= 0) {
        throw new Error("Los valores deben ser positivos");
      }

      const newTank: Tank = {
        id: formData.id.trim(),
        beerType: formData.beerType.trim(),
        volumeLiters: volume,
        capacityLiters: capacity,
        status: formData.status,
      };

      await TankService.createTank(newTank);
      onTankCreated();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al crear el tanque";
      setError(errorMessage);
      onShowNotification?.(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">
          Crear Nuevo Tanque
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              ID del Tanque *
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ej: T001"
              required
            />
          </div>

          <div>
            <label
              htmlFor="beerType"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Tipo de Cerveza *
            </label>
            <input
              type="text"
              id="beerType"
              name="beerType"
              value={formData.beerType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ej: IPA, Stout, Lager"
              required
            />
          </div>

          <div>
            <label
              htmlFor="capacityLiters"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Capacidad (L) *
            </label>
            <input
              type="number"
              id="capacityLiters"
              name="capacityLiters"
              value={formData.capacityLiters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="1000"
              min="1"
              step="0.1"
              required
            />
          </div>

          <div>
            <label
              htmlFor="volumeLiters"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Volumen Actual (L) *
            </label>
            <input
              type="number"
              id="volumeLiters"
              name="volumeLiters"
              value={formData.volumeLiters}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="0"
              min="0"
              step="0.1"
              required
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Estado *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {Object.values(ProcessStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900 bg-opacity-20 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-amber-500 text-gray-900 rounded-md hover:bg-amber-400 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Tanque"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTankForm;
