import { useEffect, useState } from "react";
import UpcomingRaceDetailView from "../prediction/raceWeekendViews/UpcomingRaceView";
import LiveRaceWeekendView from "../prediction/raceWeekendViews/LiveRaceWeekendView";
import RaceWeekRaceDetailView from "../prediction/raceWeekendViews/RaceWeekRaceDetailView";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import {
  fetchCurrentRaceWeekend,
  fetchLiveRaceWeekend,
  fetchUpcomingRaceWeekend,
  type RaceWeekendResponse,
} from "../../../../api/raceWeekendApiClient";
import { type UserTeam } from "../../../../api/userTeamApiClient";
import { getUserTeam } from "../../../../api/userTeamApiClient";
import { useDispatch } from "react-redux";
import { setUserTeam, useUserTeam } from "../../../../store/teamSlice";

const PredictionView = () => {
  const dispatch = useDispatch();
  const currentUserTeam = useUserTeam();
  const [upcomingRace, setUpcomingRace] = useState<RaceWeekendResponse | null>(null);
  const [currentRace, setCurrentRace] = useState<RaceWeekendResponse | null>(null);
  const [liveRace, setLiveRace] = useState<RaceWeekendResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<UserTeam>(currentUserTeam);

  useEffect(() => {
    // Handle user team
    if (currentUserTeam.teamUid === "") {
      getUserTeam().then((teamResponse) => {
        setTeam(teamResponse.teamDetailsDto);
        dispatch(setUserTeam({userTeam: teamResponse.teamDetailsDto}));
      });
    } else {
      setTeam(currentUserTeam);
    }

    const fetchRaceData = async () => {
      try {
        const liveData = await fetchLiveRaceWeekend();
        if (liveData?.raceWeekendResponse) {
          setLiveRace(liveData);
          setLoading(false);
          return;
        }
        const currentData = await fetchCurrentRaceWeekend();
        if (currentData?.raceWeekendResponse) {
          setCurrentRace(currentData);
          setLoading(false);
          return;
        }
        const upcomingData = await fetchUpcomingRaceWeekend();
        if (upcomingData?.raceWeekendResponse) {
          setUpcomingRace(upcomingData);
          setLoading(false);
          return;
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchRaceData();
  }, [currentUserTeam, dispatch]);

  if (loading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  // Render the appropriate component based on available data
  // Priority: Live Race > Current Race > Upcoming Race
  if (liveRace?.raceWeekendResponse) {
    return (
      <div className="w-full">
        <LiveRaceWeekendView liveRace={liveRace.raceWeekendResponse} team={team} />
      </div>
    );
  }

  if (currentRace?.raceWeekendResponse) {
    return (
      <div className="w-full">
        <RaceWeekRaceDetailView currentRace={currentRace.raceWeekendResponse} team={team} />
      </div>
    );
  }

  if (upcomingRace?.raceWeekendResponse) {
    return (
      <div className="w-full">
        <UpcomingRaceDetailView upcomingRace={upcomingRace.raceWeekendResponse} team={team} />
      </div>
    );
  }

  return (
    <div className="p-4 text-center text-gray-400">No race data available</div>
  );
};

export default PredictionView;
