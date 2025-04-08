import {
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import './index.css';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import { Favorites } from './pages/Favorites/Favorites';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  </Router>
);
