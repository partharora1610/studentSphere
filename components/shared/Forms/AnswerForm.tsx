"use client";
import React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { AnswerFormSchema } from "@/lib/validations";
import { createAnswer } from "@/lib/actions/answer.action";

const AnswerForm = (params: any) => {
  const { questionId, author } = params;

  const form = useForm<z.infer<typeof AnswerFormSchema>>({
    resolver: zodResolver(AnswerFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AnswerFormSchema>) => {
    console.log(values);

    const answer = await createAnswer({
      question: questionId,
      content: values.content,
      author: JSON.parse(author),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 text-dark100_light900 ">
        <p className="base-semibold">Write your answer here</p>
        <Button>Generate AI answer</Button>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {/* <p className="base-medium">Detailed Answer</p> */}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description here"
                      className="background-light800_darkgradient resize-y h-40 w-full custom-scrollbar rounded-md  border-none p-4 py-6 text-dark100_light900 "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500"></FormDescription>
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
      </div>
    </>
  );
};

export default AnswerForm;
