import React, {useEffect, useState} from "react";
import 'tailwindcss/tailwind.css';
import {SimilarArticle} from "../../types/JunctionTableApiResponse.tsx";
import ArticleCard from "./ArticleCard.tsx";

interface Prop {
  similarArticleList: SimilarArticle[]
}

export default function ArticlesContainer(prop: Prop){

  const [similarArticleList, setSimilarArticleList] = useState<SimilarArticle[]>(prop.similarArticleList)

  return (
    <div className="p-2">
      {similarArticleList.map((article: SimilarArticle) => (
        <ArticleCard article={article}/>
      ))}
      {/* Below line allows for proper scroll to the bottom*/}
      <p className="invisible">.</p>
    </div>
  )
}
