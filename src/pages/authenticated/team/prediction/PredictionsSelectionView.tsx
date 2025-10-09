import { useEffect, useState } from "react";
import { fetchPredictionTypes, submitFastestLapPrediction as submitPrediction, type PredictionType } from "../../../../api/predictionsApiClient";
import { fetchAllDrivers, type Driver } from "../../../../api/driversApiClient";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import { useUserTeam } from "../../../../store/teamSlice";
import PredictionSelectionForm from "./PredictionSelectionForm";
import PredictionsHeader from "./PredictionsHeader";
import PredictionsProgressBar from "./PredictionsProgressBar";
import PredictionList from "./PredictionList";

interface PredictionsSelectionViewProps {
    race: RaceWeekend;
    onComplete: () => void;
}

interface PredictionsMap {
    [predictionTypeUid: string]: Driver[];
}

const TOP_THREE_TYPES = ['RACE_TOP_THREE', 'QUALIFYING_TOP_THREE'];

const PredictionsSelectionView = ({ race, onComplete }: PredictionsSelectionViewProps) => {
    const team = useUserTeam();
    const [predictionTypes, setPredictionTypes] = useState<Array<PredictionType>>([]);
    const [drivers, setDrivers] = useState<Array<Driver>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPredictionType, setSelectedPredictionType] = useState<PredictionType | null>(null);
    const [predictions, setPredictions] = useState<PredictionsMap>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [predictionTypesData, driversData] = await Promise.all([
                    fetchPredictionTypes(),
                    fetchAllDrivers()
                ]);
                setPredictionTypes(predictionTypesData.predictionTypes);
                setDrivers(driversData.drivers);
                console.log(predictionTypesData.predictionTypes);
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
        return TOP_THREE_TYPES.some(type => predictionType.toUpperCase().includes(type));
    };

    // Helper to get full driver name
    const getDriverName = (driver: Driver) => {
        return driver.nickname || `${driver.firstName} ${driver.lastName}`;
    };


    // Get completion count
    const getCompletionCount = () => {
        return predictionTypes.filter((type) => {
            const driverList = predictions[type.predictionTypeUid] || [];
            const required = requiresTopThree(type.predictionType) ? 3 : 1;
            return driverList.length === required;
        }).length;
    };

    const handleSelectDrivers = (selectedDrivers: Driver[]) => {
        if (!selectedPredictionType) return;
        
        setPredictions(prevPredictions => ({
            ...prevPredictions,
            [selectedPredictionType.predictionTypeUid]: selectedDrivers
        }));
    };

    const handlePredictionSelected = () => {
        if (!selectedPredictionType) return;
        const currentPrediction = predictions[selectedPredictionType.predictionTypeUid]
        if (!currentPrediction) {
            setSelectedPredictionType(null);
            return;
        }
        if (!requiresTopThree(selectedPredictionType.predictionType)) {
            submitPrediction({
                userTeamUid: team.teamUid,
                raceWeekendUid: race.raceWeekendUid,
                driverUid: currentPrediction[0]?.driverUid,
                predictionTypeUid: selectedPredictionType.predictionTypeUid
            }).then(() => {
                console.log("Current Prediction for", selectedPredictionType.predictionType, ":", currentPrediction);
            }).catch((error) => {
                console.error("Error submitting fastest lap prediction:", error);
            });
        }
        setSelectedPredictionType(null);

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
        const currentSelection = predictions[selectedPredictionType.predictionTypeUid] || [];

        return (
            <PredictionSelectionForm
                predictionType={selectedPredictionType}
                selectedDrivers={currentSelection}
                onSelectDrivers={handleSelectDrivers}
                onSave={handlePredictionSelected}
                drivers={drivers}
                requiresTopThree={requiresTopThree}
            />
        );
    }

    // Main list view
    const completionCount = getCompletionCount();

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <PredictionsHeader race={race} />

            {/* Overall Progress */}
            <PredictionsProgressBar 
                completionCount={completionCount} 
                totalCount={predictionTypes.length} 
            />

            {/* Prediction List */}
            <PredictionList
                predictionTypes={predictionTypes}
                predictions={predictions}
                onPredictionTypeSelect={setSelectedPredictionType}
                requiresTopThree={requiresTopThree}
                getDriverName={getDriverName}
            />

            {/* Footer */}
            <div className="bg-black/20 p-4 sm:p-6 border-t border-white/10 flex-shrink-0">
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onComplete}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-150"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PredictionsSelectionView;
