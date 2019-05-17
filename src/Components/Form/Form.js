import React from 'react';


import './Form.scss'



/*

    Komponenten skapar ett formulär

*/


const FormGroup = (props) => {
    return(
        <div className={'form-group'}>
            {props.children}
        </div>
    );
};

const Input = (props) => {
    return(
        <input type={props.type}
               className={'form-control'}
               id={props.type}
               placeholder={props.placeholder}
               defaultValue={props.defaultValue || ''} />
    );
};



const Form = (props) => {
    return(
        <FormGroup>
            <label htmlFor={props.input}>
                {props.input}:
            </label>
            <Input type={props.input}
                   placeholder={props.placeholder}
                   defaultValue={props.defaultValue}/>
            <label htmlFor={props.textid}>{props.textid}</label>
            <textarea className="form-control" id={props.textid} rows="3" />
            {props.children}
        </FormGroup>
    );
};
export default Form;