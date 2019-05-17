import React from 'react';

import Navbar from '../Navbar/Navbar';

import './Header.scss'

/*

    Header komponent

*/


const Header = (props) => {
    return(
        <header className={'container-fluid'}>
            <Navbar signedIn={props.signedIn} signOut={props.signOut} user={props.user}/>
            <div className={'info-container container d-none d-xl-block'}>
                <h2>Lorem Ipsum </h2>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ipsum, bibendum at urna nec, sagittis mattis dolor. Suspendisse viverra, velit non eleifend aliquet, odio diam sodales diam, hendrerit viverra diam velit non neque. Nunc nec risus porttitor, gravida magna quis, hendrerit erat. Maecenas iaculis magna nec scelerisque pulvinar. </p>
            </div>
        </header>
    );
};
export default Header;