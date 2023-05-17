import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { SetToken, SetUser } from "../keys/Users.keys";
import { ErrorSnack, SuccessSnack, CloseSnack } from "../keys/Snack";
import { GET_DOSSIER } from "../keys/Dosser.key";
import { GET_FICHIER } from "../keys/Fichier.key";
import { GET_TEMPLATE, GET_TEMPLATES } from "../keys/Template.keys";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// USER REDUCER
const InitialUser = { token: "", user: null };
const User = (state = { ...InitialUser }, action) => {
  switch (action.type) {
    case SetToken():
      return { ...state, token: action.value };
    case SetUser():
      return { ...state, user: action.value };
    default:
      return state;
  }
};

// SNACK REDUCER
const InitialSnack = { open: false, type: "", msg: "" };
const Snack = (state = { ...InitialSnack }, action) => {
  switch (action.type) {
    case SuccessSnack():
      return { open: true, type: "success", msg: action.value };
    case ErrorSnack():
      return { open: true, type: "error", msg: action.value };
    case CloseSnack():
      return { ...InitialSnack };
    default:
      return state;
  }
};

// DOSSIER REDUCER
const InitialDossier = [];
const Dossier = (state = InitialDossier, action) => {
  switch (action.type) {
    case GET_DOSSIER():
      return action.value;
    default:
      return state;
  }
};

// FICHIER REDUCER
const InitialFichier = [];
const Fichier = (state = InitialFichier, action) => {
  switch (action.type) {
    case GET_FICHIER():
      return action.value;
    default:
      return state;
  }
};

// TEMPLATES REDUCER
const InitialTemplates = [];
const Templates = (state = InitialTemplates, action) => {
  switch (action.type) {
    case GET_TEMPLATES():
      return action.value;
    default:
      return state;
  }
};

// ONE TEMPLATE REDUCER - FOR UPDATE -
const InitialTemplate = { header: " ", body: " ", footer: " " };
const Template = (state = InitialTemplate, action) => {
  switch (action.type) {
    case GET_TEMPLATE():
      return action.value;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  User: User,
  Snack: Snack,
  Dossier: Dossier,
  Fichier: Fichier,
  Templates: Templates,
  Template: Template,
});

//const load = loadFromLocal();
const store = createStore(
  allReducers, //load,
  composeEnhancer(applyMiddleware(thunk))
);
//store.subscribe(()=>saveToLocal(store.getState()));

export { store };

// const saveToLocal = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("state", serializedState);
//   } catch (e) {
//     console.log(e);
//   }
// };

// function loadFromLocal() {
//   try {
//     const serializedState = localStorage.getItem("state");
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// }
