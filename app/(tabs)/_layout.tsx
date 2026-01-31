import { AiChatModal } from '@/src/components/organisms/AiChatModal/AiChatModal';
import { LiquidTabBar } from '@/src/components/organisms/BottomTabBar/LiquidTabBar';
import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <LiquidTabBar
            {...props}
            onChatPress={() => setIsChatOpen(true)}
          />
        )}
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

      {/* Global AI Chat Modal */}
      <AiChatModal visible={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({});
