/**
 * Вернет долю в процентном отношении числа A от числа B.
 * @param currentValue
 * @param maxValue
 */
export const getPercentOfProportion = (
  currentValue: number,
  maxValue: number,
): number => (currentValue / maxValue) * 100;


/**
 * Вернет процент от числа
 * @param percent
 * @param maxValue
 */
export const getPercentOfNumber = (percent: number, maxValue): number => (maxValue * percent) / 100;


/**
 * Пример использования: нужно разбить 1 прогресс бар, на 3 прогресс бара.
 * getPartitionPercent(
 *   numberItems: [количество прогресс баров],
 *   targetValue: [макс. значение одного прогресс бара],
 *   index: [индекс текущего прогресс бара],
 *   percent: [общий процент заполнения, число от 0 до 1],
 *  )
 * @param numberItems
 * @param targetValue
 * @param index
 * @param percent От 0 до 1.
 */
export const getPartitionPercent = (
  numberItems: number, targetValue: number, index: number, percent: number,
): number => {
  const allChunks = numberItems * targetValue;
  const filledChunks = allChunks * percent;
  const partitionChunkIndex = Math.floor(filledChunks / targetValue);

  if (index < partitionChunkIndex) return targetValue;
  if (index > partitionChunkIndex) return 0;

  return filledChunks % targetValue;
};

/**
 * Зацикленный декремент.
 * @param value
 * @param arrayOrMaxValue
 * @param decValue
 */
export const decLoop = (
  value: number,
  arrayOrMaxValue: Array<any> | number,
  decValue: number = 1,
) => {
  const length = Array.isArray(arrayOrMaxValue) ? arrayOrMaxValue.length : arrayOrMaxValue;
  return (value - decValue + length) % length;
};


/**
 * Зацикленный инкремент.
 * @param value
 * @param arrayOrMaxValue
 * @param incValue
 */
export const incLoop = (
  value: number,
  arrayOrMaxValue: Array<any> | number,
  incValue: number = 1,
) => {
  const length = Array.isArray(arrayOrMaxValue) ? arrayOrMaxValue.length : arrayOrMaxValue;
  return (value + incValue) % length;
};
