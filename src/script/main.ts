// Імпортуємо все необхідне
import './new_step';
import { setupCounter } from './counter';

// Ініціалізуємо приложение при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('counter-value');
  if (counterElement) {
    setupCounter(counterElement);
  }
});
