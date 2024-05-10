"use server";

async function createParcel(parcel: {
  price: string;
  state: string;
  city: string;
  clientFullName: string;
  clientPhoneNumber: string;
}): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:5000/api/parcels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parcel),
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default createParcel;
