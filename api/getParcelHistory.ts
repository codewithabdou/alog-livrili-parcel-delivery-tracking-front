"use server";

import { ParcelHistory } from "@typings/entities";

async function getParcelHistory(parcelId: string): Promise<ParcelHistory[]> {
  try {
    const response = await fetch(
      `http://localhost:5000/api/parcels/${parcelId}/history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getParcelHistory;
