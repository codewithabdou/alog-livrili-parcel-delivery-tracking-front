"use client";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { HiDotsHorizontal } from "react-icons/hi";
import ParcelStatusHistory from "../../history/ParcelStatusHistory";
import { Parcel, ParcelHistory } from "@typings/entities";
import { useEffect, useState } from "react";
import getParcelHistory from "@api/getParcelHistory";

export const columns: ColumnDef<Parcel>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "clientFullName",
    header: "Client Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    header: "actions",
    cell: ({ row }) => {
      const parcel = row.original;
      const parcelId = parcel.id;
      const [parcelHistory, setParcelHistory] = useState<ParcelHistory[]>([]);
      useEffect(() => {
        getParcelHistory(parcelId).then((data) => {
          //order the data depending on the date
          data.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
              return 1;
            }
            if (a.timestamp > b.timestamp) {
              return -1;
            }
            return 0;
          });
          setParcelHistory(data);
        });
      }, [parcelId]);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <HiDotsHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(parcel.id)}
            >
              Copy Parcel ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ParcelStatusHistory parcelHistory={parcelHistory} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
