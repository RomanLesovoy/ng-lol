import { User } from '../models';
export { AuthGuard } from './auth.guard';
export { JwtInterceptor } from './jwt.interceptor';
export { NotAuthGuard } from './notAuth.guard';

export const CURRENT_USER: string = 'currentUser';

export const localStorageUser = (): User => {
  let parsedUserLocalStorage: any;
  try {
    parsedUserLocalStorage = JSON.parse(localStorage.getItem(CURRENT_USER));
  } catch (e) {
    parsedUserLocalStorage = localStorage.getItem(CURRENT_USER) || {};
  }
  return parsedUserLocalStorage;
};
