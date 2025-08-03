import { spacing } from '@/src/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { InsightsSectionProps } from '../../../types/insights.types';
import { AIIcon } from '../../atoms/AIIcon/AIIcon';

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  insights,
  onViewMore
}) => (
  <View style={styles.container}>
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <AIIcon />
          <Text style={styles.title}>Insights IA</Text>
        </View>
        <TouchableOpacity onPress={onViewMore} activeOpacity={0.7}>
          <Text style={styles.viewMore}>Ver más</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Recomendaciones personalizadas</Text>

      {/* Insights List */}
      <View style={styles.insightsList}>
        {insights.map((insight, index) => (
          <View key={insight.id} style={styles.insightItem}>
            <View style={styles.bullet} />
            <View style={styles.insightContent}>
              <Text style={styles.insightText}>
                {insight.message.includes('$340') ? (
                  <>
                    Puedes ahorrar <Text style={styles.highlight}>$340</Text> reduciendo gastos en entretenimiento
                  </>
                ) : insight.message.includes('12%') ? (
                  <>
                    Tu meta mensual va <Text style={styles.highlight}>12%</Text> adelantada
                  </>
                ) : (
                  insight.message
                )}
              </Text>
              {insight.subtitle && (
                <Text style={styles.insightSubtitle}>{insight.subtitle}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: spacing.md + 4, // 20px
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: spacing.md + 4, // 20px
  },
  viewMore: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  insightsList: {
    gap: spacing.md + 4, // 20px entre insights
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm + 4, // 12px
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
    marginTop: 7, // Para alinear con el texto
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  highlight: {
    color: '#10B981',
    fontWeight: '500',
  },
  insightSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
});
