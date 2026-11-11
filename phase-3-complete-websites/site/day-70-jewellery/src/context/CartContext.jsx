import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'jz-cart';

function readCart() {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === 'string' && Number.isFinite(Number(item.price)))
      .map((item) => ({ ...item, price: Number(item.price), qty: Math.max(1, Math.floor(Number(item.qty) || 1)) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* Storage may be unavailable in private browsing. */ }
  }, [items]);

  const add = useCallback((product, quantity = 1) => {
    if (!product?.id || !Number.isFinite(Number(product.price))) return;
    const qty = Math.max(1, Math.floor(Number(quantity) || 1));
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item)
        : [...current, { ...product, price: Number(product.price), qty }];
    });
    setOpen(true);
  }, []);

  const update = useCallback((id, quantity) => {
    const qty = Math.floor(Number(quantity));
    setItems((current) => qty < 1
      ? current.filter((item) => item.id !== id)
      : current.map((item) => item.id === id ? { ...item, qty } : item));
  }, []);

  const remove = useCallback((id) => setItems((current) => current.filter((item) => item.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);
  const count = items.reduce((total, item) => total + item.qty, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);

  const value = useMemo(() => ({ items, open, setOpen, add, update, remove, clear, count, subtotal }),
    [items, open, add, update, remove, clear, count, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
