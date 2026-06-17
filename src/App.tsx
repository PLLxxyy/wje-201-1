import { useState, useEffect, useCallback } from 'react';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import type { RatingsMap, Rating } from './types';

type Page = { type: 'home' } | { type: 'detail'; id: string } | { type: 'favorites' };

const FAVORITES_KEY = 'cocktail-favorites';
const RATINGS_KEY = 'cocktail-ratings';

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: string[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

function loadRatings(): RatingsMap {
  try {
    const raw = localStorage.getItem(RATINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRatings(ratings: RatingsMap) {
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

export default function App() {
  const [page, setPage] = useState<Page>({ type: 'home' });
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [ratings, setRatings] = useState<RatingsMap>(loadRatings);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    saveRatings(ratings);
  }, [ratings]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id],
    );
  }, []);

  const setRating = useCallback((id: string, rating: Rating) => {
    setRatings(prev => ({ ...prev, [id]: rating }));
  }, []);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="app-header">
        <div className="header-top">
          <div
            className="logo"
            onClick={() => navigate({ type: 'home' })}
            role="button"
            tabIndex={0}
          >
            <span className="logo-icon">🍸</span>
            <span>调酒配方大全</span>
          </div>
          <nav className="nav-links">
            <button
              className={`nav-btn ${page.type === 'home' ? 'active' : ''}`}
              onClick={() => navigate({ type: 'home' })}
            >
              🏠 首页
            </button>
            <button
              className={`nav-btn ${page.type === 'favorites' ? 'active' : ''}`}
              onClick={() => navigate({ type: 'favorites' })}
            >
              ❤️ 收藏
              {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
            </button>
          </nav>
        </div>
      </header>

      {page.type === 'home' && (
        <HomePage
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          openDetail={(id) => navigate({ type: 'detail', id })}
          ratings={ratings}
        />
      )}

      {page.type === 'detail' && (
        <DetailPage
          id={page.id}
          isFavorite={favorites.includes(page.id)}
          toggleFavorite={toggleFavorite}
          goBack={() => navigate({ type: 'home' })}
          rating={ratings[page.id]}
          setRating={(rating) => setRating(page.id, rating)}
        />
      )}

      {page.type === 'favorites' && (
        <FavoritesPage
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          openDetail={(id) => navigate({ type: 'detail', id })}
          goHome={() => navigate({ type: 'home' })}
          ratings={ratings}
        />
      )}
    </>
  );
}
