import React, { useState } from "react";
import type { Tank } from "../types";
import { ProcessStatus } from "../types";
import VolumeBar from "./VolumeBar";
import EditTankForm from "./EditTankForm";
import ConfirmDialog from "./ConfirmDialog";
import { TankService } from "../services/tankService";

interface TankCardProps {
  tank: Tank;
  onTankUpdated: () => void;
  onShowNotification?: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
}

const statusColors: { [key in ProcessStatus]: string } = {
  [ProcessStatus.Fermenting]:
    "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  [ProcessStatus.Maturing]: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  [ProcessStatus.Ready]: "bg-green-500/20 text-green-300 border-green-500/30",
  [ProcessStatus.Empty]: "bg-red-500/20 text-red-300 border-red-500/30",
};

const TankCard: React.FC<TankCardProps> = ({
  tank,
  onTankUpdated,
  onShowNotification,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await TankService.deleteTank(tank.id);
      onTankUpdated(); // Refresh the tank list
      onShowNotification?.("Tanque eliminado exitosamente", "success");
    } catch (error) {
      console.error("Error deleting tank:", error);
      onShowNotification?.("Error al eliminar el tanque", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 shadow-lg flex flex-col justify-between gap-4 transform hover:scale-105 hover:border-amber-400 transition-all duration-300">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-amber-400">{tank.id}</h3>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                statusColors[tank.status]
              }`}
            >
              {tank.status}
            </span>
          </div>
          <p className="text-lg text-gray-200">{tank.beerType}</p>
        </div>

        <div>
          <div className="flex justify-between items-baseline text-gray-400 mb-1">
            <span className="text-sm">Volumen:</span>
            <span className="text-lg font-mono text-white">
              {tank.volumeLiters}L{" "}
              <span className="text-gray-500">/ {tank.capacityLiters}L</span>
            </span>
          </div>
          <VolumeBar
            currentVolume={tank.volumeLiters}
            capacity={tank.capacityLiters}
          />
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => setShowEditForm(true)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-500 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-500 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>

      {showEditForm && (
        <EditTankForm
          tank={tank}
          onTankUpdated={() => {
            setShowEditForm(false);
            onTankUpdated();
          }}
          onCancel={() => setShowEditForm(false)}
          onShowNotification={onShowNotification}
        />
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que quieres eliminar el tanque ${tank.id}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmButtonColor="bg-red-600 hover:bg-red-500"
      />
    </>
  );
};

export default TankCard;
