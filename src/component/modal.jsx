import React, { useState } from "react";
import serviceAPI from "../services/serviceAPI";
import "./styles/modal.scss";

const Modal = (props) => {
  const [inputsState, setInputsState] = useState({
    clientName: "",
    clientCPF: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputsState({
      ...inputsState,
      [name]: value,
    });
    console.log(inputsState);
  };

  const registerButton = async () => {
    const newRegiter = { ...inputsState, validToken: props.token };
    const newService = await serviceAPI("registerNewService", newRegiter);
    props.onClick();
    console.log("newService =>", newRegiter, newService);
  };

  return (
    <>
      <div className="modal" onClick={props.onClick} />
      <div className="modalWrapperRegister">
        <h1>Nome do Cliente</h1>
        <label controlid="floatingClientName" label="ClientName" />
        <input
          type="text"
          className="inputLabel"
          placeholder="Nome do Cliente"
          name="clientName"
          onChange={handleChange}
          value={inputsState.clientName}
        />
        <h1>CPF do Cliente</h1>
        <label controlid="floatingClientName" label="ClientName" />
        <input
          type="number"
          className="inputLabel"
          placeholder="CPF (somente números)"
          name="clientCPF"
          onChange={handleChange}
          value={inputsState.clientCPF}
        />
        <button
          className="btn"
          variant="success"
          type="button"
          size="lg"
          onClick={registerButton}
        >
          CADASTRAR
        </button>
      </div>
    </>
  );
};

export default Modal;
