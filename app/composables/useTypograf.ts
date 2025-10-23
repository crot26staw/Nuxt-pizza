import Typograf from 'typograf';

export const useTypograf = (text: string): string => {
  const tp = new Typograf({
    locale: ['ru'],
  });
  return tp.execute(text);
};
