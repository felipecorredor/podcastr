import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import { useFormContext } from "react-hook-form";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import TextareaField from "./inputs/controlled/TextareaField";

const GenerateThumbnail = () => {
  // States
  const [isAiThumbnail, setIsAiThumbnail] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // React Hook Form
  const form = useFormContext();

  // Toast
  const { toast } = useToast();

  // Refs
  const imageRef = useRef<HTMLInputElement>(null);

  // Form Values
  const imagePrompt = form.watch("imagePrompt");
  const image = form.watch("file");

  // Mutations
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getURL);

  // Actions
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  // Hooks
  const { startUpload } = useUploadFiles(generateUploadUrl);

  // Arrow Functions
  const handleImage = async (blob: Blob, fileName: string) => {
    try {
      setIsImageLoading(true);

      const file = new File([blob], fileName, { type: "image/png" });

      const uploadResponse = await startUpload([file]);
      const storageId = (uploadResponse[0].response as StorageResponse)
        .storageId;

      form.setValue("imageStorageId", storageId, { shouldValidate: true });

      const imageUrl = await getImageUrl({ storageId });
      form.setValue("imageUrl", imageUrl);
      form.setValue("file", imageUrl);

      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      console.log("error::", error);
      toast({
        title: "Error uploading image",
        variant: "destructive",
      });
      setIsImageLoading(false);
    }
  };

  const generateImage = async () => {
    try {
      const response = await handleGenerateThumbnail({ prompt: imagePrompt });
      const blob = new Blob([response], { type: "image/png" });
      const fileName = `thumbnail-${uuidv4()}`;
      handleImage(blob, fileName);
    } catch (error) {
      console.log(error);
      toast({ title: "Error generating thumbnail", variant: "destructive" });
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;

      if (!files) return;

      const file = files[0];
      const fileName = file.name;

      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, fileName);
    } catch (error) {
      console.log("error", error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", {
            "bg-black-6": isAiThumbnail,
          })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", {
            "bg-black-6": !isAiThumbnail,
          })}
        >
          Upload Custom Image
        </Button>
      </div>

      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <TextareaField
              control={form.control}
              name="imagePrompt"
              label="Ai Prompt to generate Thumbnail"
              placeholder="Provide text to generate thumbnail"
              rows={5}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              onClick={generateImage}
              className="text-16 w-full bg-orange-1 py-4 font-extrabold"
              type="button"
            >
              {isImageLoading ? (
                <>
                  Generating...
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef.current?.click()}>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            placeholder="Upload File"
            onChange={uploadImage}
            ref={imageRef}
          />

          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              alt="upload"
              width={40}
              height={40}
            />
          ) : (
            <div className="text-16 flex-center font-medium">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}

      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            alt="thumbnail"
            width={200}
            height={200}
            className="mt-5"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
