import React, {useState} from 'react';
import {
    IonButton,  IonInput, IonItem,
  IonPage, IonContent,  IonText,
} from '@ionic/react';
import './RegisterLogin.css';
import {Action} from "../components/Action";
import NavBar from "../components/Nav-bar"; // Make sure to create a CSS file with this name


interface Errors {
    email: string;
    password: string;
}

const LoginView: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

    const validateEmail = (email: string): string => {
        if (!email) return "Email is required.";
        if (!email.includes('@')) return "Please enter a valid email.";
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password) return "Password is required.";
        if (password.length < 8) return "Password must be at least 8 characters long.";
        return '';
    };

    const handleLogin = () => {
        // Walidacja emaila i hasła
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        // Ustawienie ewentualnych błędów walidacji
        setErrors({ email: emailError, password: passwordError });

        // Kontynuuj tylko, jeśli nie ma błędów walidacji
        if (emailError || passwordError) {
            console.log('Login failed', { email, password });
            return; // Zatrzymaj logikę logowania, jeśli są błędy
        }

        // Logika logowania (tutaj można dodać wywołanie do API)
        console.log('Login successful', { email, password });

        // Resetowanie stanów po pomyślnym logowaniu
        resetForm();
    };

// Funkcja do resetowania formularza
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors({ email: '', password: '' }); // Wyczyszczenie błędów
    };





    return (
        <IonPage>
            <NavBar />
            <IonContent fullscreen className="ion-padding">
                <div className="centered-content">
                    <h1 className="SignIn">Sign In</h1>
                    <IonItem className="InputButton">

                        <IonInput
                            label = 'Email:'
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
                            type="email"
                            placeholder="email@domain.com"
                        />
                    </IonItem>
                    {errors.email && <IonText color="danger">{errors.email}</IonText>}

                    <IonItem className="InputButton">

                        <IonInput
                            label = 'Password:'
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            type="password"
                            placeholder="********"
                        />
                    </IonItem>
                    {errors.password && <IonText color="danger">{errors.password}</IonText>}

                    <IonButton className="LoginButton" expand="block" shape="round" fill="outline" onClick={handleLogin}>
                        Log In
                    </IonButton>
                    <Action message="Don't have an account?" text="Sign up" link="/Register" />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginView;