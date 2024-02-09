"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { Textarea } from "../../ui/textarea";

import { QuestionFormSchema } from "@/lib/validations";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

type QuestionFormProps = {
  mongoUserId: string;
  type: string;
  questionDetails?: any; // ?? work here
};

export function QuestionForm(props: QuestionFormProps) {
  const { mongoUserId, type, questionDetails } = props;

  const parsedQuestionDetails = JSON.parse(questionDetails);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      title: parsedQuestionDetails?.data?.title || "",
      description: parsedQuestionDetails?.data?.description || "",
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof QuestionFormSchema>) => {
    setIsSubmitting(true);

    console.log(mongoUserId);

    try {
      await createQuestion({
        title: values.title,
        description: values.description,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  className="background-light800_darkgradient border-none p-4 py-6"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                {type == "edit"
                  ? ""
                  : "Be specific and imagine you’re asking a question to another person."}
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
                  className="background-light800_darkgradient resize-y h-40 w-full custom-scrollbar rounded-md  border-none p-4 py-6"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500"></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    disabled={type == "edit" ? true : false}
                    onKeyDown={
                      type == "edit"
                        ? () => {}
                        : (e) => handleInputKeyDown(e, field)
                    }
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <div
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                {type == "edit"
                  ? "Editing tags is not allowed. I need to show the tags here"
                  : "Add up to 3 tags to describe what your question is about. You need to press enter to add a tag"}
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button type="submit" className="bg-blue-600">
            {type == "create" ? "Create Question" : "Edit Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
