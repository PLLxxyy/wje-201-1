import { cocktails } from '../data';

interface Props {
  id: string;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  goBack: () => void;
}

export function DetailPage({ id, isFavorite, toggleFavorite, goBack }: Props) {
  const cocktail = cocktails.find(c => c.id === id);

  if (!cocktail) {
    return (
      <div className="detail-page">
        <button className="back-btn" onClick={goBack}>
          ← 返回首页
        </button>
        <div className="empty-state">
          <span className="icon">😕</span>
          <h3>找不到这款鸡尾酒</h3>
          <p>可能数据出现了问题，请返回首页重试。</p>
        </div>
      </div>
    );
  }

  const stars = '★'.repeat(cocktail.difficulty) + '☆'.repeat(5 - cocktail.difficulty);

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={goBack}>
        ← 返回首页
      </button>

      <div className="detail-hero">
        <div className="detail-color-strip" style={{ background: cocktail.color }} />
        <div className="detail-hero-body">
          <h1 className="detail-title">{cocktail.name}</h1>
          <div className="detail-title-en">{cocktail.nameEn}</div>

          <div className="detail-tags">
            <span className="tag tag-spirit">{cocktail.baseSpirit}</span>
            <span className="tag tag-alc">酒精度 {cocktail.abv}%</span>
            <span className="tag" style={{ background: '#fef3e2', color: '#b7791f', border: '1px solid #fcd88d' }}>
              难度 {stars}
            </span>
          </div>

          <p className="detail-desc">{cocktail.description}</p>

          <button
            className={`detail-fav-btn ${isFavorite ? 'faved' : ''}`}
            onClick={() => toggleFavorite(cocktail.id)}
          >
            {isFavorite ? '❤️ 已收藏' : '🤍 加入收藏'}
          </button>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">
          <span className="icon">🧂</span> 所需材料
        </h2>
        <ul className="ingredient-list">
          {cocktail.ingredients.map((ing, i) => (
            <li key={i} className="ingredient-item">
              <span className="ingredient-name">{ing.name}</span>
              <span className="ingredient-amount">{ing.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h2 className="section-title">
          <span className="icon">📋</span> 调制步骤
        </h2>
        <ol className="step-list">
          {cocktail.steps.map((step, i) => (
            <li key={i} className="step-item">
              <span className="step-number">{i + 1}</span>
              <span className="step-text">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="detail-section">
        <h2 className="section-title">
          <span className="icon">💡</span> 调制技巧
        </h2>
        <div className="tip-box">{cocktail.tips}</div>
      </div>
    </div>
  );
}
