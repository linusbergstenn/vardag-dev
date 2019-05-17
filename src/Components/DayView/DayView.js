import React from 'react';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Config from '../../Config.json';
import axios from 'axios';

import './DayView.scss'



/*

    Komponent för att visa schemat

*/
const DayView = (props) => {
    let date = props.date;
    let activities = props.activities;
    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let todaysActivities = [];
    let activityImage;

    console.log('activities recieved in dayview: ', activities);


    let getImage = async (a) => {
        console.log('Aktivitet ' + a.Name + ' har ett bildId:', a.imageId);
        activityImage = props.api + '/image/GetImage?id=' + a.imageId;
    };


    activities.forEach( activity => {
        let d = new Date(activity.date);
        let weekday = [activity.sunday, activity.monday, activity.tuesday, activity.wednesday, activity.thursday, activity.friday, activity.saturday];



        if(weekday[date.getDay()] === true){
            if(d.getTime() <= date.getTime()){
                todaysActivities.push(activity);
            }
        }else{
            if (d.toDateString() === date.toDateString())
                todaysActivities.push(activity);
        }

        todaysActivities.sort( (a,b) => {
            let adate= new Date(a.date.slice(0, 11) + a.timeStart);
            let bdate = new Date(b.date.slice(0, 11) + b.timeStart);

            let aDate = adate.getHours();
            let bDate = bdate.getHours();
            return aDate - bDate
        })
    });
    console.log('todyasActivities: ', todaysActivities);
    let dgnsAktiviteter = todaysActivities.map( (activity, index) => {
        let energyArray = [];
        let maxEnergy = Config.MaxEnergy;
        let energy = activity.energy;
        let actImage;

        if(activity.imageId !== null){
            getImage(activity);
            actImage = () =>{
                return(
                    <div style={{width: 250 +'px', height: 250 +'px', padding: .1 + 'em',
                        marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border bg bg-light align-self-md-center'}>
                        <img src={activityImage} alt={activity.activityName} className={'img-fluid'}/>
                    </div>
                )
            }
        }else{
            actImage = () => {return null};
        }
        let deleteSub = (sub) => {
            let data = new FormData();
            data.append('id', sub.subActivityId);
           let cnfrm = window.confirm('Vill du ta bort subaktiviteten: ' + sub.name + '?');

           if(cnfrm){
               axios({
                   method: 'post',
                   url: props.api + '/SubActivity/DeleteSubActivity',
                   params:{
                       Id: sub.subActivityId
                   }
               })
               .then( () => {
                   props.reloadActivities();
               })
           }

        };
        let modalContent = (activity) => {
            props.sendToModal(activity);
        };


        for (let i = 0; i < maxEnergy; i++) {
            energyArray.push(<FontAwesomeIcon className={'fa-2x'} icon={'bolt'}/>);
        }

        let energyAmount = energyArray.map( (e, index) => {
            let classname;

            if(energy >= index+1){
                classname = 'text-warning';
            }


            return(
                <div key={index} className={'p-md-3 ' + classname}>
                    {e}
                </div>
            );
        });

        let weekdays = weekdayString.map( (day, index) => {

            let weekday = [activity.monday, activity.tuesday, activity.wednesday, activity.thursday, activity.friday, activity.saturday, activity.sunday];
            let cName;
            if(weekday[index] !== true){
                cName = 'bg-alt2 d-none d-md-flex';
            }
            else {
                cName = 'bg-alt1'
            }
            return (
                <div key={index} className={'week-day ' + cName}>
                    <h4><span>{day}</span></h4>
                </div>
            );
        });

        let subactivities = activity.subActivities.map( (sub, index) => {
            return(
                <div key={index} className={'card p-2 mb-2'}>
                    <div className={'card-body'}>
                        <div className={'d-flex justify-content-between'}>
                            <h4>{sub.name}</h4>
                            <div className='d-flex'>
                                <FontAwesomeIcon style={{cursor: 'pointer'}} icon={'trash'}
                                                 className={'mr-2 edit-icon text-danger'} onClick={ () => deleteSub(sub)}/>
                                <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => modalContent(sub)}
                                             data-toggle={'modal'} data-target={'#edit-subActivity-modal'} className={'edit-icon'} icon={'pencil-alt'}/>
                            </div>
                            </div>
                        <p> {sub.text}</p>
                    </div>
                </div>
            );
        });
        return(
            <div key={index} className={'container p-3 card mt-1 mb-2 mx-auto'}>
                <div className={'card-body'}>
                    <div className={'d-flex justify-content-between mb-2 border-bottom align-items-center'}>
                        <h4 style={{flex: '1 1 100%'}}>{activity.activityName}</h4>
                        <div className={'container-fluid fa-2x'}>
                            <FontAwesomeIcon onClick={() => modalContent(activity)}
                                             data-toggle={'modal'} data-target={'#edit-content-modal'} className={'edit-icon'} icon={'pencil-alt'}/>
                        </div>
                    </div>
                    <div className={'container-fluid description-container d-flex flex-column flex-md-row-reverse justify-content-between'}>
                        {actImage()}
                        <div>
                            <p>{activity.description}</p>
                            <b><time>{activity.timeStart} - {activity.timeEnd}</time></b>
                        </div>
                    </div>
                    <div className={'mt-2 container-fluid week-day-container d-flex flex-wrap justify-content-around justify-content-md-between p-3'}>
                        {weekdays}
                    </div>
                    <div className={'container-fluid energy-container d-flex flex-wrap justify-content-around justify-content-md-between mt-2'}>
                        {energyAmount}
                    </div>
                    <div className={'mt-2'} id={"accordion"}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between" id={"heading" + index} data-toggle="collapse"
                                 data-target={"#collapse" + index} aria-expanded="false"
                                 aria-controls={"collapse" + index}>
                                <h5 className="align-self-center">
                                    VISA SUBACTIVITIES
                                </h5>
                                <FontAwesomeIcon icon={'caret-down'} className="fa-2x" />
                            </div>

                            <div id={"collapse" + index} className="collapse" aria-labelledby={"heading" + index}
                                 data-parent="#accordion">
                                <div className="card-body bg-light">
                                    {subactivities}
                                    <a onClick={ () => modalContent(activity)} className='container-fluid btn btn-light border-mute'
                                                      data-toggle={'modal'} data-target={'#subactivity-modal'}>LÄGG TILL UNDERAKTIVITET</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    });


    if(todaysActivities.length === 0){
        return(
            <div className={'activity-list'}>
                <div className={'container no-activities'}>
                    <h1 className={'m-3'}>DET FINNS INGA AKTIVITETER IDAG</h1>
                </div>
            </div>
        );
    }else{
        return(
            <div className={'activity-list'}>
                <PerfectScrollbar>
                    {dgnsAktiviteter}
                </PerfectScrollbar>
            </div>
        );
    }

};
export default DayView;