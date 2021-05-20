import { Provider } from "./Context";
import LeftMenu from "./components/LeftMenu";
import FooterUtils from "./components/FooterUtils";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import { Actions } from "./Actions";
function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="App">
        <div id="wrapper">
          <LeftMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <NavBar />
              <Content />
            </div>
            <Footer />
          </div>
          <FooterUtils />
        </div>
      </div>
    </Provider>
  );
}

export default App;