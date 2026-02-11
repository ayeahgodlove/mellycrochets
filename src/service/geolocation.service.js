import axios from "axios";

/**
 * Resolve country code via our API proxy to avoid CORS (geolocation-db.com does not allow browser origins).
 */
export const getGeolocation = async () => {
  try {
    const response = await axios.get("/api/geolocation");
    const data = response.data;
    return data.country_code ?? null;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Geolocation (using default currency):", error?.message || error);
    }
    return null;
  }
};
