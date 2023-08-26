import {Home} from "./atomic/pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./atomic/pages/NotFound.jsx";
import {Section} from "./atomic/pages/Section.jsx";

export const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/section/:sectionId" element={<Section />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)
