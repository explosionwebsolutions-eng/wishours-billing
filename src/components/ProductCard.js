import { TouchableOpacity, View, Image, Text } from 'react-native';
import { theme } from '../theme/theme';

export default function ProductCard({ name, image, price, onTap, onLongPress }) {
  return (
    <TouchableOpacity 
      onPress={onTap} 
      onLongPress={onLongPress} 
      style={{ 
        width: '48%', 
        marginBottom: 16,
        ...theme.shadows.sm,
      }}
    >
      <View style={{ 
        backgroundColor: theme.colors.surface, 
        borderRadius: 16, 
        padding: 12,
        height: '100%',
        justifyContent: 'space-between'
      }}>
        <View>
          {image ? (
            <Image source={{ uri: image }} style={{ height: 120, borderRadius: 12, width: '100%' }} resizeMode="cover" />
          ) : (
             <View style={{ height: 100, borderRadius: 12, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, opacity: 0.2 }}>🍔</Text>
             </View>
          )}
          <Text style={{ marginTop: 12, ...theme.typography.subHeader, fontSize: 15, lineHeight: 20 }} numberOfLines={2}>
            {name}
          </Text>
        </View>
        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...theme.typography.price, color: theme.colors.primary }}>₹{price}</Text>
          <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: '600' }}>+</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
