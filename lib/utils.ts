import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormNewUrlProps = {
  key: string;
  value: string;
  params: string;
};

export const formNewUrl = ({ key, value, params }: FormNewUrlProps) => {
  console.log("formNewUrl", { key, value, params });
  const currentUrl = qs.parse(params);

  console.log("currentUrl", currentUrl);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );
};

export const removeKeysFromQuery = ({
  keys,
  params,
}: {
  keys: string[];
  params: string;
}) => {
  const currentUrl = qs.parse(params);

  keys.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );
};
