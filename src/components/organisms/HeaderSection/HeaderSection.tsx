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
                <View style={{ padding: 2, backgroundColor: 'white', borderRadius: 99, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}>
                    <Avatar style={{ width: 48, height: 48 }}>
                        <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </View>
                <View style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: 7, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#fff' }} />
            </TouchableOpacity>
        </Animated.View>
    );
};
