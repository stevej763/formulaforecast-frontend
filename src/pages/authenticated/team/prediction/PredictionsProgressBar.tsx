interface PredictionsProgressBarProps {
    completionCount: number;
    totalCount: number;
}

const PredictionsProgressBar = ({ completionCount, totalCount }: PredictionsProgressBarProps) => {
    const completionPercentage = totalCount > 0 ? Math.round((completionCount / totalCount) * 100) : 0;

    return (
        <div className="bg-black/20 px-4 sm:px-6 py-4 border-b border-white/10 flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm font-semibold">
                    {completionCount} of {totalCount} completed
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
    );
};

export default PredictionsProgressBar;