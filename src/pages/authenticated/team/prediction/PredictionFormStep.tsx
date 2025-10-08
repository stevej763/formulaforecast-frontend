import type { PredictionType } from "../../../../api/predictionsApiClient";
import type { Driver } from "../../../../api/driversApiClient";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";

interface PredictionFormStepProps {
  predictionType: PredictionType;
  selectedDrivers: Driver[]; // Changed to array to support multiple selections
  onSelectDrivers: (drivers: Driver[]) => void;
  drivers: Driver[];
  maxSelections?: number; // 1 for single, 3 for top-3
}

const PredictionFormStep = ({ 
  predictionType, 
  selectedDrivers, 
  onSelectDrivers, 
  drivers,
  maxSelections = 1 
}: PredictionFormStepProps) => {
  // Helper to get full driver name
  const getDriverName = (driver: Driver) => {
    return driver.nickname || `${driver.firstName} ${driver.lastName}`;
  };

  // Determine if this prediction needs multiple ordered selections
  const isTopThree = maxSelections === 3;

  // Handle driver selection
  const handleDriverClick = (driver: Driver) => {
    if (isTopThree) {
      // Top 3 mode: add/remove from ordered list
      const currentIndex = selectedDrivers.findIndex(d => d.driverUid === driver.driverUid);
      
      if (currentIndex !== -1) {
        // Driver already selected - remove them
        const newSelection = selectedDrivers.filter(d => d.driverUid !== driver.driverUid);
        onSelectDrivers(newSelection);
      } else if (selectedDrivers.length < maxSelections) {
        // Add to selection
        onSelectDrivers([...selectedDrivers, driver]);
      }
      // If already at max and clicking new driver, do nothing (they must deselect first)
    } else {
      // Single selection mode
      onSelectDrivers([driver]);
    }
  };

  // Get position label (1st, 2nd, 3rd)
  const getPositionBadge = (position: number) => {
    const labels = ['1st', '2nd', '3rd'];
    const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-700'];
    return (
      <div className={`${colors[position]} text-white text-xs font-bold px-2 py-1 rounded`}>
        {labels[position]}
      </div>
    );
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header */}
      <div className="text-center flex-shrink-0">
        <h3 className="text-2xl font-bold text-white mb-2">
          {formatEnumText(predictionType.predictionType)}
        </h3>
        <p className="text-gray-300 text-sm">{predictionType.description}</p>
        {isTopThree && (
          <p className="text-yellow-400 text-sm mt-2 font-semibold">
            Select 3 drivers in order (1st, 2nd, 3rd)
          </p>
        )}
      </div>

      {/* Ordered Selection Display (for Top 3) */}
      {isTopThree && selectedDrivers.length > 0 && (
        <div className="grid grid-cols-3 gap-3 flex-shrink-0">
          {[0, 1, 2].map((position) => {
            const driver = selectedDrivers[position];
            return (
              <div 
                key={position}
                className={`rounded-lg p-4 border-2 ${
                  driver 
                    ? 'bg-green-600/20 border-green-500/50' 
                    : 'bg-gray-800/20 border-gray-600/50 border-dashed'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {getPositionBadge(position)}
                </div>
                {driver ? (
                  <div className="text-center">
                    <p className="text-white font-bold text-sm">{getDriverName(driver)}</p>
                    <p className="text-gray-400 text-xs mt-1">{driver.nationality}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs text-center">Not selected</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Driver Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto ff-scrollbar pr-2 flex-1 min-h-0">
        {drivers.map((driver) => {
          const selectedIndex = selectedDrivers.findIndex(d => d.driverUid === driver.driverUid);
          const isSelected = selectedIndex !== -1;
          const driverName = getDriverName(driver);
          
          return (
            <button
              key={driver.driverUid}
              type="button"
              onClick={() => handleDriverClick(driver)}
              className={`
                text-left p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-red-500 bg-red-600/20 ring-2 ring-red-400/50' 
                  : 'border-white/20 bg-white/5 hover:border-red-400/50 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">{driverName}</span>
                    {isSelected && (
                      <div className="flex items-center gap-1">
                        {isTopThree && getPositionBadge(selectedIndex)}
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{driver.nationality}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Driver Summary (Single Selection) */}
      {!isTopThree && selectedDrivers.length > 0 && (
        <div className="bg-green-600/20 border-2 border-green-500/50 rounded-lg p-4 flex-shrink-0">
          <p className="text-green-300 text-sm font-semibold mb-1">Your prediction:</p>
          <p className="text-white text-lg font-bold">
            {getDriverName(selectedDrivers[0])} <span className="text-gray-400">({selectedDrivers[0].nationality})</span>
          </p>
        </div>
      )}

      {/* Progress indicator for Top 3 */}
      {isTopThree && (
        <div className="bg-black/20 rounded-lg p-3 border border-white/10 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">
              {selectedDrivers.length} of {maxSelections} selected
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={`h-2 w-8 rounded-full ${
                    i < selectedDrivers.length ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionFormStep;
