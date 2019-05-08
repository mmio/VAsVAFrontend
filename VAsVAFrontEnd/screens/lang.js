import React from 'react';
import LocalizedStrings from 'react-native-localization';
const strings = new LocalizedStrings({
  "en":{
    // HomeScreen
    myProfile: "My Profile",
    boulderProblems: "Boulder Problems",
    wallProblems: "Wall Problems",
    map: "Map",
    scanQrCode: "Scan QR Code",
    highscores: "Highscores",

    // ProblemScreens - Boulder and Wall
    grade: "Grade",
    maxOverhang: "Max Overhang",
    sector: "Sector",

    // ProblemDetails
    name: "Name",
    type: "Type",
    description: "Description",
    picture: "Picture",
  },
  "sk":{
    // HomeScreen
    myProfile: "Môj Profil",
    boulderProblems: "Boulder Problémy",
    wallProblems: "Problémy na Stene",
    map: "Mapa",
    scanQrCode: "Skenuj QR Kód",
    highscores: "Rebríček",

    // ProblemScreens - Boulder and Wall
    grade: "Stupeň",
    maxOverhang: "Max prevys",
    sector: "Sektor",

    // ProblemDetails
    name: "Meno",
    type: "Typ",
    description: "Opis",
    picture: "Obrázok",
  }
});
export default strings;