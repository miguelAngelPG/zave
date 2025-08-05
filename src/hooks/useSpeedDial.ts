import { useState } from 'react';

export const useSpeedDial = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const handleMethodSelect = async (methodId: string) => {
        setSelectedMethod(methodId);
        setIsProcessing(true);

        try {
            // Simulate AI processing
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Handle different methods
            switch (methodId) {
                case 'photo':
                    console.log('Opening camera for receipt capture');
                    break;
                case 'voice':
                    console.log('Starting voice recording');
                    break;
                case 'manual':
                    console.log('Opening manual transaction form');
                    break;
            }
        } catch (error) {
            console.error('Error processing transaction:', error);
        } finally {
            setIsProcessing(false);
            setSelectedMethod(null);
        }
    };

    return {
        isProcessing,
        selectedMethod,
        handleMethodSelect,
    };
};
