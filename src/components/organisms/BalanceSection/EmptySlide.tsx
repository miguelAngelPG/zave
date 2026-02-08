import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { styles } from './BalanceSection.styles';

interface EmptySlideProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    buttonText: string;
    onPress?: () => void;
}

/**
 * EmptySlide - Empty state for modules that haven't been configured
 */
export const EmptySlide: React.FC<EmptySlideProps> = ({
    icon,
    title,
    subtitle,
    buttonText,
    onPress,
}) => {
    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Ionicons name={icon} size={48} color={colors.text.tertiary} />
            </View>
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptySubtitle}>{subtitle}</Text>
            {onPress && (
                <TouchableOpacity style={styles.addButton} onPress={onPress}>
                    <Text style={styles.addButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
