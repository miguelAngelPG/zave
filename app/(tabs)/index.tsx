import { useColor } from '@/hooks/useColor';
import { AiChatModal } from '@/src/components/organisms/AiChatModal/AiChatModal';
import { BalanceSection } from '@/src/components/organisms/BalanceSection/BalanceSection';
import { DashboardGrid } from '@/src/components/organisms/DashboardGrid/DashboardGrid'; // New Dashboard
import { HeaderSection } from '@/src/components/organisms/HeaderSection/HeaderSection';
import { DashboardProvider } from '@/src/context/DashboardContext';
import { useScrollContext } from '@/src/context/ScrollContext';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const backgroundColor = useColor('background');
  const [isChatVisible, setChatVisible] = useState(false);
  const { scrollY, isScrolling } = useScrollContext();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      'worklet';
      scrollY.value = event.contentOffset.y;
    },
    // Reanimated Short Names
    onBeginDrag: (e: any) => { 'worklet'; isScrolling.value = true; },
    onEndDrag: (e: any) => { 'worklet'; isScrolling.value = false; },
    onMomentumBegin: (e: any) => { 'worklet'; isScrolling.value = true; },
    onMomentumEnd: (e: any) => { 'worklet'; isScrolling.value = false; },
  });

  return (
    <DashboardProvider>
      <View style={[styles.container, { backgroundColor }]}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingBottom: 110,
            paddingHorizontal: 0, // Removed horizontal padding to allow full width sections if needed
            gap: 24, // Reduced gap slightly
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 24 }}>
            <HeaderSection />
          </View>

          {/* Balance Section (Dark/Glass) */}
          <BalanceSection />

          {/* Visual Dashboard Grid (Bento Style) */}
          <View style={{ paddingHorizontal: 24 }}>
            <DashboardGrid />
          </View>
        </Animated.ScrollView>

        <AiChatModal visible={isChatVisible} onClose={() => setChatVisible(false)} />
      </View>
    </DashboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
