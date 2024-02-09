import dateFormat, { masks } from "dateformat";

export const getTimeStamp = (date: Date): string => {
  return date.toISOString();
};

export const formBigIntegers = (number: number): string => {
  return number.toString();
};

export const getFormattedDate = (date: Date): string => {
  return dateFormat(date, "DDDD");
};
