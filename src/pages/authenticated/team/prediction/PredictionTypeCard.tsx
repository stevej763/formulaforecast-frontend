import { formatEnumText } from "../../../../shared/utilities/formatEnumText";
import type { PredictionType } from "../../../../api/predictionsApiClient";

export interface PredictionTypeCardProps {
  predictionType: PredictionType;
  onClick?: (predictionType: PredictionType) => void;
  className?: string;
}

const PredictionTypeCard = ({ predictionType, onClick, className = "" }: PredictionTypeCardProps) => {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={() => onClick?.(predictionType)}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(predictionType);
        }
      }}
      className={
        `bg-white/20 rounded-lg p-4 border border-white/30 hover:border-red-400 transition-colors outline-none focus:ring-2 focus:ring-red-400/60 focus:border-red-400 cursor-${
          onClick ? "pointer" : "default"
        } ${className}`
      }
    >
      <h3 className="font-bold text-lg text-white mb-2">{formatEnumText(predictionType.predictionType)}</h3>
      <p className="text-sm text-gray-200">{predictionType.description}</p>
    </div>
  );
};

export default PredictionTypeCard;
