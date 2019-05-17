import React from 'react';
import axios from "axios";

/*

    Komponent för att lägga till aktivitet

*/


const AddModal = (props) => {
    let choosenFile;
    let url = props.url;
    let imageSrc = 'https://www.picsum.photos/200/?random';

    let addImage = async (image, id) => {
        console.log('image from input ', image);
        console.log('AccountId in add image', props.user.AccountId);

        let data = new FormData();
        data.append('pic' ,image, image.name);

        data.append("AccountId", props.user.AccountId);
        data.append("ActivityId", id);

        console.log("data in image: ",data);

        await axios({
            method: 'post',
            url: url + '/image/UploadImage',
            data: data
        }).then((response) => {
            console.log('Image response: ', response.data);
        }).catch((error) => {
            console.log('Error: ', error);
        });
    };


    let addActivity = async () => {

        await axios({
            method: 'post',
            url: url + '/activity/AddActivity',
            params: {
                AccountId: props.user.AccountId,
                ActivityName: document.getElementById('add_activity-name').value,
                Description: document.getElementById('add_activity-description').value || 'Ingen beskrivning tillagd',
                TimeStart: document.getElementById('add_timeStart').value,
                TimeEnd: document.getElementById('add_timeEnd').value,
                Date: document.getElementById('add_date').value,
                Monday: document.getElementById('add_optionBox0').checked,
                Tuesday: document.getElementById('add_optionBox1').checked,
                Wednesday: document.getElementById('add_optionBox2').checked,
                Thursday: document.getElementById('add_optionBox3').checked,
                Friday: document.getElementById('add_optionBox4').checked,
                Saturday: document.getElementById('add_optionBox5').checked,
                Sunday: document.getElementById('add_optionBox6').checked,
                Energy: document.getElementById('add_energyOptions').value,
                Privat: document.getElementById('add_permBox0').checked,
                Hemma: document.getElementById('add_permBox1').checked,
                Skola: document.getElementById('add_permBox2').checked,
            }
        }).then((response) => {
            console.log('add activity response: ', response.data);
            if(choosenFile){
                addImage(choosenFile, response.data[0].ActivityId);
            }

        }).then( () => {
            props.reloadActivities();
            document.getElementById('add_activity-name').value = '';
            document.getElementById('add_activity-description').value = '';
            document.getElementById('add_imageOutput').src = imageSrc;

        }).catch((error) => {
            console.log('Error: ', error)
        });


    };

    let currHour = () => {
        let hour = props.date.getHours();
        let minute = props.date.getMinutes();
        if(hour < 10)
            hour = '0'+hour;
        if(minute < 10)
            minute = '0'+minute;

        let string = `${hour}:${minute}`;
        return string;
    };
    let nextHour = () => {
        let hour = props.date.getHours() + 1;
        let minute = props.date.getMinutes();
        if(hour < 10)
            hour = '0'+hour;
        if(minute < 10)
            minute = '0'+minute;

        let string = `${hour}:${minute}`;
        return string;
    };

    let loadImageSrc = () => {

        let file = document.getElementById('add_imageInput').files[0];
        console.log('choosen file', file);
        let reader  = new FileReader();

        reader.onloadend = () => {
            document.getElementById('add_imageOutput').src = reader.result;
        };
        if(file){
            reader.readAsDataURL(file);
            choosenFile = file;

        }
    };

    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let weekdays = weekdayString.map( (day, index) => {
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"add_optionBox" + index} />
                    <label className="custom-control-label" htmlFor={"add_optionBox" + index}>{day}</label>
                </div>
            );

    });

    let permissionsArray = ['privat', 'hemma', 'skola'];

    let permissions = permissionsArray.map( (permLevel, index) => {
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"add_permBox" + index} />
                    <label className="custom-control-label" htmlFor={"add_permBox" + index}>{permLevel}</label>
                </div>
            );
    });


    let maxEnergy = 10;
    let optionsArray = [];
    for(let i = 0; i < maxEnergy; i++)
        optionsArray.push(i+1);
    let options = optionsArray.map ( (option, index) => {
        return <option key={index}>{option}</option>
    });

    if(props.activity !== null || props.activity !== undefined){
        return(
            <div className="modal fade" id="add-content-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Lägg till aktivitet:</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={'form-group'}>
                                    <label htmlFor={'add_activity-name'}>Namn på aktivitet:</label>
                                    <input id={'add_activity-name'} type={'text'} className={'form-control'}/>
                                </div>
                                <div className="input-group d-flex flex-column-reverse">
                                    <div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="add_imageInput" accept="image/*" placeholder={'Välj bild: '} onChange={() =>loadImageSrc()}/>
                                            <label className="custom-file-label" htmlFor="imageInput">Välj bild:</label>
                                        </div>
                                    </div>
                                    <div style={{width: 200 +'px', height: 200 +'px', padding: .1 + 'em',
                                        marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border border-dark bg bg-light align-self-center'}>
                                        <img style={{width: 200 +'px'}} src={imageSrc} alt={'Activity'} className={'img-fluid'} id={'add_imageOutput'}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add_activity-description">Beskrivning</label>
                                    <textarea className="form-control" id="add_activity-description" rows={'3'}/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="add_date">Datum för aktivitet: </label>
                                    <input className={'form-control'} type={'date'} id={'add_date'} defaultValue={props.dateString()}/>
                                </div>
                                <div className={'form-group d-flex justify-content-around'}>
                                    <div>
                                        <label htmlFor="add_timeStart">Aktiviteten start: </label>
                                        <input className={'form-control'} type={'time'} id={'add_timeStart'} defaultValue={currHour()}/>
                                    </div>
                                    <div>
                                        <label htmlFor="add_timeEnd">Aktiviteten slutar: </label>
                                        <input className={'form-control'} type={'time'} id={'add_timeEnd'} defaultValue={nextHour()}/>
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor={'weekdays'}>Vilka dagar utförs arbetet</label>
                                    <div id={'weekdays'}>
                                        {weekdays}
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="add_energyOptions">Energikrävande</label>
                                    <select className="form-control" id="add_energyOptions">
                                        {options}
                                    </select>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="add_permissions">Behörigheter</label>
                                    <div id="add_permissions">
                                        {permissions}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-alt2" data-dismiss="modal">Stäng</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => addActivity()}>Lägg till aktivitet</button>
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
export default AddModal;