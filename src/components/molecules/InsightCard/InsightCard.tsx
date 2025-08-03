import { spacing, typography } from '@/src/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { InsightData } from '../../../types/insights.types';
import { HighlightedText } from '../../atoms/Text/HighlightedText';
import { InsightText } from '../../atoms/Text/InsightText';

interface InsightCardProps {
  insight: InsightData;
  onPress?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onPress }) => {
  const getHighlightColor = (type: string) => {
    switch (type) {
      case 'positive': return '#10B981';
      case 'achievement': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#10B981';
    }
  };

  const getHighlightWords = (message: string, type: string) => {
    // Extraer palabras que deberían ser resaltadas
    const patterns = [
      /(\d+%\s*menos)/gi,
      /(\d+%\s*más)/gi,
      /(\d+\s*sep)/gi,
      /(\$\d+)/gi,
      /(23%\s*menos)/gi,
      /(15\s*sep)/gi,
    ];
    
    const words: string[] = [];
    patterns.forEach(pattern => {
      const matches = message.match(pattern);
      if (matches) {
        words.push(...matches);
      }
    });
    
    return words;
  };

  const highlightWords = getHighlightWords(insight.message, insight.type);
  const highlightColor = getHighlightColor(insight.type);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <HighlightedText
        text={insight.message}
        highlightWords={highlightWords}
        highlightColor={highlightColor}
        baseStyle={styles.message}
      />
      
      {insight.subtitle && (
        <InsightText type="secondary">
          {insight.subtitle}
        </InsightText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  message: {
    color: '#FFFFFF',
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: 20,
  },
});
