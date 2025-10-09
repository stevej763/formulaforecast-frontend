import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";

interface PredictionsHeaderProps {
    race: RaceWeekend;
    subtitle?: string;
}

const PredictionsHeader = ({ race, subtitle = "Select each prediction type to make your picks" }: PredictionsHeaderProps) => {
    return (
        <div className="bg-black/40 p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center drop-shadow-lg">
                Predictions for <span className="text-red-400">{race.raceName}</span>
            </h2>
            <p className="text-center text-gray-300 mt-2 text-sm">
                {subtitle}
            </p>
        </div>
    );
};

export default PredictionsHeader;