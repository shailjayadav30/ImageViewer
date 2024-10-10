import React from "react";
import {
  ZoomIn,
  ZoomOut,
  Move,
  RotateCw,
  Download,
  Share2,
  Printer,
} from "lucide-react";

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onPan: () => void;
  onDownload: () => void;
  onShare: () => void;
  onPrint: () => void;
  isZoomInDisabled?: boolean;
  isZoomOutDisabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onRotate,
  onPan,
  onDownload,
  onShare,
  onPrint,
  isZoomInDisabled = false,
  isZoomOutDisabled = false,
}) => {
  const controls = [
    {
      icon: ZoomIn,
      action: onZoomIn,
      label: "Zoom In",
      disabled: isZoomInDisabled,
    },
    {
      icon: ZoomOut,
      action: onZoomOut,
      label: "Zoom Out",
      disabled: isZoomOutDisabled,
    },
    { icon: Move, action: onPan, label: "Pan" },
    { icon: RotateCw, action: onRotate, label: "Rotate" },
    { icon: Download, action: onDownload, label: "Download" },
    { icon: Share2, action: onShare, label: "Share" },
    { icon: Printer, action: onPrint, label: "Print" },
  ];

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {controls.map((control, index) => (
          <button
            key={index}
            onClick={control.action}
            className={`p-2 hover:bg-gray-100 rounded-lg tooltip ${
              control.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title={control.label}
            disabled={control.disabled}
            aria-label={control.label}
          >
            <control.icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
