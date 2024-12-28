import { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContextVariables from "./context/ContextVariables";

import Saas from "./pages/Saas/Saas";
import SaasNav from "./components/Navbar/SaasNav";
import Footer from "./components/Footer/Footer";


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const { hideContact } = useContext(ContextVariables);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const setDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    setDimensions();
  }, [window.innerWidth]);

  return (
    <BrowserRouter>
      <main
        id="App"
        className="scrollable"
        style={{ width: width, height: height }}
      >
        {/* <SaasNav /> */}
        <Routes>
          <Route path={"/*"} element={<Saas />} />
          
        </Routes>
        {/* <Footer /> */}
      </main>
    </BrowserRouter>
  );
}

export default App;
