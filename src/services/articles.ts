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

 return response.data
}

type TranslatedArticle = {
  id: number;
	sort: number;
  locale: string;
  title: string;
  content: string;
  topic: TranslatedTopic;
  tags: TranslatedTag[];
}

type TranslatedTopic = {
  id: number;
	sort: number;
  name: string;
  locale: string;
}

type TranslatedTag = {
  id: number;
  sort: number;
  label: string;
	locale: string;
  color: string;
}

export async function getTranslatedArticles() {
  const translatedArticles: TranslatedArticle[] = []
  const translatedTopics: TranslatedTopic[] = []
  const articleData = await getArticleData()

  articleData.forEach(article => {
    console.log(article);
    Array.from(article.translations).forEach((articleTranslation) => {
      const locale = articleTranslation.languages_code.code;
      const translatedArticle = {
        id: article.id, 
        sort: article.sort,
        locale,
        title: articleTranslation.title,
        content: articleTranslation.content,
        topic: { id: article.topic.id, name: article.topic.topics_translations[locale]&.name },
        tags: []
      }
      translatedArticles.push(translatedArticle)
    });
  });

  return translatedArticles
}

