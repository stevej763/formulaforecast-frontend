import type { Driver } from "../../../../../api/driversApiClient";

export const getDriverName = (driver: Driver) => {
  return driver.nickname || `${driver.firstName} ${driver.lastName}`;
};
