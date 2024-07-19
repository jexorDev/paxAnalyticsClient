import axios from "axios";
import PaxVolumeHour from "../models/PaxVolumeHour";
import { getDateTime } from "../utility/DateTimeUtility";

export default async function getPaxVolume(): Promise<PaxVolumeHour[]> {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Statistics?fromDateTime=${getDateTime(0, 0, 0).toISOString()}&toDateTime=${getDateTime(23, 59, 0).toISOString()}`)
    return response.data as PaxVolumeHour[]
}