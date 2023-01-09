import React from 'react';

type Props = {
  label: string;
  type?: string;
  name?: string;
  errors: any;
};

const InputBox = ({ label, errors, type = 'text', ...props }: Props) => {
  return (
    <div className={'mb-2'}>
      <input type={type} {...props} />
      {errors[label] && (
        <p className={'text-red-500 text-xs italic'}>
          {errors[label]?.message}
        </p>
      )}
    </div>
  );
};

export default InputBox;
