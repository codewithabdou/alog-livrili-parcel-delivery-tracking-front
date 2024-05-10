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
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getParcelHistory;
