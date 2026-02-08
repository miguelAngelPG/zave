import React from 'react';
import { View } from 'react-native';
import { styles } from './BalanceSection.styles';

interface PaginationDotsProps {
    total: number;
    activeIndex: number;
}

/**
 * PaginationDots - Carousel pagination indicator
 */
export const PaginationDots: React.FC<PaginationDotsProps> = ({ total, activeIndex }) => {
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, i) => (
                <View
                    key={i}
                    style={[
                        styles.dot,
                        i === activeIndex && styles.activeDot,
                    ]}
                />
            ))}
        </View>
    );
};
