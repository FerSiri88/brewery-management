
import React from 'react';
import type { Tank } from '../types';
import { ProcessStatus } from '../types';
import VolumeBar from './VolumeBar';

interface TankCardProps {
  tank: Tank;
}

const statusColors: { [key in ProcessStatus]: string } = {
  [ProcessStatus.Fermenting]: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  [ProcessStatus.Maturing]: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  [ProcessStatus.Ready]: 'bg-green-500/20 text-green-300 border-green-500/30',
  [ProcessStatus.Empty]: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const TankCard: React.FC<TankCardProps> = ({ tank }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 shadow-lg flex flex-col justify-between gap-4 transform hover:scale-105 hover:border-amber-400 transition-all duration-300">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-bold text-amber-400">{tank.id}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[tank.status]}`}>
            {tank.status}
          </span>
        </div>
        <p className="text-lg text-gray-200">{tank.beerType}</p>
      </div>
      <div>
        <div className="flex justify-between items-baseline text-gray-400 mb-1">
          <span className="text-sm">Volumen:</span>
          <span className="text-lg font-mono text-white">{tank.volumeLiters}L <span className="text-gray-500">/ {tank.capacityLiters}L</span></span>
        </div>
        <VolumeBar currentVolume={tank.volumeLiters} capacity={tank.capacityLiters} />
      </div>
    </div>
  );
};

export default TankCard;
