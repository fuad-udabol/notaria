import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Form = () => {
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
    e.preventDefault();
    insertUser(newUser);
    e.target.reset();
  };

  return (
    <form className="insertForm" onSubmit={submitUser}>
      <h2>Nuevo Cliente</h2>
      <label htmlFor="_name">Nombre</label>
      <input
        type="text"
        id="_name"
        onChange={(e) => addNewUser(e, "user_name")}
        placeholder="Introducir Nombre Completo"
        autoComplete="off"
        required
      />
      <label htmlFor="_email">Correo Electrónico</label>
      <input
        type="email"
        id="_email"
        onChange={(e) => addNewUser(e, "user_email")}
        placeholder="Introducir Correo Electrónico"
        autoComplete="off"
        required
      />
      <input type="submit" value="Añadir" />
    </form>
  );
};

export default Form;