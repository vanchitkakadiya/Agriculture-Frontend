
import {
  useTranslation,
} from "react-i18next";

import ImageWithFallback from "../common/ImageWithFallback";
import type {Product} from "../../types/home.ts";

type Props = {
  product: Product;
};

const ProductHighlightCard = ({
  product,
}: Props) => {
  const { i18n } =
    useTranslation();

  const isHindi =
    i18n.language === "hi";

  return (
    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        border
        border-gray-200
        hover:shadow-xl
        transition
      "
    >
      <ImageWithFallback
        src={product.primary_image}
        alt={
          isHindi
            ? product.title_hi
            : product.title_en
        }
        className="
          w-full
          h-60
          object-cover
        "
      />

      <div className="p-5">
        <p
          className="
            text-xs
            uppercase
            text-gray-400
            mb-2
          "
        >
          {isHindi
            ? product.category_hi
            : product.category_en}
        </p>

        <h3
          className="
            text-lg
            font-semibold
          "
        >
          {isHindi
            ? product.title_hi
            : product.title_en}
        </h3>

        <div
          className="
            flex
            items-center
            justify-between
            mt-4
          "
        >
          <p
            className="
              text-green-700
              font-bold
              text-xl
            "
          >
            {product.price}
          </p>

          <button
            className="
              bg-green-700
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlightCard;