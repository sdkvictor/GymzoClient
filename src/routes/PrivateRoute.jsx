import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Navigation from '../components/Navigation'
import Container from 'react-bootstrap/Container';
import ReactLoading from 'react-loading';
import Loading from './../components/Loading';

function PrivateRoute({ component: Component, ...otherProps }) {

    const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <>
            <Navigation/>
            <Container fluid={true}>
                <Route
                    {...otherProps}
                    render={props => (
                        !isLoading
                            ?
                            (
                                isAuthenticated
                                    ?
                                    <Component {...props} />
                                    :
                                    
                                    <Redirect to={'/login'} />
                            )
                            :
                            <Loading style={{height:667, width:375}}/>
                    )}
                />
            </Container>
        </>
    )

}

const styles = {
    container: {
        backgroundColor: "#87DD32"
    }
}

export default PrivateRoute;