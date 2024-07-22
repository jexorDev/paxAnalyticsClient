import PaxVolumeHour from "../models/PaxVolumeHour";

export function getComparison(currentDayData: PaxVolumeHour[], comparisonDayData: PaxVolumeHour[]): PaxVolumeHour[] {
    const comparisonHours: PaxVolumeHour[] = [];
  
    for (const currentDayHour of currentDayData) {
      const comparisonDayHour = comparisonDayData.find(x => x.hour === currentDayHour.hour);
      if (comparisonDayHour) {
        comparisonHours.push({
          hour: currentDayHour.hour,
          arrivingFlights: currentDayHour.arrivingFlights - comparisonDayHour.arrivingFlights,
          arrivingPassengers: currentDayHour.arrivingPassengers - comparisonDayHour.arrivingPassengers,
          departingFlights: currentDayHour.departingFlights - comparisonDayHour.departingFlights,
          departingPassengers: currentDayHour.departingPassengers - comparisonDayHour.departingPassengers,
        })  
      }
    }
  
    return comparisonHours;
  }