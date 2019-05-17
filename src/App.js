import React, { Component } from 'react';

import Router from './Routes/Router';
import axios from 'axios';
import $ from 'jquery';

import PerfectScrollBar from 'react-perfect-scrollbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faEnvelope, faUserAlt, faPowerOff, faLock, faLockOpen,
    faScrewdriver, faXRay, faFingerprint, faBolt, faPencilAlt,
    faBars, faPlus, faArrowRight, faArrowLeft, faCaretDown, faTrash, faUserCircle}
    from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-perfect-scrollbar/dist/css/styles.css'
import './css/App.scss';
import './css/animate.css';
import Config from './Config.json';


/*

   Komponent som innehåller gränssnittets router samt primära state.

*/


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {}
        };
        this.url = Config.URL.PUBLISH
    }


    handleLogin = async ( id ) => {
        console.log('handle login id ', id);

        await axios.get(this.url + '/Account/GetAccountInfo?AccountId=' + id)
            .then( response => {
                console.log('Data from handle login: ', response.data);
                this.setState({
                    loggedIn: true,
                    user: response.data[0]
                });
            });
    };

    logOut = (user) => {
        console.log('user in logout: ', user);
      this.setState({
          loggedIn: false
      });
      alert(user.Username + ' loggades ut!');
    };


    async login(user, pass, passInput)
    {
        let data = new FormData();

        data.append('username', user);
        data.append('password', pass);
        $('.spinner-border').removeClass('d-none');
        await axios({
            method: 'post',
            url: this.url + '/auth/ValidateUser',
            data: data
        }).then((response) => {
            console.log('login response: ', response.data);
            this.handleLogin(response.data.accountId);
        }).catch((error) => {
            console.log(error.response);
            $('.spinner-border').addClass('d-none');
            if(error.response.status === 404) {
                $('#fail-alert').removeClass('d-none');
                passInput.value = '';
                setTimeout( () => {
                    $('#fail-alert').addClass('d-none');
                }, 2000)
            }
            else {
                alert('Server error.')
            }
        });
    };



    render() {
    console.log('api url: ', this.url);
    let quickSign = (event) => {
        if(event.code === 'Backslash' && this.state.loggedIn === false){
            this.login('Linus', 'linus');
        }
    };

    library.add(faEnvelope, faPhone, faUserAlt, faPowerOff, faLock, faLockOpen, faScrewdriver,
        faXRay, faFingerprint, faBolt, faPencilAlt, faBars, faPlus, faArrowRight, faArrowLeft, faCaretDown, faTrash, faUserCircle);
    window.addEventListener('keypress', quickSign);
    return(
        <div className={'App'}>
          <div className={'scroll-container'}>
            <PerfectScrollBar>
              <Router state={this.state} url={this.url}
                      signIn={(...args) => this.login(...args)}
                      signOut={(...args) => this.logOut(...args)}/>
            </PerfectScrollBar>
          </div>
        </div>
    );
  }
}

export default App;
