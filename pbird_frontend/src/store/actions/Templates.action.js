import axios from "axios";
//import { useSelector } from "react-redux";
import { getToken } from "./Headers";
import { GET_TEMPLATE, GET_TEMPLATES } from "../keys/Template.keys";
import { ErrorSnack, SuccessSnack } from "../keys/Snack";

const { REACT_APP_API_HOST } = process.env;

export const GenerateTemplate = (tempalte, callback, errorCallback) => {
  console.log(tempalte);
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/template/generate/",
        {
          ...tempalte,
        },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response);
      dispatch({
        type: SuccessSnack(),
        value: "Template a été gérérer avec succée",
      });
      GetAllTemplates();
      callback();
    } catch (error) {
      errorCallback();
      dispatch({
        type: ErrorSnack(),
        value: "En peut pas génerer cette template",
      });
      console.log(error.response);
    }
  };
};

export const GetAllTemplates = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(REACT_APP_API_HOST + "/template/user/", {
        headers: {
          Authorization: `token ${getToken(getState)}`,
        },
      });
      console.log(response.data);
      dispatch({
        type: GET_TEMPLATES(),
        value: response.data.results,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const SetOneTemplate = (template) => {
  return (dispatch) => {
    dispatch({
      type: GET_TEMPLATE(),
      value: template,
    });
  };
};

export const UpdateTemplate = (tempalte, callback, errorCallBack1) => {
  console.log(tempalte);
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        REACT_APP_API_HOST + "/template/update/",
        {
          ...tempalte,
        },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response);
      dispatch({
        type: SuccessSnack(),
        value: "Template a été modifié avec succée",
      });
      dispatch(GetAllTemplates());
      callback();
    } catch (error) {
      errorCallBack1();
      dispatch({
        type: ErrorSnack(),
        value: "Verifier le contenue du template",
      });
      console.log(error.response);
    }
  };
};

export const GenerateDocumentWithoutSignature = (
  id,
  title,
  callback,
  errorCallBack1
) => {
  console.log(id, title);
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/template/generate_document/",
        {
          template_id: id,
          title: title,
        },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response);
      dispatch({
        type: SuccessSnack(),
        value: "Fichier a été modifié avec succée",
      });
      dispatch(GetAllTemplates());
      callback();
    } catch (error) {
      errorCallBack1();
      dispatch({
        type: ErrorSnack(),
        value: "En peut pas Génerer le document",
      });
      console.log(error.response);
    }
  };
};

export const GenerateTempAndDoc = (
  tempalte,
  title,
  callback,
  errorCallback
) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/template/generate/",
        {
          ...tempalte,
        },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch({
        type: SuccessSnack(),
        value: "Template a été gérérer avec succée",
      });
      // Generation du demplate à été terminée
      // Generation du document !!!!!! à partir du id du template
      try {
        console.log(response.data.id);
        console.log(title);
        const response2 = await axios.post(
          REACT_APP_API_HOST + "/template/generate_document/",
          {
            template_id: response.data.id,
            title: title,
          },
          {
            headers: {
              Authorization: `token ${getToken(getState)}`,
            },
          }
        );
        console.log(response2);
        dispatch({
          type: SuccessSnack(),
          value: "Fichier a été crée avec succée",
        });
        dispatch(GetAllTemplates());
        callback();
      } catch (error) {
        errorCallback();
        console.log(error.response);
      }
    } catch (error) {
      callback();
      dispatch({
        type: ErrorSnack(),
        value: "En peut pas génerer cette template",
      });
      console.log(error.response);
    }
  };
};
