import { useContext, useState } from "react";
import { AppContext } from "../../Context";
import ClientForm from "./ClientForm";

const Clients = () => {
    const {
        users,
        userLength,
        editMode,
        cancelEdit,
        updateUser,
        deleteUser,
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
        editMode(id);
    };

    const deleteConfirm = (id) => {
        if (window.confirm("Estas seguro?")) {
            deleteUser(id);
        }
    };
    return !userLength ? (
        <p>{userLength === null ? "Cargando..." : "Añadir Clientes"}</p>
    ) : (
        <div className="row">
            <ClientForm />
            <div className="col-xl-8 col-lg-7">
                <div className="container-fluid">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="h3 mb-0 text-gray-800">Clientes</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Carnet de Identidad</th>
                                            <th>Correo</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(({ id, user_name, user_email, user_last_name, user_ci, isEditing }) => {
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
                                                            defaultValue={user_last_name}
                                                            onChange={(e) => updateNewData(e, "user_last_name")}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            defaultValue={user_ci}
                                                            onChange={(e) => updateNewData(e, "user_ci")}
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="email"
                                                            defaultValue={user_email}
                                                            onChange={(e) => updateNewData(e, "user_email")}
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
                                                    <a href="#" className="btn btn-warning" onClick={() => cancelEdit(id)}>
                                                        <span className="icon text-white-50">
                                                            <i className="fas fa-exclamation-circle"></i>
                                                        </span>
                                                        <span className="text">Cancelar</span>
                                                    </a>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={id}>
                                                    <td>{user_name}</td>
                                                    <td>{user_last_name}</td>
                                                    <td>{user_ci}</td>
                                                    <td>{user_email}</td>
                                                    <td>
                                                        <a href="#" className="btn btn-success" onClick={() => enableEdit(id, user_name, user_last_name, user_ci, user_email)}>
                                                            <span className="icon text-white-50">
                                                                <i className="fas fa-check"></i>
                                                            </span>
                                                            <span className="text">Editar</span>
                                                        </a>
                                                           
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

export default Clients;