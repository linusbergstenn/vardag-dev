import React from 'react';

import Line from '../../imgs/DotLine.svg'
import Logo from '../../imgs/logo-navy.png'

import 'bootstrap';
import './MainContainer.scss';


/*

    Komponent för huvudcontainer, huvudlayouten av innehållet

*/


const MainContainer = (props) => {
    let signedIn = props.signedIn;
    let user = props.user;

    if(signedIn === false){
        return(
            <main className={'main-container container-fluid '}>
                {props.children}
            </main>
        );
    }else{
        return(
            <main className={'main-container container-fluid'}>
                <div className={'container d-none d-lg-flex justify-content-between signed-in-view pt-4'}>
                    <img src={Logo} />
                    <h1 id={'user'} className={'align-self-center'}>{user.Username || 'Användare'}</h1>
                </div>
                {props.children}
            </main>
        );
    }
};
export default MainContainer;