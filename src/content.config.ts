import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { parseTime } from "@app/utils/parse-time";
import { set } from "date-fns";
import { getActIcon } from "./utils/get-act-icon";

const actTypeSchema = z.enum([
  "dj",
  "band",
  "performance",
  "workshop",
  "other",
]);

const actSchema = z
  .object({
    name: z.string(),
    type: actTypeSchema,
    time: z.string().regex(/\d{2}\:\d{2}/),
    duration: z.number(),
  })
  .transform(({ name, type, time, duration }) => {
    return (date: Date) => {
      const { hours, minutes } = parseTime(time);

      return {
        name,
        type,
        duration,
        date: set(date, { hours, minutes }),
        icon: getActIcon(type),
      };
    };
  });

const daySchema = z
  .object({
    date: z.date(),
    acts: z.array(actSchema),
  })
  .transform((day) => {
    const { date, acts } = day;

    const transformedActs = acts
      .map((actTransform) => actTransform(date))
      .sort((a, b) => a.date.valueOf() - b.date.valueOf());

    return {
      date,
      acts: transformedActs,
    };
  });

const stageSchema = z.object({
  name: z.string(),
  icon: z.string(),
  days: z.array(daySchema),
});

const stages = defineCollection({
  loader: glob({ pattern: "data/stages/*.yaml", base: "./src" }),
  schema: stageSchema,
});

export const collections = { stages };
export type Act = ReturnType<z.infer<typeof actSchema>>;
export type ActType = z.infer<typeof actTypeSchema>;
export type StageDay = z.infer<typeof daySchema>;
