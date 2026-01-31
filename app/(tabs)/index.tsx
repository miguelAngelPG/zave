import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { AccountData } from "@/src/types/accounts.types";
import { TransactionData } from "@/src/types/activity.types";
import { StatsData } from "@/src/types/balance.types";
import { InsightData } from "@/src/types/insights.types";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownLeft, ArrowUpRight, CreditCard, MoreHorizontal, Send, Wallet, Zap } from "lucide-react-native";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const backgroundColor = useColor('background');
  const primaryColor = useColor('primary');
  const mutedColor = useColor('muted');
  const cardColor = useColor('card');
  const borderColor = useColor('border');

  const statsData: StatsData = {
    spent: "23%",
    credit: "1.7%",
    days: "16",
    goal: "68%"
  };

  const accountsData: AccountData[] = [
    {
      id: '1',
      name: 'BBVA',
      bankCode: 'BBVA',
      amount: 2450,
      dueInfo: 'Vence mañana',
      urgencyLevel: 'urgent',
      backgroundColor: '#0F172A', // Slate 900
      iconColor: '#FFFFFF',
    },
    {
      id: '2',
      name: 'Santander',
      bankCode: 'SAN',
      amount: 1890,
      dueInfo: 'Vence en 5 días',
      urgencyLevel: 'warning',
      backgroundColor: '#BE185D', // Pink 700
      iconColor: '#FFFFFF',
    },
    {
      id: '3',
      name: 'Nu',
      amount: 5420,
      bankCode: 'NU',
      dueInfo: 'Disponible',
      urgencyLevel: 'normal',
      backgroundColor: '#7C3AED', // Violet 600
      iconColor: '#FFFFFF',
    },
  ];

  const insightsData: InsightData[] = [
    {
      id: '1',
      message: 'Ahorra $340 en entretenimiento',
      type: 'positive',
      subtitle: 'Basado en tus gastos',
    },
    {
      id: '2',
      message: 'Meta mensual +12%',
      subtitle: '¡Sigue así!',
      type: 'achievement',
    },
  ];

  const transactionsData: TransactionData[] = [
    {
      id: '1',
      name: 'Walmart Supercenter',
      amount: 1250,
      date: 'Hoy',
      time: '14:30',
      status: 'PAGADO',
      type: 'expense',
      emoji: '🛒',
    },
    {
      id: '2',
      name: 'Nómina Quincenal',
      amount: 15000,
      date: 'Ayer',
      time: '09:00',
      status: 'PAGADO',
      type: 'income',
      emoji: '💼',
      bankIndicatorColor: '#3B82F6',
    },
    {
      id: '3',
      name: 'Spotify Premium',
      amount: 129,
      date: 'Ayer',
      time: '18:20',
      status: 'PAGADO',
      type: 'expense',
      emoji: '🎵',
    },
    {
      id: '4',
      name: 'Uber Eats',
      amount: 245,
      date: 'Ayer',
      time: '20:15',
      status: 'PAGADO',
      type: 'expense',
      emoji: '🍔',
    },
  ];

  const QuickAction = ({ icon, label, color = primaryColor }: { icon: any, label: string, color?: string }) => (
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
    <View style={{ flex: 1, backgroundColor }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['rgba(37, 99, 235, 0.05)', 'transparent', 'rgba(124, 58, 237, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 24, paddingBottom: 110, gap: 36 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
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

          {/* Hero Balance Card */}
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <LinearGradient
              colors={['#020617', '#1e293b', '#0f172a']} // Richer dark gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 32, padding: 32,
                shadowColor: "#020617", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.4, shadowRadius: 32, elevation: 16,
                borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>Balance Total</Text>
                    <View style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                      <Text style={{ color: '#4ade80', fontSize: 10, fontWeight: '700' }}>+2.4%</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 44, fontWeight: '900', color: 'white', letterSpacing: -2 }}>$5,247.00</Text>
                </View>
                <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Icon name={Wallet} size={24} color="white" />
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 16 }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                  <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.15)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={ArrowDownLeft} size={20} color="#34D399" />
                  </View>
                  <View>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '500' }}>Ingresos</Text>
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>$8,240</Text>
                  </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                  <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(244, 63, 94, 0.15)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={ArrowUpRight} size={20} color="#FB7185" />
                  </View>
                  <View>
                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '500' }}>Gastos</Text>
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>$2,993</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
            <QuickAction icon={Send} label="Enviar" color="#3B82F6" />
            <QuickAction icon={ArrowDownLeft} label="Recibir" color="#10B981" />
            <QuickAction icon={CreditCard} label="Pagar" color="#F59E0B" />
            <QuickAction icon={MoreHorizontal} label="Más" color={mutedColor} />
          </Animated.View>

          {/* Cards Section */}
          <Animated.View entering={FadeInDown.delay(400).duration(600)} style={{ gap: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="title" style={{ fontSize: 22 }}>Mis Tarjetas</Text>
              <Button variant="ghost" size="sm" label="+ Añadir" textStyle={{ color: primaryColor, fontWeight: '700' }} style={{ backgroundColor: cardColor, borderRadius: 12, height: 32 }} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingRight: 24 }} style={{ marginHorizontal: -24, paddingHorizontal: 24 }}>
              {accountsData.map((account) => (
                <LinearGradient
                  key={account.id}
                  colors={[account.backgroundColor, account.backgroundColor]}
                  style={{
                    width: 160,
                    height: 200,
                    borderRadius: 28,
                    padding: 20,
                    justifyContent: 'space-between',
                    shadowColor: account.backgroundColor,
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 18,
                    elevation: 10
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'white', fontWeight: '800', fontSize: 18, opacity: 0.9 }}>{account.bankCode}</Text>
                    <Icon name={Zap} size={16} color="rgba(255,255,255,0.6)" />
                  </View>

                  <View style={{ gap: 6 }}>
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600', letterSpacing: 2 }}>•••• 4829</Text>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', letterSpacing: -1 }}>${account.amount}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 10, fontWeight: '600' }}>{account.dueInfo}</Text>
                    </View>
                    {/* Simple Circle Logo */}
                    <View style={{ flexDirection: 'row', marginRight: 4 }}>
                      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(255,255,255,0.5)', marginLeft: -6 }} />
                    </View>
                  </View>
                </LinearGradient>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Activity Feed */}
          <Animated.View entering={FadeInDown.delay(600).duration(600)} style={{ gap: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="title" style={{ fontSize: 22 }}>Movimientos</Text>
              <Button variant="link" label="Ver todo" style={{ paddingHorizontal: 0 }} />
            </View>
            <Card style={{ padding: 0, borderRadius: 32, overflow: 'hidden' }}>
              <CardContent style={{ padding: 8 }}>
                {transactionsData.map((transaction, index) => (
                  <View key={transaction.id}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 }}>
                      <View style={{
                        width: 52, height: 52, borderRadius: 22,
                        backgroundColor: backgroundColor,
                        alignItems: 'center', justifyContent: 'center',
                        borderWidth: 1, borderColor: borderColor
                      }}>
                        <Text style={{ fontSize: 24 }}>{transaction.emoji}</Text>
                      </View>
                      <View style={{ flex: 1, gap: 4 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text variant="body" style={{ fontWeight: '700', fontSize: 16 }}>{transaction.name}</Text>
                          <Text variant="body" style={{ fontWeight: '800', fontSize: 16, color: transaction.type === 'expense' ? primaryColor : '#10B981' }}>
                            {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text variant="caption" style={{ fontWeight: '500' }}>{transaction.date} • {transaction.time}</Text>
                          <Text variant="caption" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>{transaction.status}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {index < transactionsData.length - 1 && (
                      <View style={{ height: 1, backgroundColor: borderColor, marginLeft: 82, opacity: 0.4 }} />
                    )}
                  </View>
                ))}
              </CardContent>
            </Card>
          </Animated.View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
