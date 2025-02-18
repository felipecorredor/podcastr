import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  voiceType: z.string().nonempty("Please select a voice type"),
  voicePrompt: z.string().min(10, {
    message: "Voice prompt must be at least 10 character.",
  }),
  imagePrompt: z.string().min(0),
  imageStorageId: z.custom<Id<"_storage">>(),
  audioStorageId: z.custom<Id<"_storage">>(),
  audioDuration: z.number(),
  audioUrl: z.string(),
  imageUrl: z.string(),
  views: z.number(),
});
