

export const submitPredictions = async (raceId: string, predictions: any) => {
    try {
        const response = await fetch(`/api/races/${raceId}/predictions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(predictions),
        });
        if (!response.ok) {
            throw new Error("Failed to submit predictions");
        }
        return await response.json();
    } catch (error) {
        console.error("Error submitting predictions:", error);
        throw error;
    }
};


export const fetchPredictions = async (raceId: string) => {
    try {
        const response = await fetch(`/api/races/${raceId}/predictions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch predictions");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching predictions:", error);
        throw error;
    }
};