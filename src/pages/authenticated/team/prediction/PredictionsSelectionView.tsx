import { useEffect, useState } from "react";
import { fetchPredictionTypes, submitFastestLapPrediction, type PredictionType } from "../../../../api/predictionsApiClient";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";
import { useUserTeam } from "../../../../store/teamSlice";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";

interface PredictionsSelectionViewProps {
    race: RaceWeekend;
    onComplete: () => void;
}

const PredictionsSelectionView = ({ race, onComplete }: PredictionsSelectionViewProps) => {

    const team = useUserTeam();
    const [predictionTypes, setPredictionTypes] = useState<Array<PredictionType>>([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const predictionTypes = await fetchPredictionTypes();
                setPredictionTypes(predictionTypes.predictionTypes);
            } catch (error) {
                console.error("Error fetching prediction types:", error);
            }
        };
        fetchTypes();
    }, []);

    
    const handleSubmit = async () => {
        try {
            await submitFastestLapPrediction({
                raceWeekendUid: race.raceWeekendUid,
                driverUid: "c84f66aa-4706-41a0-bad9-7278f56236a9",
                userTeamUid: team.teamUid, 
                predictionTypeUid: "a31c131f-6fb6-4328-913e-33d40142101a"
            });
            
        } catch (error: any) {
            console.error("Error submitting prediction:", error);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Predictions for <span className="text-red-400">{race.raceName}</span></h2>
            {predictionTypes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {predictionTypes.map((type) => (
                        <div 
                            key={type.predictionTypeUid} 
                            className="bg-white/20 rounded-lg p-4 border border-white/30 hover:border-red-400 transition-colors"
                        >
                            <h3 className="font-bold text-lg text-white mb-2">{formatEnumText(type.predictionType)}</h3>
                            <p className="text-sm text-gray-200">{type.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 mb-6">Loading prediction types...</div>
            )}
            <div className="flex justify-end gap-4">
                <button
                    className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded transition"
                    onClick={onComplete}
                >
                    Cancel
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
                    onClick={handleSubmit}
                >
                    Submit Predictions
                </button>
            </div>
        </div>
    );
}
export default PredictionsSelectionView;