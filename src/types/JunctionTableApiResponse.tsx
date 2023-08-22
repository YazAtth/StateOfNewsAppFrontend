
export interface SimilarArticle {
  article_id: number
  title: string
  link: string
  description: string
}

export default interface JunctionTableApiResponse {
  databaseQueryStatus: number
  similarArticleList?: SimilarArticle[]
}