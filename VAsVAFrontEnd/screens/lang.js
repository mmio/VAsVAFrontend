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

    // Registration
    passDontMatch: "The passwords don't match",
    fillAll: "Fill out all the fields",
    registration: "Registration",
    password: "Password",
    passwordAgain: "Repeat password",
    male: "Male",
    female: "Female",
    register: "Register!",

    // Login
    login: "Login",

    // Profiles
    picAdded: "The photo was added",
    personalData: "Personal data",
    nick: "Nickname",
    age: "Age",
    sex: "Sex",
    mostDifficult: "Most difficult finished problems",
    contact: "Contact",
    aboutMe: "About me",
    saveChanges: "Save changes",
    editProfile: "Edit profile",
    myPhotos: "My pictures",
    addPhoto: "Add picture",
    add: "Add",
    cancel: "Cancel",
    myProblems: "My problems",
    showFinished: "Keep showing finished problems",

    // Add problem
    goToProblem: "Go to problem",
    saveQr: "Save QR code",
    createProblem: "Create problem",
    addProblem: "Add problem",
    qrSaved: "QR code saved",
    points: "points",
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

    // Registration
    passDontMatch: "Heslá sa nezhodujú",
    fillAll: "Vyplňte všetky polia",
    registration: "Registrácia",
    password: "Heslo",
    passwordAgain: "Zopakuj heslo",
    male: "Muž",
    female: "Žena",
    register: "Registruj sa!",

    // Login
    login: "Prihlás sa!",

    // Profiles
    picAdded: "Fotka bola pridaná",
    personalData: "Osobné údaje",
    nick: "Prezývka",
    age: "Vek",
    sex: "Pohlavie",
    mostDifficult: "Najťažšia zlezená obtiažnosť",
    contact: "Kontakt",
    aboutMe: "O mne",
    saveChanges: "Ulož zmeny",
    editProfile: "Uprav profil",
    myPhotos: "Moje fotky",
    addPhoto: "Pridaj fotku",
    add: "Pridaj",
    cancel: "Zruš",
    myProblems: "Moje problémy",
    showFinished: "Zobrazuj dokončené problémy",

    // Add problem
    goToProblem: "Choď na problém",
    saveQr: "Ulož QR kód",
    createProblem: "Vytvor problém",
    addProblem: "Pridaj problém",
    qrSaved: "QR kód uložený",
    points: "bodov",
    login: "Prihlásiť sa",
  }
});
export default strings;