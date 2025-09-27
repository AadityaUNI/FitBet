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

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const bet = {startDate, endDate, users, amount};
    const response = await fetch('/bet', {
      method: "POST",
      body: JSON.stringify(bet)
    })
  }
  

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cooldown"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">One-Time</SelectItem>
                    <SelectItem value="7">Daily</SelectItem>
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
          name="users"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Against</FormLabel>
              <FormControl>
                <Input placeholder="(leave empty for solo bet)" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Challenge others or yourself!</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
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
        <Button type="submit" onClick={handleSubmit} className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90" >Send Bet Request</Button>
      </form>
    </Form>
  );
}
