import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeroFormSchema, HeroFormSchemaType } from '../validations/hero';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  handleMutate: (values: any) => Promise<void>;
};

const FormSubmission = ({ handleMutate }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<HeroFormSchemaType>({
    resolver: zodResolver(HeroFormSchema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<HeroFormSchemaType> = async data => {
    try {
      await handleMutate(data);
      reset();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col justify-center items-center'}>
        <div className={'card'}>
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
              render={({ message }: any) => <p>{message}</p>}
            />
          </div>
          <div className={'mb-5 flex flex-col'}>
            <label htmlFor={'lastName'}>Last Name</label>
            <input
              className={'field'}
              id={'lastName'}
              {...register('lastName')}
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              render={({ message }: any) => <p>{message}</p>}
            />
          </div>
          <div className={'mb-5 flex flex-col'}>
            <label htmlFor={'house'}>House</label>
            <input className={'field'} id={'house'} {...register('house')} />
            <ErrorMessage
              errors={errors}
              name="house"
              render={({ message }: any) => <p>{message}</p>}
            />
          </div>
          <div className={'mb-5 flex flex-col'}>
            <label htmlFor={'knownAs'}>Known As</label>
            <input
              className={'field'}
              id={'knownAs'}
              {...register('knownAs')}
            />
            <ErrorMessage
              errors={errors}
              name="knownAs"
              render={({ message }: any) => <p>{message}</p>}
            />
          </div>
          <button
            disabled={!isValid}
            type="submit"
            className={'btn btn--primary'}
          >
            {isSubmitting ? 'submitting..' : 'Save Character'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormSubmission;
