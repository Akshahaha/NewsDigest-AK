// functions/news.js (or news.ts)
const axios = require("axios"); // or import axios from 'axios' if using ES modules

exports.handler = async function () {
  try {
    const apiKey = process.env.VITE_NEWS_API_KEY; // Use environment variable
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
