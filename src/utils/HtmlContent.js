import React from "react";
import parse from "html-react-parser";

const addBaseUrlToImageSrc = (html) => {
  const baseUrl = "https://it-park.kz/";

  return html.replace(/<img\s+([^>]*src=")(\/[^"]*)"/g, (match, p1, p2) => {
    return `<img ${p1}${baseUrl}${p2}"`;
  });
};

const HtmlContent = ({ content }) => {
  const processedContent = addBaseUrlToImageSrc(content);
  return <div>{parse(processedContent)}</div>;
};

export default HtmlContent;
