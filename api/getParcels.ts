"use server";

import { Parcel } from "@typings/entities";

async function getParcels(): Promise<Parcel[]> {
  try {
    const response = await fetch("http://localhost:5000/api/parcels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getParcels;
