import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import ClipMe from "@/pages/clip-me";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<ClipMe />} path="/clip-me" />
        </Routes>
    );
}

export default App;
