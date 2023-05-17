import axios from "axios";
//import { useSelector } from "react-redux";
import { getToken } from "./Headers";
import { GET_FICHIER } from "../keys/Fichier.key";
import { ErrorSnack, SuccessSnack } from "../keys/Snack";

const { REACT_APP_API_HOST } = process.env;

export const UploadFile = (files, callback) => {
  const body = new FormData();
  for (let i = 0; i < files.length; i++) {
    body.append("files", files[i]);
  }

  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/document/upload_documents/",
        body,
        {
          headers: {
            "content-Type": "multipart/form-data",
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response);
      dispatch({
        type: SuccessSnack(),
        value: "Document à été crée avec succée",
      });
      dispatch(GetDocsByUser());
      callback();
    } catch (error) {
      console.log(error.response);
    }
  };
};

// get folder name by id
const GetFNBId = async (id, getState) => {
  try {
    const response2 = await axios.get(REACT_APP_API_HOST + `/folder/${id}/`, {
      headers: {
        Authorization: `token ${getToken(getState)}`,
      },
    });
    return response2.data.folder.name;
  } catch (erreur) {
    return "aucun";
  }
};

export const GetDocsByUser = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(REACT_APP_API_HOST + "/document/user/", {
        headers: {
          Authorization: `token ${getToken(getState)}`,
        },
      });
      console.log(response.data.results);
      let with_select = await Promise.all(
        response.data.results.map(async (dt) => {
          let folder_name = "aucun";
          let selected = false;
          if (dt.folder_id) {
            folder_name = await GetFNBId(dt.folder_id, getState);
            console.log(dt.folder_id);
          }
          return { ...dt, selected, folder_name };
        })
      );
      console.log(with_select);
      dispatch({
        type: GET_FICHIER(),
        value: with_select,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const GetDocsByUserUploaded = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        REACT_APP_API_HOST + "/document/uploaded/",
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response.data.results);
      let with_select = response.data.results.map((dt) => {
        let folder_name = "aucun";
        let selected = false;
        if (dt.folder_id) {
          folder_name = "have a name";
        }
        return { ...dt, selected, folder_name };
      });
      dispatch({
        type: GET_FICHIER(),
        value: with_select,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const GetDocsByUserCreated = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(REACT_APP_API_HOST + "/document/user/", {
        headers: {
          Authorization: `token ${getToken(getState)}`,
        },
      });
      console.log(response.data.results);
      let with_select = response.data.results
        .filter((dt) => {
          return dt.type === null;
        })
        .map((dt) => {
          let folder_name = "aucun";
          let selected = false;
          if (dt.folder_id) {
            folder_name = "have a name";
          }
          return { ...dt, selected, folder_name };
        });
      dispatch({
        type: GET_FICHIER(),
        value: with_select,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const GetDocsByUserRecieved = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        REACT_APP_API_HOST + "/document/received/",
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response.data.results);
      let with_select = response.data.results.map((dt) => {
        let folder_name = "aucun";
        let selected = false;
        if (dt.folder_id) {
          folder_name = "have a name";
        }
        return { ...dt, selected, folder_name };
      });
      dispatch({
        type: GET_FICHIER(),
        value: with_select,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

// ************************** Partager **************************
export const ShareOneDoc = (id, users, callback, errorCallback) => {
  console.log({ users: [...users], documents: [{ id: id }] });
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/document/send_to_users/",

        { users: [...users], documents: [{ id: id }] },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch({
        type: SuccessSnack(),
        value: response.data.success,
      });
      callback();
    } catch (error) {
      errorCallback();
      dispatch({
        type: ErrorSnack(),
        value: "Vérifier Votre Données",
      });
      console.log(error.response);
    }
  };
};

export const ShareMultipleDocs = (ids, users, callback, errorCallback) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/document/send_to_users/",
        {
          users: [...users],
          documents: [...ids],
        },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch({
        type: SuccessSnack(),
        value: response.data.success,
      });
      callback();
    } catch (error) {
      dispatch({
        type: ErrorSnack(),
        value: "Vérifier Votre Données",
      });
      errorCallback();
      console.log(error.response);
    }
  };
};

export const SendDocToFolder = (ids, folder, callback, errorCallBack) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        REACT_APP_API_HOST + "/document/transfer_to_folder/",
        {
          documents: [...ids],
          folder_id: folder,
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
        value: response.data.success,
      });
      dispatch(GetDocsByUser());
      callback();
    } catch (error) {
      errorCallBack();
      console.log(error.response);
    }
  };
};

export const SendToTrush = (ids, callback, errorCallback) => {
  console.log(ids);
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        REACT_APP_API_HOST + "/trash/send_documents/",
        {
          data: { documents: [...ids] },
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch(GetDocsByUser());
      callback();
    } catch (error) {
      errorCallback();
      console.log(error);
    }
  };
};
