import React from 'react';
import { View, Text, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useStore } from '../state/store';
import { theme } from '../theme/theme';

export default function OrdersScreen() {
  const { orders } = useStore();

  const renderOrder = ({ item }) => (
    <View style={{ 
      backgroundColor: theme.colors.surface, 
      padding: 16, 
      marginBottom: 12, 
      borderRadius: 12,
      ...theme.shadows.sm
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <View>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>Order #{item.id.slice(-6)}</Text>
          <Text style={{ color: theme.colors.text.secondary, fontSize: 12 }}>
            {new Date(item.date).toLocaleString()}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: theme.colors.primary }}>₹{item.totals.total}</Text>
          <Text style={{ 
            color: '#FFF', 
            backgroundColor: theme.colors.secondary, 
            paddingHorizontal: 8, 
            paddingVertical: 2, 
            borderRadius: 4, 
            fontSize: 10, 
            marginTop: 4 
          }}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: 8 }}>
        {item.items.map((prod, idx) => (
          <Text key={idx} style={{ fontSize: 13, color: theme.colors.text.primary }}>
            {prod.qty} x {prod.name}
          </Text>
        ))}
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
        <TouchableOpacity style={{ 
          borderColor: theme.colors.primary, 
          borderWidth: 1, 
          paddingHorizontal: 12, 
          paddingVertical: 6, 
          borderRadius: 6 
        }}>
          <Text style={{ color: theme.colors.primary, fontSize: 12, fontWeight: '600' }}>Print Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      
      {/* Header */}
      <View style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 16, paddingVertical: 16, ...theme.shadows.sm, marginBottom: 12 }}>
        <Text style={theme.typography.header}>Order History</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: theme.colors.text.secondary }}>No orders yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
