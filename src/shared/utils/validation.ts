import { parseCurrency } from "./currency";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAmount = (amount: string): { isValid: boolean; error?: string } => {
  const numericAmount = parseCurrency(amount);
  
  if (isNaN(numericAmount)) {
    return { isValid: false, error: 'Ingresa un monto válido' };
  }
  
  if (numericAmount <= 0) {
    return { isValid: false, error: 'El monto debe ser mayor a cero' };
  }
  
  if (numericAmount > 999999.99) {
    return { isValid: false, error: 'El monto es demasiado alto' };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): { isValid: boolean; error?: string } => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }
  return { isValid: true };
};