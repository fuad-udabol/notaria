import { useState, useContext } from "react";
import { AppContext } from "../../Context";
const ClientForm = () => {
  const { insertUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({});

  // Storing the Insert User Form Data.
  const addNewUser = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  // Inserting a new user into the Database.
  const submitUser = (e) => {
    insertUser(newUser);
  };

  return (
    <div className="col-xl-4 col-lg-5">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <form className="insertForm" onSubmit={submitUser}>
            <h2>Nuevo Cliente</h2>
            <label htmlFor="_name">Nombre</label>
            <input
              type="text"
              id="_name"
              onChange={(e) => addNewUser(e, "user_name")}
              placeholder="Nombre"
              autoComplete="off"
              required
              className="form-control"
            />
            <label htmlFor="_name">Apellido</label>
            <input
              type="text"
              id="_name"
              onChange={(e) => addNewUser(e, "user_last_name")}
              placeholder="Apellido"
              autoComplete="off"
              required
              className="form-control"
            />
            <label htmlFor="_name">Carnet de Identidad</label>
            <input
              type="text"
              id="_name"
              onChange={(e) => addNewUser(e, "user_ci")}
              placeholder="Carnet de Identidad"
              autoComplete="off"
              required
              className="form-control"
            />
            <label htmlFor="_email">Correo Electrónico</label>
            <input
              type="email"
              id="_email"
              onChange={(e) => addNewUser(e, "user_email")} 
              placeholder="Introducir Correo Electrónico"
              autoComplete="off"
              required
              className="form-control"
            />
            {/* <input type="submit" value="Añadir" /> */}
            <div className="my-2"></div>
            <a href="#" onClick={(e) => { submitUser(e) }}
              className="btn btn-primary btn-icon-split btn-lg" >
              <span className="text">Añadir cliente</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;