import { useContext } from "react";
import { AppContext } from "../Context";
const FooterUtils=()=> {
    const {
        removeSession
    } = useContext(AppContext);
    return (
        <div >
        <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Esta seguro?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Presione salir para cerrar la sesion.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                            <a className="btn btn-primary" href="#" data-dismiss="modal" onClick={() => { removeSession() }}>Salir</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FooterUtils;