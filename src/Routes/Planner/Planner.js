import React , { Component } from 'react';
import {NavLink, Redirect} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainContainer from "../../Components/MainCointainer/MainContainer";
import DayView from "../../Components/DayView/DayView";
import EditModal from "../../Components/EditModal/EditModal";
import EditGeneralModal from "../../Components/EditGeneralModal/EditGeneralModal";
import AddModal from "../../Components/AddModal/AddModal";

import axios from "axios";

import currentWeekNumber from 'current-week-number';

import './Planner.scss';
import GeneralActivities from "../../Components/GeneralActivities/GeneralActivities";
import SubActivityModal from "../../Components/SubActivityModal/SubActivityModal";
import EditSubModal from "../../Components/EditSubModal/EditSubModal";


class Planner extends Component{
    constructor(props){
        super(props);
        this.date = new Date();
        this.state = {
            activities: [],
            generalActivities: [],
            clickedActivity: '',
            date: this.date,
            day: this.date.getDay()
        };
        this.api = props.api;
        this.user = props.user;
        this.signedIn = props.signedIn;

        if(this.signedIn)
            this.rsUp(this.user);
    }
    rsUp(user){
        this.getUserActivities(user);
        this.getGeneralActivities();
    }
    sendToModal(activity){
        if(activity !== null){
            this.setState({clickedActivity: activity})
        }
    };

    getGeneralActivities(){
        axios.get(this.api + '/GeneralActivity/GetGeneralActivities')
            .then((response) => {
                this.setState({
                    generalActivities: response.data
                });
            }).catch( error => {
            console.log(error);
        });
    };
    getDateString() {
        let year = this.state.date.getUTCFullYear();
        let month = this.state.date.getUTCMonth() + 1;
        let day = this.state.date.getUTCDate();

        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        let dateString = `${year}-${month}-${day}`;
        return dateString;
    }
    getUserActivities(user){
        axios({
            method: 'get',
            url: this.api + '/Activity/GetActivitiesWithSubs',
            params: {
                AccountId: user.AccountId,
            }
        }).then((response) => {
            console.log(response, ' from getUserActivities');
            this.setState({
                activities: response.data
            });
        });
    };

    render(){
        console.log('Planner user', this.props.user);
        let newDate = new Date(this.state.date);
        let dateAdd = () => {
            newDate.setDate(newDate.getDate() + 1);
            this.setState({
                date: newDate,
                day: newDate.getDay()
            });
        };

        let dateSubtract = () => {
            newDate.setDate(newDate.getDate() - 1);
            this.setState({
                date: newDate,
                day: newDate.getDay()
            });
        };

        let specificDate = () => {
            let inpVal = document.getElementById('specificDate').value;
            console.log('moved from: ', this.state.date);

            this.setState({
                date: new Date(inpVal),
                day: new Date(inpVal).getDay()
            });
            console.log('to:  ', this.state.date);
        };
        let getDayString = () => {
            let weekdayString = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];
            let todayString;

            if(window.innerWidth > 1023){
                todayString =weekdayString[this.state.day] + 'dag ' + this.state.date.getUTCDate() + ' / ' + (this.state.date.getUTCMonth() + 1 )+ ' - ' + this.state.date.getUTCFullYear();
            }else{
                todayString = this.state.date.getUTCDate() + ' / ' + (this.state.date.getUTCMonth() + 1) + ' - ' + this.state.date.getUTCFullYear().toString().slice(2);
            }

            return todayString;
        };
        let dayContainer = () => {


            return(
                <div className={'day-container bg-light'}>
                    <nav className={'day-nav d-flex justify-content-between bg-primary'}>
                        <a className={'day-navigator w-25'} onClick={() => dateSubtract()}><FontAwesomeIcon className={'fa-3x align-self-center'} icon={'arrow-left'}/></a>
                        <div>
                            <div className={'p-3 d-flex justify-content-between'} data-toggle="collapse"
                                 data-target="#datePicker" aria-expanded="false" aria-controls="datePicker">
                                <h4>{getDayString()}</h4>
                                <FontAwesomeIcon icon={'caret-down'} className={'fa-2x ml-2 align-self-center'}/>
                            </div>
                            <div className={'collapse p-4 bg-primary'} id={'datePicker'}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="specificDate">Välj ett datum: </label>
                                        <input type="date" className="form-control" id="specificDate" defaultValue={this.getDateString()}/>
                                    </div>
                                    <a onClick={specificDate} className={'btn btn-light text-uppercase text-dark'}> Välj datum </a>
                                </form>
                            </div>
                        </div>
                        <a className={'day-navigator w-25'} onClick={() => dateAdd()}><FontAwesomeIcon className={'fa-3x align-self-center'} icon={'arrow-right'}/></a>
                    </nav>
                    <DayView date={this.state.date} activities={this.state.activities}
                             sendToModal={(...args) => this.sendToModal(...args)} api={this.api} reloadActivities={ () => this.rsUp(this.user) } user={this.user}/>
                </div>
            );
        };
        if(this.signedIn === false){
            return <Redirect to={'/login'} />
        }else{
            return(
                <MainContainer signedIn={this.signedIn} user={this.user}>
                    <div className={'conainer'}>
                        <div className={'container'}>
                            <h2 className={'title'}>Planera</h2>
                            <nav className={'title'}>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#your-activities"
                                       role="tab" aria-controls="nav-home" aria-selected="true">Ditt schema</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#general-activities"
                                       role="tab" aria-controls="nav-profile" aria-selected="false">Allmänna aktiviteter</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="your-activities" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className={'container mt-2 mb-4 bg-light'}>
                                        <div className={'container d-flex justify-content-between mb-1 mt-2'}>
                                            <h2 className={'title'}>Schema</h2>
                                            <h2>Vecka: {currentWeekNumber(this.state.date)}</h2>
                                            <div title={'Lägg till aktivitet'} className={'btn btn-alt1 pr-4 pl-4 add-activity-btn'} data-toggle={'modal'} data-target={'#add-content-modal'}><FontAwesomeIcon icon={'plus'}/></div>
                                        </div>
                                        {dayContainer()}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="general-activities" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className={'container mt-2 mb-4 bg-light general-activities-container'}>
                                        <div className={'container mb-1 mt-2'}>
                                            <NavLink className={'pr-4 text-muted'} to={'/NewActivity'}> <FontAwesomeIcon icon={'plus'} /> Allmän aktivitet</NavLink>
                                            <div className={'container '}>
                                                <GeneralActivities activities={this.state.generalActivities} api={this.api} reloadActivities={ () => this.rsUp(this.user)} user={this.user} sendToModal={(...args) => this.sendToModal(...args)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditModal reloadActivities={ () => this.rsUp(this.user)} activity={this.state.clickedActivity}
                               date={this.state.date} url={this.api}/>
                    <AddModal reloadActivities={() => this.rsUp(this.user)} user={this.user} date={this.state.date}
                              dateString={(...args) => this.getDateString(...args) } url={this.api}/>
                    <EditGeneralModal reloadActivities={() => this.rsUp(this.user)} user={this.user} date={this.state.date}
                                      dateString={(...args) => this.getDateString(...args) } url={this.api} activity={this.state.clickedActivity}/>
                    <SubActivityModal reloadActivities={ () => this.rsUp(this.user)} activity={this.state.clickedActivity}
                                      date={this.state.date} url={this.api} user={this.user}/>
                    <EditSubModal reloadActivities={ () => this.rsUp(this.user)} activity={this.state.clickedActivity}
                                  date={this.state.date} url={this.api} user={this.user}/>

                </MainContainer>
            );
        }
    }
};
export default Planner;