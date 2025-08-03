// import { Ionicons } from '@expo/vector-icons';
// import React, { useState } from 'react';
// import {
//     Animated,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export const Balance = ({ 
//   availableAmount = 5247,
//   currency = "$",
//   greeting = "¡Buen día!",
//   subtitle = "Tienes disponible para gastar",
//   breakdown = {
//     income: 12500,
//     fixedExpenses: 4200,
//     debts: 3053
//   },
//   onBreakdownPress
// }: any) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [animation] = useState(new Animated.Value(0));

//   const toggleExpanded = () => {
//     const toValue = isExpanded ? 0 : 1;
    
//     Animated.timing(animation, {
//       toValue,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
    
//     setIsExpanded(!isExpanded);
//     onBreakdownPress && onBreakdownPress(!isExpanded);
//   };

//   const formatAmount = (amount: any) => {
//     return amount.toLocaleString('es-MX');
//   };

//   const animatedHeight = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 200], // Adjust based on content
//   });

//   const animatedOpacity = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 1],
//   });

//   return (
//     <View style={styles.container}>
//       {/* Greeting */}
//       <Text style={styles.greeting}>{greeting}</Text>
      
//       {/* Subtitle */}
//       <Text style={styles.subtitle}>{subtitle}</Text>
      
//       {/* Main Balance - Protagonista absoluto */}
//       <Text style={styles.mainBalance}>
//         {currency}{formatAmount(availableAmount)}
//       </Text>
      
//       {/* Expandable Button */}
//       <TouchableOpacity 
//         style={styles.expandButton}
//         onPress={toggleExpanded}
//         activeOpacity={0.7}
//       >
//         <Text style={styles.expandButtonText}>Ver cálculo</Text>
//         <Ionicons 
//           name={isExpanded ? "chevron-up" : "chevron-down"} 
//           size={16} 
//           color="#9CA3AF" 
//           style={styles.chevronIcon}
//         />
//       </TouchableOpacity>

//       {/* Breakdown Section - Expandible */}
//       <Animated.View 
//         style={[
//           styles.breakdownContainer,
//           {
//             height: animatedHeight,
//             opacity: animatedOpacity,
//           }
//         ]}
//       >
//         <View style={styles.breakdownContent}>
//           <View style={styles.breakdownRow}>
//             <Text style={styles.breakdownLabel}>Ingresos totales</Text>
//             <Text style={styles.incomeAmount}>
//               +{currency}{formatAmount(breakdown.income)}
//             </Text>
//           </View>
          
//           <View style={styles.breakdownRow}>
//             <Text style={styles.breakdownLabel}>Gastos fijos</Text>
//             <Text style={styles.expenseAmount}>
//               -{currency}{formatAmount(breakdown.fixedExpenses)}
//             </Text>
//           </View>
          
//           <View style={styles.breakdownRow}>
//             <Text style={styles.breakdownLabel}>Deudas pendientes</Text>
//             <Text style={styles.debtAmount}>
//               -{currency}{formatAmount(breakdown.debts)}
//             </Text>
//           </View>
          
//           <View style={styles.separator} />
          
//           <View style={styles.breakdownRow}>
//             <Text style={styles.totalLabel}>Disponible real</Text>
//             <Text style={styles.totalAmount}>
//               {currency}{formatAmount(availableAmount)}
//             </Text>
//           </View>
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 24,
//     paddingVertical: 20,
//     backgroundColor: '#000000',
//   },
//   greeting: {
//     color: '#FFFFFF',
//     fontSize: 28,
//     fontWeight: '300',
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: '#9CA3AF',
//     fontSize: 16,
//     fontWeight: '400',
//     marginBottom: 32,
//   },
//   mainBalance: {
//     color: '#FFFFFF',
//     fontSize: 64,
//     fontWeight: '200',
//     letterSpacing: -2,
//     marginBottom: 24,
//     lineHeight: 70,
//   },
//   expandButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1F2937',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//   },
//   expandButtonText: {
//     color: '#9CA3AF',
//     fontSize: 14,
//     fontWeight: '400',
//   },
//   chevronIcon: {
//     marginLeft: 8,
//   },
//   breakdownContainer: {
//     overflow: 'hidden',
//     marginTop: 16,
//   },
//   breakdownContent: {
//     backgroundColor: '#1F2937',
//     borderRadius: 16,
//     padding: 20,
//   },
//   breakdownRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   breakdownLabel: {
//     color: '#9CA3AF',
//     fontSize: 15,
//     fontWeight: '400',
//   },
//   incomeAmount: {
//     color: '#10B981',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   expenseAmount: {
//     color: '#EF4444',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   debtAmount: {
//     color: '#F59E0B',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#374151',
//     marginVertical: 8,
//   },
//   totalLabel: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   totalAmount: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export const Balance = ({ 
  availableAmount = 5247,
  currency = "$",
  onBreakdownPress
}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    onBreakdownPress && onBreakdownPress(!isExpanded);
  };

  const formatAmount = (amount: any) => {
    return amount.toLocaleString('es-MX');
  };

  return (
    <View style={styles.container}>
      {/* Greeting - Simple */}
      <Text style={styles.greeting}>¡Buen día!</Text>
      
      {/* Main Balance - Protagonista absoluto como en Figma */}
      <Text style={styles.mainBalance}>
        {currency}{formatAmount(availableAmount)}
      </Text>
      
      {/* Subtitle - Después del balance */}
      <Text style={styles.subtitle}>Tienes disponible para gastar</Text>
      
      {/* Expandable Button - Minimalista como en Figma */}
      <TouchableOpacity 
        style={styles.expandButton}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Text style={styles.expandButtonText}>Ver cálculo</Text>
        <Ionicons 
          name="chevron-down" 
          size={14} 
          color="#6B7280" 
        />
      </TouchableOpacity>

      {/* Stats Grid - Como en el Figma */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>23%</Text>
            <Text style={styles.statLabel}>Gastado</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.greenText]}>1.7%</Text>
            <Text style={styles.statLabel}>Crédito</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>16</Text>
            <Text style={styles.statLabel}>Días</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, styles.greenText]}>68%</Text>
            <Text style={styles.statLabel}>Meta</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#000000',
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 40,
    textAlign: 'center',
  },
  mainBalance: {
    color: '#FFFFFF',
    fontSize: 72,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -2,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 32,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  expandButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '400',
  },
  statsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 24,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  greenText: {
    color: '#10B981',
  },
});

