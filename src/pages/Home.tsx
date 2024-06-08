// src/pages/Home.tsx
import React from 'react';
import {IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow} from '@ionic/react';

import NavBar from "../components/Nav-bar";


import img1 from '../assets/images/pexels-pixabay-34514.jpg'; // Import images
import img2 from '../assets/images/pexels-pixabay-34514.jpg'; // Import images
import img3 from '../assets/images/pexels-pixabay-34514.jpg'; // Import images
import img4 from '../assets/images/pexels-pixabay-34514.jpg'; // Import images
import img5 from '../assets/images/pexels-pixabay-34514.jpg'; // Import images
import img6 from '../assets/images/pexels-pixabay-34514.jpg'; // Import images

const Home: React.FC = () => (
    <IonPage>
        <NavBar />
        <IonContent className="ion-padding">
            <h1>Home Page</h1>
            <IonGrid>
                <IonRow>
                    <IonCol size="6">
                        <IonImg src={img1} className="img-fluid" alt="Image 1" />
                    </IonCol>
                    <IonCol size="6">
                        <IonImg src={img2} className="img-fluid" alt="Image 2" />
                    </IonCol>
                    <IonCol size="6">
                        <IonImg src={img3} className="img-fluid" alt="Image 3" />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="6">
                        <IonImg src={img4} className="img-fluid" alt="Image 4" />
                    </IonCol>
                    <IonCol size="6">
                        <IonImg src={img5} className="img-fluid" alt="Image 5" />
                    </IonCol>
                    <IonCol size="6">
                        <IonImg src={img6} className="img-fluid" alt="Image 6" />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
);

export default Home;
