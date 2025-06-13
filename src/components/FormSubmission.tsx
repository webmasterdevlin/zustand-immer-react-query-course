import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterFormSchema } from '../validations/character';
import { Button } from './ui/button';
import { Card } from './ui/card';
import InputBox from './InputBox';
import type { CharacterFormSchemaType } from '../validations/character';
import type { SubmitHandler } from 'react-hook-form';

type Props = {
  handleMutate: (values: any) => any;
};

const FormSubmission = ({ handleMutate }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<CharacterFormSchemaType>({
    mode: 'all',
    resolver: zodResolver(CharacterFormSchema),
  });

  const onSubmit: SubmitHandler<CharacterFormSchemaType> = data => {
    handleMutate(data);
    reset();
  };

  return (
    <Card className="mx-auto mb-4 w-full max-w-md px-8 pb-8 pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 p-6">
          <InputBox label="first name" errors={errors} name="firstName" register={register} />
          <InputBox label="last name" errors={errors} name="lastName" register={register} />
          <InputBox label="house" errors={errors} name="house" register={register} />
          <InputBox label="known as" errors={errors} name="knownAs" register={register} />
        </div>
        <div className="px-6 pb-6">
          <Button type="submit" disabled={!isValid} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Save Character'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FormSubmission;
