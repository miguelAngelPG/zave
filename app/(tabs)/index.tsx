import { useColor } from '@/hooks/useColor';
import { AccountsSection } from '@/src/components/organisms/AccountsSection/AccountsSection';
import { AiChatModal } from '@/src/components/organisms/AiChatModal/AiChatModal';
import { BalanceSection } from '@/src/components/organisms/BalanceSection/BalanceSection';
import { GoalsSection } from '@/src/components/organisms/GoalsSection/GoalsSection';
import { HeaderSection } from '@/src/components/organisms/HeaderSection/HeaderSection';
import { TransactionList } from '@/src/components/organisms/TransactionList/TransactionList';
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
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: 110,
          paddingHorizontal: 24,
          gap: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderSection />

        {/* Balance Section (Dark/Glass) */}
        <BalanceSection />

        {/* Accounts Carousel */}
        <AccountsSection />

        {/* Goals Progress */}
        <GoalsSection />

        {/* Recent Transactions */}
        <TransactionList />
      </Animated.ScrollView>

      <AiChatModal visible={isChatVisible} onClose={() => setChatVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
