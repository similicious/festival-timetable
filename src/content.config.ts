import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const actSchema = z.object({
  name: z.string(),
  type: z.string(),
  time: z.string().transform((date) => new Date(date)),
});

const stageSchema = z.object({
  name: z.string(),
  icon: z.string(),
  acts: z.array(actSchema),
});

const stages = defineCollection({
  loader: glob({ pattern: "data/stages/*.yaml", base: "./src" }),
  schema: stageSchema,
});

export const collections = { stages };
export type Act = z.infer<typeof actSchema>;
