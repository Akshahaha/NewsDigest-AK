export interface Article {
  id: string;
  title: string;
  source: string;
  summary: string;
  sentiment: string;
  sentiment_explanation?: string;
  url: string;
  imageUrl: string;
}
