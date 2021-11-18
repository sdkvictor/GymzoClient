import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginView from '../views/LoginView';
import SignupView from '../views/SignupView';
import NonAuthRoute from './NonAuthRoute';


import ProfileView from './../views/ProfileView';
import PasswordView from './../views/PasswordView';
import SuccessPasswordView from './../views/SuccessPasswordView';
import RoutinesView from './../views/RoutinesView';
import AddRoutineView from './../views/AddRoutineView';
import ExercisesView from './../views/ExercisesView';
import AddExerciseView from './../views/AddExerciseView';
import RecordView from './../views/RecordView';
import RecordsView from './../views/RecordsView';

function MainRouter() {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path="/" component={RoutinesView}/>
                <PrivateRoute exact path="/rutina" component={ExercisesView}/>
                <PrivateRoute exact path="/nueva-rutina" component={AddRoutineView}/>
                <PrivateRoute exact path="/nuevo-ejercicio" component={AddExerciseView}/>
                <PrivateRoute exact path="/record" component={RecordView}/>
                <PrivateRoute exact path="/exercise-records" component={RecordsView}/>
                <PrivateRoute exact path="/perfil" component={ProfileView}/>
                <PrivateRoute exact path="/contraseña" component={PasswordView}/>
                <PrivateRoute exact path="/exitocontraseña" component={SuccessPasswordView}/>
                <NonAuthRoute exact path="/login" component={LoginView}/>
                <NonAuthRoute exact path="/signup" component={SignupView}/>
                
                
            </Switch>
        </div>
    )
}



export default MainRouter