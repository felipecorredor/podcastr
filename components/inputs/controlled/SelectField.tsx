import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps<T extends FieldValues> {
  categories: string[];
  control: Control<T>;
  name: Path<T>;
  label: string;
}

const SelectField = <T extends FieldValues>({
  categories,
  control,
  name,
  label,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-16 font-bold">{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
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
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="capitalize focus:bg-orange-1"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="text-white-1" />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
