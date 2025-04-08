
import { Meal } from './global';

export type Action =
  | { type: 'ADD_FAV'; payload: Meal }
  | { type: 'REMOVE_FAV'; payload: string }
