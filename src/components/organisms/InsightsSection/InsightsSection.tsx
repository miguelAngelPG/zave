import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { InsightsSectionProps } from '../../../types/insights.types';
import { AIIcon } from '../../atoms/AIIcon/AIIcon';

const getInsightStyle = (type: string) => {
  switch (type) {
    case 'warning':
      return {
        bg: 'rgba(239, 68, 68, 0.1)',
        border: '#EF4444',
        icon: 'alert-circle',
        iconColor: '#EF4444',
        buttonBg: 'rgba(239, 68, 68, 0.2)',
        buttonText: '#FCA5A5'
      };
    case 'achievement':
    case 'positive':
      return {
        bg: 'rgba(16, 185, 129, 0.1)',
        border: '#10B981',
        icon: 'trophy',
        iconColor: '#10B981',
        buttonBg: 'rgba(16, 185, 129, 0.2)',
        buttonText: '#6EE7B7'
      };
    case 'info':
    default:
      return {
        bg: 'rgba(59, 130, 246, 0.1)',
        border: '#3B82F6',
        icon: 'information-circle',
        iconColor: '#3B82F6',
        buttonBg: 'rgba(59, 130, 246, 0.2)',
        buttonText: '#93C5FD'
      };
  }
};

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  insights,
  onViewMore
}) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <AIIcon />
        <Text style={styles.title}>Oportunidades IA</Text>
      </View>
      <TouchableOpacity onPress={onViewMore} activeOpacity={0.7}>
        <Text style={styles.viewMore}>Ver todas</Text>
      </TouchableOpacity>
    </View>

    {/* Insights List (Cards) */}
    <View style={styles.listContainer}>
      {insights.map((insight) => {
        const styleConfig = getInsightStyle(insight.type);

        return (
          <View key={insight.id} style={[styles.card, { backgroundColor: styleConfig.bg, borderColor: styleConfig.border }]}>
            <View style={styles.cardHeader}>
              <Ionicons name={styleConfig.icon as any} size={24} color={styleConfig.iconColor} />
              <View style={styles.textContainer}>
                <Text style={styles.message}>{insight.message}</Text>
                {insight.subtitle && <Text style={styles.subtitle}>{insight.subtitle}</Text>}
              </View>
            </View>

            {insight.actionLabel && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: styleConfig.buttonBg }]}
                onPress={insight.onAction}
              >
                <Text style={[styles.actionText, { color: styleConfig.buttonText }]}>
                  {insight.actionLabel}
                </Text>
                <Ionicons name="arrow-forward" size={14} color={styleConfig.buttonText} />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    fontSize: 18,
  },
  viewMore: {
    ...typography.caption,
    color: colors.primary[500],
    fontWeight: '600',
  },
  listContainer: {
    gap: spacing.md,
  },
  card: {
    borderRadius: 16,
    borderLeftWidth: 4, // Left accent border
    padding: spacing.md,
    // No full border, just background and left accent
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  message: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    lineHeight: 20,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  actionButton: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-end', // Right align button
    paddingHorizontal: 16,
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});
