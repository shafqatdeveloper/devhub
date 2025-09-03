import * as z from 'zod'


export const loginSchema = z.object({
    emailOrUsername: z.email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const signupSchema = z
  .object({
    email: z.email("Invalid Email"),
    username: z
      .string()
      .min(2, "Username must be at least 2 characters long")
      .max(16, "Username must be at most 16 characters long"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });