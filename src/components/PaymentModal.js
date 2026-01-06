import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useState } from 'react';

export default function PaymentModal({ visible, total, onClose, onSavePrint }) {
  const [tendered, setTendered] = useState('');
  const change = Math.max(0, (parseFloat(tendered || '0') - total));
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Total ₹{total}</Text>
          <View style={{ marginTop: 12 }}>
            <Text style={{ marginBottom: 6 }}>Tendered Amount</Text>
            <TextInput value={tendered} onChangeText={setTendered} keyboardType="numeric" style={{ borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12 }} />
          </View>
          <Text style={{ marginTop: 8 }}>Change: ₹{change.toFixed(2)}</Text>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <TouchableOpacity onPress={onClose} style={{ flex: 1, backgroundColor: '#EEE', padding: 14, borderRadius: 12, marginRight: 8 }}>
              <Text style={{ textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSavePrint({ tendered })} style={{ flex: 1, backgroundColor: '#FF6F3D', padding: 14, borderRadius: 12 }}>
              <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: '600' }}>Save & Print</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
