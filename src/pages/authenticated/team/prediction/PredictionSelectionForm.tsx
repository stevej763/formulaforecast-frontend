import type { PredictionType } from "../../../../api/predictionsApiClient";
import type { Driver } from "../../../../api/driversApiClient";
import PredictionFormStep from "./PredictionFormStep";

interface PredictionSelectionFormProps {
    predictionType: PredictionType;
    selectedDrivers: Driver[];
    onSelectDrivers: (drivers: Driver[]) => void;
    onSave: () => void;
    drivers: Driver[];
    requiresTopThree: (predictionType: string) => boolean;
}

const PredictionSelectionForm = ({
    predictionType,
    selectedDrivers,
    onSelectDrivers,
    onSave,
    drivers,
    requiresTopThree
}: PredictionSelectionFormProps) => {
    const maxSelections = requiresTopThree(predictionType.predictionType) ? 3 : 1;

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-6 lg:p-8 flex-1 min-h-0 overflow-y-auto">
                <PredictionFormStep
                    predictionType={predictionType}
                    selectedDrivers={selectedDrivers}
                    onSelectDrivers={onSelectDrivers}
                    drivers={drivers}
                    maxSelections={maxSelections}
                />
            </div>

            <div className="bg-black/20 p-4 sm:p-6 border-t border-white/10 flex-shrink-0">
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onSave}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150 transform hover:scale-105"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PredictionSelectionForm;