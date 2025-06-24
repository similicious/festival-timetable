import { parseTime } from "../utils/parse-time";
import { add, set } from "date-fns";
import { getActIcon } from "../utils/get-act-icon";
import { z } from "zod";
import { createSlug } from "../utils/create-slug";

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

      const startDate = set(date, { hours, minutes });

      return {
        name,
        type,
        startDate: set(date, { hours, minutes }),
        endDate: add(startDate, { minutes: duration }),
        icon: getActIcon(type),
      };
    };
  });

const daySchema = z
  .object({
    date: z.string().transform((date) => new Date(date)),
    acts: z.array(actSchema),
  })
  .transform((day) => {
    const { date, acts } = day;

    const transformedActs = acts
      .map((actTransform) => actTransform(date))
      .sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());

    return {
      date,
      acts: transformedActs,
    };
  });

export const stageSchema = z
  .object({
    name: z.string(),
    icon: z.string(),
    days: z.array(daySchema),
  })
  .transform((stage) => ({
    ...stage,
    slug: createSlug(stage.name),
  }));

export type Act = ReturnType<z.infer<typeof actSchema>>;
export type ActType = z.infer<typeof actTypeSchema>;
export type StageDay = z.infer<typeof daySchema>;
export type Stage = z.infer<typeof stageSchema>;
