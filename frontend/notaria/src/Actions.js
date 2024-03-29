import { useEffect, useState } from "react";
export const Actions = () => {
  //Users related
  let [users, setUsers] = useState([]);
  let [usersWithPrivilegies, setUsersWithPrivilegies] = useState([]);
  let [userLength, setUserLength] = useState(null);

  //Procedures Related
  let [procedures, setProcedures] = useState([]);
  let [proceduresLength, setProceduresLength] = useState(null);
  let [procedureTypes, setProcedureTypes] = useState([]);

  let [proceduresCount, setProceduresCount] = useState([]);

  let [currentPage, setCurrentPage] = useState(0);

  let [session, setSession] = useState(null);
  let [filteredUser, setFilteredUser] = useState(null);
  const start = new Date();
  start.setDate(start.getDate()-7);
  let [startDate, setStartDate] = useState(start);
  let [endDate, setEndDate] = useState(new Date());

  //Effects
  useEffect(() => {
    setSession(sessionStorage.getItem("userId"));
    switch (currentPage) {
      case 0:
        if (startDate !== endDate) {
          loadProceduresCount(filteredUser, startDate, endDate);
        }
        loadUsersWithPrivilegies();
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
  }, [currentPage, filteredUser, startDate, endDate]);
  const removeSession = () => {
    sessionStorage.removeItem("userId");
    setSession(null);
  };
  //Procedures
  const loadProceduresCount = (userId, startDate, endDate) => {
    fetch("http://192.168.0.102/notaria/backend/procedures/all-procedures-count-home.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          startDate: startDate.valueOf()/1000,
          endDate: endDate.valueOf()/1000
        })
      }
    ).then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === 1) {
          setProceduresCount(data.procedures.reverse());
        } else if(data.success === 0){
          setFilteredUser(null);
        } else if(data.success === 3){
          setFilteredUser(null);
          alert("Se mostrará el total de trámites");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadProcedures = () => {
    fetch("http://192.168.0.102/notaria/backend/procedures/all-procedures.php")
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
    fetch("http://192.168.0.102/notaria/backend/procedures/all-procedure-types.php")
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
  const loadUsersWithPrivilegies = () => {
    fetch("http://192.168.0.102/notaria/backend/users/all-users-with-privilegies.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsersWithPrivilegies(data.users.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const loadUsers = () => {
    fetch("http://192.168.0.102/notaria/backend/users/all-users.php")
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
    //return moment(procedureDate).format('DD/MM/YYY HH:mm:ss');
    return procedureDate;
  };
  const insertProcedure = (newProcedure) => {
    fetch("http://192.168.0.102/notaria/backend/procedures/add-procedure.php", {
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
  const loginAttempt = (userLogin) => {
    fetch("http://192.168.0.102/notaria/backend/users/login-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success && data.user.length === 1) {
        sessionStorage.setItem("userId", data.user[0].id);
        sessionStorage.setItem("userName", data.user[0].user_name + " " + data.user[0].user_last_name);
        setSession(data.user[0].id);
      } else {
        alert("Usuario inválido");
      }
    }).catch((res) => {
      console.log(res);
    });
  };
  const insertUser = (newUser) => {
    fetch("http://192.168.0.102/notaria/backend/users/add-user.php", {
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
    fetch("http://192.168.0.102/notaria/backend/users/update-user.php", {
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
    fetch("http://192.168.0.102/notaria/backend/procedures/delete-procedure.php", {
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
    fetch("http://192.168.0.102/notaria/backend/users/delete-user.php", {
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
    proceduresCount,
    session,
    removeSession,
    loginAttempt,
    setFilteredUser,
    usersWithPrivilegies,
    setStartDate,
    setEndDate,
    startDate,
    endDate
  };
};