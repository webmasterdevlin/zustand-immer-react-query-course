import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CharacterFormSchema } from '../validations/character';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="capitalize">
          first name
        </Label>
        <Input
          id="firstName"
          {...register('firstName')}
          className={errors.firstName ? 'border-destructive' : ''}
        />
        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="capitalize">
          last name
        </Label>
        <Input id="lastName" {...register('lastName')} className={errors.lastName ? 'border-destructive' : ''} />
        {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="house" className="capitalize">
          house
        </Label>
        <Input id="house" {...register('house')} className={errors.house ? 'border-destructive' : ''} />
        {errors.house && <p className="text-xs text-destructive">{errors.house.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="knownAs" className="capitalize">
          known as
        </Label>
        <Input id="knownAs" {...register('knownAs')} className={errors.knownAs ? 'border-destructive' : ''} />
        {errors.knownAs && <p className="text-xs text-destructive">{errors.knownAs.message}</p>}
      </div>

      <Button type="submit" variant="primary" disabled={!isValid} className="w-full">
        {isSubmitting ? 'Submitting...' : 'Save Character'}
      </Button>
    </form>
  );
};

export default FormSubmission;
