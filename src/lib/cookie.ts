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
  clear: () => void;
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


  const clear = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  return {
    get,
    set,
    remove,
    clear
  };
};
