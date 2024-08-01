export function filterObjectPropertyByIndex(arr: any, index: number) {
  let propertyValues: any[] = [];

  for (const obj of arr) {
    const keys = Object.keys(obj);
    if (keys.length > 1) {
      propertyValues.push(obj[keys[index]]);
    }
  }

  propertyValues = propertyValues.filter(
    (item, index) => propertyValues.indexOf(item) === index
  );

  return propertyValues;
}

/**
 * Returns an array with filtered object keys from duplicates. The properties filtered by only by entered key.
 * @param arr
 * @param propertyKey
 * @returns []
 */
export function filterObjectPropertyByKey(arr: any, propertyKey: string) {
  let propertyValues: string[] = [];

  for (const obj of arr) {
    if (!obj.hasOwnProperty(propertyKey)) {
      console.log(`The property with key ${propertyKey} is not found.`);
    }
    propertyValues.push(obj[propertyKey]);
  }

  propertyValues = propertyValues.filter(
    (item, index) => propertyValues.indexOf(item) === index
  );

  return propertyValues;
}

export function filterDuplicates(arr: any[]) {
  const filteredArr: any[] = [];
  let currentObj: any = {};

  for (const obj of arr) {
    for (const key in obj) {
      if (obj[key].indexOf() === obj[key]) {
        currentObj[key] = obj[key];
      }
    }
  }
}
