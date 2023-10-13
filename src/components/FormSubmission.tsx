import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterFormSchema } from '../validations/character';
import Button from './Button';
import Card from './Card';
import InputBox from './InputBox';
import type { HeroModel } from '../features/heroes/hero';
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col items-center justify-center'}>
        <Card>
          <InputBox label="first name" errors={errors} name="firstName" register={register} />
          <InputBox label="last name" errors={errors} name="lastName" register={register} />
          <InputBox label="house" errors={errors} name="house" register={register} />
          <InputBox label="known as" errors={errors} name="knownAs" register={register} />
          <Button type="submit" color="primary" disabled={!isValid}>
            {isSubmitting ? 'submitting..' : 'Save Character'}
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default FormSubmission;
