import React from "react";
import { useEffect, useState } from "react";

import Collapse from "@material-ui/core/Collapse";
import CustomAlert from "../components/CustomAlert";
import Title from "../components/Title";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import globalStyles from "../constants/styles";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import colors from "../constants/colors";

import {getRecords} from "../services/records"
import RecordsTable from './../components/RecordsTable';



const RecordsView = (props) => {
  const [exercise, setExercise] = useState(props.location.state.exerciseID);
  const [exerciseName, setExerciseName] = useState(props.location.state.exerciseName);

  const [records, setRecords] = useState([])

  const history = useHistory();
  
  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);



  const handleSend = async (e) => {
    e.preventDefault();
    
    //console.log("Original field values:", fieldValues);
    //console.log("Pictures", pictures);
  };


  useEffect(() => {
    
    getRecords(props.location.state.exerciseID).then((resp)=>{
      console.log(resp)
      setRecords(resp)
    });
    
  }, []);

  const onCloseAlert = () => {
    setShowAlert(false);
  };


  return (
    <div style={styles.screen}>
      <Collapse in={showAlert}>
        <CustomAlert
          variant={alertVariant}
          message={alertMessage}
          show={showAlert}
          onClose={onCloseAlert}
        />
      </Collapse>

      <div style={styles.titleContainer}>
        <Title h5 style={styles.title}>
          {exerciseName}
        </Title>
      </div>
      <div style={styles.titleContainer}>
        <h3>{exerciseName}</h3>
      </div>
      
      <div className="container" style={styles.container}>
        <RecordsTable records={records}/>

        <div className="col-lg-12">
        
      </div>

      </div>

        
    </div>
  );
};

export default RecordsView;

const styles = {
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: "1%",

    marginLeft: "25%",
    marginRight: "25%",
  },
  container:{
    justifyContent: 'center'
  },
  
  title: {
    padding: 15,
    //fontSize: RFPercentage(5),
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "1%",
  },
  button: {
    margin: 20,
    backgroundColor: colors.primary,
    color: colors.white
  }
  
};
