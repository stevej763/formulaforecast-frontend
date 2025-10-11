import axiosInstance from "./axiosInstance";

export interface RaceWeekendPredictionsSearchParams {
    userTeamUid: string;
    raceWeekendUid: string;
}
export interface DriverPrediction {
    userTeamUid: string;
    raceWeekendUid: string;
    driverPredictions: Array<DriverPredictionDetail>;
    predictionTypeUid: string;
}

export interface PredictionType {
    predictionTypeUid: string;
    predictionType: string;
    description: string;
}   

export type PredictionTypes = {
    predictionTypes: Array<PredictionType>
}

export interface DriverPredictionDetail {
    driverUid: string;
    rank: number;
}

export interface ExistingPrediction {
    predictionTypeUid: string;
    userTeamUid: string;
    raceWeekendUid: string;
    rankedDriverPredictions: DriverPredictionDetail[];
}

export interface ExistingPredictionsMap {
    [predictionTypeUid: string]: ExistingPrediction;
}

export interface ExistingPredictionResponse {
    predictions: ExistingPredictionsMap;
}

export const submitPrediction = async (fastestLapPrediction: DriverPrediction) => {
    try {
        const response = await axiosInstance.post(`/api/v1/predictions/make-prediction`, 
            fastestLapPrediction,
            {
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error submitting fastest lap prediction:", error);
        throw error;
    }
};

export const fetchPredictionTypes = async () : Promise<PredictionTypes> => {
    try {
        const response = await axiosInstance.get(`/api/v1/predictions/types`);
        return response.data;
    } catch (error) {
        console.error("Error fetching prediction types:", error);
        throw error;
    }
};

export const fetchExistingPredictionForRaceWeekend = async (request: RaceWeekendPredictionsSearchParams): Promise<ExistingPredictionResponse> => {
    try {
        const response = await axiosInstance.get(`/api/v1/predictions/${request.userTeamUid}/${request.raceWeekendUid}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching existing predictions:", error);
        throw error;
    }
};
