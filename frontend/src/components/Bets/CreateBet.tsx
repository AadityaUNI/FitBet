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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  betType: z.string(),
  against: z.string(),
  tokens: z
    .number()
    .min(10, "Need to bet at least 10 tokens")
    .max(1000, "You can only bet up to 1000 tokens"),
});

function onSubmit(values: any) {
  console.log(values);
}

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      betType: "",
      against: "",
      tokens: 10,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="betType"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-Time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Input placeholder="" {...field} /> */}
              </FormControl>
              <FormDescription>
                Select the type of bet you want to place.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="against"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Against</FormLabel>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Against" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yourself">Yourself</SelectItem>
                  {/* should get list of friends and an option for all of them */}
                  <SelectItem value="friend">Friend</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>Challenge others or yourself!</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokens"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Amount of Tokens to Bet</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>

              <FormMessage />
              <FormDescription>Just a friendly wager!</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Send Bet Request</Button>
      </form>
    </Form>
  );
}
