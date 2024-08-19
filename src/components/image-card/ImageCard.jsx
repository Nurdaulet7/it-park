import React, { useEffect } from "react";
import { Fancybox as FancyboxNative } from "@fancyapps/ui";
import { useIntl } from "react-intl";

const ImageCard = ({ images, galleryId, titles }) => {
  const { locale } = useIntl();

  useEffect(() => {
    FancyboxNative.bind(`[data-fancybox="${galleryId}"]`, {});

    return () => {
      FancyboxNative.destroy();
    };
  }, [galleryId]);

  const title = titles[locale.slice(0, 2)] || titles["en"];

  return (
    <div className="image-card">
      {/* Image preview, clicking it opens the gallery */}
      <a href={images[0].src} data-fancybox={galleryId}>
        <img src={images[0].src} alt="Thumbnail" loading="lazy" />
        <h4>{title}</h4>
      </a>
      {images.slice(1).map((image, index) => (
        <a
          key={index}
          href={image.src}
          data-fancybox={galleryId}
          style={{ display: "none" }}
        >
          <img
            src={image.src}
            alt={`Gallery image ${index + 1}`}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
};

export default ImageCard;
