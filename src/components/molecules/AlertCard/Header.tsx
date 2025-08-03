import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Header = ({ 
  userName = "Carlos", 
  userPhoto = null,
  onProfilePress,
  onStatsPress,
  onAIPress,
  onNotificationsPress,
  onToolsPress,
  hasNotifications = true 
}: any) => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <TouchableOpacity 
        style={styles.profileSection} 
        onPress={onProfilePress}
        activeOpacity={0.8}
      >
        <View style={styles.profileImageContainer}>
          {userPhoto ? (
            <Image source={{ uri: userPhoto }} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultProfileImage}>
              <Text style={styles.profileInitial}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hola de nuevo,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </TouchableOpacity>

      {/* Action Icons */}
      <View style={styles.actionsContainer}>
        {/* Stats */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onStatsPress}
          activeOpacity={0.7}
        >
          <Ionicons name="trending-up" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Wallet/Cards */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Ionicons name="card-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onNotificationsPress}
          activeOpacity={0.7}
        >
          <View>
            <Ionicons name="notifications-outline" size={20} color="#9CA3AF" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </View>
        </TouchableOpacity>

        {/* AI Assistant */}
        <TouchableOpacity 
          style={[styles.iconButton, styles.aiButton]} 
          onPress={onAIPress}
          activeOpacity={0.8}
        >
          <Text style={styles.aiText}>AI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#000000',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImageContainer: {
    marginRight: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  defaultProfileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '400',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  aiButton: {
    // backgroundColor: '#8B5CF6',
    // background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
  },
  aiText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});

