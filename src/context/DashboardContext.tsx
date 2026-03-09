import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type WidgetId = 'weekly-spend' | 'next-bill' | 'main-goal';
export type WidgetSize = { cols: number; rows: number };

export interface DashboardWidgetConfig {
    id: WidgetId;
    title: string;
    description: string;
    visible: boolean;
    order: number;
    size: WidgetSize;
}

const DEFAULT_WIDGETS: DashboardWidgetConfig[] = [
    { id: 'weekly-spend', title: 'Gasto Semanal', description: 'Monitorea tu ritmo de gasto diario', visible: true, order: 1, size: { cols: 4, rows: 2 } },
    { id: 'next-bill', title: 'Próximo Pago', description: 'Recordatorio de tu próxima obligación', visible: true, order: 2, size: { cols: 2, rows: 2 } },
    { id: 'main-goal', title: 'Meta Principal', description: 'Progreso de tu meta de ahorro', visible: true, order: 3, size: { cols: 4, rows: 2 } },
];

const STORAGE_KEY = '@zave_dashboard_widgets';

interface DashboardContextType {
    widgets: DashboardWidgetConfig[];
    toggleWidget: (id: WidgetId) => void;
    moveWidget: (id: WidgetId, direction: 'up' | 'down') => void;
    resizeWidget: (id: WidgetId, size: WidgetSize) => void;
    reorderWidgets: (newWidgets: DashboardWidgetConfig[]) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [widgets, setWidgets] = useState<DashboardWidgetConfig[]>(DEFAULT_WIDGETS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from storage
    useEffect(() => {
        const loadWidgets = async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) {
                    setWidgets(JSON.parse(stored));
                }
            } catch (e) {
                console.error("Failed to load dashboard config", e);
            } finally {
                setIsLoaded(true);
            }
        };
        loadWidgets();
    }, []);

    // Save to storage
    useEffect(() => {
        if (isLoaded) {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(widgets)).catch(console.error);
        }
    }, [widgets, isLoaded]);

    const toggleWidget = (id: WidgetId) => {
        setWidgets(prev => prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
    };

    const resizeWidget = (id: WidgetId, size: WidgetSize) => {
        setWidgets(prev => prev.map(w => w.id === id ? { ...w, size } : w));
    };

    const moveWidget = (id: WidgetId, direction: 'up' | 'down') => {
        setWidgets(prev => {
            const index = prev.findIndex(w => w.id === id);
            if (index === -1) return prev;
            if (direction === 'up' && index === 0) return prev;
            if (direction === 'down' && index === prev.length - 1) return prev;

            const newWidgets = [...prev];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            // Swap
            [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];

            // Re-assign order just in case
            return newWidgets.map((w, i) => ({ ...w, order: i + 1 }));
        });
    };

    const reorderWidgets = (newWidgetsArr: DashboardWidgetConfig[]) => {
        setWidgets(newWidgetsArr.map((w, i) => ({ ...w, order: i + 1 })));
    };

    return (
        <DashboardContext.Provider value={{ widgets, toggleWidget, moveWidget, resizeWidget, reorderWidgets }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) throw new Error('useDashboard must be used within DashboardProvider');
    return context;
};
