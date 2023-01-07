import React from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, FormSchemaType } from '../validations/hero';
import { Alert, Box, Button, Flex, Input, Paper } from '@mantine/core';

type Props = {
  handleMutate: (values: any) => void;
};

const FormSubmission = ({ handleMutate }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    await handleMutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify={'center'} align="center">
        <Paper mb={40} shadow="xs" p="xl" w={500}>
          <Box mb={20}>
            <Input
              id={'firstName'}
              name={'firstName'}
              {...register('firstName')}
            />
            {errors.firstName && (
              <Alert color={'red'}>{errors.firstName.message}</Alert>
            )}
          </Box>
          <Box mb={20}>
            <Input
              id={'lastName'}
              name={'lastName'}
              {...register('lastName')}
            />
            {errors.lastName && (
              <Alert color={'red'}>{errors.lastName?.message}</Alert>
            )}
          </Box>
          <Box mb={20}>
            <Input id={'house'} name={'house'} {...register('house')} />
            {errors.house && (
              <Alert color={'red'}>{errors.house?.message}</Alert>
            )}
          </Box>
          <Box mb={20}>
            <Input id={'knownAs'} name={'knownAs'} {...register('knownAs')} />
            {errors.knownAs && (
              <Alert color="red">{errors.knownAs?.message}</Alert>
            )}
          </Box>
          <Button disabled={!isValid} type="submit" color={'primary'}>
            {isSubmitting ? 'submitting..' : 'Save Character'}
          </Button>
        </Paper>
      </Flex>
    </form>
  );
};

export default FormSubmission;
