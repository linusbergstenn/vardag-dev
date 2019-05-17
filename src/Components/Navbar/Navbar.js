import React from 'react';
import $ from 'jquery'

import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../imgs/logo-white.png';

import './Navbar.scss'

/*

    Navigations komponent

*/


const Navbar = (props) => {

    let signedIn = props.signedIn;
    let signOut = props.signOut;
    let user = props.user;

    $('.link').on('click', () => {
        console.log('link clicked');
        $('.navbar-collapse').collapse('hide');
    });
    $('.login').on('click', () => {
        console.log('link clicked');
        $('.navbar-collapse').collapse('hide');
    });
    $('.sign-out').on('click', () => {
        console.log('link clicked');
        $('.navbar-collapse').collapse('hide');
    });

    if (signedIn === false) {
        return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <img className="navbar-brand logo" src={Logo} />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggler"
                            aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse bg-primary" id="navbar-toggler">
                        <div className={' container-fluid d-flex justify-content-around'}>
                            <ul className="navbar-nav mt-2 mt-lg-0 d-lg-block p-2">
                                <NavLink className={'pr-4 link'} to={'/'}>Hem</NavLink>
                                <NavLink className={'pr-4 link'} to={'/About'}>Om vardag</NavLink>
                                <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                            </ul>
                            <div className="login my-2 my-lg-0 align-self-center align-items-center">
                                <NavLink className={'link d-flex'} to={'/LogIn'}>
                                    <FontAwesomeIcon className={'sign-in '} icon={'user-alt'} />
                                    <p>LOGGA IN</p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            );
    }else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className={'d-flex d-md-none'} id={'userLogo'}>
                    <img className="navbar-brand logo mr-3" src={Logo}/>
                    <h4 id={'user'}> {user.Name} </h4>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbar-toggler"
                        aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse bg-primary" id="navbar-toggler">
                    <div className={'container-fluid d-flex justify-content-around'}>
                        <ul className="navbar-nav mt-2 mt-lg-0 d-lg-block p-2">
                            <NavLink className={'pr-4 link'} to={'/Events'}>Händelser</NavLink>
                            <NavLink className={'pr-4 link'} to={'/Planner'}>Planera</NavLink>
                            <NavLink className={'pr-4 link'} to={'/About'}>Om VarDag</NavLink>
                            <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                        </ul>
                        <div className="my-2 my-lg-0 align-items-center align-self-center d-flex flex-column-reverse">
                            <NavLink onClick={() => signOut(user)} className={'link d-flex sign-out'}
                                     to={'/signedout'}>
                                <FontAwesomeIcon icon={'user-alt'} title={'Sign Out'}/>
                                <p>LOGGA UT</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};
export default Navbar;