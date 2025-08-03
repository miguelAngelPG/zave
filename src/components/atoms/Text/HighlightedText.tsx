import React from 'react';
import { Text } from 'react-native';

interface HighlightedTextProps {
  text: string;
  highlightWords: string[];
  highlightColor?: string;
  baseStyle?: any;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightWords,
  highlightColor = '#10B981',
  baseStyle
}) => {
  const renderHighlightedText = () => {
    let parts: (string | React.ReactElement)[] = [text];

    highlightWords.forEach((word: any) => {
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return part;
        return part.split(word).reduce((acc, splitPart, index) => {
          if (index === 0) return [splitPart];
          return [
            ...acc,
            <Text key={`${word}-${index}`} style={[baseStyle, { color: highlightColor, fontWeight: '500' }]}>
              {word}
            </Text>,
            splitPart
          ];
        }, [] as (string | React.ReactElement)[]);
      });
    });
    
    return parts.map((part, index) => 
      typeof part === 'string' 
        ? <Text key={index} style={baseStyle}>{part}</Text>
        : part
    );
  };

  return <Text style={baseStyle}>{renderHighlightedText()}</Text>;
};