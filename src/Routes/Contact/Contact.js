import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainContainer from '../../Components/MainCointainer/MainContainer'
import Form from '../../Components/Form/Form';

import './Contact.scss'
const Contact = (props) => {
    if(props.signedIn === false){
        return(
            <MainContainer signedIn={props.signedIn} user={props.user}>
                <div className={'container bg-light mb-3'}>
                    <div className={'info-container container'}>
                        <h2 className={'title'}>Kontakt</h2>

                        <div className={'container d-flex justify-content-around flex-column flex-md-row'}>
                            <div className={'container'}>
                                <p>Har du frågor eller funderingar? Kontakta oss gärna via formuläret!</p>

                                <p>Du kan även ringa oss mellan 08.00-11.00.</p>
                                <div className={'cta d-flex pb-2'}>
                                    <FontAwesomeIcon className={'mr-4'} icon={'phone'} />
                                    <a href={'tel:054123456'}>054 - 12 34 56</a>
                                </div>
                            </div>

                            <div className={'container'}>
                                <Form input={'email'}
                                      placeholder={'example@example.com'}
                                      textid={'Meddelande'}>
                                    <button className={'btn btn-primary mt-2 float-right'}>Skicka</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }else{
        return(
            <MainContainer signedIn={props.signedIn} user={props.user}>
                <div className={'container h bg-light'}>
                    <div className={'info-container'}>
                        <h2 className={'title'}>Kontakt</h2>

                        <div className={'container d-flex justify-content-around flex-column flex-md-row'}>
                            <div className={'container'}>
                                <p>Har du frågor eller funderingar? Kontakta oss gärna via formuläret!</p>

                                <p>Du kan även ringa oss mellan 08.00-11.00.</p>
                                <div className={'cta d-flex pb-2'}>
                                    <FontAwesomeIcon className={'mr-4'} icon={'phone'} />
                                    <a href={'tel:054123456'}>054 - 12 34 56</a>
                                </div>
                            </div>

                            <div className={'container'}>
                                <Form input={'Email'}
                                      placeholder={'example@example.com'}
                                      textid={'Meddelande'}
                                      defaultValue={props.user.Email}>
                                    <button className={'btn btn-primary mt-2 float-right'}>Skicka</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
};
export default Contact