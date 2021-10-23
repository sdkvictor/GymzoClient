import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from '@material-ui/core/Collapse'
import CustomAlert from '../components/CustomAlert';
import globalStyles from '../constants/styles';

import { AuthContext } from "../context/AuthContext";
import { getProdProfile, getUserProfile } from "../services/prod_profiles";
import { SERVER_URL } from "../config";
import colors from "../constants/colors";
import Title from '../components/Title'
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { Avatar } from "@material-ui/core";
import { getPrintCount, getPrinterDetails, getUserDetails } from "../services/profile";

const ProfileView = (props) => {
  const { user } = useContext(AuthContext);
  const [prodProfile, setProdProfile] = useState();
  const [userDetails, setUserDetails] = useState({
    can_print: 0,
    name: " "
  });
  const [alertVariant, setAlertVariant] = useState('danger');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [printStatus, setPrintStatus] = useState();
  const [printerName, setPrinterName] = useState();
  const [printCount, setPrintCount] = useState();
  const [avatarColor, setAvatarColor] = useState("#bdbdbd");
  const history = useHistory();


  useEffect(() => {
    initUserDetails();
    initAvatarColor();
   }, []);
 
   
   const initAvatarColor = () =>{
    //let email = user.email;
    let email = "victor@villarreal.com";
    let c = email[0].toLowerCase();
    console.log(c);
    let asciiCode = c.charCodeAt(0);
    let colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    var num = Math.round(0xffffff * parseInt(colorNum));
    var code = (num >> 16 & 255) * (num >> 8 & 255);
    console.log("code", code%8);
    switch(code%9){
      case 0:
        setAvatarColor("mediumpurple");
        break;
      case 1:
        setAvatarColor("orange");
        break;
      case 2: 
        setAvatarColor("cadetblue");
        break;
      case 3:
        setAvatarColor("crimson");
        break;
      case 4:
        setAvatarColor("indianred");
        break;
      case 5:
        setAvatarColor("mediumseagreen");
        break;
      case 6:
        setAvatarColor("royalblue");
        break;
      case 7:
        setAvatarColor("deepskyblue");
        break;
      case 8:
        setAvatarColor("fuchsia");
        break;
    }
  }
  
  const onCloseAlert = () => {
    setShowAlert(false);
  }

  const initPrintCount = async () => {
    try {
      //console.log("User: ", user.email);
      let result =  await getPrintCount(user.email);
      if (result) {
        console.log( "Result: ", result);
        setPrintCount(result);
      } else {
        setAlertMessage('No se encontró un total de impresiones');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Se produjo un error intentando cargar el total de impresiones. Intente cargando nuevamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      
    }
  };

  const initUserDetails = async () => {
    try {
      //console.log("User: ", user.email);
      let result =  await getUserProfile();
      if (result) {
        console.log( "Result: ", result);
        setUserDetails(result);
      } else {
        setAlertMessage('No se encontraron detalles del usuario');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Se produjo un error intentando cargar los detalles del usuario. Intente cargando nuevamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      
    }
  };

  const initPrinterName = async (response) => {
    try {
      //console.log("User: ", user.email);
      let result =  await getPrinterDetails(response.default_printer_id);
      if (result) {
        console.log( "Result: ", result);
        setPrinterName(result.deviceName);
      } else {
        setAlertMessage('No se encontró un total de impresiones');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Se produjo un error intentando cargar el total de impresiones. Intente cargando nuevamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      
    }
  };

  const handlePassChange = () => {
    history.push('/contraseña');
  }

  return (
    <div style={styles.screen}>
        <Collapse  in={showAlert}>
                <CustomAlert
                    variant={alertVariant}
                    message={alertMessage} 
                    show={showAlert} 
                    onClose={onCloseAlert}
                />
        </Collapse>
        <div style={styles.titleContainer}>
            <Title h2 style={styles.title}>Mi Perfil</Title>
        </div>
        <div style={styles.titleContainer}>
            <h2>Mi Perfil</h2>
        </div>
        <div style={styles.root}>
          
        <div style={styles.image} key={userDetails.name}>
          {
            userDetails.name == " "
            ?
            <p> </p>
            :
            <Avatar style={{
              margin: 'auto',
              width: 100,
              height: 100,
              fontSize: 40,
              backgroundColor: avatarColor
            }}>{userDetails.name[0]}</Avatar>

          }
        </div>
        <div>
            <h5 style={styles.label}>Nombre</h5>
        </div>
        <div key={userDetails.name}>
        <TextField
          label=""
          defaultValue={userDetails.name}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          variant="outlined"
        />
        </div>
        <div>
            <h5 style={styles.label}>Correo electrónico</h5>
        </div>
        <div key={userDetails.email}>
          <TextField
            label=""
            defaultValue={userDetails.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            variant="outlined"
          />
        </div>
        
        
        <div style={styles.label}>
            <h5>Estatura </h5>
        </div>
        <div key={userDetails.height}>
        <TextField
          label=""
          defaultValue={userDetails.height}
          InputProps={{
            readOnly: false,
          }}
          fullWidth
          variant="outlined"
        />
        </div>
        
        
        </div>
        <div style={styles.submitBtn}>
            <Button
              type="submit"
              variant="flat" 
              bg="flat" 
              style={globalStyles.primaryButton}
              className="mb-4"
              onClick={handlePassChange}
            >
              Guardar cambios
            </Button>
            
          </div>
          <div style={styles.submitBtn}>
            <Button
              type="submit"
              variant="flat" 
              bg="flat" 
              style={globalStyles.primaryButton}
              className="mb-4"
              onClick={handlePassChange}
            >
              Cambiar contraseña
            </Button>
            
          </div>
    </div>
  );
};

export default ProfileView;


const styles = {
    screen: {
        flex:1,
        flexGrow: 1,
        alignItems: "center",
        marginTop: '1%',

      marginLeft: '30%',
      marginRight: '30%',
      },
    titleContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: '1%'
      },
      label: {
        textAlign: 'left',
        marginTop: 20,
      },
      field: {
        textAlign: 'left',
        marginBottom: 20,
        marginLeft: 100
      },
    root: {
        flexGrow: 1,
        marginTop: 50
    },
    paper: {
        padding: 2,
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        flex:1,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 50,
    },
    img: {
        margin: 'auto',
        width: 100,
        height: 100,
        fontSize: 40,
    },
    submitBtn:{
      marginTop: 20
    }

}
