/**
 * Форматирует числовое значение в строку цены с необязательным символом валюты.
 * Добавляет пробелы между цифрами через каждые три символа, начиная с конца.
 * @param {number} value - Числовое значение для форматирования.
 * @param {string} [symbol] - Символ валюты, который будет добавлен. По умолчанию '₽'.
 * @returns {string} Отформатированная строка цены.
 */
export const priceFormatter = (value: number, symbol?: string): string => {
  const symbolToUse = symbol ?? '₽';
  const formattedValue = value.toLocaleString('ru-RU').replace(/,/g, ' ');
  return `${formattedValue} ${symbolToUse}`;
};
