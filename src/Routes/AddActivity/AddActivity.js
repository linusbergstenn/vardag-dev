import React from 'react';
import MainContainer from "../../Components/MainCointainer/MainContainer";
import axios from "axios";

import {Redirect} from "react-router";

export const AddActivity = (props) => {
    let url = props.api;

    let choosenFile;
    let imageSrc = 'https://picsum.photos/200/?random';
    let date = new Date();

    let loadImageSrc = () => {

        let file = document.querySelector('input[type=file]#GeneralimageInput').files[0];
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
    let addImage = async (image, id) => {
        console.log('image from input ', image);
        let data = new FormData();
        data.append('pic' ,image, image.name);
        data.append("activityid", id);

        await axios({
            method: 'post',
            url: url + '/image/UploadImage',
            data: data
        }).then((response) => {
            console.log('Image response: ', response.data);
        }).catch((error) => {
            console.log('Error', error);
        });
    };

    let addGA = async() => {
        let data = new FormData();
        data.append('Name', document.getElementById('add-generalactivity-name').value);
        data.append('Description', document.getElementById('add-generalactivity-description').value);
        data.append('Contributor', props.user.Name);
       axios({
           method: 'post',
           url: props.api + '/GeneralActivity/AddGeneralActivity',
           data: data
       })
       .then( response => {
           console.log('Added general activity: ', response.data);
           if(choosenFile){
               addImage(choosenFile, response.data[0].ActivityId);
       }
           document.getElementById('add-generalactivity-name').value = '';
           document.getElementById('add-generalactivity-description').value = '';
           document.getElementById('imageOutput').src = imageSrc;
        }).catch( error => {
            console.log(error);
       });
    };





    let maxEnergy = 10;
    let optionsArray = [];
    for(let i = 0; i < maxEnergy; i++)
        optionsArray.push(i+1);

    if(props.signedIn){
        return(
            <MainContainer user={props.user} signedIn={props.signedIn} cls={true}>
                <div className={'container bg-light mb-3'}>
                    <div className={'container p-3'}>
                        <h2 className={'title'}>Lägg till en allmän aktivitet: </h2>
                    </div>
                    <div className=''>
                        <form>
                            <div className='d-flex align-items-center justify-content-around flex-column-reverse flex-md-row'>
                                <div className={'w-75 d-flex flex-column-reverse flex-md-column'}>
                                    <div className='form-group'>
                                        <label htmlFor={'add-generalactivity-name'}>Namn på aktivitet:</label>
                                        <input id={'add-generalactivity-name'} type={'text'} className={'form-control'}/>
                                    </div>
                                    <div className='mb-2 mb-md-0 input-group'>
                                        <div className='input-group-append'>
                                            <a onClick={null} style={{cursor: 'pointer'}} className='input-group-text'> Dina bilder </a>
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" style={{cursor: 'pointer'}} className="custom-file-input" id="GeneralimageInput" accept="image/*" placeholder={'Välj bild: '} onChange={() =>loadImageSrc()}/>
                                            <label className="custom-file-label" htmlFor="GeneralimageInput">Välj bild för aktivitet:</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group d-flex flex-column-reverse">
                                    <div style={{width: 200 +'px', height: 200 +'px', padding: .1 + 'em',
                                        marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border border-dark bg bg-light align-self-center'}>
                                        <img style={{width: 200 +'px'}} src={imageSrc} alt={'Activity image'} className={'img-fluid'} id={'imageOutput'}/>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor={'add-generalactivity-description'}>Beskrivning av aktivitet</label>
                                <textarea id={'add-generalactivity-description'} className={'form-control'}/>
                            </div>
                        </form>
                        <a style={{cursor: 'pointer'}} className='btn btn-primary' onClick={() => addGA()}> lägg till aktiviteten</a>
                    </div>
                </div>
            </MainContainer>
        );
    }else
        return <Redirect to={'/login'}/>
};