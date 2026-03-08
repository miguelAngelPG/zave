import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';
import { Text } from '../../atoms/Text/Text';
import { styles } from './QuickActions.styles';

export const QuickActions: React.FC = () => {

    const handlePress = (action: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log(`Action Pressed: ${action}`);
        // Here you would navigate or trigger modal
    };

    return (
        <View style={styles.container}>
            <View style={styles.actionsWrapper}>

                {/* 1. Nuevo Gasto (Main Action) */}
                <TouchableOpacity
                    style={styles.actionItem}
                    onPress={() => handlePress('expense')}
                    activeOpacity={0.7}
                >
                    <View style={[styles.iconContainer, { backgroundColor: colors.primary[500] }]}>
                        <Ionicons name="card-outline" size={24} color="#fff" />
                    </View>
                    <Text style={styles.label}>Nuevo Gasto</Text>
                </TouchableOpacity>

                {/* 2. Transferir */}
                <TouchableOpacity
                    style={styles.actionItem}
                    onPress={() => handlePress('transfer')}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="swap-horizontal" size={24} color={colors.text.primary} />
                    </View>
                    <Text style={styles.label}>Transferir</Text>
                </TouchableOpacity>

                {/* 3. Pagar Tarjeta (Since we have cards in carousel) */}
                <TouchableOpacity
                    style={styles.actionItem}
                    onPress={() => handlePress('pay-card')}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="wallet-outline" size={24} color={colors.text.primary} />
                    </View>
                    <Text style={styles.label}>Pagar Tarjeta</Text>
                </TouchableOpacity>

                {/* 4. Analizar (Since we removed Goals below) */}
                <TouchableOpacity
                    style={styles.actionItem}
                    onPress={() => handlePress('analytics')}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="pie-chart-outline" size={24} color={colors.text.primary} />
                    </View>
                    <Text style={styles.label}>Análisis</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};
