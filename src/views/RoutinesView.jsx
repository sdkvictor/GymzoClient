import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import colors from '../constants/colors';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Title from '../components/Title'

import images from '../constants/images';

import {SERVER_URL} from '../config';

import CustomAlert from '../components/CustomAlert';

import { getRoutines } from "../services/routines";
import { getUserProfile } from "../services/prod_profiles";
import Collapse from '@material-ui/core/Collapse'
import { Block } from '@material-ui/icons';
import Container from "react-bootstrap/Container";
import {Plus} from 'react-bootstrap-icons';

function RoutinesView(props) {

    const [routines, setRoutines] = useState([]);
    const [prodProfile, setProdProfile] = useState("");
    const {user} = useContext(AuthContext);

    const [alertVariant, setAlertVariant] = useState('danger');
    const [alertMessage, setAlertMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const onCloseAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        initRoutines();
    }, [])

    const initRoutines = async ()=> {
        try {
            let pp = await getUserProfile();
            setProdProfile(pp);
            console.log(pp);
      
            let result = await getRoutines(pp._id);
            
            if (result) {
              setRoutines(result);
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



    const onAddClick = (e) => {
        history.push('/nueva-rutina');
    }

    const handleSelect = (id) => {
        console.log("CLICK")
        history.push('/rutina', {routineID: id });

        //history.push('/rutina', {prodProfileId: prodProfile.api_id, routineID: id });
        //navigation.navigate('RouteName', { });
    
    }

    return (
        <div>
            <Collapse in={showAlert}>
                <CustomAlert
                    variant={alertVariant}
                    message={alertMessage} 
                    show={showAlert} 
                    onClose={onCloseAlert}
                />
            </Collapse>
            <div style={styles.titleContainer}>
        <Title h2 style={styles.title}>Selecciona una rutina</Title>
        </div>
        <div style={styles.titleContainer}>
            <h1>Mis rutinas</h1>

        </div>
            <div style={styles.routineContainer}>
                
                    
                    {routines.map((item, i) => {
                        return (
                            
                            <Card style={styles.routineCard} onClick={()=>handleSelect(item._id)}>
                                <CardActionArea >
                                    <CardMedia
                                    //style={styles.media}
                                    image={images[Math.floor(Math.random() * images.length)]}
                                    title={item.name}
                                    component="img"
                                    height="400"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" >
                                            {item.name}
                                        </Typography>
                                        
                                    </CardContent>

                                </CardActionArea>
                            </Card>
                                                     
                            
                        )
                    })}
                    
                    
            </div>

            <div className="fixed-bottom add-button">
                <span class="dot" onClick={onAddClick}><Plus/></span>
            </div>
            
        </div>
        
    )
}

const styles = {
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        height: '100px',
        textAlign: 'left'
    },
    titleContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: '1%'
      },
    routineContainer: {
        display: 'block',
        float: 'left',
        textAlign: 'center',
        marginLeft: '8%',
        marginRight: '8%',
        marginTop: '3%'
    },
    routineCard : {
        margin: '30px',
        display: 'block',
        float: 'left',
        marginTop: '50px',
        maxWidth: 400,
        minWidth: 400,
    },
    thumbnail: {
        width: '18rem',
        height: '50%',
        resizeMode: 'cover'
    },
    media: {
        height: 200,
        resizeMode: 'stretch'
    },
    container: {
        backgroundColor: "#87DD32"
    },
    button: {
        backgroundColor: colors.primary,
        color: colors.white
    }
    
}

export default RoutinesView
