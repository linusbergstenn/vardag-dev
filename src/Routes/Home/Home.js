import React from 'react';

import MainContainer from '../../Components/MainCointainer/MainContainer'
import './Home.scss'
const Home = (props) => {

    let News = [
        {
            title: 'Artikel 1',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque lobortis lacinia. Mauris rutrum luctus lorem, ut congue metus tempor non. Aenean at metus magna. Etiam ullamcorper diam sit amet nisi tempor posuere at id lectus. Cras nec bibendum est. Nullam semper, neque at pretium pellentesque, libero nisl euismod ante, consequat tincidunt neque dui eu ligula. Mauris fermentum, sapien api ultrices luctus, quam ipsum venenatis turpis, sit amet tempor magna leo et lectus. Donec sit amet quam sodales purus feugiat mattis. Suspendisse imperdiet ligula nec lorem laoreet, eget auctor orci eleifend. Ut finibus aliquet molestie. Sed rutrum semper est nec accumsan. Nunc ut orci sit amet sem iaculis viverra. Vivamus imperdiet, diam vitae tempus viverra, ante purus mattis ligula, eleifend ultrices libero nulla ac eros.'
        },
        {
            title: 'Artikel 2',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque lobortis lacinia. Mauris rutrum luctus lorem, ut congue metus tempor non. Aenean at metus magna. Etiam ullamcorper diam sit amet nisi tempor posuere at id lectus. Cras nec bibendum est. Nullam semper, neque at pretium pellentesque, libero nisl euismod ante, consequat tincidunt neque dui eu ligula. Mauris fermentum, sapien api ultrices luctus, quam ipsum venenatis turpis, sit amet tempor magna leo et lectus. Donec sit amet quam sodales purus feugiat mattis. Suspendisse imperdiet ligula nec lorem laoreet, eget auctor orci eleifend. Ut finibus aliquet molestie. Sed rutrum semper est nec accumsan. Nunc ut orci sit amet sem iaculis viverra. Vivamus imperdiet, diam vitae tempus viverra, ante purus mattis ligula, eleifend ultrices libero nulla ac eros.'
        },
        {
            title: 'Artikel 3',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque lobortis lacinia. Mauris rutrum luctus lorem, ut congue metus tempor non. Aenean at metus magna. Etiam ullamcorper diam sit amet nisi tempor posuere at id lectus. Cras nec bibendum est. Nullam semper, neque at pretium pellentesque, libero nisl euismod ante, consequat tincidunt neque dui eu ligula. Mauris fermentum, sapien api ultrices luctus, quam ipsum venenatis turpis, sit amet tempor magna leo et lectus. Donec sit amet quam sodales purus feugiat mattis. Suspendisse imperdiet ligula nec lorem laoreet, eget auctor orci eleifend. Ut finibus aliquet molestie. Sed rutrum semper est nec accumsan. Nunc ut orci sit amet sem iaculis viverra. Vivamus imperdiet, diam vitae tempus viverra, ante purus mattis ligula, eleifend ultrices libero nulla ac eros.'
        },
        {
            title: 'Artikel 4',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque lobortis lacinia. Mauris rutrum luctus lorem, ut congue metus tempor non. Aenean at metus magna. Etiam ullamcorper diam sit amet nisi tempor posuere at id lectus. Cras nec bibendum est. Nullam semper, neque at pretium pellentesque, libero nisl euismod ante, consequat tincidunt neque dui eu ligula. Mauris fermentum, sapien api ultrices luctus, quam ipsum venenatis turpis, sit amet tempor magna leo et lectus. Donec sit amet quam sodales purus feugiat mattis. Suspendisse imperdiet ligula nec lorem laoreet, eget auctor orci eleifend. Ut finibus aliquet molestie. Sed rutrum semper est nec accumsan. Nunc ut orci sit amet sem iaculis viverra. Vivamus imperdiet, diam vitae tempus viverra, ante purus mattis ligula, eleifend ultrices libero nulla ac eros.'
        }
    ];

    let articles = News.map( (article, index) => {

        let a = ['bg-primary', "bg-secondary", "bg-alt1", "bg-alt2", 'bg-alt3'];
        let r = Math.floor((Math.random() * Math.floor(a.length - 1)));
       return(
           <div key={index} className={'article-container mt-2 mb-2 bg-light'}>
               <div className={'placeholder-image mb-3 ' + a[r]} />
               <div className={'p-4'}>
                   <h3>{article.title}</h3>
                   <p >{article.body}</p>
               </div>
           </div>
       );
    });


    return(
        <MainContainer signedIn={props.signedIn} user={props.user}>
            <div className={'container mb-3'}>
                <div className={'container'}>
                    <h2 className={'title'}>Aktuellt</h2>
                    <div className={'d-flex flex-wrap justify-content-around'}>
                        {articles}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};
export default Home