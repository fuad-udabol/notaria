import { useState, useContext } from "react";
import { AppContext } from "../../Context";

const ProcedureForm = () => {
  const { insertProcedure, procedureTypes, users } = useContext(AppContext);
  const getCurrentDate = () => {
    const pDate = new Date();
    return pDate.valueOf()/1000;
  };
  const [newProcedure, setNewProcedure] = useState();

  // Storing the Insert User Form Data.
  const addNewProcedure = (e, field) => {
    setNewProcedure({
      ...newProcedure,
      [field]: e.target.value,
      ["procedure_date"]: getCurrentDate()
    });
  };

  
  const submitProcedure = (e) => {
    insertProcedure(newProcedure);
  };
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h2>Nuevo Tramite</h2>
          <form onSubmit={submitProcedure}>
            <div className="mb-3">
              <label className="form-label">Tramite</label>
              <select id="procedure"
                onChange={(e) => addNewProcedure(e, "procedure_type_id")}
                className="form-control form-select form-select-sm"
                aria-label=".form-select-lg example"
              >
                {
                  procedureTypes.map(({ id, name }) => {
                    return (
                      <option
                        key = {id}
                        id={id}
                        value={id}
                      >{name}</option>
                    )
                  })
                }
              </select>
              <div id="emailHelp" className="form-text">Seleccione el tramite que desea realizar</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Numero de Tramite</label>
              <input
                type="number"
                id="procedureNumber"
                onChange={(e) => addNewProcedure(e, "procedure_number")}
                placeholder="Numero de Tramite"
                autoComplete="off"
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cliente</label>
              <select id="procedure"
                onChange={(e) => addNewProcedure(e, "user_id")}
                className="form-control form-select form-select-sm"
              >
                <option
                    id="-1"
                    value="-1"
                  >Seleccionar un cliente</option>
                {
                  users.map(({ id, user_name, user_last_name }) => {
                    return (
                      <option
                        key={id}
                        id={id}
                        value={id}
                      >{user_name + " "+ user_last_name}</option>
                    )
                  })
                }
              </select>
              <div id="emailHelp" className="form-text">Seleccione un cliente</div>
            </div>

            <div className="my-2"></div>
            <a href="#" onClick={(e) => { submitProcedure(e) }}
              className="btn btn-primary btn-icon-split btn-lg" >
              <span className="text">Añadir Tramite</span>
            </a>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default ProcedureForm;