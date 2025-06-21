import { signInSchema, SignInSchema } from '@/commons/schema/sign-in.schema';
import { SignInProps } from '@/commons/types/auth/sign-in-props.ts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const SignInForm: React.FC<SignInProps> = ({ onSuccess }) => {
  const { rememberMe, setRememberMe } = useAuthStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInSchema> = (data: SignInSchema) => {
    if (onSuccess) {
      onSuccess(data);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan Email"
                    {...field}
                    autoComplete="email"
                    className="focus:border-primary-500 bg-primary-O00 min-h-11 pr-10 autofill:bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Masukkan Password"
                      {...field}
                      autoComplete="current-password"
                      className="focus:border-primary-500 bg-primary-O00 min-h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {isPasswordVisible ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center w-full mt-4 relative">
          <div className="flex items-center justify-center gap-2">
            <Checkbox
              id="terms"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="border-primary-500 data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-foreground"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-neutral-500 leading-none cursor-pointer select-none"
            >
              Ingat Saya?
            </label>
          </div>
          {/* <div className="absolute right-0 z-10">
            <p
              className="text-sm font-medium text-primary-500 cursor-pointer select-none"
              onClick={onClick}
            >
              Lupa Password?
            </p>
          </div> */}
        </div>
        <div className="relative">
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="mt-8 bg-primary-500 h-[44px] w-full disabled:opacity-100 absolute z-40"
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
