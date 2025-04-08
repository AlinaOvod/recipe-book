import { Action } from '../types/action';
import { State } from '../types/state';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_FAV':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAV':
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.idMeal !== action.payload),
      };

    default:
      return state;
  }
}
