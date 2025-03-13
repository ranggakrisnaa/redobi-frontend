import {
  verifySignInSchema,
  VerifySignInSchema,
} from '@/commons/schema/verify-sign-in.schema';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { VerifySignInProps } from '@/types/verify-sign-in-props.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const VerifySignInForm: React.FC<VerifySignInProps> = ({ onSuccess }) => {
  const form = useForm<VerifySignInSchema>({
    resolver: zodResolver(verifySignInSchema),
    mode: 'onChange',
    defaultValues: {
      otpCode: '',
    },
  });

  const onSubmit: SubmitHandler<VerifySignInSchema> = (
    data: VerifySignInSchema,
  ) => {
    if (onSuccess) {
      onSuccess(data);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="otpCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="mt-10 bg-primary-500 h-[44px] w-full"
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default VerifySignInForm;
