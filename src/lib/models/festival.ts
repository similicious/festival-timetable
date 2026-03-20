import { createSlug } from "$lib/utils/create-slug";
import { z } from "zod";

export const festivalSchema = z
  .object({
    name: z.string(),
    year: z.string(),
    publicUrl: z.url(),
    stageOrder: z.array(z.string()),
    demoMode: z.boolean(),
  })
  .transform((festival) => {
    return {
      ...festival,
      slug: `${createSlug(festival.name)}-${festival.year}`,
    };
  });

export type Festival = z.infer<typeof festivalSchema>;
