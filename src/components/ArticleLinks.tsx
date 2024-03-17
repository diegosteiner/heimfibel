import type { CollectionEntry } from "astro:content";
import React, { useState, useEffect, useMemo } from "react";
import type { Locale } from "../i18n";

export function ArticleList({ articles, locale }: { articles: CollectionEntry<"articles">[]; locale: Locale }) {
  const [showAll, setShowAll] = useState(false);
  const shuffledArticles = useMemo(() => articles.sort(() => 0.5 - Math.random()), [articles])

  return (
    <ul className="links">
      {shuffledArticles.slice(0, 3).map((link) => (
        <ArticleLink key={link.id} article={link} locale={locale}></ArticleLink>
      ))}
      {shuffledArticles.length > 3 &&
        showAll &&
        shuffledArticles
          .slice(3, -1)
          .map((link) => <ArticleLink key={link.id} article={link} locale={locale}></ArticleLink>)}
      {shuffledArticles.length > 3 && !showAll && <li><button className="showAll" onClick={() => setShowAll(true)}>&hellip;</button></li>}
    </ul>
  );
}

function ArticleLink({ article, locale }: { article: CollectionEntry<"articles">; locale: Locale }) {
  return (
    <li>
      <a href={`/${locale}/articles/${article.slug?.toLowerCase()}`}>{article.data?.title}</a>
    </li>
  );
}
