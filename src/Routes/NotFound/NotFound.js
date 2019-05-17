import React, { Component } from 'react';

import Logo from '../../imgs/logo-navy.png'

import './NotFound.scss';

const NotFound = (props) => {
   if(props.loggedIn === false){
       return(
           <div className={'NotFound'}>
               <img className={'logo'}
                    src={Logo} />
               <h2 className={'title'}>
                   KUNDE INTE HITTA SIDAN
               </h2>
           </div>
       );
   }else{
       return(
           <div className={'NotFound h'}>
               <img className={'logo'}
                    src={Logo} />
               <h2 className={'title'}>
                   KUNDE INTE HITTA SIDAN
               </h2>
           </div>
       );
   }
};
export default NotFound;