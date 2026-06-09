//components/product/ProductSkeleton.tsx
const ProductSkeleton = () => {

    return (
        <div
            className="
            animate-pulse
            bg-white
            rounded-3xl
            overflow-hidden
            border
        "
        >

            <div
                className="
                aspect-square
                bg-gray-200
            "
            />

            <div className="p-5 space-y-3">

                <div
                    className="
                    h-3
                    w-20
                    bg-gray-200
                    rounded
                "
                />

                <div
                    className="
                    h-5
                    w-full
                    bg-gray-200
                    rounded
                "
                />

                <div
                    className="
                    h-5
                    w-1/2
                    bg-gray-200
                    rounded
                "
                />

            </div>

        </div>
    );
};

export default ProductSkeleton;