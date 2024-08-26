import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
  let icon;
  let bgColor;
  let textColor;
  let borderColor;

  switch (type) {
    case "success":
      icon = <AiOutlineCheckCircle className="text-teal-400 text-2xl" />;
      bgColor = "bg-gray-800";
      textColor = "text-teal-400";
      borderColor = "border-teal-600";
      break;
    case "error":
      icon = <AiOutlineCloseCircle className="text-red-400 text-2xl" />;
      bgColor = "bg-gray-800";
      textColor = "text-red-400";
      borderColor = "border-red-600";
      break;
    case "warning":
      icon = (
        <AiOutlineExclamationCircle className="text-yellow-400 text-2xl" />
      );
      bgColor = "bg-gray-800";
      textColor = "text-yellow-400";
      borderColor = "border-yellow-600";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="animate-spin text-blue-400 text-2xl" />
      );
      bgColor = "bg-gray-800";
      textColor = "text-blue-400";
      borderColor = "border-blue-600";
      break;
    default:
      icon = null;
      bgColor = "";
      textColor = "";
      borderColor = "";
  }

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow-md ${bgColor} border-l-4 ${borderColor} space-x-3`}
    >
      {icon}
      <span className={`text-sm font-medium ${textColor}`}>{message}</span>
    </div>
  );
};

export default AlertMessage;
