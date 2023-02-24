import { ErrorMessage } from '@hookform/error-message';
import type { CharacterFormSchemaType } from '../validations/character';
import type { FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  register: (val: any) => UseFormRegisterReturn<any>;
  name: string;
  label: string;
  errors: FieldErrorsImpl<CharacterFormSchemaType>;
};

const InputBox = ({ register, name, label, errors, ...rest }: Props) => {
  return (
    <div className={'mb-5 flex flex-col'}>
      <label className="capitalize" htmlFor={name}>
        {label}
      </label>
      <input
        className={'mr-4 border-0 border-b bg-white pt-2 pb-2 pr-0 pl-0 text-base text-gray-900 outline-none'}
        id={name}
        {...register(name)}
        {...rest}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={e => {
          return <pre className="text-xs text-red-500">{e.message}</pre>;
        }}
      />
    </div>
  );
};

export default InputBox;
