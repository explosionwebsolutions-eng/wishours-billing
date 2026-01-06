import { Platform, Alert } from 'react-native';
// We conditionally import to avoid web crashes
let BLEPrinter = null;
try {
  if (Platform.OS !== 'web') {
    const printerLib = require('react-native-thermal-receipt-printer');
    BLEPrinter = printerLib.BLEPrinter;
  }
} catch (e) {
  console.warn("Printer library not linked. Run on device.");
}

export const PrinterService = {
  init: async () => {
    if (Platform.OS === 'web' || !BLEPrinter) return;
    try {
      await BLEPrinter.init();
      console.log("Printer Initialized");
    } catch (err) {
      console.warn("Printer Init Failed", err);
    }
  },

  scan: async () => {
    if (Platform.OS === 'web' || !BLEPrinter) {
      // Mock for Web/Preview
      return [
        { inner_mac_address: '00:11:22:33:44:55', device_name: 'Mock Printer 1' },
        { inner_mac_address: 'AA:BB:CC:DD:EE:FF', device_name: 'Mock Printer 2' }
      ];
    }
    // Real Scan
    try {
      // BLEPrinter.getDeviceList() usually returns a promise
      // Note: Implementation varies by library version, this is standard for react-native-thermal-receipt-printer
      return await BLEPrinter.getDeviceList(); 
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  connect: async (macAddress) => {
    if (Platform.OS === 'web' || !BLEPrinter) {
      console.log(`[Mock] Connected to ${macAddress}`);
      return true;
    }
    try {
      await BLEPrinter.connectPrinter(macAddress);
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  printOrder: async (order, storeDetails = { name: 'Wishours Bakery', address: 'Main St, City', phone: '9876543210' }) => {
    if (Platform.OS === 'web' || !BLEPrinter) {
      console.log("Printing Order (Mock):", order.id);
      Alert.alert("Printer Simulation", "Receipt printed (See console for details)");
      return;
    }

    try {
      const divider = '--------------------------------\n';
      let text = '';

      // Header
      text += `\x1B\x61\x01`; // Center Align
      text += `\x1B\x21\x30`; // Double Height/Width
      text += `${storeDetails.name}\n`;
      text += `\x1B\x21\x00`; // Normal
      text += `${storeDetails.address}\n`;
      text += `Tel: ${storeDetails.phone}\n`;
      text += `\x1B\x61\x00`; // Left Align
      text += divider;

      // Order Info
      text += `Order: #${order.id.slice(-6)}\n`;
      text += `Date: ${new Date(order.date).toLocaleString()}\n`;
      text += divider;

      // Items
      text += `Item            Qty    Price\n`;
      text += divider;
      
      order.items.forEach(item => {
        const name = item.name.length > 15 ? item.name.substring(0, 15) + '..' : item.name.padEnd(17, ' ');
        const qty = String(item.qty).padStart(3, ' ');
        const price = String(item.qty * item.unitPrice).padStart(8, ' ');
        text += `${name}${qty}${price}\n`;
      });

      text += divider;

      // Totals
      text += `\x1B\x61\x02`; // Right Align
      text += `Subtotal: ${order.totals.subtotal.toFixed(2)}\n`;
      text += `Tax: ${order.totals.tax.toFixed(2)}\n`;
      text += `\x1B\x21\x10`; // Double Height
      text += `TOTAL: ${order.totals.total.toFixed(2)}\n`;
      text += `\x1B\x21\x00`; // Normal
      text += `\x1B\x61\x01`; // Center
      text += divider;
      text += `Thank you for visiting!\n`;
      text += `www.wishours.com\n\n\n`;

      await BLEPrinter.printBill(text);

    } catch (err) {
      console.error("Print Error", err);
      Alert.alert("Print Error", "Could not print receipt.");
    }
  }
};
