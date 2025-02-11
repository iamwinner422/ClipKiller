import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ClipMe from "@/pages/clip-me";
import NotFoundPage from "@/pages/not-found";

function App() {
    return (
        <Routes>
            <Route element={<ClipMe />} path="/" />
            <Route element={<IndexPage />} path="/ai-clip" />
            <Route element={<NotFoundPage />} path="*" />
        </Routes>
    );
}

export default App;
