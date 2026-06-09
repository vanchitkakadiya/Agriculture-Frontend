// src/layouts/MainLayout.tsx

import Header from "../components/layout/Header";

import Footer from "../components/layout/Footer";

import FloatingButtons from "../components/common/FloatingButtons";

import { useHomeCms } from "../hooks/useHomeCms";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({
    children,
}: Props) => {

    const {
        data,
    } = useHomeCms();

    return (
        <div
            className="
            min-h-screen
            flex
            flex-col
        "
        >

            <Header />

            <main className="flex-1">

                {children}

            </main>

            {/* FOOTER */}
            <Footer
                contactInfo={
                    data?.contact_info
                }
                socialLinks={
                    data?.social_links ||
                    []
                }
            />

            <FloatingButtons />

        </div>
    );
};

export default MainLayout;