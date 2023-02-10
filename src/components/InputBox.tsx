import { ErrorMessage } from '@hookform/error-message';
import type { HeroFormSchemaType } from '../validations/character';
import type { FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  register: (val: any) => UseFormRegisterReturn<any>;
  name: string;
  label: string;
  errors: FieldErrorsImpl<HeroFormSchemaType>;
};

const InputBox = ({ register, name, label, errors, ...rest }: Props) => {
  return (
    <div className={'mb-5 flex flex-col'}>
      <label htmlFor={name}>{label}</label>
      <input className={'field'} id={name} {...register(name)} {...rest} />
      <ErrorMessage
        errors={errors}
        name={name}
        render={e => {
          return <pre className="text-xs italic text-red-500">{e.message}</pre>;
        }}
      />
    </div>
  );
};

export default InputBox;
