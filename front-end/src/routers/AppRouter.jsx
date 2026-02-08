import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LandingPage from "@/pages/LandingPage";
import PrakerinPage from "@/pages/PrakerinPage";
import LearningHubPage from "@/pages/LearningHubPage";
import LearningPathDetail from "@/pages/LearningPathDetail";
import PanduanPage from "@/pages/PanduanPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="prakerin" element={<PrakerinPage />} />
                    <Route path="prakerin/panduan" element={<PanduanPage />} />
                    <Route path="learning" element={<LearningHubPage />} />
                    <Route path="learning/path/:id" element={<LearningPathDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
