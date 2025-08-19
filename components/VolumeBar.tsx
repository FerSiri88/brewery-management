
import React from 'react';

interface VolumeBarProps {
  currentVolume: number;
  capacity: number;
}

const VolumeBar: React.FC<VolumeBarProps> = ({ currentVolume, capacity }) => {
  const percentage = capacity > 0 ? (currentVolume / capacity) * 100 : 0;
  
  const getBarColor = (p: number) => {
    if (p < 25) return 'bg-red-500';
    if (p < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full bg-gray-600 rounded-full h-2.5">
      <div
        className={`${getBarColor(percentage)} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default VolumeBar;
