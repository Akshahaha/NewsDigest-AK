import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "../types";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

console.log("NEWS_API_KEY:", NEWS_API_KEY);
console.log("OPENROUTER_API_KEY:", OPENROUTER_API_KEY);

if (!OPENROUTER_API_KEY) {
  console.error("OpenRouter API key not found.");
}

if (!NEWS_API_KEY) {
  console.error("News API key not found.");
}

// Define the simple sentiment analysis function
const getSimpleSentiment = (text: string): string => {
  const positiveWords = ["great", "good", "amazing", "success", "breakthrough"];
  const negativeWords = ["fail", "disaster", "fire", "cut", "gutting"];

  const lowerText = text.toLowerCase();
  if (positiveWords.some((word) => lowerText.includes(word))) return "positive";
  if (negativeWords.some((word) => lowerText.includes(word))) return "negative";
  return "neutral";
};

export function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchAndProcessNews = async () => {
      try {
        if (!NEWS_API_KEY) {
          console.warn("Skipping news fetch due to missing NEWS_API_KEY.");
          return;
        }

      const newsResponse = await axios.get(
        `https://newsapi.org/v2/everything?q=technology&apiKey=${NEWS_API_KEY}`,
        {
          headers: {
        
            Accept: "application/json",
          },
        }
      );


        const rawArticles = newsResponse.data.articles;
const processedArticles = await Promise.all(
  rawArticles.map(async (item: any) => {
    try {
      const articleData = {
        id: item.url,
        title: item.title,
        source: item.source.name,
        url: item.url,
        published_at: new Date(item.publishedAt).toISOString(),
        raw_content: item.content || item.description || "",
        imageUrl: item.urlToImage || "",
      };

      let summary = articleData.raw_content;
      let sentiment = "neutral";
      let sentiment_explanation = "Sentiment based on AI analysis: neutral";

      if (OPENROUTER_API_KEY) {
        try {
          const openRouterResponse = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              model: "meta-llama/llama-3-8b-instruct",
              messages: [
                {
                  role: "user",
                  content: `Summarize this article and analyze its sentiment (positive, negative, or neutral):\n${
                    item.description || item.title
                  }\n\nReturn in this format:\nSummary: [summary text]\nSentiment: [positive/negative/neutral]`,
                },
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(
            "Full OpenRouter Response:",
            JSON.stringify(openRouterResponse.data, null, 2)
          );

          const content =
            openRouterResponse?.data?.choices?.[0]?.message?.content ||
            openRouterResponse?.data?.content ||
            openRouterResponse?.data?.text ||
            "No content available";
          console.log("Extracted Content:", content);

          if (content !== "No content available") {
            const lines = content.split("\n").filter(Boolean);
            const rawSummary =
              lines
                .find((line: string) => line.startsWith("Summary:"))
                ?.replace(/Summary: /gi, "") || articleData.raw_content;
            const rawSentiment =
              lines
                .find((line: string) => line.startsWith("Sentiment:"))
                ?.replace(/Sentiment: /gi, "")
                ?.toLowerCase() || "neutral";

            summary = rawSummary;
            sentiment = ["positive", "negative", "neutral"].includes(
              rawSentiment
            )
              ? rawSentiment
              : "neutral";
            sentiment_explanation = `Sentiment based on AI analysis: ${sentiment}`;
          } else {
            sentiment = getSimpleSentiment(item.description || item.title);
            sentiment_explanation = `Sentiment based on keyword analysis: ${sentiment}`;
          }
        } catch (openRouterError: any) {
          console.error(
            "OpenRouter Error:",
            openRouterError.response?.data || openRouterError.message
          );
          sentiment = getSimpleSentiment(item.description || item.title);
          sentiment_explanation = `Sentiment based on keyword analysis: ${sentiment}`;
        }
      } else {
        sentiment = getSimpleSentiment(item.description || item.title);
        sentiment_explanation = `Sentiment based on keyword analysis: ${sentiment}`;
      }

      return {
        id: articleData.id,
        title: articleData.title,
        source: articleData.source,
        summary: summary,
        sentiment: sentiment,
        sentiment_explanation: sentiment_explanation,
        url: articleData.url,
        imageUrl: articleData.imageUrl,
      };
    } catch (innerError) {
      console.error("Error processing single article:", innerError);
      return null;
    }
  })
);

        setArticles(processedArticles.filter(Boolean));
      } catch (error) {
        console.error("Error processing news:", error);
      }
    };

    fetchAndProcessNews();
  }, []);

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <h2 className='text-3xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-6 rounded-lg shadow-lg text-center'>
        🌍 NEWS DIGEST 🚀
      </h2>

      <div className='space-y-6'>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
