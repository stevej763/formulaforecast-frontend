import { useEffect, useState } from "react";

interface CountdownToRaceProps {
  raceWeekendStartDate: string; // ISO date string
}

function getTimeRemaining(targetDate: Date) {
  const now = new Date();
  const total = targetDate.getTime() - now.getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

const CountdownToRace = ({ raceWeekendStartDate }: CountdownToRaceProps) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(new Date(raceWeekendStartDate)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(new Date(raceWeekendStartDate)));
    }, 1000);
    return () => clearInterval(interval);
  }, [raceWeekendStartDate]);

  if (timeLeft.total <= 0) {
    return <div className="text-green-500 font-bold text-lg">Race has started!</div>;
  }

  return (
    <div className="flex gap-4 items-center justify-center text-white text-lg font-semibold bg-black/30 rounded-lg p-4 shadow">
      <span className="text-2xl text-red-400 font-bold">{timeLeft.days}</span> days
      <span className="text-2xl text-red-400 font-bold">{timeLeft.hours}</span> hrs
      <span className="text-2xl text-red-400 font-bold">{timeLeft.minutes}</span> min
      <span className="text-2xl text-red-400 font-bold">{timeLeft.seconds}</span> sec
    </div>
  );
};

export default CountdownToRace;
