import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rows?: number;
  placeholder: string;
}

const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  rows = 0,
  placeholder,
}: TextareaFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-16 font-bold">{label}</FormLabel>
          <FormControl>
            <Textarea
              className="input-class"
              placeholder={placeholder}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-white-1" />
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
