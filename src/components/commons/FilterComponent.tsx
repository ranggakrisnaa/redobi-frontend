import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as React from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

type FilterOptionType = {
  value: string;
  label: string;
};

type FilterComponentProps = {
  filterOptions: Record<string, FilterOptionType[]>;
  onFilterChange: (filters: Record<string, any>) => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  filterOptions,
  onFilterChange,
}) => {
  const defaultValues = Object.fromEntries(
    Object.keys(filterOptions).map((key) => [key, '']),
  );

  const form = useForm({ defaultValues });

  useEffect(() => {
    const subscription = form.watch((values) => {
      onFilterChange(values);
    });

    return () => subscription.unsubscribe();
  }, [form, onFilterChange]);

  const handleReset = () => {
    form.reset(defaultValues);
  };

  return (
    <FormProvider {...form}>
      <form className="mt-10 flex gap-4 items-end">
        <div className="flex gap-4 w-full">
          {Object.entries(filterOptions).map(([key, options]) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`Pilih ${key}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {/* Button Reset */}
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="h-10"
        >
          Reset Filter
        </Button>
      </form>
    </FormProvider>
  );
};

export default FilterComponent;
