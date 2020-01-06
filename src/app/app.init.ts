import { parse } from 'query-string';

import { AuthService } from './auth.service';

export function initApp(auth: AuthService) {
  return () => {
    return new Promise((resolve) => {
      const hash = parse(window.location.hash);
      const token = hash.access_token as string;

      if (token) {
        auth.handleToken(token);
        resolve();
      } else {
        auth.login();
      }
    });
  };
}
