import type { RaceWeekend } from "../../../api/raceWeekendApiClient";
import { formatEnumText } from "../../../shared/formatEnumText";
import { formatRaceDates } from "../../../shared/formatRaceDates";
import { getFlagIcon } from "../../../shared/getFlagIcon";
import RaceStatusDetail from "./RaceStatusDetail";


interface RaceDetailProps {
	race: RaceWeekend;
}

export default function RaceDetail({ race }: RaceDetailProps) {
	return (
		<li className="py-3 flex flex-col">
			<div className="flex flex-col items-start w-full">
				<div className="flex items-center gap-2 mb-2">
					<span className="text-lg font-semibold text-gray-200">{getFlagIcon(race.raceName)}</span>
					<span className="text-lg font-semibold text-gray-200">{formatEnumText(race.raceName)}</span>
				</div>
			</div>
			<div className="flex flex-row w-full justify-between items-center mt-2">
				<span className="text-xs text-gray-400">{formatRaceDates(race.raceWeekendStartDate, race.raceWeekendEndDate)}</span>
				<span><RaceStatusDetail status={race.raceWeekendStatus} /></span>
			</div>
		</li>
	);
}

// RaceStatusDetail component extracted to its own file
