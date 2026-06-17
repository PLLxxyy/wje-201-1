import { cocktails } from '../data';
import type { RatingsMap } from '../types';

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  openDetail: (id: string) => void;
  goHome: () => void;
  ratings: RatingsMap;
}

export function FavoritesPage({ favorites, toggleFavorite, openDetail, goHome, ratings }: Props) {
  const favCocktails = cocktails.filter(c => favorites.includes(c.id));

  const displayStars = (score: number) => '★'.repeat(score) + '☆'.repeat(5 - score);

  if (favCocktails.length === 0) {
    return (
      <main className="main-content">
        <div className="empty-state">
          <span className="icon">💔</span>
          <h3>收藏夹是空的</h3>
          <p>去首页探索鸡尾酒，把喜欢的加入收藏吧！</p>
          <button
            className="detail-fav-btn"
            style={{ marginTop: 20 }}
            onClick={goHome}
          >
            去首页看看
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="results-info">
        收藏夹中共有 <span className="results-count">{favCocktails.length}</span> 款鸡尾酒
      </div>

      <div className="card-grid">
        {favCocktails.map(c => {
          const userRating = ratings[c.id];
          return (
            <div
              key={c.id}
              className="cocktail-card"
              onClick={() => openDetail(c.id)}
            >
              <div className="card-color-strip" style={{ background: c.color }} />
              <div className="card-body">
                <div className="card-header">
                  <div>
                    <div className="card-name">{c.name}</div>
                    <div className="card-name-en">{c.nameEn}</div>
                  </div>
                  <button
                    className="fav-btn"
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(c.id);
                    }}
                    title="取消收藏"
                  >
                    ❤️
                  </button>
                </div>
                <div className="card-meta">
                  <span className="tag tag-spirit">{c.baseSpirit}</span>
                  <span className="tag tag-alc">酒精 {c.abv}%</span>
                  <span className="difficulty-stars">
                    {'★'.repeat(c.difficulty)}{'☆'.repeat(5 - c.difficulty)}
                  </span>
                </div>
                {userRating && userRating.score > 0 && (
                  <div className="card-meta" style={{ marginTop: 4 }}>
                    <span
                      className="tag"
                      style={{
                        background: '#fff5e6',
                        color: '#e67e22',
                        border: '1px solid #fcd88d',
                      }}
                    >
                      我的评分 {displayStars(userRating.score)}
                    </span>
                  </div>
                )}
                <div className="card-flavor">{c.flavor}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
