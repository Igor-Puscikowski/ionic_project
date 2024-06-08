import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Training {
    id: number;
    name: string;
    distance: string;
    time: string;
    pace: string;
    description: string;
    image: string | ArrayBuffer | null;
}

interface TrainingContextProps {
    trainings: Training[];
    addTraining: (training: Training) => void;
    updateTraining: (training: Training) => void;
    deleteTraining: (id: number) => void;
}

const TrainingContext = createContext<TrainingContextProps | undefined>(undefined);

export const useTrainings = () => {
    const context = useContext(TrainingContext);
    if (!context) {
        throw new Error("useTrainings must be used within a TrainingProvider");
    }
    return context;
};

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const addTraining = (training: Training) => {
        training.id = trainings.length ? trainings[trainings.length - 1].id + 1 : 1;
        setTrainings((prevTrainings) => [...prevTrainings, training]);
    };

    const updateTraining = (updatedTraining: Training) => {
        setTrainings((prevTrainings) =>
            prevTrainings.map((training) =>
                training.id === updatedTraining.id ? updatedTraining : training
            )
        );
    };

    const deleteTraining = (id: number) => {
        setTrainings((prevTrainings) => prevTrainings.filter((training) => training.id !== id));
    };

    return (
        <TrainingContext.Provider value={{ trainings, addTraining, updateTraining, deleteTraining }}>
            {children}
        </TrainingContext.Provider>
    );
};
