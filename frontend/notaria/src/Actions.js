import { useEffect, useState } from "react";
import moment from "moment";
export const Actions = () => {
  //Users related
  let [users, setUsers] = useState([]);
  let [userLength, setUserLength] = useState(null);

  //Procedures Related
  let [procedures, setProcedures] = useState([]);
  let [proceduresLength, setProceduresLength] = useState(null);
  let [procedureTypes, setProcedureTypes] = useState([]);

  let [proceduresCount, setProceduresCount] = useState([]);

  let [currentPage, setCurrentPage] = useState(0);

  //Effects
  useEffect(() => {
    switch (currentPage) {
      case 0:
        loadProceduresCount();
        break;
      case 1:
        loadUsers();
        break;
      case 2:
        loadProcedures();
        break;
      case 3:
        loadProcedureTypes();
        loadUsers();
        break;
      default:
        setCurrentPage(0);
    }
  }, [currentPage]);

  //Procedures
  const loadProceduresCount = () => {
    fetch("http://192.168.0.106/notaria/backend/procedures/all-procedures-count-home.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setProceduresCount(data.procedures.reverse());
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const loadProcedures = () => {
    fetch("http://192.168.0.106/notaria/backend/procedures/all-procedures.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProcedures(data.procedures.reverse());
          setProceduresLength(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadProcedureTypes = () => {
    fetch("http://192.168.0.106/notaria/backend/procedures/all-procedure-types.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProcedureTypes(data.procedure_types.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editProcedureMode = (id) => {
    procedures = procedures.map((procedure) => {
      if (procedure.id === id) {
        procedure.isEditing = true;
        return procedure;
      }
      procedure.isEditing = false;
      return procedure;
    });
    setUsers(procedures);
  };

  const cancelProcedureEdit = (id) => {
    procedures = users.map((procedure) => {
      if (procedure.id === id) {
        procedure.isEditing = false;
        return procedure;
      }
      return procedure;
    });
    setProcedures(procedures);
  };
  const loadUsers = () => {
    fetch("http://192.168.0.106/notaria/backend/users/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users.reverse());
          setUserLength(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getDate = (isoDate) => {
    const procedureDate = new Date(isoDate * 1000).toLocaleString();
    return moment(procedureDate).format('DD/MM/YYY HH:mm:ss');
  };
  const insertProcedure = (newProcedure) => {
    fetch("http://192.168.0.106/notaria/backend/procedures/add-procedure.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProcedure),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id && data.date) {
          alert(getDate(data.date));
          setProcedures([
            {
              id: data.id,
              ...newProcedure,
            },
            ...procedures,
          ]);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertUser = (newUser) => {
    fetch("http://192.168.0.106/notaria/backend/users/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  const updateUser = (userData) => {
    console.log(userData);
    fetch("http://192.168.0.106/notaria/backend/users/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_last_name = userData.user_last_name;
              user.user_ci = userData.user_ci;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProcedure = (theID) => {
    let procedureDeleted = procedures.filter((procedure) => {
      return procedure.id !== theID;
    });
    fetch("http://192.168.0.106/notaria/backend/procedures/delete-procedure.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProcedures(procedureDeleted);
          if (procedures.length === 1) {
            setProceduresLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (theID) => {
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("http://192.168.0.106/notaria/backend/users/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
    proceduresLength,
    procedures,
    editProcedureMode,
    cancelProcedureEdit,
    deleteProcedure,
    currentPage,
    setCurrentPage,
    procedureTypes,
    insertProcedure,
    proceduresCount
  };
};