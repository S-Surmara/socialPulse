// cookieUtils.ts
import { useCookies } from 'react-cookie';

type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

type CookieHook = {
  get: (name: string) => string;
  set: (name: string,value: string, options?: CookieOptions) => void;
  remove: (name: string) => void;
};

export const useCustomCookie = (): CookieHook => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const get = (name: string): string => cookies[name] || '';

  const set = (name: string , value: string, options: CookieOptions = {}): void => {
    setCookie(name, value, options);
  };

  const remove= (name: string): void => {
    removeCookie(name);
  };

  return {
    get,
    set,
    remove
  };
};
