import React from "react";
// ************************** ICONS ****************************
import folder from "../assets/svgs/sidebar/folder.svg";
import chat from "../assets/svgs/sidebar/icon_chat-room.svg";
import rounded_chart from "../assets/svgs/sidebar/pie-chart.svg";
import logout from "../assets/svgs/sidebar/shutdown.svg";
import settings from "../assets/svgs/sidebar/settings.svg";
import bar_chart from "../assets/svgs/sidebar/chart-bar-32.svg";
import trash from "../assets/svgs/sidebar/trash.svg";
import template from "../assets/svgs/sidebar/template.svg";
import berger from "../assets/svgs/sidebar/berger.svg";
import fich from "../assets/svgs/sidebar/fich.svg";
import notif from "../assets/svgs/sidebar/notif.svg";

// ************************** Components ****************************
//import EditPage from "../pages/dashboard/DashContent/EditProfilePage/EditProfilePage.jsx";
import MainPage from "../pages/dashboard/DashContent/MainPage/MainPage";
import Profile from "../pages/dashboard/DashContent/Profile/Profile";
import MenuPrincipal from "../pages/dashboard/DashContent/MenuPrincipal/MenuPrincipal";
import Dossier from "../pages/dashboard/DashContent/Dossier/Dossier";
import Fichier from "../pages/dashboard/DashContent/Fichier/Fichier";
import AllTempsier from "../pages/dashboard/DashContent/Templats/AllTemps/AllTemps";
import CreateTemps from "../pages/dashboard/DashContent/Templats/CreateTemps/CreateTemps";
import ModifierTemps from "../pages/dashboard/DashContent/Templats/ModifierTemps/ModifierTemps";
// ************************** TOP BAR *******************************

import TopBar from "../Layouts/TopBar/TopBar";
import DossierTopBar from "../Layouts/TopBar/DossierTopBar.jsx";
import FichierTopBar from "../Layouts/TopBar/FichierTopBar";
import TopBarWithRech from "../Layouts/TopBar/TopBarWithRech";

export const routes = [
  {
    mainUrl: "/dashboard",
    url: "/main",
    img: berger,
    title: "Menu principal",
    compo: (
      <>
        <TopBarWithRech />
        <MenuPrincipal />
      </>
    ),
  },
  {
    mainUrl: "/dashboard",
    url: "/dash",
    img: bar_chart,
    title: "Dashboard",
    compo: (
      <>
        <TopBarWithRech />
        <MainPage />
      </>
    ),
  },
  {
    mainUrl: "/dashboard",
    url: "/folder",
    img: folder,
    title: "Dossier",
    compo: (
      <>
        <DossierTopBar />
        <Dossier />
      </>
    ),
  },
  {
    mainUrl: "/dashboard",
    url: "/fichiers",
    img: fich,
    title: "Fichiers",
    compo: (
      <>
        <FichierTopBar />
        <Fichier />
      </>
    ),
  },
  {
    mainUrl: "/dashboard",
    url: "/templates",
    img: template,
    title: "Templates",
    compo: (
      <>
        <TopBarWithRech />
        <AllTempsier />
      </>
    ),
  },
  {
    mainUrl: "/dashboard",
    url: "/notifications",
    img: notif,
    title: "Notifications",
    compo: <></>,
  },
  {
    mainUrl: "/dashboard",
    url: "/parrainage",
    img: rounded_chart,
    title: "Parrainage",
    compo: <></>,
  },
];

export const routes2 = [
  {
    mainUrl: "/dashboard",
    url: "/corbeille",
    img: trash,
    title: "Corbeille",
    compo: <></>,
  },
  {
    mainUrl: "/dashboard",
    url: "/parametres",
    img: settings,
    title: "Paramètres",
    compo: (
      <>
        <TopBar />
        <Profile />
      </>
    ),
  },
  // {
  //   mainUrl: "/dashboard",
  //   url: "/deconnexion",
  //   img: logout,
  //   title: "Déconnexion",
  //   compo: <></>,
  // },
];

// those routes are not acceccible by navbar
export const NoNavRoutes = [
  {
    mainUrl: "/dashboard",
    url: "/templates/create",
    compo: (
      <>
        <TopBarWithRech />
        <CreateTemps />
      </>
    ),
  },
  {
    mainUrl: "/dashboard",
    url: "/templates/modifier",
    compo: (
      <>
        <TopBarWithRech />
        <ModifierTemps />
      </>
    ),
  },
];
