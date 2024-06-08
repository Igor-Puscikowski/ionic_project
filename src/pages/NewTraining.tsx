import React, { useEffect, useRef, useState } from "react";
import {
    IonButton, IonCol,
    IonContent, IonGrid,
    IonHeader, IonImg,
    IonInput,
    IonPage, IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonAlert, IonLabel, IonItem
} from "@ionic/react";
import { closeCircle, imageOutline } from 'ionicons/icons';
import { useHistory, useLocation } from "react-router-dom";
import { useTrainings } from "../contexts/TrainingContext"; // Import the context
import './newTraining.css';
import NavBar from "../components/Nav-bar";

interface LocationState {
    training?: any;
}

const NewTrainingView: React.FC = () => {
    const [id, setId] = useState<number | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [pace, setPace] = useState<string>('');
    const [trainingName, setTrainingName] = useState<string>('');
    const [trainingDesc, setTrainingDesc] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addTraining, updateTraining } = useTrainings(); // Use the context
    const history = useHistory(); // Use the history hook for navigation
    const location = useLocation<LocationState>();

    useEffect(() => {
        if (location.state && location.state.training) {
            const training = location.state.training;
            setId(training.id);
            setDistance(training.distance);
            setTime(training.time);
            setPace(training.pace);
            setTrainingName(training.name);
            setTrainingDesc(training.description);
            setSelectedImage(training.image);
        }
    }, [location.state]);

    useEffect(() => {
        if (distance && time && parseFloat(distance) > 0 && parseFloat(time) > 0) {
            const timeInMinutes = parseFloat(time);
            const distanceInKm = parseFloat(distance);
            const calculatedPace = (timeInMinutes / distanceInKm).toFixed(2);
            setPace(calculatedPace);
        } else {
            setPace('');
        }
    }, [distance, time]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleDistanceChange = (e: CustomEvent) => {
        const value = e.detail.value;
        const regex = /^\d{0,4}(\.\d{0,2})?$/;
        if (regex.test(value)) {
            setDistance(value);
        }
    };

    const handleTimeChange = (e: CustomEvent) => {
        const value = e.detail.value;
        const regex = /^\d{0,4}(\.\d{0,2})?$/;
        if (regex.test(value)) {
            setTime(value);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveTraining = () => {
        if (!trainingName || !distance || !time) {
            setShowAlert(true);
            return;
        }

        const newTraining = {
            id: id || 0,
            name: trainingName,
            distance,
            time,
            pace,
            description: trainingDesc,
            image: selectedImage,
        };

        if (id) {
            updateTraining(newTraining);
        } else {
            addTraining(newTraining);
        }

        // Reset form fields
        setId(null);
        setDistance('');
        setTime('');
        setPace('');
        setTrainingName('');
        setTrainingDesc('');
        setSelectedImage(null);

        history.push('/trainings'); // Navigate to training view
    };

    return (
        <IonPage>
            <NavBar />
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel>
                        <h1 className="text-center">Wprowadź dane treningowe</h1>

                    </IonLabel>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="display-box">
                                <div className="display-item">{distance} km</div>
                                <div className="display-item">{time} min</div>
                                <div className="display-item">{pace} min/km</div>
                            </div>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonInput
                                label="Nazwa Treningu :"
                                type="text"
                                value={trainingName}
                                onIonChange={(e) => setTrainingName(e.detail.value!)}
                                placeholder="Wprowadź nazwę treningu"
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonInput
                                label="Dystans (km) :"
                                type="number"
                                value={distance}
                                onIonChange={handleDistanceChange}
                                maxlength={7} // 4 digits + '.' + 2 digits
                                placeholder="Wprowadź dystans"
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonInput
                                label="Czas (min):"
                                type="number"
                                value={time}
                                onIonChange={handleTimeChange}
                                maxlength={7} // 4 digits + '.' + 2 digits
                                placeholder="Wprowadź czas"
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonTextarea
                                label="Opis Treningu:"
                                value={trainingDesc}
                                onIonChange={(e) => setTrainingDesc(e.detail.value!)}
                                placeholder="Wprowadź opis treningu "
                            />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                id="upload-photo"
                            />
                            <IonButton expand="block" onClick={handleButtonClick}>
                                <IonIcon icon={imageOutline} slot="start" />
                                Upload Photo
                            </IonButton>
                            {selectedImage && (
                                <div className="image-container">
                                    <IonImg src={selectedImage as string} alt="Selected" />
                                    <IonButton onClick={handleRemoveImage} fill="clear" className="remove-image-button">
                                        <IonIcon icon={closeCircle} />
                                    </IonButton>
                                </div>
                            )}
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={handleSaveTraining}>
                                {id ? 'Update Training' : 'Save Training'}
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Błąd'}
                    message={'Nazwa treningu, dystans i czas są wymagane.'}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default NewTrainingView;
