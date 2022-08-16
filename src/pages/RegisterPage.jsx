import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../services/serviceAPI";
import "./styles/RegisterPage.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputsState, setInputsState] = useState({
    name: "",
    email: "",
    password: "",
    perfil: "perfil-geral",
  });
  const [btnDisabledStatus, setBtnDisabledStatus] = useState(false);
  const [userAlreadyExists, setUserExists] = useState("hidden");

  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
    console.log(inputsState);
  };

  const registerButton = async () => {
    const { name, email, password, perfil } = inputsState;
    const newUser = await serviceAPI("registerUser", {
      name,
      email,
      password,
      perfil,
    });

    if (newUser === "Este usuário já existe!") {
      setUserExists("visible");
    }
    if (newUser !== "Este usuário já existe!") {
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("../login", { replace: true });
    }
  };

  useEffect(() => {
    const emailVerification = /\S+@\S+\./;
    const isValidEmail = emailVerification.test(inputsState.email);
    const MIN_LENGTH = 4;
    const MIN_NAME = 5;
    const isValidPassword = inputsState.password.length > MIN_LENGTH;
    const isValidName = inputsState.name.length > MIN_NAME;

    if (isValidEmail && isValidPassword && isValidName) {
      setBtnDisabledStatus(false);
    } else {
      setBtnDisabledStatus(true);
    }
  }, [inputsState]);

  return (
    <div className="modalWrapperCadastro">
      <h1>Cadastro</h1>
      <div>
        <h2 className="invalidFields" style={{ visibility: userAlreadyExists }}>
          Usuário já existe
        </h2>
      </div>
      <div className="modalWrapperInputsCadastro">
        <label controlid="floatingInput" label="Nome" />
        <input
          type="name"
          className="inputLabel"
          placeholder="Nome completo"
          name="name"
          onChange={handleChange}
          value={inputsState.name}
        />
        <label controlid="floatingInput" label="Email" />
        <input
          type="email"
          className="inputLabel"
          placeholder="nome@examplo.com"
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
        <label controlid="floatingPerfil" label="Perfil" />
        <select
          className="inputSelect"
          name="perfil"
          controlid="floatingPerfil"
          onChange={handleChange}
        >
          <option value="perfil-geral">Perfil Geral</option>
          <option value="perfil-adm">Perfil Administrador</option>
        </select>
        <button
          className="btn"
          variant="success"
          type="button"
          size="lg"
          disabled={btnDisabledStatus}
          onClick={registerButton}
        >
          CADASTRAR
        </button>
        <button
          className="btnBack"
          variant="success"
          type="button"
          size="lg"
          onClick={() => navigate("../login", { replace: true })}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
