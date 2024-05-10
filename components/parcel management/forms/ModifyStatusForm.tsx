"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
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
import { Input } from "@/components/ui/input";
import { DropdownMenuItem } from "@components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

const FormSchema = z.object({
  status: z.string().min(1, "Status must be provided"),
});

const possibleStatuses = [
  "DELIVERED",
  "RETURNED",
  "RETURN-READY",
  "TO-DESTINATION-STATE",
  "DELIVERY-FAILED",
  "DELIVERY-ATTEMPT-FAILED",
  "WAITING-FOR-CLIENT",
  "RETURNED-TO-OFFICE",
  "RETURNED",
  "DISPATCHED",
];

export function ModifyStatusForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Modify parcel status
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm w-[95%] ">
        <DialogHeader>
          <DialogTitle>Modify parcel status</DialogTitle>
          <DialogDescription>
            Fill in the form below to modify the parcel status.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>Parcel new status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="new parcel status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {possibleStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The parcel status will be updated to the new status.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-around gap-6">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Update status</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
