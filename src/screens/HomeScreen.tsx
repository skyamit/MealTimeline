import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AlarmScreen from './AlarmScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../theme/style';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex : 1}} edges={['top']}>
      <View style={[styles.container, commonStyles.screenBackground]}>
        <View style={styles.titleDiv}>
          <View>
            <Text style={styles.title}>MealTimeline</Text>
            <Text style={styles.subtitle}>Local • Offline</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🥗 Active Routine</Text>
          <Text>Name: Intermittent Fasting (16:8)</Text>
          <Text style={{ marginTop: 8 }}>⏰ Next Meal: 1:30 PM – Lunch</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Timeline</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>+ Create Routine</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Manage Routines</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    height:'100%'
  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  actions: {
    marginTop: 'auto',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
