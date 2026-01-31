import { CustomTabBar } from '@/src/components/organisms/BottomTabBar/BottomTabBar';
import { SpeedDial } from '@/src/components/organisms/SpeedDial/SpeedDial';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {

  return (
    <>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: 'Cuentas',
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Análisis',
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            title: 'Metas',
          }}
        />
        <Tabs.Screen
          name="payments"
          options={{
            title: 'Pagos',
          }}
        />
      </Tabs>
      <SpeedDial />
    </>
  );
}

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
});
