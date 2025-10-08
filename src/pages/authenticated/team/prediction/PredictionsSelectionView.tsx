import { useEffect, useState } from "react";
import { fetchPredictionTypes, type PredictionType } from "../../../../api/predictionsApiClient";
import { fetchAllDrivers, type Driver } from "../../../../api/driversApiClient";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import { useUserTeam } from "../../../../store/teamSlice";
import PredictionFormStep from "./PredictionFormStep";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";

interface PredictionsSelectionViewProps {
    race: RaceWeekend;
    onComplete: () => void;
}

const PredictionsSelectionView = ({ race, onComplete }: PredictionsSelectionViewProps) => {
    const team = useUserTeam();
    const [predictionTypes, setPredictionTypes] = useState<Array<PredictionType>>([]);
    const [drivers, setDrivers] = useState<Array<Driver>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPredictionType, setSelectedPredictionType] = useState<PredictionType | null>(null);
    const [predictions, setPredictions] = useState<Map<string, Driver[]>>(new Map());
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [predictionTypesData, driversData] = await Promise.all([
                    fetchPredictionTypes(),
                    fetchAllDrivers()
                ]);
                setPredictionTypes(predictionTypesData.predictionTypes);
                setDrivers(driversData.drivers);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    // Determine if current prediction type requires top 3
    const requiresTopThree = (predictionType: string) => {
        const topThreeTypes = ['RACE_TOP_THREE', 'QUALIFYING_TOP_THREE', 'RACE_RESULT_TOP_3', 'QUALIFYING_RESULT_TOP_3'];
        return topThreeTypes.some(type => predictionType.toUpperCase().includes(type));
    };

    // Helper to get full driver name
    const getDriverName = (driver: Driver) => {
        return driver.nickname || `${driver.firstName} ${driver.lastName}`;
    };

    // Check if all predictions are complete
    const areAllPredictionsComplete = () => {
        return predictionTypes.every((type) => {
            const driverList = predictions.get(type.predictionTypeUid) || [];
            const required = requiresTopThree(type.predictionType) ? 3 : 1;
            return driverList.length === required;
        });
    };

    // Get completion count
    const getCompletionCount = () => {
        return predictionTypes.filter((type) => {
            const driverList = predictions.get(type.predictionTypeUid) || [];
            const required = requiresTopThree(type.predictionType) ? 3 : 1;
            return driverList.length === required;
        }).length;
    };

    const handleSelectDrivers = (selectedDrivers: Driver[]) => {
        if (!selectedPredictionType) return;
        
        const newPredictions = new Map(predictions);
        newPredictions.set(selectedPredictionType.predictionTypeUid, selectedDrivers);
        setPredictions(newPredictions);
    };

    const handleClosePredictionForm = () => {
        setSelectedPredictionType(null);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        // Mock API submission - log the data
        const submissionData = Array.from(predictions.entries()).flatMap(([predictionTypeUid, driverList]) => 
            driverList.map((driver, index) => ({
                userTeamUid: team.teamUid,
                raceWeekendUid: race.raceWeekendUid,
                predictionTypeUid,
                driverUid: driver.driverUid,
                driverName: getDriverName(driver),
                position: driverList.length > 1 ? index + 1 : undefined, // Include position for top-3 predictions
            }))
        );

        console.log("=== MOCK PREDICTION SUBMISSION ===");
        console.log("Race:", race.raceName);
        console.log("Team:", team.teamName);
        console.log("Predictions:", submissionData);
        console.log("================================");

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        onComplete();
    };

    if (predictionTypes.length === 0 || loading) {
        return (
            <div className="w-full p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-lg">
                <div className="text-center text-gray-300">Loading...</div>
            </div>
        );
    }

    // If a prediction type is selected, show the form
    if (selectedPredictionType) {
        const maxSelections = requiresTopThree(selectedPredictionType.predictionType) ? 3 : 1;
        const currentSelection = predictions.get(selectedPredictionType.predictionTypeUid) || [];
        const isComplete = currentSelection.length === maxSelections;

        return (
            <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 14rem)' }}>
                {/* Header */}
                <div className="bg-black/40 p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center drop-shadow-lg">
                        {formatEnumText(selectedPredictionType.predictionType)}
                    </h2>
                    <p className="text-center text-gray-300 mt-2 text-sm">
                        {selectedPredictionType.description}
                    </p>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8 flex-1 min-h-0 overflow-y-auto">
                    <PredictionFormStep
                        predictionType={selectedPredictionType}
                        selectedDrivers={currentSelection}
                        onSelectDrivers={handleSelectDrivers}
                        drivers={drivers}
                        maxSelections={maxSelections}
                    />
                </div>

                {/* Footer Navigation */}
                <div className="bg-black/20 p-4 sm:p-6 border-t border-white/10 flex-shrink-0">
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleClosePredictionForm}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150"
                        >
                            Back to List
                        </button>
                        
                        {isComplete && (
                            <button
                                type="button"
                                onClick={handleClosePredictionForm}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150 transform hover:scale-105"
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Main list view
    const completionCount = getCompletionCount();
    const completionPercentage = Math.round((completionCount / predictionTypes.length) * 100);

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 14rem)' }}>
            {/* Header */}
            <div className="bg-black/40 p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center drop-shadow-lg">
                    Predictions for <span className="text-red-400">{race.raceName}</span>
                </h2>
                <p className="text-center text-gray-300 mt-2 text-sm">
                    Select each prediction type to make your picks
                </p>
            </div>

            {/* Overall Progress */}
            <div className="bg-black/20 px-4 sm:px-6 py-4 border-b border-white/10 flex-shrink-0">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm font-semibold">
                        {completionCount} of {predictionTypes.length} completed
                    </span>
                    <span className="text-gray-300 text-sm font-semibold">
                        {completionPercentage}%
                    </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
            </div>

            {/* Prediction List */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto ff-scrollbar flex-1 min-h-0">
                {predictionTypes.map((type) => {
                    const driverList = predictions.get(type.predictionTypeUid) || [];
                    const isTopThree = requiresTopThree(type.predictionType);
                    const required = isTopThree ? 3 : 1;
                    const isComplete = driverList.length === required;
                    
                    return (
                        <button
                            key={type.predictionTypeUid}
                            onClick={() => setSelectedPredictionType(type)}
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

            {/* Footer */}
            <div className="bg-black/20 p-4 sm:p-6 border-t border-white/10 flex-shrink-0">
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onComplete}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !areAllPredictionsComplete()}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150 transform hover:scale-105 disabled:transform-none"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit All Predictions'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PredictionsSelectionView;
