/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

// this probably wouldn't be necessary if I was working on a real database
export const clone = <T>(a: T): T => {
  return JSON.parse(JSON.stringify(a));
};

export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
