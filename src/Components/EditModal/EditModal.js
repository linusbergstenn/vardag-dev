import React from 'react';



import './EditModal.scss';
import axios from "axios";


/*

    Komponent för att redigera en aktivitet

*/


const EditModal = (props) => {
    let url = props.url;
    let imageSrc;
    let choosenFile;

    let deleteActivity = async () => {
     let cnfrm = window.confirm('Vill du ta bort: ' + props.activity.activityName +'?');

     if(cnfrm){
         let data = new FormData();
         data.append('Activityid', props.activity.activityId);

         let endpoint = '/Activity/DeleteActivityWithSubs';
         console.log('confirmed', cnfrm);
         await  axios({
             method: 'post',
             url: url + endpoint ,
             data: data
         }).then((response) => {
             props.reloadActivities();
         }).catch((error) => {
             console.warn('Error: ', error)
         });
     }

    };
    let addImage = async (image) => {
        console.log('image from input ', image);
        let data = new FormData();
        data.append('pic' ,image, image.name);

        data.append("accountid", aktivitet.accountId);
        data.append("activityid", aktivitet.activityId);

        console.log("data in image: ",data);

        var axiosConfig = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type':'application/x-www-form-urlencoded'
            }
        };

        await axios({
            method: 'post',
            url: url + '/image/UploadImage',
            data: data,
            config: axiosConfig
        }).then((response) => {
            console.log('Image response: ', response.data);
            props.reloadActivities();
        }).catch((error) => {
            console.log('Activity iamge-Error', error);
        });
    };
    let updateActivity = async () => {

        await axios({
            method: 'post',
            url: url + '/activity/EditActivity',
            params: {
                    ActivityId: props.activity.activityId,
                    ActivityName: document.getElementById('activity-name').value || props.activity.activityName,
                    Description: document.getElementById('activity-description').value || props.activity.description,
                    TimeStart: document.getElementById('timeStart').value || props.activity.timeStart,
                    TimeEnd: document.getElementById('timeEnd').value || props.activity.timeEnd,
                    Date: document.getElementById('date').value || props.activity.date,
                    Monday: document.getElementById('optionBox0').checked,
                    Tuesday: document.getElementById('optionBox1').checked,
                    Wednesday: document.getElementById('optionBox2').checked,
                    Thursday: document.getElementById('optionBox3').checked,
                    Friday: document.getElementById('optionBox4').checked,
                    Saturday: document.getElementById('optionBox5').checked,
                    Sunday: document.getElementById('optionBox6').checked,
                    Energy: document.getElementById('energyOptions').value || props.activity.energy,
                    Privat: document.getElementById('permBox0').checked,
                    Hemma: document.getElementById('permBox1').checked,
                    Skola: document.getElementById('permBox2').checked
            }
        }).then((response) => {
            console.log('imageInput: ', document.getElementById('imageInput').value);
            console.log('update acticity: ', response);
            if(choosenFile){
                addImage(choosenFile);
            }else{
                props.reloadActivities();
            }
        }).catch((error) => {
            console.log('Activity-Error: ', error)
        });


    };
    let aktivitet = props.activity;
    let acDate = new Date(aktivitet.Date);
    let getDateString = () => {
        let year = acDate.getUTCFullYear();
        let month = acDate.getUTCMonth() + 1;
        let day = acDate.getUTCDate();

        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        let dateString = `${year}-${month}-${day}`;
        return dateString;
    };

    let getImageSrc = () => {
        console.log('Aktivitet imageId - getimageSrc: ', aktivitet.imageId);
      if(aktivitet.imageId === null || aktivitet.imageId === undefined ){
          console.log('GetImageSrc: har ingen bild');
          return imageSrc = 'https://picsum.photos/200/?random';

      }else{
          console.log('GetImageSrc: Aktivitet har en bild');
          return imageSrc = url + '/image/GetImage?id=' + aktivitet.imageId;

      }
    };

    let loadImageSrc = () => {

        let file = document.querySelector('input[type=file]').files[0];
        console.log('choosen file', file);
        let reader  = new FileReader();

        reader.onloadend = () => {
            document.getElementById('imageOutput').src = reader.result;
        };
        if(file){
            reader.readAsDataURL(file);
            choosenFile = file;

        }
    };
    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let weekdays = weekdayString.map( (day, index) => {
        let weekday = [aktivitet.monday, aktivitet.tuesday, aktivitet.wednesday, aktivitet.thursday, aktivitet.friday, aktivitet.saturday, aktivitet.sunday];
        if(weekday[index] === true){
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"optionBox" + index} defaultChecked/>
                    <label className="custom-control-label" htmlFor={"optionBox" + index}>{day}</label>
                </div>
            );
        }else{
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"optionBox" + index} />
                    <label className="custom-control-label" htmlFor={"optionBox" + index}>{day}</label>
                </div>
            );
        }

    });

    let permissionsArray = ['privat', 'hemma', 'skola'];

    let permissions = permissionsArray.map( (permLevel, index) => {
        if (permLevel !== true){
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"permBox" + index} />
                    <label className="custom-control-label" htmlFor={"permBox" + index}>{permLevel}</label>
                </div>
            );
        }else{
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"permBox" + index} defaultChecked/>
                    <label className="custom-control-label" htmlFor={"permBox" + index}>{permLevel}</label>
                </div>
            );
        }
    });


    let maxEnergy = 10;
    let optionsArray = [];
    for(let i = 0; i < maxEnergy; i++)
        optionsArray.push(i+1);
    let options = optionsArray.map ( (option, index) => {


        if (aktivitet.energy === index+1){
            return <option key={index} selected>{option}</option>
        }else
            return <option key={index}>{option}</option>
    });

if(props.activity !== null || props.activity !== undefined){

    getImageSrc();

    return(
        <div className="modal fade" id="edit-content-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Redigera <span className={'text-muted'}>{aktivitet.activityName}</span></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className={'form-group'}>
                                <label htmlFor={'activity-name'}>Namn på aktivitet:</label>
                                <input id={'activity-name'} defaultValue={aktivitet.activityName} type={'text'} className={'form-control'}/>
                            </div>
                            <div className="input-group d-flex flex-column-reverse">
                                <div>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="imageInput" accept="image/*" placeholder={'Välj bild: '} onChange={() =>loadImageSrc()}/>
                                        <label className="custom-file-label" htmlFor="imageInput">Välj bild:</label>
                                    </div>
                                </div>
                                <div style={{width: 200 +'px', height: 200 +'px', padding: .1 + 'em',
                                    marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border border-dark bg bg-light align-self-center'}>
                                    <img style={{width: 200 +'px'}} src={imageSrc} alt={'Activity image'} className={'img-fluid'} id={'imageOutput'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-description">Beskrivning</label>
                                <textarea defaultValue={aktivitet.description} className="form-control" id="activity-description" rows={'3'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="date">Datum för aktivitet: </label>
                                <input className={'form-control'} type={'date'} id={'date'} defaultValue={getDateString} />
                            </div>
                            <div className={'form-group d-flex justify-content-around'}>
                                <div>
                                    <label htmlFor="timeStart">Aktiviteten start: </label>
                                    <input className={'form-control'} type={'time'} id={'timeStart'} defaultValue={aktivitet.timeStart} />
                                </div>
                                <div>
                                    <label htmlFor="timeEnd">Aktiviteten slutar: </label>
                                    <input className={'form-control'} type={'time'} id={'timeEnd'} defaultValue={aktivitet.timeEnd} />
                                </div>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor={'weekdays'}>Vilka dagar utförs arbetet</label>
                                <div id={'weekdays'}>
                                    {weekdays}
                                </div>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="energyOptions">Energikrävande</label>
                                <select className="form-control" id="energyOptions">
                                    {options}
                                </select>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="permissions">Behörigheter</label>
                                <div id="permissions">
                                    {permissions}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-alt2" data-dismiss="modal" onClick={() => {deleteActivity()}}>Delete Activity</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => updateActivity()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}else{
    return(
        <div className="modal fade" id="edit-content-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                </div>
            </div>
            );
}

};
export default EditModal;