export const theme = {
  colors: {
    primary: '#5a1ce7', // Wishours Brand Purple
    primaryDark: '#4615b5',
    secondary: '#10B981', // Success Green for Pay/Add (Standard UX)
    accent: '#FFD700', // Gold for offers/highlights
    background: '#F8F9FA', // Very Light Gray
    surface: '#FFFFFF',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      light: '#FFFFFF',
      accent: '#5a1ce7',
    },
    border: '#E5E7EB',
    danger: '#EF4444',
  },
  shadows: {
    sm: {
      shadowColor: '#5a1ce7', // Tinted shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#5a1ce7',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#5a1ce7',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    header: { fontSize: 20, fontWeight: '700', color: '#111827' },
    subHeader: { fontSize: 16, fontWeight: '600', color: '#374151' },
    body: { fontSize: 14, color: '#4B5563' },
    caption: { fontSize: 12, color: '#9CA3AF' },
    price: { fontSize: 16, fontWeight: '700', color: '#111827' },
  },
};
