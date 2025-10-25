import { formatRaceDates } from "../../../../shared/utilities/formatRaceDates";
import { getFlagIcon } from "../../../../shared/utilities/getFlagIcon";
import { formatEnumText } from "../../../../shared/utilities/formatEnumText";
import RaceStatusDetail from "../RaceStatusDetail";
import type { RaceWeekend } from "../../../../api/raceWeekendApiClient";

interface RaceHeaderProps {
  race: RaceWeekend;
}

const RaceHeader = ({ race }: RaceHeaderProps) => {
  return (
    <div className="bg-black/20 p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-3xl sm:text-4xl flex-shrink-0">
            {getFlagIcon(race.raceName)}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
              {formatEnumText(race.raceName)}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {formatRaceDates(race.raceWeekendStartDate, race.raceWeekendEndDate)}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 self-start sm:self-auto">
          <RaceStatusDetail status={race.raceWeekendStatus} />
        </div>
      </div>
    </div>
  );
};

export default RaceHeader;