import { z } from "zod";

export const RegFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum of 2 character" })
    .max(200, { message: "Maximum of 200 character" }),
  email: z.email(),
  password: z
    .string()
    .min(4, { message: "Minimum of 4 character" })
    .max(100, { message: "Maximum of 100 character" }),
});
export const LoginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(4, { message: "Minimum of 4 character" })
    .max(100, { message: "Maximum of 100 character" }),
});

export const AddTaskFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Minimum of 2 character" })
    .max(200, { message: "Maximum of 200 character" }),
  description: z
    .string()
    .min(2, { message: "Minimum of 2 character" })
    .max(1000, { message: "Maximum of 1000 character" }),
});
