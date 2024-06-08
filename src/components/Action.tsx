import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

// Definicja typu dla propsów
type ActionProps = {
    message: string;
    text: string;
    link: string;
};

// Użycie zdefiniowanego typu dla komponentu funkcyjnego
export const Action: React.FC<ActionProps> = (props) => {
    return (
        <IonRow>
            <IonCol size="12">
                <p>
                    {props.message}
                    <IonRouterLink className="custom-link" routerLink={props.link}> {props.text} &rarr;</IonRouterLink>
                </p>
            </IonCol>
        </IonRow>
    );
};
