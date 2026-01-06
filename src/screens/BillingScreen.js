import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import CategoryChips from '../components/CategoryChips';
import ProductCard from '../components/ProductCard';
import CartItemRow from '../components/CartItemRow';
import PaymentModal from '../components/PaymentModal';
import PizzaOptionsModal from '../components/PizzaOptionsModal';
import { useStore } from '../state/store';
import { theme } from '../theme/theme';

import { PrinterService } from '../services/PrinterService';

export default function BillingScreen() {
  const {
    categories,
    products,
    activeCategoryId,
    setActiveCategory,
    recent,
    cart,
    totals,
    addToCart,
    updateQty,
    removeItem,
    pizzaMatrix,
    pizzaAddOns,
    presets,
    placeOrder,
  } = useStore();
  const categoryProducts = products.filter(p => p.categoryId === activeCategoryId);
  const [showPayment, setShowPayment] = React.useState(false);
  const [showPizza, setShowPizza] = React.useState(false);
  const [pizzaProduct, setPizzaProduct] = React.useState(null);

  const handleCheckout = (paymentDetails) => {
    const newOrder = placeOrder(paymentDetails);
    setShowPayment(false);
    
    // Auto Print
    PrinterService.printOrder(newOrder);
  };

  const onTapProduct = (p) => {
    if (p.isPizza) {
      const preset = presets.find(x => x.productId === p.id) || { flavor: p.id, size: 'medium' };
      const unitPrice = pizzaMatrix[preset.flavor][preset.size];
      addToCart({ key: `${p.id}:${preset.flavor}:${preset.size}`, name: `${p.name} • ${capitalize(preset.flavor.replace('_',' '))} • ${capitalize(preset.size)}`, unitPrice });
    } else {
      addToCart({ key: p.id, name: p.name, unitPrice: p.price });
    }
  };

  const onLongPressProduct = (p) => {
    if (p.isPizza) {
      setPizzaProduct(p);
      setShowPizza(true);
    }
  };

  const onConfirmPizza = (selection) => {
    const p = products.find(x => x.id === selection.productId);
    const addOnNames = selection.addOns.map(id => pizzaAddOns.find(a => a.id === id)?.name).filter(Boolean);
    const name = `${p.name} • ${capitalize(selection.flavor.replace('_',' '))} • ${capitalize(selection.size)}${addOnNames.length ? ' • ' + addOnNames.join(', ') : ''}`;
    addToCart({ key: `${p.id}:${selection.flavor}:${selection.size}:${addOnNames.sort().join('+')}`, name, unitPrice: selection.unitPrice });
    setShowPizza(false);
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      
      {/* Header */}
      <View style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...theme.shadows.sm }}>
        <View>
          <Text style={theme.typography.header}>Wishours</Text>
          <Text style={theme.typography.caption}>Main Store • <Text style={{color: theme.colors.secondary}}>● Online</Text></Text>
        </View>
        <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.background, borderRadius: 8 }}>
          <Text>🖨️</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <CategoryChips categories={categories} activeId={activeCategoryId} onSelect={setActiveCategory} />

      {/* Main Content Area */}
      <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 12 }}>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={categoryProducts}
          renderItem={({ item }) => (
            <ProductCard
              name={item.name}
              image={item.image}
              price={item.isPizza ? item.price : item.price}
              onTap={() => onTapProduct(item)}
              onLongPress={() => onLongPressProduct(item)}
            />
          )}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Persistent Cart Sheet */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: theme.colors.surface, 
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24, 
        ...theme.shadows.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border
      }}>
        {/* Cart List (Collapsible/Scrollable) */}
        <View style={{ maxHeight: 250 }}>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={{ paddingHorizontal: 16 }}>
                 <CartItemRow item={item} onInc={() => addToCart(item)} onDec={() => updateQty(item.key, -1)} onRemove={() => removeItem(item.key)} />
              </View>
            )}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={
              <View style={{ padding: 24, alignItems: 'center' }}>
                <Text style={theme.typography.body}>Cart is empty</Text>
              </View>
            }
          />
        </View>

        {/* Total & Pay Button */}
        <View style={{ padding: 16, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={theme.typography.subHeader}>Total</Text>
            <Text style={{ ...theme.typography.header, color: theme.colors.primary }}>₹{totals.total}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setShowPayment(true)}
            disabled={cart.length === 0}
            style={{ 
              backgroundColor: cart.length > 0 ? theme.colors.secondary : theme.colors.border, 
              paddingVertical: 14, 
              borderRadius: 12, 
              alignItems: 'center',
              ...theme.shadows.md
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700' }}>
              Checkout • {cart.reduce((acc, i) => acc + i.qty, 0)} items
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <PizzaOptionsModal visible={showPizza} onClose={() => setShowPizza(false)} product={pizzaProduct} matrix={pizzaMatrix} addOns={pizzaAddOns} onConfirm={onConfirmPizza} />
      <PaymentModal visible={showPayment} onClose={() => setShowPayment(false)} totals={totals} onSavePrint={handleCheckout} />
    </SafeAreaView>
  );
}
