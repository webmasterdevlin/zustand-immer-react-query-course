import { ErrorMessage } from '@hookform/error-message';
import type { CharacterFormSchemaType } from '../validations/character';
import type { FieldErrorsImpl, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
  register: (val: any) => UseFormRegisterReturn<any>;
  name: string;
  label: string;
  errors: FieldErrorsImpl<CharacterFormSchemaType>;
};

/* Updated to use shadcn/ui Input and Label components */

const InputBox = ({ register, name, label, errors, ...rest }: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} {...register(name)} {...rest} />
      <ErrorMessage
        errors={errors}
        name={name}
        render={e => {
          return <p className="text-sm text-destructive">{e.message}</p>;
        }}
      />
    </div>
  );
};

export default InputBox;
