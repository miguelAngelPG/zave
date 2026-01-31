import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import React from 'react';
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export const HeaderSection = () => {
    return (
        <Animated.View
            entering={FadeInDown.delay(100).duration(600)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <View style={{ gap: 4 }}>
                <Text variant="caption" style={{ textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' }}>Lunes, 27 Enero</Text>
                <Text variant="heading" style={{ letterSpacing: -1 }}>Hola, Carlos</Text>
            </View>

            <TouchableOpacity style={{ padding: 4 }}>
                {/* Simple Avatar without gradient ring */}
                <Avatar style={{ width: 44, height: 44 }}>
                    <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </TouchableOpacity>
        </Animated.View>
    );
};
