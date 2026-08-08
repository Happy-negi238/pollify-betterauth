import z from "zod";

const answersSchema = z.object({
  title: z.string().max(50).min(1),
  isCorrect: z.boolean(),
});

const pollCreateSchema = z
  .object({
    title: z.string().max(50).min(2),
    description: z.string().max(100).optional(),
    visibility: z.enum(["public", "private"]),
    durationSeconds: z.number().int().positive(),
    question: z.string().max(100),
    answers: z.array(answersSchema).min(2).max(6),
  })
  .refine((data) => data.answers.some((answer) => answer.isCorrect), {
    message: "At least one answer should be correct",
    path: ["answer"],
  });

export type pollCreateType = z.infer<typeof pollCreateSchema>;
export type answersType = z.infer<typeof answersSchema>;
