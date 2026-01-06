export const categories = [
  { id: 'cakes', name: 'Cakes', color: '#5a1ce7' },
  { id: 'pastry', name: 'Pastry', color: '#EC407A' },
  { id: 'pizza', name: 'Pizza', color: '#FF6F3D' },
  { id: 'burger', name: 'Burger', color: '#A5D6A7' },
  { id: 'shakes', name: 'Shakes', color: '#E57373' },
  { id: 'cold_coffee', name: 'Cold Coffee', color: '#BA68C8' },
  { id: 'mocktail', name: 'Mocktail', color: '#FFD54F' },
  { id: 'pasta', name: 'Pasta', color: '#81C784' },
  { id: 'sandwich', name: 'Sandwich', color: '#4DD0E1' },
  { id: 'wrap', name: 'Wrap', color: '#8D6E63' },
  { id: 'french_fries', name: 'French Fries', color: '#90CAF9' },
];

export const products = [
  // Cakes (0.5kg prices assumed, can be customized)
  { id: 'pineapple_cake', categoryId: 'cakes', name: 'Pineapple Cake', price: 350, image: 'https://picsum.photos/200?51' },
  { id: 'black_forest_cake', categoryId: 'cakes', name: 'Black Forest Cake', price: 400, image: 'https://picsum.photos/200?52' },
  { id: 'chocolate_truffle_cake', categoryId: 'cakes', name: 'Chocolate Truffle Cake', price: 450, image: 'https://picsum.photos/200?53' },
  { id: 'red_velvet_cake', categoryId: 'cakes', name: 'Red Velvet Cake', price: 500, image: 'https://picsum.photos/200?54' },
  { id: 'butterscotch_cake', categoryId: 'cakes', name: 'Butterscotch Cake', price: 400, image: 'https://picsum.photos/200?55' },
  
  // Pastry
  { id: 'pineapple_pastry', categoryId: 'pastry', name: 'Pineapple Pastry', price: 40, image: 'https://picsum.photos/200?56' },
  { id: 'black_forest_pastry', categoryId: 'pastry', name: 'Black Forest Pastry', price: 50, image: 'https://picsum.photos/200?57' },
  { id: 'chocolate_truffle_pastry', categoryId: 'pastry', name: 'Truffle Pastry', price: 60, image: 'https://picsum.photos/200?58' },
  { id: 'red_velvet_pastry', categoryId: 'pastry', name: 'Red Velvet Pastry', price: 70, image: 'https://picsum.photos/200?59' },

  // Pizza (Base Products for Grid)
  { id: 'margherita', categoryId: 'pizza', name: 'Margherita Pizza', price: 199, isPizza: true, image: 'https://picsum.photos/200?60' },
  { id: 'veg_supreme', categoryId: 'pizza', name: 'Veg Supreme Pizza', price: 229, isPizza: true, image: 'https://picsum.photos/200?61' },
  { id: 'paneer_tikka', categoryId: 'pizza', name: 'Paneer Tikka Pizza', price: 239, isPizza: true, image: 'https://picsum.photos/200?62' },
  { id: 'corn', categoryId: 'pizza', name: 'Corn Pizza', price: 179, isPizza: true, image: 'https://picsum.photos/200?63' },

  // Shakes
  { id: 'vanilla_shake', categoryId: 'shakes', name: 'Vanilla Shake', price: 65, image: 'https://picsum.photos/200?1' },
  { id: 'butterstoch_shake', categoryId: 'shakes', name: 'Butterstoch Shake', price: 70, image: 'https://picsum.photos/200?2' },
  { id: 'blueberry_shake', categoryId: 'shakes', name: 'Blueberry Shake', price: 70, image: 'https://picsum.photos/200?3' },
  { id: 'straberry_shake', categoryId: 'shakes', name: 'Straberry Shake', price: 70, image: 'https://picsum.photos/200?4' },
  { id: 'chocolate_shake', categoryId: 'shakes', name: 'Chocolate Shake', price: 80, image: 'https://picsum.photos/200?5' },
  { id: 'kitkat_shake', categoryId: 'shakes', name: 'Kitkat Shake', price: 90, image: 'https://picsum.photos/200?6' },
  { id: 'oreo_shake', categoryId: 'shakes', name: 'Oreo Shake', price: 90, image: 'https://picsum.photos/200?7' },
  { id: 'brownie_shake', categoryId: 'shakes', name: 'Brownie Shake', price: 100, image: 'https://picsum.photos/200?8' },
  { id: 'dark_chocolate_shake', categoryId: 'shakes', name: 'Dark Chocolate Shake', price: 100, image: 'https://picsum.photos/200?9' },
  { id: 'banana_dry_fruit_shake', categoryId: 'shakes', name: 'Banana Dry-fruit Shake', price: 120, image: 'https://picsum.photos/200?10' },
  { id: 'mango_dry_fruit_shake', categoryId: 'shakes', name: 'Mango Dry-fruit Shake', price: 120, image: 'https://picsum.photos/200?11' },

  // Cold Coffee
  { id: 'coffee', categoryId: 'cold_coffee', name: 'Coffee', price: 50, image: 'https://picsum.photos/200?12' },
  { id: 'cold_coffee_item', categoryId: 'cold_coffee', name: 'Cold Coffee', price: 80, image: 'https://picsum.photos/200?13' },
  { id: 'ice_cream_cold_coffee', categoryId: 'cold_coffee', name: 'Ice Cream Cold Coffee (Vanilla/Chocolate)', price: 100, image: 'https://picsum.photos/200?14' },

  // Mocktail
  { id: 'fresh_lemon', categoryId: 'mocktail', name: 'Fresh Lemon', price: 50, image: 'https://picsum.photos/200?15' },
  { id: 'virgin_mojito', categoryId: 'mocktail', name: 'Virgin Mojito', price: 60, image: 'https://picsum.photos/200?16' },
  { id: 'mojito_mint', categoryId: 'mocktail', name: 'Mojito Mint', price: 60, image: 'https://picsum.photos/200?17' },
  { id: 'mast_kala_khatta', categoryId: 'mocktail', name: 'Mast Kala Khatta', price: 60, image: 'https://picsum.photos/200?18' },
  { id: 'tangy_orange', categoryId: 'mocktail', name: 'Tangy Orange', price: 60, image: 'https://picsum.photos/200?19' },
  { id: 'watermelon_mojito', categoryId: 'mocktail', name: 'Watermelon Mojito', price: 80, image: 'https://picsum.photos/200?20' },
  { id: 'blue_lagoon', categoryId: 'mocktail', name: 'Blue Lagoon', price: 80, image: 'https://picsum.photos/200?21' },
  { id: 'black_currant', categoryId: 'mocktail', name: 'Black Currant', price: 80, image: 'https://picsum.photos/200?22' },
  { id: 'masala_soda', categoryId: 'mocktail', name: 'Masala Soda', price: 80, image: 'https://picsum.photos/200?23' },

  // Pasta
  { id: 'red_sauce_pasta', categoryId: 'pasta', name: 'Red Sauce Pasta', price: 120, image: 'https://picsum.photos/200?24' },
  { id: 'pink_sauce_pasta', categoryId: 'pasta', name: 'Pink Sauce Pasta', price: 130, image: 'https://picsum.photos/200?25' },
  { id: 'white_sauce_pasta', categoryId: 'pasta', name: 'White Sauce Pasta', price: 140, image: 'https://picsum.photos/200?26' },
  { id: 'baked_in_cheese_pasta', categoryId: 'pasta', name: 'Baked in Cheese Pasta', price: 180, image: 'https://picsum.photos/200?27' },

  // Sandwich
  { id: 'veggie_classic_sandwich', categoryId: 'sandwich', name: 'Veggie Classic Sandwich', price: 80, image: 'https://picsum.photos/200?28' },
  { id: 'mushroom_and_corn', categoryId: 'sandwich', name: 'Mushroom and Corn', price: 110, image: 'https://picsum.photos/200?29' },
  { id: 'veg_and_cheese', categoryId: 'sandwich', name: 'Veg and Cheese', price: 110, image: 'https://picsum.photos/200?30' },
  { id: 'tandoori_paneer_tikka', categoryId: 'sandwich', name: 'Tandoori Paneer Tikka', price: 120, image: 'https://picsum.photos/200?31' },

  // Wrap
  { id: 'aloo_tikki_wrap', categoryId: 'wrap', name: 'Aloo Tikki Wrap', price: 70, image: 'https://picsum.photos/200?32' },
  { id: 'veggie_classic_wrap', categoryId: 'wrap', name: 'Veggie Classic Wrap', price: 80, image: 'https://picsum.photos/200?33' },
  { id: 'exotic_veg_wrap', categoryId: 'wrap', name: 'Exotic Veg Wrap', price: 100, image: 'https://picsum.photos/200?34' },
  { id: 'paneer_wrap', categoryId: 'wrap', name: 'Paneer Wrap', price: 110, image: 'https://picsum.photos/200?35' },
  { id: 'paneer_cheese_wrap', categoryId: 'wrap', name: 'Paneer Cheese Wrap', price: 120, image: 'https://picsum.photos/200?36' },

  // French Fries
  { id: 'classic_salted_fries', categoryId: 'french_fries', name: 'Classic Salted Fries', price: 60, image: 'https://picsum.photos/200?37' },
  { id: 'masala_fries', categoryId: 'french_fries', name: 'Masala Fries', price: 70, image: 'https://picsum.photos/200?38' },
  { id: 'peri_peri_fries', categoryId: 'french_fries', name: 'Peri Peri Fries', price: 80, image: 'https://picsum.photos/200?39' },
  { id: 'chipotle_sauce_fries', categoryId: 'french_fries', name: 'Chipotle Sauce Fries', price: 80, image: 'https://picsum.photos/200?40' },
  { id: 'thousand_island_sauce_fries', categoryId: 'french_fries', name: 'Thousand Island Sauce Fries', price: 80, image: 'https://picsum.photos/200?41' },
  { id: 'cheese_fries', categoryId: 'french_fries', name: 'Cheese Fries', price: 120, image: 'https://picsum.photos/200?42' },

  // Burger
  { id: 'aloo_tikki_burger', categoryId: 'burger', name: 'Aloo Tikki Burger', price: 40, image: 'https://picsum.photos/200?43' },
  { id: 'alook_tikki_supreme_burger', categoryId: 'burger', name: 'Alook Tikki Supreme Burger', price: 50, image: 'https://picsum.photos/200?44' },
  { id: 'veg_delight_burger', categoryId: 'burger', name: 'Veg Delight Burger', price: 55, image: 'https://picsum.photos/200?45' },
  { id: 'veg_in_cheese_burger', categoryId: 'burger', name: 'Veg in Cheese Burger', price: 65, image: 'https://picsum.photos/200?46' },
  { id: 'paneer_peri_peri_spicy_burger', categoryId: 'burger', name: 'Paneer Peri Peri Spicy Burger', price: 80, image: 'https://picsum.photos/200?47' },
  { id: 'tandoori_paneer_burger', categoryId: 'burger', name: 'Tandoori Paneer Burger', price: 80, image: 'https://picsum.photos/200?48' },
  { id: 'makhani_paneer_burger', categoryId: 'burger', name: 'Makhani Paneer Burger', price: 80, image: 'https://picsum.photos/200?49' },
  { id: 'wishours_special_burger', categoryId: 'burger', name: 'Wishours Special Burger', price: 90, image: 'https://picsum.photos/200?50' },
];

export const pizzaMatrix = {
  margherita: { small: 129, medium: 199, large: 279 },
  veg_supreme: { small: 159, medium: 229, large: 309 },
  paneer_tikka: { small: 169, medium: 239, large: 319 },
};

export const pizzaAddOns = [
  { id: 'extra_cheese', name: 'Extra Cheese', price: 30 },
  { id: 'extra_toppings', name: 'Extra Toppings', price: 40 },
  { id: 'garlic_dip', name: 'Garlic Dip', price: 20 },
];

export const presets = [
  { productId: 'margherita', flavor: 'margherita', size: 'medium' },
  { productId: 'veg_supreme', flavor: 'veg_supreme', size: 'medium' },
];
