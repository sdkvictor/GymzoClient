import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "@material-ui/core/Collapse";
import CustomAlert from "../components/CustomAlert";

import { AuthContext } from "../context/AuthContext";
import { getProdProfile } from "../services/prod_profiles";
import { SERVER_URL } from "../config";
import {
  getPreviewImage,
  getPreviewJob,
  sendPrintRequest,
} from "../services/print";
import colors from "../constants/colors";
import Title from "../components/Title";
import { useHistory } from "react-router-dom";
import globalStyles from "../constants/styles";
import Loading from "./../components/Loading";

const PreviewView = (props) => {
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState("../assets/preview.jpg");
  const [prodProfile, setProdProfile] = useState();
  const [template, setTemplate] = useState({
    name: props.location.state.name,
    values: props.location.state.values,
    prodProfileId: props.location.state.prodProfileId,
  });

  const [alertVariant, setAlertVariant] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    initPreview();
  }, []);

  const initPreview = async () => {
    try {
      let pp = await getProdProfile(user.email);
      setProdProfile(pp);

      let result = await getPreview(template.values, template.name);

      if (result) {
        setPreview(result);
        console.log("Preview: ", result);
      } else {
        setAlertMessage("No se encontró una vista previa válida.");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage(
        "Se produjo un error intentando obtener una vista previa. Intente nuevamente. "
      );
      setAlertVariant("danger");
      setShowAlert(true);
    }
    //setIsLoading(false);
  };

  const getPreview = async (values) => {
    let job = await getPreviewJob(
      template.prodProfileId,
      template.name,
      template.values,
      user.email
    );

    await new Promise((r) => setTimeout(r, 6000));

    while (true) {
      try {
        let path = await getPreviewImage(
          template.prodProfileId,
          user.email,
          job
        );
        setPreview(SERVER_URL + "/HID-services/" + path);

        setLoading(false);

        break;
      } catch (e) {
        console.log("Not yet");
      }

      await new Promise((r) => setTimeout(r, 6000));
    }
  };
  const handleConfirm = () => {
    printTemplate();
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const handleBack = () => {
    history.goBack();
  };

  const printTemplate = async () => {
    try {
      let result = await sendPrintRequest(
        template.prodProfileId,
        template.name,
        template.values,
        user.email
      );
      history.push("/exito", {
        prodProfileId: template.prodProfileId,
        name: template.name,
      });
    } catch (error) {
      setAlertMessage(
        "Se produjo un error intentando generar la solicitud de impresión. Intente nuevamente. "
      );
      setAlertVariant("danger");
      setShowAlert(true);
    }
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
          Vista Previa
        </Title>
      </div>
      <div style={styles.titleContainer}>
        <h3>Vista Previa</h3>
      </div>
      {loading ? (
        <div style={styles.imageContainer}>
          <Loading></Loading>
        </div>
      ) : (
        <div style={styles.imageContainer}>
          <img src={preview} style={styles.image} className="rotate90" />
        </div>
      )}

      <div>
        <div>
          <Button
            type="submit"
            variant="flat"
            bg="flat"
            style={globalStyles.primaryButton}
            className="my-4"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            variant="flat"
            bg="flat"
            style={globalStyles.primaryButton}
            className="mb-4"
            onClick={handleBack}
          >
            Regresar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewView;

const styles = {
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    height: "100px",
    textAlign: "left",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "1%",
  },
  templateContainer: {
    display: "block",
    float: "left",
    textAlign: "center",
    marginLeft: "8%",
    marginRight: "8%",
    marginTop: "3%",
  },
  templateCard: {
    margin: "30px",
    display: "block",
    float: "left",
    height: "17rem",
    marginTop: "50px",
    width: "20rem",
  },
  thumbnail: {
    width: "18rem",
    height: "50%",
    resizeMode: "cover",
  },
  media: {
    height: 200,
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "#87DD32",
  },
  screen: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    borderWidth: 0,
    //backgroundColor: theme.COLORS.WHITE,
    width: "80%",
  },
  cardBlock: {
    marginTop: 10,
  },

  listContainer: {
    alignItems: "flex-start",
    width: "85%",
    flexGrow: 1,
  },
  imageContainer: {
    padding: 20,
    marginTop: 110,
    marginBottom: 110,
  },
  image: {
    height: 300,
    width: 525,
    boxShadow: "10px 10px 10px #ccc",
    //height: theme.SIZES.CARD_IMAGE_HEIGHT - 32,
  },
  title: {
    padding: 15,
    //fontSize: RFPercentage(5),
  },
  item: {
    padding: 10,
    //width: theme.SIZES.CARD_WIDTH - 32,
    flexDirection: "column",
    marginBottom: 10,
    alignItems: "center",
  },
  templateNameContainer: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  templateName: {
    //fontSize: RFPercentage(3),
    alignItems: "flex-start",
    flexWrap: "wrap",
    padding: 10,
  },
};
