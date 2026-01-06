import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useMemo, useState, useEffect } from 'react';
import { theme } from '../theme/theme';

export default function PizzaOptionsModal({ visible, product, matrix, addOns, onClose, onConfirm }) {
  // Guard clause: if no product is selected, don't render anything
  if (!product) return null;

  const [flavor, setFlavor] = useState(product.id);
  const [size, setSize] = useState('medium');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [notes, setNotes] = useState('');

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setFlavor(product.id);
      setSize('medium');
      setSelectedAddOns([]);
      setNotes('');
    }
  }, [product]);

  const basePrice = useMemo(() => {
    if (!matrix[flavor]) return 0;
    return matrix[flavor][size] || 0;
  }, [matrix, flavor, size]);

  const addOnsPrice = useMemo(() => addOns.filter(a => selectedAddOns.includes(a.id)).reduce((s, a) => s + a.price, 0), [addOns, selectedAddOns]);
  const total = basePrice + addOnsPrice;

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const confirm = () => {
    onConfirm({ productId: product.id, flavor, size, addOns: selectedAddOns, unitPrice: total, notes });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <View style={{ backgroundColor: theme.colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, ...theme.shadows.lg }}>
          <Text style={{ ...theme.typography.header, color: theme.colors.primary }}>Pizza Customization</Text>
          <Text style={{ marginTop: 4, ...theme.typography.body }}>{flavor.replace('_', ' ')} • {size}</Text>
          <Text style={{ marginTop: 8, fontSize: 24, fontWeight: '700', color: theme.colors.primary }}>₹{total}</Text>
          
          <Text style={{ marginTop: 16, ...theme.typography.subHeader }}>Pizza Flavor</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
            {[product.id, 'veg_supreme', 'paneer_tikka', 'corn'].map(v => (
              <TouchableOpacity 
                key={v} 
                onPress={() => setFlavor(v)} 
                style={{ 
                  paddingVertical: 8, 
                  paddingHorizontal: 12, 
                  borderRadius: 16, 
                  backgroundColor: flavor === v ? theme.colors.primary : theme.colors.background, 
                  marginRight: 8, 
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: flavor === v ? theme.colors.primary : theme.colors.border
                }}>
                <Text style={{ color: flavor === v ? theme.colors.text.light : theme.colors.text.primary, fontWeight: flavor === v ? '600' : '400' }}>{v.replace('_', ' ')}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ marginTop: 12, ...theme.typography.subHeader }}>Size</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {['small', 'medium', 'large'].map(v => (
              <TouchableOpacity 
                key={v} 
                onPress={() => setSize(v)} 
                style={{ 
                  paddingVertical: 8, 
                  paddingHorizontal: 12, 
                  borderRadius: 12, 
                  backgroundColor: size === v ? theme.colors.primary : theme.colors.background, 
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: size === v ? theme.colors.primary : theme.colors.border
                }}>
                <Text style={{ color: size === v ? theme.colors.text.light : theme.colors.text.primary, fontWeight: size === v ? '600' : '400' }}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ marginTop: 12, ...theme.typography.subHeader }}>Add-ons</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
            {addOns.map(a => {
              const active = selectedAddOns.includes(a.id);
              return (
                <TouchableOpacity 
                  key={a.id} 
                  onPress={() => toggleAddOn(a.id)} 
                  style={{ 
                    paddingVertical: 8, 
                    paddingHorizontal: 12, 
                    borderRadius: 16, 
                    backgroundColor: active ? theme.colors.secondary : theme.colors.background, 
                    marginRight: 8, 
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: active ? theme.colors.secondary : theme.colors.border
                  }}>
                  <Text style={{ color: active ? theme.colors.text.light : theme.colors.text.primary, fontWeight: active ? '600' : '400' }}>{a.name} • ₹{a.price}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={{ marginTop: 12, ...theme.typography.subHeader }}>Notes</Text>
          <TextInput 
            value={notes} 
            onChangeText={setNotes} 
            placeholder="KOT notes (e.g., extra spicy)" 
            style={{ 
              borderWidth: 1, 
              borderColor: theme.colors.border, 
              borderRadius: 8, 
              padding: 12, 
              marginTop: 6,
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary
            }} 
          />

          <View style={{ flexDirection: 'row', marginTop: 24, paddingBottom: 24 }}>
            <TouchableOpacity onPress={onClose} style={{ flex: 1, backgroundColor: theme.colors.background, padding: 14, borderRadius: 12, marginRight: 12, alignItems: 'center' }}>
              <Text style={{ color: theme.colors.text.primary, fontWeight: '600', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirm} style={{ flex: 1, backgroundColor: theme.colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', ...theme.shadows.md }}>
              <Text style={{ color: theme.colors.text.light, fontWeight: '700', fontSize: 16 }}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
