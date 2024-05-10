"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { IoMdAddCircleOutline } from "react-icons/io";
import createParcel from "@api/createParcel";
import { useState } from "react";

const floatRegex = /^(\d{1,8}(\.\d{0,2})?|100000000(\.00?)?)$/;
const phoneNumberRegex = /^\+?1?\d{9,15}$/;

const FormSchema = z.object({
  price: z.string().min(1, "Price must be provided").regex(floatRegex, {
    message: "Invalid price",
  }),
  state: z.string().min(1, "State must be provided"),
  city: z.string().min(1, "City must be provided"),
  clientFullName: z.string().min(1, "Client Full Name must be provided"),
  clientPhoneNumber: z
    .string()
    .min(1, "Client Phone Number must be provided")
    .regex(phoneNumberRegex, {
      message: "Invalid phone number",
    }),
});

export function CreateParcelForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      price: "",
      state: "",
      city: "",
      clientFullName: "",
      clientPhoneNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    createParcel(data)
      .then((response) => {
        if (response) {
          window.location.reload();
          form.reset();
        } else {
          toast({
            title: "Error",
            description: "An error occured while creating the parcel",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occured while creating the parcel",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create New Parcel <IoMdAddCircleOutline className="ml-2" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl rounded-sm w-[95%] ">
        <DialogHeader>
          <DialogTitle>Create new parcel</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new parcel.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="1000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientFullName"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>Client Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Habouche khaled ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="clientPhoneNumber"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>Client Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="+213 776493221" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Algiers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-1/2">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Oued smar ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="sm:justify-around gap-6">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isSubmitting}
                type="submit"
                className={`${
                  isSubmitting ? "cursor-not-allowed bg-opacity-70" : ""
                }`}
              >
                {isSubmitting ? "Creating parcel..." : "Create parcel"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
