import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

export default function CartItemRow({ item, onInc, onDec, onRemove }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
      <View style={{ flex: 1 }}>
        <Text style={{ ...theme.typography.body, color: theme.colors.text.primary, fontWeight: '500' }}>{item.name}</Text>
        <Text style={{ ...theme.typography.caption, marginTop: 2 }}>₹{item.unitPrice} x {item.qty} = <Text style={{fontWeight:'600', color: theme.colors.primary}}>₹{item.unitPrice * item.qty}</Text></Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.background, borderRadius: 8 }}>
        <TouchableOpacity onPress={onDec} style={{ padding: 8 }}>
          <Text style={{ fontSize: 18, color: theme.colors.primary, fontWeight: 'bold' }}>-</Text>
        </TouchableOpacity>
        <Text style={{ width: 24, textAlign: 'center', fontWeight: '600', color: theme.colors.text.primary }}>{item.qty}</Text>
        <TouchableOpacity onPress={onInc} style={{ padding: 8 }}>
          <Text style={{ fontSize: 18, color: theme.colors.primary, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onRemove} style={{ padding: 8, marginLeft: 8 }}>
        <Text style={{ color: theme.colors.text.secondary, fontSize: 18 }}>×</Text>
      </TouchableOpacity>
    </View>
  );
}
