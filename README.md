# 调酒配方大全 (Cocktail Recipe Book)

一个纯前端的鸡尾酒配方查阅应用，收录了 25 款经典鸡尾酒的完整配方。

## 功能特性

- **鸡尾酒卡片列表**：按基酒分类展示（伏特加/威士忌/朗姆酒/金酒/龙舌兰/其他）
- **详情页面**：查看配方步骤、材料清单、酒精度、口感描述和调制技巧
- **搜索功能**：按中文名或英文名搜索鸡尾酒
- **筛选功能**：按基酒类型和难度等级筛选
- **收藏功能**：将喜欢的鸡尾酒加入收藏夹，数据保存在 localStorage
- **难度评级**：每款鸡尾酒标有 1-5 星难度评级
- **颜色标签**：每款鸡尾酒配有专属颜色标签，视觉辨识度高

## 技术栈

- Vite 5
- React 18
- TypeScript
- localStorage（数据持久化）
- 所有样式写在 `index.html` 的 `<style>` 标签中，无 CSS 文件
- 无第三方 UI 库

## 快速开始

```bash
npm install
npm run dev
```

浏览器会自动打开 `http://localhost:5201`。

## 构建生产版本

```bash
npm run build
npm run preview
```

## 项目结构

```
.
├── index.html              # 入口文件（含所有 CSS 样式）
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx            # React 入口
    ├── App.tsx             # 路由与状态管理
    ├── types.ts            # TypeScript 类型定义
    ├── data.ts             # 25 款经典鸡尾酒数据
    ├── vite-env.d.ts       # Vite 类型声明
    └── pages/
        ├── HomePage.tsx    # 首页（卡片列表 + 搜索筛选）
        ├── DetailPage.tsx  # 鸡尾酒详情页
        └── FavoritesPage.tsx # 收藏夹页面
```

## 收录的鸡尾酒

| 序号 | 名称 | 英文名 | 基酒 | 难度 |
|------|------|--------|------|------|
| 1 | 莫吉托 | Mojito | 朗姆酒 | ★★ |
| 2 | 大吉利 | Daiquiri | 朗姆酒 | ★★ |
| 3 | 椰林飘香 | Pina Colada | 朗姆酒 | ★★ |
| 4 | 黑暗风暴 | Dark & Stormy | 朗姆酒 | ★ |
| 5 | 莫斯科骡子 | Moscow Mule | 伏特加 | ★ |
| 6 | 大都会 | Cosmopolitan | 伏特加 | ★★ |
| 7 | 血腥玛丽 | Bloody Mary | 伏特加 | ★★★ |
| 8 | 伏特加马天尼 | Vodka Martini | 伏特加 | ★★ |
| 9 | 海滩激情 | Sex on the Beach | 伏特加 | ★ |
| 10 | 古典鸡尾酒 | Old Fashioned | 威士忌 | ★★ |
| 11 | 威士忌酸酒 | Whiskey Sour | 威士忌 | ★★ |
| 12 | 薄荷朱利普 | Mint Julep | 威士忌 | ★★ |
| 13 | 曼哈顿 | Manhattan | 威士忌 | ★★★ |
| 14 | 爱尔兰咖啡 | Irish Coffee | 威士忌 | ★★★ |
| 15 | 金汤力 | Gin & Tonic | 金酒 | ★ |
| 16 | 汤姆柯林斯 | Tom Collins | 金酒 | ★★ |
| 17 | 尼格罗尼 | Negroni | 金酒 | ★★ |
| 18 | 马丁内斯 | Martinez | 金酒 | ★★★ |
| 19 | 玛格丽特 | Margarita | 龙舌兰 | ★★ |
| 20 | 龙舌兰日出 | Tequila Sunrise | 龙舌兰 | ★ |
| 21 | 帕洛玛 | Paloma | 龙舌兰 | ★ |
| 22 | 长岛冰茶 | Long Island Iced Tea | 其他 | ★★★ |
| 23 | 威士忌冰茶 | Whiskey Iced Tea | 其他 | ★ |
| 24 | 浓缩咖啡马天尼 | Espresso Martini | 其他 | ★★★ |
| 25 | 杏仁酸酒 | Amaretto Sour | 其他 | ★★ |
| 26 | 雨果鸡尾酒 | Hugo | 其他 | ★ |
