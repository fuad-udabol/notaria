import { useState, useContext } from "react";
import { AppContext } from "../Context";
const Login = () => {
    const { loginAttempt } = useContext(AppContext);
    const [newLogin, setLogin] = useState({});
    const addNewUserLogin = (e, field) => {
        setLogin({
          ...newLogin,
          [field]: e.target.value,
        });
      };
      const submitUserLogin = (e) => {
        loginAttempt(newLogin);
      };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Bienvenido</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail" 
                                                    aria-describedby="emailHelp"
                                                    placeholder="Correo Electronico..."
                                                    required
                                                    onChange={(e) => addNewUserLogin(e, "user_email")}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    required 
                                                    placeholder="Contrasena"
                                                    onChange={(e) => addNewUserLogin(e, "password")}
                                                />
                                            </div>
                                            <a 
                                            href="#" 
                                            onClick={(e) => { submitUserLogin(e) }}
                                            className="btn btn-primary btn-user btn-block">
                                                Entrar
                                            </a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;