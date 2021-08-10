import { z } from "zod";

export const themeSchema = z.object({
  name: z.string(),
  primary: z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
  secondary: z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
  danger: z.string().regex(/^#(?:[0-9a-f]{3}){1,2}$/i),
});

export const soundSchema = z.object({
  name: z.string(),
});

export const lessonSchema = z.object({
  name: z.string(),
  data: z.array(z.number().min(0)),
});

export const lessonLevelSchema = z.object({
  name: z.string(),
  accuracyMin: z.number().min(0).max(1),
  accuracyMax: z.number().min(0).max(1),
  wordsPerMinuteMin: z.number().min(0),
  wordsPerMinuteMax: z.number().min(0),
});

export const settingSchema = z.object({
  theme: z.object({
    options: z.array(themeSchema),
    selected: z.number(),
  }),
  sound: z.object({
    options: z.array(soundSchema),
    selected: z.number(),
  }),
  lesson: z.object({
    options: z.array(lessonSchema),
    selected: z.number(),
  }),
  lessonLevel: z.object({
    options: z.array(lessonLevelSchema),
    selected: z.number(),
  }),
});
