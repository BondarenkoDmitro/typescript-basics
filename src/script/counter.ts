// Логіка для роботи з счетчиком
export function setupCounter(element: HTMLElement) {
  let counter = 0;

  const adjustCounterValue = (value: number): number => {
    if (value >= 100) return value - 100;
    if (value <= -100) return value + 100;
    return value;
  };

  const setCounter = (value: number): void => {
    counter = adjustCounterValue(value);
    element.innerHTML = `${counter}`;
  };

  // Додаємо слухачів на кнопки
  document.getElementById('increaseByOne')?.addEventListener('click', () => {
    setCounter(counter + 1);
  });

  document.getElementById('decreaseByOne')?.addEventListener('click', () => {
    setCounter(counter - 1);
  });

  document.getElementById('increaseByTwo')?.addEventListener('click', () => {
    setCounter(counter + 2);
  });

  document.getElementById('decreaseByTwo')?.addEventListener('click', () => {
    setCounter(counter - 2);
  });

  // Ініціалізуємо счетчик з 0
  setCounter(0);
}

