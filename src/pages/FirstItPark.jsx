import React, { useEffect } from "react";
import { scrollToTop } from "../utils/scrollToTop";

const FirstItPark = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <h2>First IT Park Section</h2>
      <p>Content for the First IT Park section...</p>
    </div>
  );
};

export default FirstItPark;
