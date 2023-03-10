import jwtDecode from 'jwt-decode';

const LOCALSTORAGE_TOKEN_KEY = '__token';

function set(token: string) {
  if (!token) throw new Error('Wrong token passed');

  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
}

function get() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

function forget() {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, '');
}

interface JWTData {
  data: {
    user: {
      id: UUID;
    };
  };
  exp: timestamp;
}

function _decode(token: string): JWTData {
  return jwtDecode(token);
}

function isExpired(): boolean {
  const token = get();
  if (!token) return true;

  const { exp } = _decode(token);
  return Date.now() > exp * 1000;
}

function decoded() {
  const token = get();

  return token ? _decode(token) : null;
}

export const jwt = {
  set,
  get,
  isExpired,
  forget,
  decoded,
};

Object.assign(window, { jwt });
