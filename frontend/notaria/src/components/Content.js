import { useContext } from "react";
import { AppContext } from "../Context";
import Home from "./Home";
import Clients from "./client/Clients";
import Procedures from "./procedure/Procedures";
import ProcedureForm from "./procedure/ProcedureForm";
const Content = () => {
    const {
        currentPage
    } = useContext(AppContext);
    switch (currentPage) {
        case 0:
            return (<Home/>);
        case 1:
            return (<Clients/>);
        case 2:
            return (<Procedures/>);
        case 3:
            return (<ProcedureForm />);
        default: 
            return (<Home />)
    }
};
export default Content;