import { useFormContext } from "react-hook-form";

import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/hooks/use-toast";
import TextareaField from "./inputs/controlled/TextareaField";

const useGeneratePodcast = () => {
  // States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // React Hook Form
  const form = useFormContext();

  // Toast
  const { toast } = useToast();

  // Mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getURL);

  // Actions
  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  // Hooks
  const { startUpload } = useUploadFiles(generateUploadUrl);

  // Form Values
  const voicePrompt = form.watch("voicePrompt");
  const voiceType = form.watch("voiceType");

  // Arrow Functions
  const generatePodcast = async () => {
    setIsGenerating(true);

    if (!voicePrompt) {
      toast({
        title: "Please provide a voicePrompt to generate a podcast",
      });
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });
      form.setValue("audio", file);

      const uploadResponse = await startUpload([file]);
      const storageId = (uploadResponse[0].response as StorageResponse)
        .storageId;

      form.setValue("audioStorageId", storageId);

      const audioUrl = await getAudioUrl({ storageId });
      form.setValue("audioUrl", audioUrl);
      setIsGenerating(false);
      toast({
        title: "Podcast created successfully",
      });
    } catch (error) {
      console.error("Error generating podcast", error);
      toast({
        title: "Error creating podcast",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast };
};

const GeneratePodcast = () => {
  const form = useFormContext();
  const { isGenerating, generatePodcast } = useGeneratePodcast();

  const audio = form.watch("audio");

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <TextareaField
          control={form.control}
          name="voicePrompt"
          label="Ai Prompt to generate podcast"
          rows={5}
          placeholder="Provide text to generate audio"
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          className="text-16 w-full bg-orange-1 py-4 font-extrabold"
          onClick={generatePodcast}
          type="button"
        >
          {isGenerating ? (
            <>
              Generating...
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {audio && (
        <audio
          controls
          src={audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(event) =>
            form.setValue("audioDuration", event.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
