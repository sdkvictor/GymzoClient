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


const SuccessView = (props) => {
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState('../assets/preview.jpg');
  const [prodProfile, setProdProfile] = useState();
  const [template, setTemplate] = useState({
    prodProfileId: props.location.state.prodProfileId, // Prod Profile API ID
    name: props.location.state.name,
  });

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
    history.push('/plantilla', {prodProfileId: template.prodProfileId, tempName: template.name });
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
        <Title h1 style={styles.title}>Impresión enviada con éxito</Title>
      </div>
      <div style={styles.titleContainer}>
        <h3>Impresión enviada con éxito</h3>
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

export default SuccessView;

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
