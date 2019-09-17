export const setFlag = (code: string): string =>
  code.slice(0, -1).toLowerCase();

export const formatWeigth = (weight: number): string => weight / 1000 + " kg";
