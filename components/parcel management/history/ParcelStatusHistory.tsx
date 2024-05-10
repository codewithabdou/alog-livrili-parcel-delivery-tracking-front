import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@components/ui/button";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import { ParcelHistory } from "@typings/entities";
import { TbTruckDelivery } from "react-icons/tb";

const StutusesInfos: Record<
  string,
  { description: string; icon: JSX.Element }
> = {
  DELIVERED: {
    description: "Parcel has been delivered to the client.",
    icon: (
      <TbTruckDelivery className="text-green-800 bg-green-400 p-1 rounded-full" />
    ),
  },
  RETURNED: {
    description: "Parcel has been returned to the office.",
    icon: (
      <TbTruckDelivery className="text-red-800 bg-red-400 p-1 rounded-full" />
    ),
  },
  "RETURN-READY": {
    description: "Parcel is ready to be returned.",
    icon: (
      <TbTruckDelivery className="text-yellow-800 bg-yellow-400 p-1 rounded-full" />
    ),
  },
  "TO-DESTINATION-STATE": {
    description: "Parcel is on the way to the destination state.",
    icon: (
      <TbTruckDelivery className="text-blue-800 bg-blue-400 p-1 rounded-full" />
    ),
  },
  "DELIVERY-FAILED": {
    description: "Parcel delivery failed.",
    icon: (
      <TbTruckDelivery className="text-red-800 bg-red-400 p-1 rounded-full" />
    ),
  },
  "DELIVERY-ATTEMPT-FAILED": {
    description: "Parcel delivery attempt failed.",
    icon: (
      <TbTruckDelivery className="text-red-800 bg-red-400 p-1 rounded-full" />
    ),
  },
  "WAITING-FOR-CLIENT": {
    description: "Parcel is waiting for the client.",
    icon: (
      <TbTruckDelivery className="text-yellow-800 bg-yellow-400 p-1 rounded-full" />
    ),
  },
  "RETURNED-TO-OFFICE": {
    description: "Parcel has been returned to the office.",
    icon: (
      <TbTruckDelivery className="text-red-800 bg-red-400 p-1 rounded-full" />
    ),
  },
  DISPATCHED: {
    description: "Parcel has been dispatched.",
    icon: (
      <TbTruckDelivery className="text-blue-800 bg-blue-400 p-1 rounded-full" />
    ),
  },
  CREATED: {
    description: "Parcel has been created.",
    icon: (
      <TbTruckDelivery className="text-blue-800 bg-blue-400 p-1 rounded-full" />
    ),
  },
};

const ParcelStatusHistory = ({
  parcelHistory,
}: {
  parcelHistory: ParcelHistory[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          View Parcel Status History
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-sm w-[95%] custom-scrollbar  overflow-auto  h-[90vh]">
        <DialogHeader>
          <DialogTitle>Parcel Status History</DialogTitle>
          <DialogDescription>
            Here you can see the parcel status history timeline.
          </DialogDescription>
        </DialogHeader>

        <div>
          <ol className="relative border-s  border-gray-200 dark:border-gray-700">
            {parcelHistory.map((status) => (
              <li className="mb-10 ms-6">
                {StutusesInfos[status.status].icon}
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {status.status}
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                    Latest
                  </span>
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  On {status.timestamp.toLocaleString("en-US")}
                </time>
              </li>
            ))}
          </ol>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelStatusHistory;
