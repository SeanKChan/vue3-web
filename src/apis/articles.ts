
import { client } from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import { ArticleModel } from '@/model/articleModel'
import { ArticleList } from '@/model/articleList'

export const defaultArticleModel: ArticleModel = {
  id: 0,
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: 0,
  platforms: ['a-platform'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0
}

export const getArticles = (params: any) => {
  return client.request<RootObject<ArticleList<ArticleModel>>>('articles', Method.GET, params, ContentType.json)
}

export const getArticle = (id: string) => {
  return client.request<RootObject<ArticleModel>>(`articles/${id}`, Method.GET, undefined, ContentType.form)
}

export const createArticle = (data: any) => {
  return client.request<RootObject<ArticleModel>>('article/createArticle', Method.POST, data, ContentType.json)
}

export const updateArticle = (params: any) => {
  return client.request<RootObject<ArticleModel>>('article/updateArticle', Method.POST, params, ContentType.json)
}

export const deleteArticle = (id: number) => {
  return client.request<RootObject<ArticleModel>>(`articles/${id}`, Method.POST, undefined, ContentType.json)
}

export interface Pageviews {
  pageviews: any
}

export const getPageviews = (params: any) => {
  return client.request<RootObject<Pageviews>>('pageviews', Method.GET, params, ContentType.json)
}
