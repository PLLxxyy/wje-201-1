import { useState, useMemo } from 'react';
import { cocktails } from '../data';
import { BASE_SPIRITS, type BaseSpirit, type RatingsMap } from '../types';

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  openDetail: (id: string) => void;
  ratings: RatingsMap;
}

type SortOption = 'default' | 'rating-desc' | 'rating-asc';

export function HomePage({ favorites, toggleFavorite, openDetail, ratings }: Props) {
  const [search, setSearch] = useState('');
  const [spiritFilter, setSpiritFilter] = useState<BaseSpirit | null>(null);
  const [diffFilter, setDiffFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filtered = useMemo(() => {
    let result = cocktails.filter(c => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.nameEn.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (spiritFilter && c.baseSpirit !== spiritFilter) return false;
      if (diffFilter !== null && c.difficulty !== diffFilter) return false;
      return true;
    });

    if (sortOption === 'rating-desc' || sortOption === 'rating-asc') {
      result = [...result].sort((a, b) => {
        const scoreA = ratings[a.id]?.score ?? 0;
        const scoreB = ratings[b.id]?.score ?? 0;
        return sortOption === 'rating-desc' ? scoreB - scoreA : scoreA - scoreB;
      });
    }

    return result;
  }, [search, spiritFilter, diffFilter, sortOption, ratings]);

  const displayStars = (score: number) => '★'.repeat(score) + '☆'.repeat(5 - score);

  return (
    <>
      <div className="toolbar">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="搜索鸡尾酒名称..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <span className="filter-label">基酒:</span>
          <span
            className={`filter-chip ${spiritFilter === null ? 'active' : ''}`}
            onClick={() => setSpiritFilter(null)}
          >
            全部
          </span>
          {BASE_SPIRITS.map(s => (
            <span
              key={s}
              className={`filter-chip ${spiritFilter === s ? 'active' : ''}`}
              onClick={() => setSpiritFilter(spiritFilter === s ? null : s)}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="filter-row" style={{ marginTop: 8 }}>
          <span className="filter-label">难度:</span>
          <span
            className={`filter-chip ${diffFilter === null ? 'active' : ''}`}
            onClick={() => setDiffFilter(null)}
          >
            全部
          </span>
          {[1, 2, 3, 4, 5].map(d => (
            <span
              key={d}
              className={`filter-chip ${diffFilter === d ? 'active' : ''}`}
              onClick={() => setDiffFilter(diffFilter === d ? null : d)}
            >
              {'★'.repeat(d)}{'☆'.repeat(5 - d)}
            </span>
          ))}
        </div>
        <div className="filter-row" style={{ marginTop: 8 }}>
          <span className="filter-label">排序:</span>
          <span
            className={`filter-chip ${sortOption === 'default' ? 'active' : ''}`}
            onClick={() => setSortOption('default')}
          >
            默认
          </span>
          <span
            className={`filter-chip ${sortOption === 'rating-desc' ? 'active' : ''}`}
            onClick={() => setSortOption('rating-desc')}
          >
            评分从高到低
          </span>
          <span
            className={`filter-chip ${sortOption === 'rating-asc' ? 'active' : ''}`}
            onClick={() => setSortOption('rating-asc')}
          >
            评分从低到高
          </span>
        </div>
      </div>

      <main className="main-content">
        <div className="results-info">
          共找到 <span className="results-count">{filtered.length}</span> 款鸡尾酒
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="icon">🔍</span>
            <h3>没有找到匹配的鸡尾酒</h3>
            <p>试试调整搜索条件或筛选项</p>
          </div>
        ) : (
          <div className="card-grid">
            {filtered.map(c => {
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
                        title={favorites.includes(c.id) ? '取消收藏' : '收藏'}
                      >
                        {favorites.includes(c.id) ? '❤️' : '🤍'}
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
        )}
      </main>
    </>
  );
}
