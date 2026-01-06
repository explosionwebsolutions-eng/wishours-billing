import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Switch, Alert, ActivityIndicator, Modal, FlatList } from 'react-native';
import { theme } from '../theme/theme';
import { DatabaseService } from '../services/DatabaseService';
import { PrinterService } from '../services/PrinterService';

export default function SettingsScreen() {
  const [syncing, setSyncing] = useState(false);
  const [printerModal, setPrinterModal] = useState(false);
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [connectedPrinter, setConnectedPrinter] = useState(null);

  useEffect(() => {
    PrinterService.init();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await DatabaseService.syncWithCloud();
      Alert.alert("Sync Complete", result.message);
    } catch (error) {
      Alert.alert("Sync Failed", "Could not connect to server. Check internet.");
    } finally {
      setSyncing(false);
    }
  };

  const scanPrinters = async () => {
    setPrinterModal(true);
    setScanning(true);
    try {
      const list = await PrinterService.scan();
      setDevices(list);
    } finally {
      setScanning(false);
    }
  };

  const connectPrinter = async (device) => {
    try {
      await PrinterService.connect(device.inner_mac_address);
      setConnectedPrinter(device.device_name);
      setPrinterModal(false);
      Alert.alert("Connected", `Printer ${device.device_name} ready.`);
    } catch (e) {
      Alert.alert("Error", "Could not connect to printer");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      
      {/* Header */}
      <View style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 16, paddingVertical: 16, ...theme.shadows.sm, marginBottom: 12 }}>
        <Text style={theme.typography.header}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        <SectionTitle title="Device & Printer" />
        <SettingItem 
          label="Thermal Printer" 
          value={connectedPrinter || "Not Connected"} 
          action 
          onPress={scanPrinters}
        />
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
        
        <TouchableOpacity 
          onPress={handleSync}
          disabled={syncing}
          style={{ 
            marginTop: 12, 
            padding: 16, 
            backgroundColor: syncing ? theme.colors.secondary : theme.colors.primary, 
            borderRadius: 12, 
            alignItems: 'center', 
            ...theme.shadows.md 
          }}
        >
          {syncing ? (
             <ActivityIndicator color="#FFF" />
          ) : (
             <Text style={{ color: '#FFF', fontWeight: '600' }}>🔄 Sync Data to Cloud</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 24, padding: 16, backgroundColor: '#FFEBEE', borderRadius: 12, alignItems: 'center' }}>
          <Text style={{ color: '#D32F2F', fontWeight: '600' }}>Reset Application Data</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', marginTop: 32, color: theme.colors.text.secondary }}>
          Version 1.0.0
        </Text>

      </ScrollView>

      {/* Printer Modal */}
      <Modal visible={printerModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#FFF', borderRadius: 16, padding: 16, maxHeight: '60%' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 12 }}>Select Printer</Text>
            {scanning && <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginBottom: 12 }} />}
            <FlatList
              data={devices}
              keyExtractor={item => item.inner_mac_address}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => connectPrinter(item)}
                  style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' }}
                >
                  <Text style={{ fontWeight: '600' }}>{item.device_name}</Text>
                  <Text style={{ color: '#888' }}>{item.inner_mac_address}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={!scanning && <Text style={{ textAlign: 'center', color: '#888' }}>No devices found</Text>}
            />
            <TouchableOpacity onPress={() => setPrinterModal(false)} style={{ marginTop: 16, padding: 12, backgroundColor: '#EEE', borderRadius: 8, alignItems: 'center' }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

function SettingItem({ label, value, action, isSwitch, onPress }) {
  return (
    <TouchableOpacity disabled={isSwitch} onPress={onPress} style={{ 
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
