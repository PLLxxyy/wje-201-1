import { cocktails } from '../data';

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  openDetail: (id: string) => void;
  goHome: () => void;
}

export function FavoritesPage({ favorites, toggleFavorite, openDetail, goHome }: Props) {
  const favCocktails = cocktails.filter(c => favorites.includes(c.id));

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
        {favCocktails.map(c => (
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
              <div className="card-flavor">{c.flavor}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
