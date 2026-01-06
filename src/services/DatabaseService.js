import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db = null;

// Open Database (Safe for Web/Native)
const openDatabase = async () => {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {},
      execAsync: async () => {},
      runAsync: async () => {},
      getAllAsync: async () => []
    };
  }
  if (!db) {
    db = await SQLite.openDatabaseAsync('wishours_pos.db');
  }
  return db;
};

export const DatabaseService = {
  init: async () => {
    try {
      if (Platform.OS === 'web') return;
      
      const database = await openDatabase();
      
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          date TEXT NOT NULL,
          total REAL NOT NULL,
          subtotal REAL NOT NULL,
          tax REAL NOT NULL,
          status TEXT DEFAULT 'completed',
          payment_method TEXT,
          synced INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id TEXT NOT NULL,
          product_name TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          unit_price REAL NOT NULL,
          total_price REAL NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders (id)
        );
      `);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },

  saveOrder: async (order) => {
    if (Platform.OS === 'web') {
      console.log('Web Mode: Order saved to memory only', order);
      return;
    }

    try {
      const database = await openDatabase();
      
      // Insert Order
      await database.runAsync(
        'INSERT INTO orders (id, date, total, subtotal, tax, status, payment_method, synced) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          order.id, 
          order.date, 
          order.totals.total, 
          order.totals.subtotal, 
          order.totals.tax, 
          'completed', 
          order.payment?.tendered ? 'cash' : 'other',
          0
        ]
      );

      // Insert Items
      for (const item of order.items) {
        await database.runAsync(
          'INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)',
          [order.id, item.name, item.qty, item.unitPrice, item.qty * item.unitPrice]
        );
      }
      
      console.log('Order saved to SQLite:', order.id);
    } catch (error) {
      console.error('Error saving order to DB:', error);
      throw error;
    }
  },

  getOrders: async () => {
    if (Platform.OS === 'web') return [];

    try {
      const database = await openDatabase();
      const orders = await database.getAllAsync('SELECT * FROM orders ORDER BY date DESC');
      
      const result = [];
      for (const o of orders) {
        const items = await database.getAllAsync('SELECT * FROM order_items WHERE order_id = ?', [o.id]);
        result.push({
          id: o.id,
          date: o.date,
          status: o.status,
          totals: {
            total: o.total,
            subtotal: o.subtotal,
            tax: o.tax
          },
          items: items.map(i => ({
            name: i.product_name,
            qty: i.quantity,
            unitPrice: i.unit_price
          }))
        });
      }
      return result;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  getDailySales: async () => {
    if (Platform.OS === 'web') return 0;
    try {
      const database = await openDatabase();
      const today = new Date().toISOString().split('T')[0];
      const result = await database.getFirstAsync(
        'SELECT SUM(total) as total FROM orders WHERE date LIKE ?', 
        [`${today}%`]
      );
      return result?.total || 0;
    } catch (e) {
      return 0;
    }
  },

  syncWithCloud: async () => {
    if (Platform.OS === 'web') return { count: 0, message: 'Web mode: Cloud sync skipped' };

    try {
      const database = await openDatabase();
      
      // 1. Get unsynced orders
      const unsyncedOrders = await database.getAllAsync('SELECT * FROM orders WHERE synced = 0');
      if (unsyncedOrders.length === 0) return { count: 0, message: 'All up to date' };

      const payload = [];

      // 2. Prepare Payload
      for (const o of unsyncedOrders) {
        const items = await database.getAllAsync('SELECT * FROM order_items WHERE order_id = ?', [o.id]);
        payload.push({
          id: o.id,
          date: o.date,
          status: o.status,
          totals: {
            total: o.total,
            subtotal: o.subtotal,
            tax: o.tax
          },
          payment: { tendered: o.payment_method === 'cash' ? o.total : 0 },
          items: items.map(i => ({
            name: i.product_name,
            qty: i.quantity,
            unitPrice: i.unit_price
          }))
        });
      }

      // 3. Send to Cloud API
      const response = await fetch('https://wishours-billing.vercel.app/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: payload })
      });

      if (!response.ok) {
        throw new Error(`Cloud Sync Failed: ${response.statusText}`);
      }

      // 4. Mark as Synced in Local DB
      for (const order of payload) {
        await database.runAsync('UPDATE orders SET synced = 1 WHERE id = ?', [order.id]);
      }

      return { count: payload.length, message: `Successfully synced ${payload.length} orders` };

    } catch (error) {
      console.error('Sync Error:', error);
      throw error;
    }
  }
};
