import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from '@material-ui/core/Collapse'
import CustomAlert from '../components/CustomAlert';

import { AuthContext } from "../context/AuthContext";
import { getProdProfile } from "../services/prod_profiles";

import { SERVER_URL } from "../config";
import Title from '../components/Title'
import {useHistory} from 'react-router-dom';
import globalStyles from '../constants/styles';


const SuccessPasswordView = (props) => {
  const { user } = useContext(AuthContext);
  const [prodProfile, setProdProfile] = useState();
  

  const [alertVariant, setAlertVariant] = useState('danger');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();


  useEffect(() => {
    //initPreview();
   }, []);

   


  const onCloseAlert = () => {
    setShowAlert(false);
  }

  const handleBack = () => {
    history.push('/perfil');
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
        <Title h1 style={styles.title}>Contraseña cambiada con éxito</Title>
      </div>
      <div style={styles.titleContainer}>
        <h3>Contraseña cambiada con éxito</h3>
      </div>
      
      <div>
        
        <Button type="submit"
          variant="flat" 
          bg="flat" 
          style={globalStyles.primaryButton}
          className="mb-4"
          onClick={handleBack}>
            Regresar 
          </Button>
          
      </div>
    </div>
  );
};

export default SuccessPasswordView;

const styles = {
 
titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: '1%'
  },

  screen: {
    flex:1,
    flexGrow: 1,
    alignItems: "center",
  },
  
}
