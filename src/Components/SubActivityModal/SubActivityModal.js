import React from 'react';
import axios from "axios";

/*

    Komponent för att lägga till underaktivitet

*/


const SubActivityModal = (props) => {
    let choosenFile;
    let url = props.url;

    let addImage = async (image, id) => {
        console.log('image from input ', image);
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

        let a = document.getElementById('add_subactivity-description').value || 'Ingen beskrivning tillagd';
        let data = new FormData();
        data.append('ActivityId', props.activity.activityId);
        data.append('Name', document.getElementById('add_subactivity-name').value);
        data.append('Text', document.getElementById('add_subactivity-description').value);
        data.append('Sort', 5);
        await axios({
            method: 'post',
            url: url + '/SubActivity/AddSubActivity',
            data:data
        }).then((response) => {
            console.log('add subactivity response: ', response.data);
            if(choosenFile){
                addImage(choosenFile, response.data[0].ActivityId);
            }
        }).then( ()=>{
            props.reloadActivities();
            document.getElementById('add_subactivity-name').value = '';
            document.getElementById('add_subactivity-description').value = '';
        }).catch((error) => {
            console.log('Error: ', error)
        });

    };
    let loadImageSrc = () => {

        let file = document.getElementById('add_subimageInput').files[0];
        console.log('choosen file', file);
        let reader  = new FileReader();

        reader.onloadend = () => {
            document.getElementById('add_subimageOutput').src = reader.result;
        };
        if(file){
            reader.readAsDataURL(file);
            choosenFile = file;

        }
    };

    let imageSrc = 'https://www.picsum.photos/200/?random';
    if(props.activity !== null || props.activity !== undefined){
        return(
            <div className="modal fade" id="subactivity-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Lägg till underaktivitet för {props.activity.activityName}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={'form-group'}>
                                    <label htmlFor={'add_subactivity-name'}>Namn:</label>
                                    <input id={'add_subactivity-name'} type={'text'} className={'form-control'}/>
                                </div>
                                <div className="input-group d-flex flex-column-reverse">
                                    <div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="add_subimageInput" accept="image/*" placeholder={'Välj bild: '} onChange={() =>loadImageSrc()}/>
                                            <label className="custom-file-label" htmlFor="add_subimageInput">Välj bild:</label>
                                        </div>
                                    </div>
                                    <div style={{width: 200 +'px', height: 200 +'px', padding: .1 + 'em',
                                        marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border border-dark bg bg-light align-self-center'}>
                                        <img style={{width: 200 +'px'}} src={imageSrc} alt={'Activity'} className={'img-fluid'} id={'add_subimageOutput'}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add_activity-description">Beskrivning</label>
                                    <textarea className="form-control" id="add_subactivity-description" rows={'3'}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-alt2" data-dismiss="modal">Stäng</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => addActivity()}>Lägg till underaktivitet</button>
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
export default SubActivityModal;