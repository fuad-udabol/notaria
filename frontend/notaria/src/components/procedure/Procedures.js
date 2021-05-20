import { useContext, useState } from "react";
import { AppContext } from "../../Context";
import moment from "moment";
const Procedures = () => {
    const {
        procedures,
        proceduresLength,
        editProcedureMode,
        cancelProcedureEdit,
        updateUser,
        deleteProcedure,
    } = useContext(AppContext);
    // Storing users new data when they editing their info.
    const [newData, setNewData] = useState({});

    const saveBtn = () => {
        updateUser(newData);
    };

    const updateNewData = (e, field) => {
        setNewData({
            ...newData,
            [field]: e.target.value,
        });
    };

    const enableEdit = (id, user_name, user_last_name, user_ci, user_email) => {
        setNewData({ id, user_name, user_last_name, user_ci, user_email });
        editProcedureMode(id);
    };

    const deleteConfirm = (id) => {
        if (window.confirm("Estas seguro?")) {
            deleteProcedure(id);
        }
    };
    const getDate = (isoDate) => {
        const procedureDate = new Date(isoDate*1000).toLocaleString();
        return moment(procedureDate).format('DD/MM/YYY HH:mm:ss');
    };
    return !proceduresLength ? (
        <p>{proceduresLength === null ? "Cargando..." : "Añadir Procedimiento"}</p>
    ) : (
        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="container-fluid">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="h3 mb-0 text-gray-800">Tramite</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Tramite</th>
                                            <th>Tramite</th>
                                            <th>Numero de Tramite</th>
                                            <th>Fecha</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {procedures.map(({ id, name, user_name, user_last_name, procedure_number, procedure_date, isEditing }) => {
                                            return isEditing === true ? (
                                                <tr key={id}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            defaultValue={user_name}
                                                            onChange={(e) => updateNewData(e, "user_name")}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            defaultValue={procedure_number}
                                                            onChange={(e) => updateNewData(e, "procedure_number")}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            defaultValue={procedure_date}
                                                            onChange={(e) => updateNewData(e, "procedure_date")}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            defaultValue={user_name}
                                                            onChange={(e) => updateNewData(e, "user_name")}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                    <a href="#" class="btn btn-success" onClick={() => saveBtn()}>
                                                        <span className="icon text-white-50">
                                                            <i className="fas fa-check"></i>
                                                        </span>
                                                        <span className="text">Guardar</span>
                                                    </a>
                                                    <a href="#" className="btn btn-warning" onClick={() => cancelProcedureEdit(id)}>
                                                        <span className="icon text-white-50">
                                                            <i className="fas fa-exclamation-circle"></i>
                                                        </span>
                                                        <span className="text">Cancelar</span>
                                                    </a>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={id}>
                                                    <td>{name}</td>
                                                    <td>{user_name + " " + user_last_name}</td>
                                                    <td>{procedure_number}</td>
                                                    <td>{getDate(procedure_date)}</td>
                                                    <td>   
                                                        <a href="#" className="btn btn-danger" onClick={() => deleteConfirm(id)}>
                                                            <span className="icon text-white-50">
                                                                <i className="fas fa-trash"></i>
                                                            </span>
                                                            <span className="text">Borrar</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Procedures;