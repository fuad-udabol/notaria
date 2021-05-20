import { useContext } from "react";
import { AppContext } from "../Context"

const LeftMenu = () => {
    const {
        setCurrentPage
      } = useContext(AppContext);
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">Notaría<sup>14</sup></div>
                    </a>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={() => { setCurrentPage(0) }}>
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Inicio</span></a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">
                        Clientes
                    </div>

                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => { setCurrentPage(1) }}>
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Clientes</span></a>
                    </li>

                    <div className="sidebar-heading">
                        Tramites
                    </div>

                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => { setCurrentPage(2) }}>
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Ver todos los tramites</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => { setCurrentPage(3) }}>
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Anadir un nuevo tramite</span></a>
                    </li>

                </ul>
    );
}; 
export default LeftMenu;