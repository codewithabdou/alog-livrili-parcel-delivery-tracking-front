export type Parcel = {
  id: string;
  price: string;
  state: string;
  city: string;
  clientFullName: string;
  clientPhoneNumber: string;
};

export type ParcelHistory = {
  status: string;
  timestamp: Date;
};
