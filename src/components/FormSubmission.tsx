import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterFormSchema } from '../validations/character';
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
        <div className={'card'}>
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
          <InputBox label="First Name" errors={errors} name="firstName" register={register} />
          <InputBox label="Last Name" errors={errors} name="lastName" register={register} />
          <InputBox label="House" errors={errors} name="house" register={register} />
          <InputBox label="Known As" errors={errors} name="knownAs" register={register} />
          <button disabled={!isValid} type="submit" className={'btn btn--primary'}>
            {isSubmitting ? 'submitting..' : 'Save Character'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormSubmission;
