import { StyleSheet, Text, View } from 'react-native';


export default function GoalsScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>GoalsScreen</Text>
        {/* Add your accounts content here */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Dark text color
    },
});