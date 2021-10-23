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

import colors from "../constants/colors";
import { getFields } from "../services/routines";
import { PictureAsPdfRounded, ViewArray } from "@material-ui/icons";
import Resizer from "react-image-file-resizer";
import { registerRoutine } from './../services/routines';

const AddRoutineView = (props) => {
  const [routineName, setRoutineName] = useState("");

  const history = useHistory();

  //const sharp = require('sharp');
  

  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //var RNFS = require('react-native-fs');
  const { handleSubmit, control } = useForm();


  const handleSend = async (e) => {
    e.preventDefault();
    registerRoutine(routineName, 1);
    history.push("/")
    //console.log("Original field values:", fieldValues);
    //console.log("Pictures", pictures);
  };

  /*
  const goToPreview = (values) => {
    console.log("Resized values", values);
    history.push("/vistaprevia", {
      prodProfileId: routine.prodProfileId,
      name: routine.name,
      values: values,
    });
  };
  */

  useEffect(() => {
    //initFields();
  }, []);

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const onNameChange = event => {
    setRoutineName(event.target.value);
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
          Nueva Rutina
        </Title>
      </div>
      <div style={styles.titleContainer}>
        <h3>Nueva Rutina</h3>
      </div>
      <div style={styles.listContainer}>
        <Form style={styles.form} className="mt-4" onSubmit={handleSend}>
          <div>
                <Form.Group>
                  <p>Nombre de la rutina</p>
                  <Form.Control
                    type="text"
                    //name={item.nombre}
                    placeholder="Mi Rutina"
                    onChange={onNameChange}
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
                Añadir rutina
              </Button>
            </div>
        </Form>

      </div>
    </div>
  );
};

export default AddRoutineView;

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
