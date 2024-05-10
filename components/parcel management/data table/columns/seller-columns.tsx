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
import { Parcel } from "@typings/entities";

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
    header: "actions",
    cell: ({ row }) => {
      const parcel = row.original;
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
            <ParcelStatusHistory parcelId={parcel.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
