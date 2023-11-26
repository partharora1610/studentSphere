import * as z from "zod";

// export const QuestionFormSchema = z.object({
//   title: z.string().min(3).max(150),
//   description: z.string().min(3).max(255),
//   tags: z.array(z.string()).min(1).max(3),
// });

export const QuestionFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});
