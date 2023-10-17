import { md5 } from 'js-md5';

export const GenerateApeAgent = () => {
  const date = new Date();

  return md5(
    navigator.userAgent +
      ' ' +
      date.getUTCFullYear().toString() +
      ((date.getUTCMonth() + 1).toString().length === 1
        ? '0' + (date.getUTCMonth() + 1).toString()
        : (date.getUTCMonth() + 1).toString()) +
      (date.getUTCDate().toString().length === 1 ? '0' + date.getUTCDate().toString() : date.getUTCDate().toString())
  );
};
