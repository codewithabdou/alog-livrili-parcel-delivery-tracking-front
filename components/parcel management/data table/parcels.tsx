import { Parcel } from "@typings/entities";
import { DataTable } from "./table";
import { ColumnDef } from "@tanstack/react-table";

export default async function ParcelsTable({
  columns,
  data,
}: {
  columns: ColumnDef<Parcel, any>[];
  data: Parcel[];
}) {
  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
