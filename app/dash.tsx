import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { AccountData } from "@/src/types/accounts.types";
import { TransactionData } from "@/src/types/activity.types";
import { StatsData } from "@/src/types/balance.types";
import { InsightData } from "@/src/types/insights.types";
import { Award, Bell, Sparkles, TrendingUp } from "lucide-react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const backgroundColor = useColor('background');
    const primaryColor = useColor('primary');

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
            backgroundColor: '#3B82F6',
            iconColor: '#FFFFFF',
        },
        {
            id: '2',
            name: 'Santander',
            bankCode: 'SAN',
            amount: 1890,
            dueInfo: 'Vence en 5 días',
            urgencyLevel: 'warning',
            backgroundColor: '#EF4444',
            iconColor: '#FFFFFF',
        },
        {
            id: '3',
            name: 'Nu Bank',
            bankCode: 'NU',
            amount: 5420,
            dueInfo: 'Disponible',
            urgencyLevel: 'normal',
            backgroundColor: '#8B5CF6',
            iconColor: '#FFFFFF',
        },
    ];

    const insightsData: InsightData[] = [
        {
            id: '1',
            message: 'Puedes ahorrar $340 reduciendo gastos en entretenimiento',
            type: 'positive',
        },
        {
            id: '2',
            message: 'Tu meta mensual va 12% adelantada',
            subtitle: 'Tendencia positiva • Sigue así',
            type: 'achievement',
        },
    ];

    const transactionsData: TransactionData[] = [
        {
            id: '1',
            name: 'Walmart',
            amount: 1250,
            date: 'Hoy,',
            time: '14:30',
            status: 'DEUDA',
            type: 'expense',
            emoji: '🛒',
        },
        {
            id: '2',
            name: 'Depósito Nómina',
            amount: 15000,
            date: 'Ayer,',
            time: '09:00',
            status: 'PAGADO',
            type: 'income',
            emoji: '💰',
            bankIndicatorColor: '#3B82F6',
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <ScrollView
                style={{ flex: 1, backgroundColor }}
                contentContainerStyle={{ padding: 20, gap: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <Avatar>
                            <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <View>
                            <Text style={{ fontSize: 14, opacity: 0.7 }}>Hola,</Text>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>Carlos</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Button variant="ghost" size="icon" icon={Bell} />
                        <Button variant="ghost" size="icon" icon={Sparkles} />
                    </View>
                </View>

                {/* Balance Section */}
                <Card>
                    <CardHeader>
                        <CardDescription>Disponible para gastar</CardDescription>
                        <CardTitle style={{ fontSize: 32 }}>$5,247.00</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 12, opacity: 0.7 }}>Gastado</Text>
                                <Text style={{ fontWeight: '600' }}>{statsData.spent}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, opacity: 0.7 }}>Crédito</Text>
                                <Text style={{ fontWeight: '600' }}>{statsData.credit}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, opacity: 0.7 }}>Días rest.</Text>
                                <Text style={{ fontWeight: '600' }}>{statsData.days}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 12, opacity: 0.7 }}>Meta</Text>
                                <Text style={{ fontWeight: '600' }}>{statsData.goal}</Text>
                            </View>
                        </View>
                    </CardContent>
                </Card>

                {/* Accounts Section */}
                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text variant="title">Mis Cuentas</Text>
                        <Button variant="ghost" size="sm" label="Gestionar" />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                        {accountsData.map((account) => (
                            <Card key={account.id} style={{ width: 160, backgroundColor: account.backgroundColor }}>
                                <CardHeader>
                                    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{account.bankCode.substring(0, 2)}</Text>
                                    </View>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{account.name}</Text>
                                </CardHeader>
                                <CardContent>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>${account.amount}</Text>
                                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 }}>{account.dueInfo}</Text>
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollView>
                </View>

                {/* Insights Section */}
                <View style={{ gap: 12 }}>
                    <Text variant="title">Insights</Text>
                    {insightsData.map((insight) => (
                        <Card key={insight.id} style={{ borderColor: insight.type === 'positive' ? '#22C55E' : '#EAB308', borderWidth: 1 }}>
                            <CardContent style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 }}>
                                <Icon name={insight.type === 'positive' ? TrendingUp : Award} size={24} color={insight.type === 'positive' ? '#22C55E' : '#EAB308'} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: '500' }}>{insight.message}</Text>
                                    {insight.subtitle && <Text style={{ fontSize: 12, opacity: 0.6 }}>{insight.subtitle}</Text>}
                                </View>
                            </CardContent>
                        </Card>
                    ))}
                </View>

                {/* Activity Section */}
                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text variant="title">Actividad Reciente</Text>
                        <Button variant="link" label="Ver todo" />
                    </View>
                    {transactionsData.map((transaction) => (
                        <Card key={transaction.id}>
                            <CardContent style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: useColor('secondary'), alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 20 }}>{transaction.emoji}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '600' }}>{transaction.name}</Text>
                                        <Text style={{ fontSize: 12, opacity: 0.6 }}>{transaction.date} {transaction.time}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ fontWeight: '700', color: transaction.type === 'expense' ? useColor('text') : '#22C55E' }}>
                                        {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                                    </Text>
                                    <Text style={{ fontSize: 10, opacity: 0.5, textTransform: 'uppercase' }}>{transaction.status}</Text>
                                </View>
                            </CardContent>
                        </Card>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}