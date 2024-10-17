import React from "react";
import NewsCard from "../../../components/content/news/NewsCard";

import ListPage from "../profileComponents/ListPage";

const MyNews = () => {
  return (
    <ListPage
      entityType="news"
      CardComponent={NewsCard}
      path="profile/news"
      cardPropsName="news"
    />
  );
};

export default MyNews;
