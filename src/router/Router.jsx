import {Home} from "../atomic/pages/Home.jsx";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "../atomic/pages/NotFound.jsx";
import {Section} from "../atomic/pages/Section.jsx";
import {RoutePaths} from "./RoutePaths.js";
import {Layout} from "./Layout.jsx";
import {Export} from "../atomic/pages/Export.jsx";
import {Import} from "../atomic/pages/Import.jsx";
import {Options} from "../atomic/pages/Options.jsx";

const ROUTES_COMPONENTS = {
  [RoutePaths.HOME]: (
    <Layout>
      <Home />
    </Layout>
  ),
  [RoutePaths.SECTION]: (
    <Layout>
      <Section />
    </Layout>
  ),
  [RoutePaths.EXPORT]: (
    <Layout>
      <Export />
    </Layout>
  ),
  [RoutePaths.IMPORT]: (
    <Layout>
      <Import />
    </Layout>
  ),
  [RoutePaths.OPTIONS]: (
    <Layout>
      <Options />
    </Layout>
  ),
}

export const MainRoutes = () => (
  <Routes>
    {Object.entries(ROUTES_COMPONENTS).map(([path, element  ]) => (
      <Route key={path} path={path} element={element}/>
    ))}
    <Route path="*" element={<NotFound />} />
  </Routes>
)
