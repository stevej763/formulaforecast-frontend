import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";

interface PredictionsSelectionViewProps {
    race: RaceWeekend;
    onComplete: () => void;
}


import { useState } from "react";

const formSteps = [
    {
        key: "qualifying",
        title: "Qualifying Top 3",
        fields: ["First Place", "Second Place", "Third Place"],
        color: "bg-blue-700"
    },
    {
        key: "race",
        title: "Race Top 3",
        fields: ["First Place", "Second Place", "Third Place"],
        color: "bg-red-700"
    },
    {
        key: "fastestLap",
        title: "Fastest Lap",
        fields: ["Driver"],
        color: "bg-green-700"
    }
] as const;

type StepKey = typeof formSteps[number]["key"];
type FormData = {
    [K in StepKey]: Record<string, string>;
};

const PredictionsSelectionView = ({ race, onComplete }: PredictionsSelectionViewProps) => {
        const [step, setStep] = useState(0);
        const [formData, setFormData] = useState<FormData>({ qualifying: {}, race: {}, fastestLap: {} });

        const currentStep = formSteps[step];

        const handleChange = (field: string, value: string) => {
            setFormData(prev => ({
                ...prev,
                [currentStep.key]: {
                    ...prev[currentStep.key],
                    [field]: value
                }
            }));
        };

    const handleNext = () => {
        if (step < formSteps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
            // Optionally submit formData here
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 flex flex-col items-center border-2 border-red-700">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Predictions for <span className="text-red-400">{race.raceName}</span></h2>
            <div className={`w-full rounded-lg p-4 mb-6 ${currentStep.color} bg-opacity-80 shadow flex flex-col items-center`}>
                <h3 className="text-xl font-semibold text-white mb-4">{currentStep.title}</h3>
                <form className="w-full flex flex-col gap-4 items-center">
                                {currentStep.fields.map(field => (
                                    <div key={field} className="w-full max-w-md">
                                        <label className="block text-white mb-2 text-lg" htmlFor={field}>{field}</label>
                                        <input
                                            id={field}
                                            type="text"
                                            value={formData[currentStep.key][field] || ""}
                                            onChange={e => handleChange(field, e.target.value)}
                                            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            required
                                        />
                                    </div>
                                ))}
                </form>
            </div>
                            <div className="w-full flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={step === 0 ? onComplete : handleBack}
                                    className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition"
                                >
                                    {step === 0 ? "Cancel" : "Back"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition ml-auto`}
                                >
                                    {step < formSteps.length - 1 ? "Next" : "Submit Predictions"}
                                </button>
                            </div>
            <div className="mt-6 flex gap-2">
                {formSteps.map((s, idx) => (
                    <span
                        key={s.key}
                        className={`w-3 h-3 rounded-full ${idx === step ? "bg-green-500" : "bg-gray-500"} inline-block`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default PredictionsSelectionView;