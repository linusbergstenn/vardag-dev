import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'

import MainContainer from "../../Components/MainCointainer/MainContainer";
import Phone from '../../imgs/adnroid.svg'

import './LogIn.scss'

const LogIn = (props) => {

    let signIn = async (e) => {
        e.preventDefault();
        let user = document.getElementById('ValidateUser').value;
        let pass = document.getElementById('ValidatePassword').value;
        await props.signIn(user, pass, document.getElementById('ValidatePassword'));
    };
    if(props.signedIn !== true){
        return(
            <MainContainer signedIn={props.signedIn}>
                <div className={'container mb-3'}>
                    <h2 className={'title'}>Logga in</h2>
                    <div className={'container bg-light d-flex justify-content-around'}>
                        <form  onSubmit={signIn} className={'p-4'}>
                            <div className="form">
                                <div className="mb-3 form-group">
                                    <label htmlFor="ValidateUser">Användarnamn</label>
                                    <input type="text" className="form-control" id="ValidateUser"
                                           placeholder="Användare" autoComplete='off' required />
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="ValidatePassword">Password</label>
                                    <input type="password" className="form-control" id="ValidatePassword"
                                           required />
                                </div>
                                <button type={'submit'} className={'btn btn-primary'}>Logga In</button>
                            </div>
                            <div className={'d-none alert alert-danger p-3 mt-2 animated shake'} id={'fail-alert'} role={'alert'}>
                                FEL ANVÄNDARNAMN ELLER LÖSENORD
                            </div>
                            <div className="spinner-border text-info d-none" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </form>
                        <div className={'d-none d-lg-inline'} id={'right-content'}>
                    <span>
                        <img src={Phone} />
                    </span>
                        </div>
                    </div>
                </div>
            </MainContainer>
        )
    }else{
        return <Redirect to={'/Events'}/>
    }
};
export default LogIn;