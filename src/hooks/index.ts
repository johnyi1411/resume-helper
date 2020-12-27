import { useState } from 'react';

const removeNonAsciiCharacters = (string: string) => {
  // eslint-disable-next-line no-control-regex
  return string.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, '');
};

export const useTextAreaWithoutAsciiCharacters = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(removeNonAsciiCharacters(event.target.value));
      }
    }
  };
};