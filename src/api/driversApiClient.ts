import axiosInstance from "./axiosInstance";

export interface Driver {
  driverUid: string;
  firstName: string;
  lastName: string;
  nickname: string;
  nationality: string; // CountryCode from backend
  dateOfBirth: string; // ISO date string
}

export interface DriversResponse {
  drivers: Driver[];
}

export async function fetchAllDrivers(): Promise<DriversResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/driver/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw new Error("Failed to fetch drivers");
  }
}
