import LocalizedStrings from 'react-native-localization';

// Súbor obsahujúci preklady pre jazyk slovenský a anglický
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
    points: "points",

    // Login
    login: "Login",
    password: "Password",
    email: "Email",
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
    points: "bodov",

    // Login
    password: "Heslo",
    email: "Email",
    login: "Prihlásiť sa",
  }
});
export default strings;