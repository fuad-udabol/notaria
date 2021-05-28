import { useContext } from "react";
import { AppContext } from "./Context";
import LeftMenu from "./components/LeftMenu";
import FooterUtils from "./components/FooterUtils";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Login from "./components/Login";
const AppRouter = () => {
    const {
        session
    } = useContext(AppContext);
    return session ? (
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
    ) : (<Login/>);
}
export default AppRouter;