import { Directus } from "@directus/sdk";

export async function getArticleData() {
  const directus = new Directus(import.meta.env.PUBLIC_DIRECTUS_URL);
  const response = await directus.graphql.items(`query {
  articles {
    id
    status
    date_created
    topic {
      id
      sort
      translations {
        languages_code {
          code
        }       
        title
      }
      translations_func {
        count
      }
    }
    translations {
      languages_code {
          code
        }  
      title
      content
    }
    tags {
      tags_id {
        id
        sort
        color
        translations {
          languages_code {
            code
          }  
          name
        }
      }
    }
  } 
}`);

 return response.data.articles
}

export type TranslatedArticle = {
  id: string;
	sort: number | null;
  locale: string;
  title: string;
  content: string;
  topic: TranslatedTopic;
  tags: TranslatedTag[];
}

export type TranslatedTopic = {
  id: string;
	sort: number | null;
  name: string;
  locale: string;
}

export type TranslatedTag = {
  id: string;
  sort: number | null;
  label: string;
	locale: string;
  color: string | null;
}

export async function getTranslatedArticles() {
  const translatedArticles: TranslatedArticle[] = []
  const translatedTopics: TranslatedTopic[] = []
  const articleData = await getArticleData()

  Array.from(articleData).forEach(article => {
    Array.from(article.translations).forEach((articleTranslation) => {
      const locale = articleTranslation.languages_code.code;
      const topicTranslation = Array.from(article.topic?.translations || []).find(tt => tt.languages_code.code == locale)
      const tagTranslations = Array.from(article.tags).map(tag => translatedTag(tag, locale))
      const translatedArticle = {
        id: article.id, 
        sort: article.sort,
        locale,
        title: articleTranslation.title,
        content: articleTranslation.content,
        topic: { id: article.topic?.id, name: topicTranslation?.name },
        tags: tagTranslations
      };
      translatedArticles.push(translatedArticle as unknown as TranslatedArticle)
    });
  });

      // console.log(translatedArticles)
  return translatedArticles
}

function translatedTag(tag: object, locale: string): TranslatedTag {
  const translation = Array.from(tag.tags_id.translations || []).find(tt => tt.languages_code.code == locale) || tag.translations?.[0];
  console.log(tag.tags_id.translations)
  return { id: tag.id, sort: tag.sort, color: tag.color, locale, label: translation?.name }
}
