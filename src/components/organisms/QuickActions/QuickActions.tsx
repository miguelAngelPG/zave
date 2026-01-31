import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { ArrowDownLeft, CreditCard, MoreHorizontal, Send } from "lucide-react-native";
import React from 'react';
import Animated, { FadeInDown } from "react-native-reanimated";

export const QuickActions = () => {
    const primaryColor = useColor('primary');
    const mutedColor = useColor('muted');
    const cardColor = useColor('card');
    const borderColor = useColor('border');

    const ActionButton = ({ icon, label, color = primaryColor }: { icon: any, label: string, color?: string }) => (
        <View style={{ alignItems: 'center', gap: 8 }}>
            <Button
                variant="secondary"
                size="icon"
                icon={icon}
                style={{
                    width: 64, height: 64, borderRadius: 32,
                    backgroundColor: cardColor,
                    borderWidth: 1, borderColor: borderColor,
                    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
                }}
            />
            <Text variant="caption" style={{ color: primaryColor, opacity: 0.8, fontWeight: '600' }}>{label}</Text>
        </View>
    );

    return (
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
            <ActionButton icon={Send} label="Enviar" color="#3B82F6" />
            <ActionButton icon={ArrowDownLeft} label="Recibir" color="#10B981" />
            <ActionButton icon={CreditCard} label="Pagar" color="#F59E0B" />
            <ActionButton icon={MoreHorizontal} label="Más" color={mutedColor} />
        </Animated.View>
    );
};
