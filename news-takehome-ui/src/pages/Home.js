import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import NewsCard from "../components/NewsCard";
import { getTopNews } from "../api/news";

const Home = () => {
  const [newsArticles, setNewsArticles] = useState(null);
  useEffect(() => {
    getTopNews().then((res) => {
      setNewsArticles(res.payload.articles);
    });
  }, []);
  return (
    <Container>
      <Stack>
        <h1>Top News</h1>
        {newsArticles === null
          ? "Loading..."
          : newsArticles.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
      </Stack>
    </Container>
  );
};

export default Home;
