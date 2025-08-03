import { Header } from "@/src/components/molecules/AlertCard/Header";
import { BalanceSection } from "@/src/components/organisms/BalanceSection/BalanceSection";
import { StatsData } from "@/src/types/balance.types";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

    const statsData: StatsData = {
        spent: "23%",
        credit: "1.7%",
        days: "16",
        goal: "68%"
    };

    const handleExpandPress = (isExpanded: boolean): void => {
        console.log('Balance expanded:', isExpanded);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                userName="Carlos"
                // userPhoto="https://..."
                onProfilePress={() => { }}
                onAIPress={() => { }}
                onNotificationsPress={() => { }}
                hasNotifications={true}
            />
            <View style={styles.container}>
                <BalanceSection
                    greeting="¡Buen día!"
                    amount={5247}
                    subtitle="Tienes disponible para gastar"
                    stats={statsData}
                    onExpandPress={handleExpandPress}
                />
            </View>
            {/* <DashboardScreen /> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // darkTheme.background.primary
    },
});