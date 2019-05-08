import React, { Component } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import axios from "../components/axios-instance.js";
import { endpoint } from "./props";

// Logovanie chýba na server
function logStuff(severity, msg) {
  msg = msg.replace(" ", "%20");
  axios.get(`${endpoint}/log/${severity}/${msg}`).catch(err => {
    console.log(err, "ERROR: Could not send log to server.");
  });
}

// Trida, ktorá má za úlohu zobraziť čítačku QR kódov a následke po načítaní presmerovať na
// vhodný lezecký problém.
export default class QrScreen extends Component {
  constructor() {
    super();

    this.state = {
      qrvalue: '',
      opneScanner: false,
    };

    logStuff("TRACE", "Opened QR scanner.");
  }
  
  // Tu sa presmeruje na základe načítanej hodnoty.
  onScan(qrvalue) {
    logStuff("TRACE", `QR code scanned with value (${qrvalue}).`);

    // this.setState({ qrvalue });

    console.log("SCANNED: ", qrvalue)

    this.props.navigation.navigate("ProblemDetails", {id: parseInt(qrvalue)});
    // this.setState({ opneScanner: false });
  }

  // Pri otvorený skenovača sa treba spýtať používateľa na prístup ku kamere,
  // ktorou sa bude skenovať.
  onOpneScanner() {
    var that =this;

    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }

  // Zobrazenie skenovacieho okna(žlté s modrým pásikom)
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={true}
          scanBarcode={true}
          laserColor={'blue'}
          frameColor={'yellow'}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.onScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}