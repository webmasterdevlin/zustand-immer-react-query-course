import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterFormSchema } from '../validations/character';
import Button from './Button';
import Card from './Card';
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
    resolver: zodResolver(CharacterFormSchema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<CharacterFormSchemaType> = async data => {
    try {
      await handleMutate(data);
      reset();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col items-center justify-center'}>
        <Card>
          {/*
          <div className={'mb-5 flex flex-col'}>
            <label htmlFor={'firstName'}>First Name</label>
            <input
              className={'field'}
              id={'firstName'}
              {...register('firstName')}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={e => (
                <pre className="text-xs text-red-500">{e.message}</pre>
              )}
            />
          </div>
          */}
          <InputBox label="first name" errors={errors} name="firstName" register={register} />
          <InputBox label="last name" errors={errors} name="lastName" register={register} />
          <InputBox label="house" errors={errors} name="house" register={register} />
          <InputBox label="known as" errors={errors} name="knownAs" register={register} />
          <Button disabled={!isValid} type="submit" color="primary">
            {isSubmitting ? 'submitting..' : 'Save Character'}
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default FormSubmission;
