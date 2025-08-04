import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FAB } from '../../atoms/FAB/FAB';

// export const BottomTabBar: React.FC<BottomTabBarProps> = ({
//   activeTab,
//   onTabPress,
//   hasFAB = true
// }) => {
//   const tabs: TabName[] = ['Inicio', 'Cuentas', 'Analisis', 'Metas', 'Pagos'];

//   const handleFABPress = () => {
//     console.log('FAB pressed - Open transaction input');
//     // Aquí abres el modal/screen para agregar transacción
//   };

//   return (
//     <>
//       {/* FAB */}
//       {hasFAB && <FAB onPress={handleFABPress} />}

//       {/* Tab Bar */}
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.container}>
//           <View style={styles.tabsContainer}>
//             {tabs.map((tab) => (
//               <TabItem
//                 key={tab}
//                 name={tab}
//                 isActive={activeTab === tab}
//                 onPress={() => onTabPress(tab)}
//               />
//             ))}
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: '#1F2937',
//   },
//   container: {
//     backgroundColor: '#1F2937',
//     borderTopWidth: 1,
//     borderTopColor: '#374151',
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.xs,
//     minHeight: 60,
//   },
// });

export const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const insets = useSafeAreaInsets();

    const handleFABPress = () => {
    console.log('FAB pressed - Open transaction input');
    // Aquí abres el modal/screen para agregar transacción
  };

return (
        <>
            <FAB onPress={handleFABPress} />
            <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    // Get icon name
                    const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
                        switch (routeName) {
                            case 'index': return 'home-outline';
                            case 'accounts': return 'card-outline';
                            case 'analytics': return 'pie-chart-outline';
                            case 'goals': return 'flag-outline';
                            case 'payments': return 'calendar-outline';
                            default: return 'home-outline';
                        }
                    };

                    // Get display name
                    const getDisplayName = (routeName: string) => {
                        switch (routeName) {
                            case 'index': return 'Inicio';
                            case 'accounts': return 'Cuentas';
                            case 'analytics': return 'Análisis';
                            case 'goals': return 'Metas';
                            case 'payments': return 'Pagos';
                            default: return routeName;
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabItem}
                            onPress={onPress}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={getIconName(route.name)}
                                size={20}
                                color={isFocused ? '#FFFFFF' : '#6B7280'}
                            />
                            <Text style={[
                                styles.tabLabel,
                                { color: isFocused ? '#FFFFFF' : '#6B7280' }
                            ]}>
                                {getDisplayName(route.name)}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#1F2937',
        borderTopWidth: 1,
        borderTopColor: '#374151',
        paddingHorizontal: 16,
        paddingTop: 8,
        minHeight: 60,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 4,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 1000,
    },
});