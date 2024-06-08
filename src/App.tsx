// src/App.tsx
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import LoginView from './pages/Login';
import RegisterView from "./pages/Register";
import NewTrainingView from "./pages/NewTraining";
import TrainingView from "./pages/TrainingView"; // Import the TrainingView component

import { TrainingProvider } from "./contexts/TrainingContext"; // Import the TrainingProvider

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import NavBar from "./components/Nav-bar";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
      <TrainingProvider> {/* Wrap your app with the TrainingProvider */}
        <IonReactRouter>

            <IonRouterOutlet id="main-content">
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/login">
                <LoginView />
              </Route>
              <Route exact path="/register">
                <RegisterView />
              </Route>
              <Route exact path="/add">
                <NewTrainingView />
              </Route>
              <Route exact path="/trainings">
                <TrainingView />
              </Route>
            </IonRouterOutlet>

        </IonReactRouter>
      </TrainingProvider>
    </IonApp>
);

export default App;
