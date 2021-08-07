import { z } from "zod";

export const settingSchema = z.object({
  theme: z.object({
    options: z.array(
      z.object({
        name: z.string(),
        primary: z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
        secondary: z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
        danger: z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
      })
    ),
    selected: z.number(),
  }),
  sound: z.object({
    options: z.array(
      z.object({
        name: z.string(),
      })
    ),
    selected: z.number(),
  }),
  lesson: z.object({
    options: z.array(
      z.object({
        name: z.string(),
        data: z.array(z.number().min(0)),
      })
    ),
    selected: z.number(),
  }),
  lessonLevel: z.object({
    options: z.array(
      z.object({
        name: z.string(),
        accuracyMin: z.number().min(0),
        accuracyMax: z.number().min(0),
        wordsPerMinuteMin: z.number().min(0),
        wordsPerMinuteMax: z.number().min(0),
      })
    ),
    selected: z.number(),
  }),
});
