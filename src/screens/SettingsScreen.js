import React from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { theme } from '../theme/theme';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      
      {/* Header */}
      <View style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 16, paddingVertical: 16, ...theme.shadows.sm, marginBottom: 12 }}>
        <Text style={theme.typography.header}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        <SectionTitle title="Device & Printer" />
        <SettingItem label="Thermal Printer" value="Not Connected" action />
        <SettingItem label="Paper Size" value="58mm" />
        <SettingItem label="Auto Print Receipt" isSwitch value={true} />

        <SectionTitle title="Store" />
        <SettingItem label="Store Name" value="Wishours Bakery" />
        <SettingItem label="Store ID" value="WH-001" />
        <SettingItem label="Tax Rate (GST)" value="5%" />

        <SectionTitle title="Data & Sync" />
        <SettingItem label="Database" value="Local (SQLite)" />
        <SettingItem label="Last Sync" value="Pending..." />
        <SettingItem label="Cloud Backup" isSwitch value={true} />
        
        <TouchableOpacity style={{ marginTop: 12, padding: 16, backgroundColor: theme.colors.primary, borderRadius: 12, alignItems: 'center', ...theme.shadows.md }}>
           <Text style={{ color: '#FFF', fontWeight: '600' }}>🔄 Sync Data to Cloud</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 24, padding: 16, backgroundColor: '#FFEBEE', borderRadius: 12, alignItems: 'center' }}>
          <Text style={{ color: '#D32F2F', fontWeight: '600' }}>Reset Application Data</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', marginTop: 32, color: theme.colors.text.secondary }}>
          Version 1.0.0
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }) {
  return (
    <Text style={{ 
      fontSize: 14, 
      fontWeight: '700', 
      color: theme.colors.text.secondary, 
      marginTop: 16, 
      marginBottom: 8, 
      textTransform: 'uppercase' 
    }}>
      {title}
    </Text>
  );
}

function SettingItem({ label, value, action, isSwitch }) {
  return (
    <TouchableOpacity disabled={isSwitch} style={{ 
      backgroundColor: theme.colors.surface, 
      padding: 16, 
      borderRadius: 12, 
      marginBottom: 8, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      ...theme.shadows.sm
    }}>
      <Text style={{ fontSize: 16, color: theme.colors.text.primary }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isSwitch ? (
          <Switch value={value} trackColor={{ false: "#767577", true: theme.colors.primary }} />
        ) : (
          <Text style={{ fontSize: 16, color: action ? theme.colors.secondary : theme.colors.text.secondary }}>{value}</Text>
        )}
        {!isSwitch && <Text style={{ marginLeft: 8, color: '#CCC' }}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}
