import React from 'react';

import Logo from '../../imgs/logo.svg'
import Kau from '../../imgs/Image 35.svg'

import MainContainer from '../../Components/MainCointainer/MainContainer';

import './About.scss';

const About = (props) => {
    return(
        <MainContainer signedIn={props.signedIn} user={props.user}>
            <div className={'container mb-3'}>
                <h2 className={'title'}>Om VarDag</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut nulla ac diam faucibus fringilla. Cras faucibus, augue quis ultrices volutpat, lorem magna vulputate nulla, vel tincidunt ante velit quis nulla. Integer eget ligula et sem aliquam tincidunt. Aliquam ac pretium massa. Quisque semper velit non nulla cursus, quis aliquam odio aliquet. Aliquam erat volutpat. Sed pretium fringilla nisl sed consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra urna id mi blandit lacinia. Nunc sit amet semper libero, vel vulputate lorem. Phasellus volutpat laoreet egestas. Quisque sollicitudin nisl dolor, a ullamcorper nulla convallis sit amet. Nullam viverra purus sed libero aliquam molestie. In hac habitasse platea dictumst.</p>
                <p>Ut ac pulvinar risus. Duis elementum commodo ipsum. Sed eu nibh nibh. Maecenas eget laoreet nulla. Quisque vitae vulputate risus, nec efficitur neque. Maecenas purus odio, blandit et lacinia vel, laoreet in magna. Curabitur tincidunt magna odio, quis venenatis ipsum tempus ultricies. Etiam viverra eu tortor id vestibulum. Curabitur placerat, dolor sed porta fringilla, est lorem tristique arcu, nec vulputate velit metus a est. Praesent venenatis lobortis rutrum. In elementum magna non turpis fringilla, eu luctus augue consequat. Mauris faucibus ut magna et vulputate. In maximus quam vel lorem aliquet, suscipit scelerisque nunc dignissim.</p>
                <div className={'partners container'}>
                    <img className={'img-fluid'}
                         id={'Altran'}
                         src={Logo} />
                     <img className={'img-fluid'}
                          id={'Kau'}
                          src={Kau}/>
                </div>
            </div>
        </MainContainer>
    );
};
export default About