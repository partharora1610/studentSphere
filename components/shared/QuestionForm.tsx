"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  tags: z.string(),
});

export function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("form");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="base-medium">Question Title</p>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your title here"
                  {...field}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="background-light800_darkgradient border-none p-4 py-6"
                />
              </FormControl>
              <FormDescription>
                {/* This is giving the server error */}
                {/* <p className="small-regular">
                  Be specific and imagine you’re asking a question to another
                  person.
                </p> */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="base-medium">
                  Detailed Explanation of your question
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description here"
                  {...field}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="background-light800_darkgradient resize-y h-40 w-full custom-scrollbar rounded-md  border-none p-4 py-6"
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="base-medium">Add Tags</p>
              </FormLabel>
              <FormControl className="">
                <Input
                  placeholder="Add Tags"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log(e.currentTarget.value);
                      setTags([...tags, e.currentTarget.value]);
                      setTagText("");
                    }
                  }}
                  {...field}
                  value={tagText}
                  onChange={(e) => setTagText(e.target.value)}
                  className="background-light800_darkgradient border-none p-4 py-6"
                />
              </FormControl>
              <FormDescription className="text-light-400">
                Type your own custom tag and press enter
              </FormDescription>
              <FormDescription className="text-light-400">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Button type="submit" className="bg-blue-600">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
