const HomeSkeleton =
    () => {

        return (
            <div
                className="
                animate-pulse
                space-y-10
            "
            >

                <div
                    className="
                    h-[450px]
                    rounded-[32px]
                    bg-gray-200
                "
                />

                <div
                    className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-6
                "
                >

                    {[1, 2, 3].map(
                        (item) => (
                            <div
                                key={item}
                                className="
                                h-72
                                rounded-[28px]
                                bg-gray-200
                            "
                            />
                        )
                    )}

                </div>

                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                "
                >

                    {[1, 2, 3, 4].map(
                        (item) => (
                            <div
                                key={item}
                                className="
                                h-96
                                rounded-[28px]
                                bg-gray-200
                            "
                            />
                        )
                    )}

                </div>

            </div>
        );
    };

export default HomeSkeleton;