import axios from "axios";
import { ErrorSnack, SuccessSnack } from "../keys/Snack";
import { GET_DOSSIER } from "../keys/Dosser.key";
import { getToken } from "./Headers";
const { REACT_APP_API_HOST } = process.env;

export const AddFolder = (name, callback, errorCallBack) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/folder/add/",
        { name: name },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch({
        type: SuccessSnack(),
        value: "Dossier à été crée avec succée",
      });
      callback();
      dispatch(GetAllByUser());
    } catch (error) {
      errorCallBack();
      console.log(error);
    }
  };
};

export const RenameFolder = (id, name, callback, errorCallBack) => {
  console.log(name);
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(
        REACT_APP_API_HOST + "/folder/update/",
        { id: id, name: name },
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      console.log(response);
      dispatch({
        type: SuccessSnack(),
        value: response.sucssess,
      });
      callback();
      dispatch(GetAllByUser());
    } catch (error) {
      errorCallBack();
      console.log(error.response);
    }
  };
};

export const GetAllByUser = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        REACT_APP_API_HOST + "/folder/by_user/",
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      //console.log(response.data.results);
      dispatch({
        type: GET_DOSSIER(),
        value: response.data.results.map((dt) => {
          return { ...dt, selected: false };
        }),
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const GetRecievedFolders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        REACT_APP_API_HOST + "/folder/received/",
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      //console.log(response.data.results);
      dispatch({
        type: GET_DOSSIER(),
        value: response.data.results.map((dt) => {
          return { ...dt, selected: false };
        }),
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const GetCreatedFolders = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        REACT_APP_API_HOST + "/folder/created/",
        {
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      //console.log(response.data.results);
      dispatch({
        type: GET_DOSSIER(),
        value: response.data.results.map((dt) => {
          return { ...dt, selected: false };
        }),
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const ShareOneFolders = (id, users, callback, errorCallBack) => {
  console.log({ users: [...users], folders: [{ id: id }] });
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/folder/send_to_users/",

        { users: [...users], folders: [{ id: id }] },
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
      errorCallBack();
      dispatch({
        type: ErrorSnack(),
        value: "Vérifier Votre Données",
      });
      console.log(error.response);
    }
  };
};

export const ShareMultipleFolders = (ids, users, callback, errorCallBack) => {
  let folders = ids.map((item) => {
    return { id: item.folder.id };
  });
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        REACT_APP_API_HOST + "/folder/send_to_users/",
        {
          users: [...users],
          folders: [...folders],
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
      errorCallBack();
      console.log(error.response);
    }
  };
};

export const SendToTrushMultiple = (ids, callback, errorCallBack) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        REACT_APP_API_HOST + "/trash/send_folders/",
        {
          data: { folders: [...ids] },
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch(GetAllByUser());
      callback();
    } catch (error) {
      errorCallBack();
      console.log(error.response);
    }
  };
};

export const SendToTrushOne = (id, callback, errorCallBack) => {
  console.log(id);
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        REACT_APP_API_HOST + "/trash/send_folders/",
        {
          data: { folders: [{ id: id }] },
          headers: {
            Authorization: `token ${getToken(getState)}`,
          },
        }
      );
      dispatch(GetAllByUser());
      callback();
    } catch (error) {
      errorCallBack();
      console.log(error);
    }
  };
};
