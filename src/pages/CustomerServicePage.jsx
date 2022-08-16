import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../component/modal";
import serviceAPI from "../services/serviceAPI";
import "./styles/CustomerServicePage.scss";
import moment from "moment";

const CustomerServicePage = () => {
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState();
  const [btnDisabledStatus, setBtnDisabledStatus] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [refreshServices, setRefreshServices] = useState(false);
  const requestAllServices = async () => {
    const localToken = JSON.parse(localStorage.getItem("user"));
    const validToken = localToken.data.token;
    const getServiceList = await serviceAPI("getServiceList", validToken);
    console.log("getServiceList =>", getServiceList);
    setServiceList(getServiceList);
  };

  useEffect(() => {
    requestAllServices();
    console.log("serviceList =>", serviceList);
  }, [refreshServices]);

  const localToken = JSON.parse(localStorage.getItem("user"));
  const validToken = localToken.data.token;

  return (
    <div className="register-container">
      <button
        className="btnBackPage"
        variant="success"
        type="button"
        size="lg"
        onClick={() => navigate("../login", { replace: true })}
      >
        VOLTAR
      </button>
      <button
        className="btnRegister"
        variant="success"
        type="button"
        size="lg"
        disabled={btnDisabledStatus}
        onClick={() => {
          setBtnDisabledStatus(true);
          setModalVisibility(true);
        }}
      >
        CADASTRAR
      </button>
      {serviceList &&
        serviceList.map((element, index) => {
          return (
            <div key={`card-${index + 1}`} className="servicesWrapper">
              <h1>No. {element.serviceId}</h1>
              <h1>Nome {element.clientName}</h1>
              <h1>CPF {element.clientCPF}</h1>
              <h1>Criado em:</h1>
              <h1>{moment(element.createdAt).format("DD/MM/YYYY")}</h1>
              <h1>Finalizado em:</h1>
              <h1>{moment(element.createdAt).format("DD/MM/YYYY")}</h1>
            </div>
          );
        })}
      {modalVisibility && (
        <Modal
          token={validToken}
          onClick={() => {
            setBtnDisabledStatus(false);
            setModalVisibility(false);
            setRefreshServices(!refreshServices);
          }}
        />
      )}
    </div>
  );
};

export default CustomerServicePage;
