// src/app/home/racecalendar/RaceStatusDetail.tsx

import { ClockIcon, FlagIcon, BoltIcon, CheckCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';


interface RaceStatusDetailProps {
  status: string;
}


export default function RaceStatusDetail({ status }: RaceStatusDetailProps) {
  switch (status) {
    case 'UPCOMING':
      return (
        <span className="text-blue-400 ml-2 flex items-center gap-1">
          <ClockIcon className="h-4 w-4" /> Upcoming
        </span>
      );
    case 'RACE_WEEK':
      return (
        <span className="text-yellow-400 ml-2 flex items-center gap-1">
          <FlagIcon className="h-4 w-4" /> Race Week
        </span>
      );
    case 'LIVE':
      return (
        <span className="text-green-400 ml-2 flex items-center gap-1">
          <BoltIcon className="h-4 w-4" /> Live
        </span>
      );
    case 'COMPLETE':
      return (
        <span className="text-green-400 ml-2 flex items-center gap-1">
          <CheckCircleIcon className="h-4 w-4" /> Complete
        </span>
      );
    default:
      return (
        <span className="text-gray-400 ml-2 flex items-center gap-1">
          <QuestionMarkCircleIcon className="h-4 w-4" /> Unknown
        </span>
      );
  }
}
