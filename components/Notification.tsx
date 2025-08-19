import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-600 border-green-500 text-green-100";
      case "error":
        return "bg-red-600 border-red-500 text-red-100";
      case "info":
        return "bg-blue-600 border-blue-500 text-blue-100";
      default:
        return "bg-gray-600 border-gray-500 text-gray-100";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✗";
      case "info":
        return "ℹ";
      default:
        return "•";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${getTypeStyles()} border rounded-lg px-4 py-3 shadow-lg max-w-sm`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold">{getIcon()}</span>
          <p className="text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-auto text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
