import { useState, useEffect } from 'react';
import { cocktails } from '../data';
import type { Rating } from '../types';

interface Props {
  id: string;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  goBack: () => void;
  rating?: Rating;
  setRating: (rating: Rating) => void;
  removeRating: () => void;
}

export function DetailPage({ id, isFavorite, toggleFavorite, goBack, rating, setRating, removeRating }: Props) {
  const cocktail = cocktails.find(c => c.id === id);
  const [editScore, setEditScore] = useState<number>(0);
  const [editComment, setEditComment] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (rating) {
      setEditScore(rating.score);
      setEditComment(rating.comment);
      setIsEditing(false);
    } else {
      setEditScore(0);
      setEditComment('');
      setIsEditing(false);
    }
  }, [rating, id]);

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

  const handleStarClick = (score: number) => {
    if (!isEditing) setIsEditing(true);
    setEditScore(score);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isEditing) setIsEditing(true);
    setEditComment(e.target.value);
  };

  const handleSave = () => {
    if (editScore === 0) return;
    setRating({
      score: editScore,
      comment: editComment.trim(),
      updatedAt: Date.now(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (rating) {
      setEditScore(rating.score);
      setEditComment(rating.comment);
    } else {
      setEditScore(0);
      setEditComment('');
    }
    setIsEditing(false);
  };

  const handleClear = () => {
    setEditScore(0);
    setEditComment('');
    setIsEditing(false);
    removeRating();
  };

  const displayStars = (score: number) => '★'.repeat(score) + '☆'.repeat(5 - score);

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
          <span className="icon">⭐</span> 我的评分
        </h2>
        <div className="rating-box">
          <div className="rating-stars-display">
            <span className="rating-stars-label">打分：</span>
            {[1, 2, 3, 4, 5].map(n => (
              <span
                key={n}
                className="rating-star"
                onClick={() => handleStarClick(n)}
                style={{
                  cursor: 'pointer',
                  fontSize: '28px',
                  color: n <= editScore ? '#f39c12' : '#bdc3c7',
                  userSelect: 'none',
                }}
              >
                {n <= editScore ? '★' : '☆'}
              </span>
            ))}
            {editScore > 0 && (
              <span style={{ marginLeft: 8, color: '#7f8c8d', fontSize: '14px' }}>
                {editScore}分
              </span>
            )}
          </div>
          <div className="rating-comment" style={{ marginTop: 12 }}>
            <textarea
              className="rating-comment-input"
              placeholder="写点评价吧..."
              value={editComment}
              onChange={handleCommentChange}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #dfe4ea',
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
            {isEditing ? (
              <>
                <button
                  className="detail-fav-btn"
                  onClick={handleSave}
                  disabled={editScore === 0}
                  style={{
                    opacity: editScore === 0 ? 0.5 : 1,
                    cursor: editScore === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  💾 保存评分
                </button>
                <button
                  className="detail-fav-btn"
                  onClick={handleCancel}
                  style={{
                    background: '#f1f2f6',
                    color: '#2f3542',
                    border: '1px solid #dfe4ea',
                  }}
                >
                  取消
                </button>
              </>
            ) : rating && rating.score > 0 ? (
              <>
                <span style={{ fontSize: '14px', color: '#27ae60' }}>
                  ✓ 已评分 {displayStars(rating.score)}
                </span>
                <button
                  className="detail-fav-btn"
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: '#f1f2f6',
                    color: '#2f3542',
                    border: '1px solid #dfe4ea',
                  }}
                >
                  修改评分
                </button>
                <button
                  onClick={handleClear}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#e74c3c',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  清除
                </button>
              </>
            ) : (
              <span style={{ fontSize: '14px', color: '#95a5a6' }}>还未评分，点击星星开始打分</span>
            )}
          </div>
          {rating && rating.comment && !isEditing && (
            <div style={{
              marginTop: 12,
              padding: '10px 12px',
              background: '#f8f9fa',
              borderRadius: 8,
              fontSize: '14px',
              color: '#2f3542',
              lineHeight: 1.6,
            }}>
              "{rating.comment}"
            </div>
          )}
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
