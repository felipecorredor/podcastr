import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
}

const TextField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
}: TextFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-16 font-bold">{label}</FormLabel>
          <FormControl>
            <Input
              className="input-class"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-white-1" />
        </FormItem>
      )}
    />
  );
};

export default TextField;
