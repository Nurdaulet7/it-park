import React, { useEffect } from "react";
import { scrollToTop } from "../utils/scrollToTop";
import "./FirstItPark.scss";
import ImageCard from "../components/image-card/ImageCard";
import t1 from "../images/techno1.jpeg";
import t2 from "../images/techno2.jpg";
import t3 from "../images/techno3.jpg";
import t4 from "../images/techno4.jpeg";
import t5 from "../images/techno5.jpg";
import b1 from "../images/business1.jpg";
import b2 from "../images/business2.jpg";
import f1 from "../images/freeZone1.jpeg";
import f2 from "../images/freeZone2.jpg";
import f3 from "../images/freeZone3.jpg";
import v1 from "../images/videoZone.jpeg";
import c1 from "../images/coworking1.jpg";
import c2 from "../images/coworking2.jpeg";
import c3 from "../images/coworking3.jpeg";
import c4 from "../images/coworking4.jpeg";
import c5 from "../images/coworking5.jpeg";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FirstItPark = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const imagesGroup1 = [
    { src: t1 },
    { src: t2 },
    { src: t3 },
    { src: t4 },
    { src: t5 },
  ];

  const imagesGroup2 = [{ src: b1 }, { src: b2 }];

  const imagesGroup3 = [{ src: f1 }, { src: f2 }, { src: f3 }];

  const imagesGroup4 = [{ src: v1 }];

  const imagesGroup5 = [
    { src: c1 },
    { src: c2 },
    { src: c3 },
    { src: c4 },
    { src: c5 },
  ];

  const allImages = [
    {
      img: imagesGroup1,
      titles: {
        en: "Tech Laboratory",
        ru: "Техно-лаборатория",
        kk: "Техно-зертхана",
      },
    },
    {
      img: imagesGroup2,
      titles: {
        en: "Business Agreement Zone",
        ru: "Зона бизнес-соглашений",
        kk: "Бизнес келісімдер аймағы",
      },
    },
    {
      img: imagesGroup3,
      titles: {
        en: "Free Discussion Zone",
        ru: "Free-зона для обсуждения",
        kk: "Талқылау аймағы (Free-зона)",
      },
    },
    {
      img: imagesGroup4,
      titles: {
        en: "Photo-Video Zone",
        ru: "Фото-видео зона",
        kk: "Фото-бейне аймағы",
      },
    },
    {
      img: imagesGroup5,
      titles: {
        en: "Coworking Zone",
        ru: "Коворкинг зона",
        kk: "Коворкинг аймағы",
      },
    },
  ];

  return (
    <div className=" grid grid--3 container it--container">
      {allImages.map((images, index) => (
        <ImageCard
          key={index}
          images={images.img} // Passing the image array
          galleryId={`gallery-${index}`}
          titles={images.titles} // Passing the titles object
        />
      ))}
    </div>
  );
};

export default FirstItPark;
