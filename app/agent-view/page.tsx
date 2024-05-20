"use client";

import React, { useEffect, useState } from "react";
import useAuth from "./context/useAuth";
import ParcelsTable from "@components/parcel management/data table/parcels";
import { columns } from "@components/parcel management/data table/columns/agent-columns";
import { Parcel } from "@typings/entities";

const Agent = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);

  const { contract } = useAuth();

  useEffect(() => {
    if (contract) {
      contract.getParcels().then((parcels: Parcel[]) => {
        setParcels(
          parcels.map((parcel) => ({
            id: parcel.id.toString(),
            price: parcel.price.toString(),
            state: parcel.state,
            city: parcel.city,
            clientFullName: parcel.clientFullName,
            clientPhoneNumber: parcel.clientPhoneNumber,
          }))
        );
      });
    }
  }, [contract]);

  return (
    <div className="w-full">
      <div className="flex gap-6 mt-6 flex-wrap justify-start items-center">
        <h1 className="md:text-3xl text-2xl  font-bold ">
          Agent Parcels Management
        </h1>
      </div>
      <ParcelsTable columns={columns} data={parcels} />
    </div>
  );
};

export default Agent;
