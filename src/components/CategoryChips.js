import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { theme } from '../theme/theme';

export default function CategoryChips({ categories, activeId, onSelect }) {
  return (
    <View style={{ backgroundColor: theme.colors.surface, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => {
          const isActive = item.id === activeId;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item.id)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 24,
                backgroundColor: isActive ? theme.colors.primary : theme.colors.background,
                marginRight: 8,
                marginLeft: item.id === categories[0].id ? 12 : 0,
                borderWidth: 1,
                borderColor: isActive ? theme.colors.primary : theme.colors.border,
              }}
            >
              <Text style={{ 
                color: isActive ? theme.colors.text.light : theme.colors.text.secondary,
                fontWeight: isActive ? '600' : '500',
                fontSize: 14
              }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(c) => String(c.id)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
