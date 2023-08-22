import React from "react";
import 'tailwindcss/tailwind.css';
import {SimilarArticle} from "../../types/JunctionTableApiResponse.tsx";

interface Prop {
  article: SimilarArticle
}

const truncateString = (text: string, maxLength: number): string => {
  const words: string[] = text.split(' ');
  if (words.length <= maxLength) {
    return text;
  } else {
    const truncatedWords = words.slice(0, maxLength);
    return truncatedWords.join(' ') + '...';
  }
}
export default function ArticleCard({article}: Prop){

  return (
    <div className="mb-4 bg-gray-50 cursor-pointer rounded-md">
      <div className="p-3">
        <a href={article.link} style={{all: "unset"}} target="_blank">
          <p className="text-lg">{article.title}</p>
          <p className="italic text-sm mb-1">{truncateString(article.description, 5)}</p>
        </a>
      </div>
    </div>
  )
}
