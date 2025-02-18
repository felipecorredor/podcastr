"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const formSchema = z.object({
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

const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const defaultValues = {
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

const CreatePodcast = () => {
  // Router
  const router = useRouter();

  // Toast
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;
  const voiceType = form.watch("voiceType");

  const createPodcast = useMutation(api.podcasts.createPodcast);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values.audioUrl || !values.imageUrl) {
        toast({
          title: "Please generate podcast and thumbnail",
          variant: "destructive",
        });
        throw new Error("Please generate podcast and thumbnail");
      }

      await createPodcast(values);

      toast({
        title: "Podcast created successfully",
        variant: "default",
      });

      router.push("/");
    } catch (error) {
      console.error("Error creating podcast", error);
      toast({
        title: "Error creating podcast",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="font-bold text-20">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="input-class"
                      placeholder="JSM Pro Podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <FormField
                control={form.control}
                name="voiceType"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2.5">
                    <FormLabel className="text-16 font-bold">
                      Select AI Label
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "text-16 w-full border-none bg-black-1 text-gray-1"
                          )}
                        >
                          <SelectValue
                            placeholder="Select AI Voice"
                            className="placeholder:text-gray-1"
                          />
                        </SelectTrigger>
                        <SelectContent className="text-16 border-none bg-black-1 font-bold focus:ring-orange-1">
                          {voiceCategories.map((voice) => (
                            <SelectItem
                              key={voice}
                              value={voice}
                              className="capitalize focus:bg-orange-1"
                            >
                              {voice}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-white-1" />
                  </FormItem>
                )}
              />

              {voiceType && (
                <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
              )}
            </div>

            {/* HERE */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class"
                      placeholder="Write a short description of your podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">
            <GeneratePodcast />

            <GenerateThumbnail />

            <div className="mt-10 w-ull">
              <Button
                className="text-16 w-full bg-orange-1 py-4 font-extrabold transition-all duration-300 hover:bg-black-1"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit & Publish Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
