//C:\Users\sanjay\Downloads\project\src\components\ArticleCard.tsx

import { Share2, Bookmark, ExternalLink, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const sentimentIcon = {
    positive: <ThumbsUp className="h-5 w-5 text-green-500" />,
    negative: <ThumbsDown className="h-5 w-5 text-red-500" />,
    neutral: <Minus className="h-5 w-5 text-gray-500" />
  }[article.sentiment];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{article.source}</span>
          <div className="flex items-center space-x-1">
            {sentimentIcon}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.summary}</p>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-5 w-5" />
            <span>Read More</span>
          </a>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}