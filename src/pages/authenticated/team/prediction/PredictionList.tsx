import type { PredictionType } from "../../../../api/predictionsApiClient";
import type { Driver } from "../../../../api/driversApiClient";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";

interface PredictionsMap {
    [predictionTypeUid: string]: Driver[];
}

interface PredictionListProps {
    predictionTypes: PredictionType[];
    predictions: PredictionsMap;
    onPredictionTypeSelect: (predictionType: PredictionType) => void;
    requiresTopThree: (predictionType: string) => boolean;
    getDriverName: (driver: Driver) => string;
}

const PredictionList = ({ 
    predictionTypes, 
    predictions, 
    onPredictionTypeSelect, 
    requiresTopThree, 
    getDriverName 
}: PredictionListProps) => {
    return (
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto ff-scrollbar flex-1 min-h-0">
            {predictionTypes.map((type) => {
                const driverList = predictions[type.predictionTypeUid] || [];
                const isTopThree = requiresTopThree(type.predictionType);
                const required = isTopThree ? 3 : 1;
                const isComplete = driverList.length === required;
                
                return (
                    <button
                        key={type.predictionTypeUid}
                        onClick={() => onPredictionTypeSelect(type)}
                        className="w-full text-left bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-red-400/50 rounded-lg p-4 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-white font-bold text-lg">
                                        {formatEnumText(type.predictionType)}
                                    </h3>
                                    {isComplete && (
                                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                                
                                {/* Show current selections */}
                                {driverList.length > 0 ? (
                                    isTopThree ? (
                                        <div className="space-y-1">
                                            {driverList.map((driver, index) => (
                                                <div key={driver.driverUid} className="flex items-center gap-2 text-sm">
                                                    <span className="text-yellow-400 font-bold">
                                                        {index + 1}.
                                                    </span>
                                                    <span className="text-white">{getDriverName(driver)}</span>
                                                    <span className="text-gray-500">({driver.nationality})</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm">
                                            <span className="text-white font-semibold">{getDriverName(driverList[0])}</span>
                                            <span className="text-gray-500 ml-2">({driverList[0].nationality})</span>
                                        </div>
                                    )
                                ) : (
                                    <p className="text-gray-500 text-sm italic">Not yet selected</p>
                                )}
                            </div>
                            
                            {/* Status indicator */}
                            <div className={`
                                px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                                ${isComplete 
                                    ? 'bg-green-600/20 text-green-400 border border-green-500/50' 
                                    : 'bg-gray-700/20 text-gray-400 border border-gray-600/50'
                                }
                            `}>
                                {isComplete ? 'Complete' : isTopThree ? '0/3' : '0/1'}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default PredictionList;