import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import LogIn from './LogIn/LogIn';
import Events from './Events/Events';
import Planner from './Planner/Planner';
import LogOut from './LogOut/LogOut';
import NotFound from './NotFound/NotFound';
import {AddActivity} from "./AddActivity/AddActivity";

const Routes = (props) =>{
    let signedIn = props.state.loggedIn;
    let user = props.state.user;
    let url = props.url;
    console.log('router user: ', user);

        if(signedIn === false){
                return(
                    <BrowserRouter basename={window.location.pathname}>
                        <React.Fragment>
                            <Header signedIn={signedIn} signOut={props.signOut} user={user}/>
                            <Switch>
                                <Route exact path={'/'} component={() => <Home signedIn={signedIn} user={user}/>} />
                                <Route path={'/About'} component={() => <About signedIn={signedIn} user={user}/>} />
                                <Route path={'/Contact'} component={() => <Contact signedIn={signedIn} user={user}/>} />
                                <Route path={'/LogIn'} component={() => <LogIn signedIn={signedIn} signIn={props.signIn} user={user} />} />
                                <Route path={'/Events'} component={ () => <Events signedIn={signedIn} user={user}/>} />
                                <Route path={'/Planner'} component={ () => <Planner signedIn={signedIn}
                                                                                    user={user} api={url}/>} />
                                <Route path={'/signedout'} component={ () => <LogOut signedIn={signedIn}/>} />
                                <Route path={'/NewActivity'} component={() => <AddActivity user={user} signedIn={signedIn} api={url}/>}/>
                                <Route component={NotFound} />
                            </Switch>
                            <Footer/>
                        </React.Fragment>
                    </BrowserRouter>
                );
        }else {
            return (
                <BrowserRouter basename={window.location.pathname}>
                   <React.Fragment>
                       <Navbar signedIn={signedIn} signOut={props.signOut} user={user}/>
                       <Switch>
                           <Route exact path={'/'} component={() => <Home signedIn={signedIn} user={user}/>} />
                           <Route path={'/About'} component={() => <About signedIn={signedIn} user={user}/>} />
                           <Route path={'/Contact'} component={() => <Contact signedIn={signedIn} user={user}/>} />
                           <Route path={'/LogIn'} component={() => <LogIn signedIn={signedIn} signIn={props.signIn} user={user} />} />
                           <Route path={'/Events'} component={ () => <Events signedIn={signedIn} user={user}/>} />
                           <Route path={'/Planner'} component={ () => <Planner signedIn={signedIn}
                                                                               user={user} api={url}/>} />
                           <Route path={'/signedout'} component={ () => <LogOut signedIn={signedIn}/>} />
                           <Route path={'/NewActivity'} component={() => <AddActivity user={user} signedIn={signedIn} api={url}/>}/>
                           <Route component={NotFound} />
                       </Switch>
                       <Footer/>
                   </React.Fragment>
                </BrowserRouter>
            );
        }
};
export default Routes;