import React, { useEffect } from "react";
import { scrollToTop } from "../utils/scrollToTop";

const AboutUs = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div>
      <h2>About Us Section</h2>
      <p>Content for the About Us section...</p>
    </div>
  );
};

export default AboutUs;
