import React from 'react';
import { Redirect } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainContainer from '../../Components/MainCointainer/MainContainer';

import './Events.scss'
const Events = (props) => {

    let eventsArray = [
        {
            event: 'xxxxx dök inte upp i skolan',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu massa malesuada, imperdiet ligula sed, dapibus orci. Duis condimentum non tortor sed commodo. Suspendisse non erat hendrerit orci fringilla tincidunt quis vitae purus. Curabitur egestas ipsum at dui placerat malesuada. Sed maximus posuere dignissim'
        },{
            event: 'Aktivitet borttagen',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu massa malesuada, imperdiet ligula sed, dapibus orci. Duis condimentum non tortor sed commodo. Suspendisse non erat hendrerit orci fringilla tincidunt quis vitae purus. Curabitur egestas ipsum at dui placerat malesuada. Sed maximus posuere dignissim'
        },{
            event: 'Aktivitet tillagd',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu massa malesuada, imperdiet ligula sed, dapibus orci. Duis condimentum non tortor sed commodo. Suspendisse non erat hendrerit orci fringilla tincidunt quis vitae purus. Curabitur egestas ipsum at dui placerat malesuada. Sed maximus posuere dignissim'
        },{
            event: 'Aktivitet redigerad',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu massa malesuada, imperdiet ligula sed, dapibus orci. Duis condimentum non tortor sed commodo. Suspendisse non erat hendrerit orci fringilla tincidunt quis vitae purus. Curabitur egestas ipsum at dui placerat malesuada. Sed maximus posuere dignissim'
        },
    ];

    let events = eventsArray.map( (event, index) => {

        let icon = ['lock', 'lock-open', 'screwdriver', 'x-ray', 'fingerprint'];
        let bg = ['bg-primary', "bg-secondary", "bg-alt1", "bg-alt2", 'bg-alt3'];
        let r = Math.floor((Math.random() * Math.floor(icon.length - 1)));
        let r1 = Math.floor((Math.random() * Math.floor(bg.length - 1)));

        return(
            <div key={index} className={'event-container d-flex justify-content-around mb-3 bg-light'}>
               <div className={'placeholder-image ' + bg[r1]}>
                   <FontAwesomeIcon className={'icon fa-2x align-self-center'} icon={icon[r]}/>
            </div>
                <div className={'p-4'}>
                    <h3>{event.event}</h3>
                    <p>{event.body}</p>
                </div>
            </div>
        );
    });

   if (props.signedIn === false){
       return <Redirect to={'/login'} />
   } else{
       return(
           <MainContainer signedIn={props.signedIn} user={props.user}>
               <div className={'container mb-3'}>
                   <div className={'container'}>
                       <h2 className={'title'}>Senaste Händelserna</h2>
                       <div>
                           {events}
                       </div>
                   </div>
               </div>
           </MainContainer>
       );

   };
};
export default Events;