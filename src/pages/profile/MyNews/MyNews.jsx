import React from "react";
import NewsCard from "../../../components/content/news/NewsCard";

import ListPage from "../MyProfile/ListPage";

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
