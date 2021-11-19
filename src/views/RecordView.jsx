import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import { Dimensions } from 'react-native';
//import ImageResizer from 'react-native-image-resizer';
import Collapse from "@material-ui/core/Collapse";
import CustomAlert from "../components/CustomAlert";
import Title from "../components/Title";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import globalStyles from "../constants/styles";
import ImageUploader from "react-images-upload-refactored";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getRoutines } from "../services/routines";
import {getExercises} from "../services/exercises"
import {registerRecord} from "../services/records"

import { getUserProfile } from "../services/prod_profiles";

import { registerRoutine } from '../services/routines';




const RecordView = (props) => {
  const [routine, setRoutine] = useState("");
  const [routines, setRoutines] = useState([]);
  const [prodProfile, setProdProfile] = useState("");
  const [exercise, setExercise] = useState ("");
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const [exercises, setExercises] = useState ([]);
  const history = useHistory();

  //const sharp = require('sharp');
  

  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //var RNFS = require('react-native-fs');
  const { handleSubmit, control } = useForm();


  const handleSend = async (e) => {
    e.preventDefault();
    //registerRecord(routine);
    console.log(routine)
    registerRecord(exercise, weight, sets, reps)
    history.push("/")
    
    //console.log("Original field values:", fieldValues);
    //console.log("Pictures", pictures);
  };

  const initRoutines = async ()=> {
    try {
        let pp = await getUserProfile();
        setProdProfile(pp);
        console.log(pp);
  
        let result = await getRoutines(pp._id);
        
        if (result) {
          setRoutines(result);
          if(result.length>0){
            setRoutine(result[0]._id.$oid);
           initExercises(result[0]._id.$oid);
          }
          
          console.log("TemplateScreen: " , result);
        } else {
          setAlertMessage('No se encontraron las rutinas disponibles');
          setAlertVariant('danger');
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage('Se produjo un error intentando cargar las rutinas. Intente cargando nuevamente.');
        setAlertVariant('danger');
        setShowAlert(true);
      }
  }

  const initExercises= (routineId) => {
    getExercises(routineId).then((resp)=>{
      console.log(resp)
      setExercises(resp)
      if(resp.length>0){
        setExercise(resp[0]._id.$oid)
      }
      
    });
  }
  useEffect(() => {
    //initFields();
    
    initRoutines();
  }, []);

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const onWeightChange = event => {
    setWeight(event.target.value);
  }
  const onSetsChange = event => {
    setSets(event.target.value);
  }
  const onRepsChange = event => {
    setReps(event.target.value);
  }

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
          Nuevo Record
        </Title>
      </div>
      <div style={styles.titleContainer}>
        <h3>Nuevo Record</h3>
      </div>
      <div style={styles.listContainer}>
        <Form style={styles.form} className="mt-4" onSubmit={handleSend}>
          <div>
                
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={routine}
                    onChange={e => {
                      console.log(e.target.value);
                      setRoutine(e.target.value);
                      initExercises(e.target.value);
                    }}
                  >
                     {
                  routines.map((item, i) => {
                          return (
                            <option value={item._id.$oid}>{item.name}</option>
                          )
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={exercise}
                    onChange={e => {
                      console.log(e.target.value);
                      setExercise(e.target.value);
                    }}
                  >
                  {
                  exercises.map((item, i) => {
                      if(item.has_weight){
                        return (
                          <option value={item._id.$oid}>{item.name}</option>
                        )
                      }
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <p>Peso a registrar</p>
                  <Form.Control
                    type="number"
                    //name={item.nombre}
                    placeholder="Cantidad"
                    onChange={onWeightChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <p>Sets realizados</p>
                  <Form.Control
                    type="number"
                    //name={item.nombre}
                    placeholder="Cantidad"
                    onChange={onSetsChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <p>Reps realizados</p>
                  <Form.Control
                    type="number"
                    //name={item.nombre}
                    placeholder="Cantidad"
                    onChange={onRepsChange}
                    required
                  />
                </Form.Group>
                
                

            </div>
            <div style={styles.submitBtn}>
              <Button
                type="submit"
                variant="flat"
                bg="flat"
                style={globalStyles.primaryButton}
                className="mb-4"
              >
                Añadir record
              </Button>
            </div>
        </Form>

      </div>
    </div>
  );
};

export default RecordView;

const styles = {
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: "1%",

    marginLeft: "25%",
    marginRight: "25%",
  },
  submitBtn: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  printBtn: {
    flex: 1,
    alignItems: "center",
    height: 48,
  },
  footerStyle: {
    flex: 1,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "1%",
  },
  listContainer: {
    alignItems: "flex-start",
    marginTop: "2%",
    alignItems: "center",
    textAlign: "left",
    flex: 1,
    flexGrow: 1,
  },
  title: {
    padding: 15,
    //fontSize: RFPercentage(5),
  },
  inputContainer: {
    width: "100%",
  },
  item: {
    padding: 15,
    margin: 15,
    //width: Dimensions.get('window').width - 30,
  },
  fieldName: {
    //fontSize: RFPercentage(2.7),
  },
  input: {
    width: "100%",
  },
  form: {
    marginTop: "50rem",
  },
};
