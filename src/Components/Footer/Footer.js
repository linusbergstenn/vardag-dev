import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from '../../imgs/logo.svg';

import './Footer.scss';

/*

    Footer Komponent

*/


const Footer = () => {
    return(
        <footer className={'footer container-fluid d-flex justify-content-around align-content-center'}>
            <div className={'w-40'}>
                <div className={'p-4'}>
                    <h4>Kontakt</h4>

                   <div className={'d-flex'}>
                   <FontAwesomeIcon icon={'phone'}/>
                   <a href={'tel:054123456'} className={'ml-3'}>054 - 12 34 56</a>
                   </div>

                    <div className={'d-flex'}>
                        <FontAwesomeIcon icon={'envelope'}/>
                        <a href={'mailTo:info@vardag.se'} className={'ml-3'}>info@vardag.se</a>
                    </div>

                </div>

            </div>
            <div className={''}>
                <div className={'p-4'}>
                    <h4>I sammarbete med</h4>
                    <img className={'logo'} src={Logo} />
                </div>
            </div>
        </footer>
    );
};
export default Footer