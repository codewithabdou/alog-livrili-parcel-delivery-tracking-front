import ParcelsTable from "@components/parcel management/data table/parcels";
import { columns } from "@components/parcel management/data table/columns/agent-columns";
import { Parcel } from "@typings/entities";
import React from "react";
import getParcels from "@api/getParcels";

const SellerPage = async () => {
  const parcels: Parcel[] = await getParcels();

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

export default SellerPage;
