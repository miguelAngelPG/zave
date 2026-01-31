import React, { createContext, useContext } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface ScrollContextType {
    scrollY: SharedValue<number>;
    isScrolling: SharedValue<boolean>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const scrollY = useSharedValue(0);
    const isScrolling = useSharedValue(false);

    return (
        <ScrollContext.Provider value={{ scrollY, isScrolling }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};
