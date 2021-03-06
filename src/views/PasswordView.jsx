import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from '@material-ui/core/Collapse'
import CustomAlert from '../components/CustomAlert';
import globalStyles from '../constants/styles';

import { AuthContext } from "../context/AuthContext";
import { getProdProfile } from "../services/prod_profiles";
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
import { changePassword } from "../services/profile";

const PasswordView = (props) => {
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

  const history = useHistory();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePress = () =>{
    if(password!=""&&confirmPassword!=""){
      if(password == confirmPassword) {
        console.log(password);
        handlePasswordChange();
      }
      else{
        setAlertMessage('Las contrase??as no coinc??den');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    }
    else{
      
      setAlertMessage('La contrase??a no puede estar vac??a');
      setAlertVariant('danger');
      setShowAlert(true);
  
    }
  }

  const handlePasswordChange = async() => {
    let result = await changePassword(user.email, password);    
    if (result.success) {
      console.log(result);
      history.push('/exitocontrase??a');
    } else {
      setAlertMessage('Error intentando cambiar la contrase??a');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  }

  const onConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  }

  const onPasswordChange = event => {
      setPassword(event.target.value);
  }


  useEffect(() => {
   }, []);
 

  const onCloseAlert = () => {
    setShowAlert(false);
  }

  

  


  return (
    <div style={styles.screen}>
        
        <div style={styles.titleContainer}>
            <Title h2 style={styles.title}>Cambiar contrase??a</Title>
        </div>
        <div style={styles.titleContainer}>
            <h2>Cambiar contrase??a</h2>
        </div>
        <div style={styles.root}>
        <Collapse  in={showAlert}>
                <CustomAlert
                    variant={alertVariant}
                    message={alertMessage} 
                    show={showAlert} 
                    onClose={onCloseAlert}
                />
        </Collapse>
        <div>
            <h5 style={styles.label}>Ingresa la nueva contrase??a</h5>
        </div>
        <div key={userDetails.name}>
        <TextField
          label="Contrase??a"
          defaultValue=""
          type="password"
          InputProps={{
            readOnly: false,
          }}
          fullWidth
          variant="outlined"
          onChange={onPasswordChange}
        />
        </div>
        <div>
            <h5 style={styles.label}>Vuelve a ingresar la nueva contrase??a</h5>
        </div>
        <div key={userDetails.email}>
          <TextField
            label="Contrase??a"
            defaultValue=""
            type="password"
            InputProps={{
              readOnly: false,
            }}
            fullWidth
            variant="outlined"
            onChange={onConfirmPasswordChange}
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
              onClick={handlePress}
            >
              Cambiar contrase??a
            </Button>
          </div>
    </div>
  );
};

export default PasswordView;


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
        backgroundColor: 'orange'
    },
    submitBtn:{
      marginTop: 20
    }

}
