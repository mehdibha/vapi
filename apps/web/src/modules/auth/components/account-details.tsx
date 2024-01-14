"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@vapotertn/ui";
import { cn } from "@vapotertn/utils";
import { useForm } from "react-hook-form";

interface AccountDetailsProps {
  username?: string;
  name?: string;
  email?: string;
  className?: string;
}

export const AccountDetails = (props: AccountDetailsProps) => {
  const { username, name, email, className } = props;

  const form = useForm({
    values: {
      username: username ?? "",
      name: name ?? "",
      email: email ?? "",
    },
  });

  return (
    <Form {...form}>
      <form className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="username"
          disabled={true}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          disabled={true}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={true}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
