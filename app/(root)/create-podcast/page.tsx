"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import TextField from "@/components/inputs/controlled/TextField";
import { formSchema } from "./@constants/formSchema";
import SelectField from "@/components/inputs/controlled/SelectField";
import TextareaField from "@/components/inputs/controlled/TextareaField";
import { defaultValues } from "./@constants/defaultValues";
import { voiceCategories } from "./@constants/voiceCategories";

const CreatePodcast = () => {
  // Router
  const router = useRouter();

  // Toast
  const { toast } = useToast();

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;
  const voiceType = form.watch("voiceType");

  // Mutations
  const createPodcast = useMutation(api.podcasts.createPodcast);

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
            <TextField
              control={form.control}
              name="title"
              placeholder="JSM Pro Podcast"
              label="Podcast Title"
            />

            <div className="flex flex-col gap-2.5">
              <SelectField
                control={form.control}
                name="voiceType"
                label="Select AI Label"
                categories={voiceCategories}
              />

              {voiceType && (
                <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
              )}
            </div>

            <TextareaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Write a short description of your podcast"
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
