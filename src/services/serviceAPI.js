import axios from "axios";

export default async function serviceAPI(caseInput, bodyValue) {
  switch (caseInput) {
    case "login": {
      try {
        const tryLogin = await axios({
          method: "post",
          url: "http://localhost:8080/login",
          data: bodyValue,
        });
        return tryLogin;
      } catch (error) {
        return error;
      }
    }

    case "registerUser": {
      try {
        const tryRegisterUser = await axios({
          method: "post",
          url: "http://localhost:8080/user",
          data: bodyValue,
        });
        return tryRegisterUser.data.message;
      } catch (error) {
        return error.response.data.message;
      }
    }

    case "getServiceList": {
      try {
        const tryGetServiceList = await axios({
          method: "get",
          url: "http://localhost:8080/costumerService",
          headers: { Authorization: `Bearer ${bodyValue}` },
        });
        return tryGetServiceList.data.customers;
      } catch (error) {
        return error;
      }
    }

    case "registerNewService": {
      const setToken = bodyValue.validToken;
      console.log(setToken);
      try {
        const tryGetServiceList = await axios({
          method: "post",
          url: "http://localhost:8080/costumerService",
          data: bodyValue,
          headers: { Authorization: `Bearer ${setToken}` },
        });
        return tryGetServiceList.data.customers;
      } catch (error) {
        return error.response.data.message;
      }
    }

    default:
      return console.log("falta parametro da função");
  }
}
