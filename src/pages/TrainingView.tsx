import React from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg, IonItem, IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useTrainings } from "../contexts/TrainingContext"; // Import the context
import { useHistory } from "react-router-dom"; // Import useHistory
import './TrainingView.css';
import NavBar from "../components/Nav-bar";

const TrainingView: React.FC = () => {
    const { trainings, deleteTraining } = useTrainings(); // Use the context
    const history = useHistory(); // Use the history hook

    const handleEdit = (training: any) => {
        history.push('/add', { training });
    };

    const handleDelete = (id: number) => {
        deleteTraining(id);
    };

    return (
        <IonPage>
            <NavBar />

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel>
                        <h1 className="text-center">Moje Treningi:</h1>

                    </IonLabel>
                </IonItem>
                <IonGrid>
                    {trainings.map((training, index) => (
                        <IonRow key={index} className="training-item">
                            <IonCol size="12">
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle className="training-card-title">{training.name}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="6">
                                                    <div className="training-details">
                                                        <strong>Wyniki:</strong>
                                                    </div>
                                                    <div >Dystans: {training.distance} km</div>
                                                    <div >Czas: {training.time} min</div>
                                                    <div className="training-details">Średnie tempo: {training.pace} min/km</div>
                                                    <div ><strong>Opis Treningu:</strong></div>
                                                    <div >{training.description}</div>
                                                </IonCol>
                                                <IonCol size="6" className="training-image">
                                                    {training.image && (
                                                        <IonImg src={training.image as string} alt="Trening" />
                                                    )}
                                                </IonCol>
                                            </IonRow>
                                            <IonRow className="training-buttons">
                                                <IonCol size="6">
                                                    <IonButton expand="block" onClick={() => handleEdit(training)}>Edytuj</IonButton>
                                                </IonCol>
                                                <IonCol size="6">
                                                    <IonButton expand="block" color="danger" onClick={() => handleDelete(training.id)}>Usuń</IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default TrainingView;
