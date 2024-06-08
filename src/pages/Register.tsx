import React, { useState } from 'react';
import {
    IonButton, IonInput, IonItem,
    IonPage, IonContent, IonText
} from '@ionic/react';
import './RegisterLogin.css';
import { Action } from "../components/Action";
import NavBar from "../components/Nav-bar";

interface RegisterErrors {
    username: string;
    email: string;
    password: string;
}

const RegisterView: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<RegisterErrors>({ username: '', email: '', password: '' });

    const validateUsername = (username: string): string => {
        if (!username) return "User name is required.";
        if (username.length < 3) return "User name must be at least 3 characters long.";
        return '';
    };

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

    const handleRegister = () => {
        // Walidacja każdego z pól
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        // Aktualizacja stanu błędów
        setErrors({ username: usernameError, email: emailError, password: passwordError });

        // Kontynuuj tylko, jeśli nie ma błędów walidacji
        if (usernameError || emailError || passwordError) {
            console.log('Registration failed', { username, email, password });
            return; // Zatrzymaj logikę rejestracji, jeśli są błędy
        }

        // Logika rejestracji (tutaj można dodać wywołanie do API)
        console.log('Registration successful', { username, email, password });

        // Resetowanie stanów po pomyślnej rejestracji
        resetForm();
    };

// Funkcja do resetowania formularza
    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setErrors({ username: '', email: '', password: '' }); // Wyczyszczenie błędów
    };

    return (
        <IonPage>
            <NavBar />
            <IonContent fullscreen className="ion-padding">
                <div className="centered-content">
                    <h1 className="SignIn">Sign Up</h1>

                    <IonItem className="InputButton">
                        <IonInput
                            label="User name:"
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                            placeholder="user123"
                        />
                    </IonItem>
                    {errors.username && <IonText color="danger">{errors.username}</IonText>}

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
                            label="Password:"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            type="password"
                            placeholder="********"
                        />
                    </IonItem>
                    {errors.password && <IonText color="danger">{errors.password}</IonText>}

                    <IonButton className="LoginButton" expand="block" shape="round" fill="outline" onClick={handleRegister}>
                        Create Account
                    </IonButton>
                    <Action message="Already got an account?" text="Login" link="/login" />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default RegisterView;