import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../services/serviceAPI";
import "./styles/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const [inputsState, setInputsState] = useState({
    email: "",
    password: "",
  });
  const [btnDisabledStatus, setBtnDisabledStatus] = useState(false);
  const [invalidLoginStatus, setLoginStatus] = useState("hidden");

  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
    console.log(inputsState);
  };

  const handleClick = async () => {
    const user = {
      email: inputsState.email,
      password: inputsState.password,
    };
    try {
      const tryLogin = await serviceAPI("login", user);
      console.log("tryLoginOnPage", tryLogin.data.token, user);
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(tryLogin));
      navigate("../clientsService", { replace: true });
    } catch (error) {
      setLoginStatus("visible");
    }
  };

  const registerButton = () => {
    navigate("../register", { replace: true });
  };

  useEffect(() => {
    const emailVerification = /\S+@\S+\.\S+/;
    const isValidEmail = emailVerification.test(inputsState.email);
    const MIN_LENGTH = 5;
    const isValidPassword = inputsState.password.length > MIN_LENGTH;

    if (isValidEmail && isValidPassword) {
      setBtnDisabledStatus(false);
    } else {
      setBtnDisabledStatus(true);
    }
  }, [inputsState]);

  return (
    <div className="modalWrapperLogin">
      <h2 className="invalidFields" style={{ visibility: invalidLoginStatus }}>
        Login Inválido
      </h2>
      <h1 className="mb-4">Clínica Hans Chucrute</h1>
      <div>
        <label controlid="floatingInput" label="Login" />
        <input
          type="email"
          className="inputLabel"
          placeholder="name@example.com"
          name="email"
          onChange={handleChange}
          value={inputsState.email}
        />
        <label controlid="floatingPassword" label="Senha" />
        <input
          type="password"
          className="inputLabel"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={inputsState.password}
        />
        <div>
          <button
            variant="success"
            type="button"
            className="btn"
            disabled={btnDisabledStatus}
            onClick={handleClick}
          >
            LOGIN
          </button>
        </div>

        <div>
          <button
            variant="success"
            type="button"
            className="btn"
            onClick={registerButton}
          >
            Ainda não tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
