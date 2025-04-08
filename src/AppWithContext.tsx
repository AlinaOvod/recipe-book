
import { GlobalStateProvider } from './context/AppContext';
import { RecipesProvider } from './context/Recipes';
import { Root } from './Root';

export const AppWithContext = () => {
  return (
  
    <RecipesProvider>
      <GlobalStateProvider>
      <Root />
      </GlobalStateProvider>
  </RecipesProvider>
  );
};
