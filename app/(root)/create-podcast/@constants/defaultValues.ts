import { Id } from "@/convex/_generated/dataModel";

export const defaultValues = {
  title: "",
  description: "",
  voiceType: "",
  voicePrompt: "",
  imagePrompt: "",
  imageStorageId: "" as unknown as Id<"_storage">,
  audioUrl: "",
  imageUrl: "",
  audioDuration: 0,
  audioStorageId: "" as unknown as Id<"_storage">,
  views: 0,
};
