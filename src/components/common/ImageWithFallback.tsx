import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const fallback =
  "https://via.placeholder.com/600x400?text=No+Image";

const ImageWithFallback = ({
  src,
  alt,
  className,
}: Props) => {
  const [img, setImg] =
    useState(src);

  return (
    <img
      src={img}
      alt={alt}
      loading="lazy"
      onError={() =>
        setImg(fallback)
      }
      className={className}
    />
  );
};

export default ImageWithFallback;