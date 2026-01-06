import { create } from 'zustand';
import { categories, products, pizzaMatrix, pizzaAddOns, presets } from '../data/catalog';
import { DatabaseService } from '../services/DatabaseService';

export const useStore = create((set, get) => ({
  categories,
  products,
  pizzaMatrix,
  pizzaAddOns,
  presets,
  activeCategoryId: categories[0].id,
  recent: [],
  cart: [],
  orders: [],
  totals: { subtotal: 0, tax: 0, discount: 0, roundOff: 0, total: 0 },
  
  // Initialize and Load Data
  initialize: async () => {
    await DatabaseService.init();
    const history = await DatabaseService.getOrders();
    set({ orders: history });
  },

  setActiveCategory: (id) => set({ activeCategoryId: id }),
  addRecent: (item) => {
    const r = [item, ...get().recent.filter((x) => x.key !== item.key)].slice(0, 5);
    set({ recent: r });
  },
  placeOrder: (paymentDetails) => {
    const { cart, totals } = get();
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cart],
      totals: { ...totals },
      payment: paymentDetails,
      status: 'completed',
    };

    // Save to Local DB
    DatabaseService.saveOrder(newOrder).catch(e => console.error("Failed to save order", e));

    set((state) => ({
      orders: [newOrder, ...state.orders],
      cart: [],
      totals: { subtotal: 0, tax: 0, discount: 0, roundOff: 0, total: 0 }
    }));
    return newOrder;
  },
  addToCart: (item) => {
    const cart = [...get().cart];
    const idx = cart.findIndex((x) => x.key === item.key);
    if (idx >= 0) cart[idx] = { ...cart[idx], qty: cart[idx].qty + 1 };
    else cart.push({ ...item, qty: 1 });
    set({ cart });
    get().recalcTotals();
    get().addRecent(item);
  },
  updateQty: (key, delta) => {
    let cart = [...get().cart];
    const idx = cart.findIndex((x) => x.key === key);
    if (idx >= 0) {
      const qty = Math.max(0, cart[idx].qty + delta);
      if (qty === 0) cart.splice(idx, 1);
      else cart[idx] = { ...cart[idx], qty };
      set({ cart });
      get().recalcTotals();
    }
  },
  removeItem: (key) => {
    const cart = get().cart.filter((x) => x.key !== key);
    set({ cart });
    get().recalcTotals();
  },
  recalcTotals: () => {
    const subtotal = get().cart.reduce((s, x) => s + x.unitPrice * x.qty, 0);
    const tax = Math.round(subtotal * 0.05 * 100) / 100;
    const discount = 0;
    const roundOff = 0;
    const total = Math.round((subtotal + tax - discount + roundOff) * 100) / 100;
    set({ totals: { subtotal, tax, discount, roundOff, total } });
  },
}));
