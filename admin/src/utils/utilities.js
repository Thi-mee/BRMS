import {BINARY_REGEX, NO_SPECIAL_CHARS_REGEX, REQUEST_STATUS} from "./constants";

function statusCheck (status) {
  const success = status === REQUEST_STATUS.SUCCEEDED
  const failure = status === REQUEST_STATUS.FAILED
  const loading = status === REQUEST_STATUS.LOADING
  const idle = status === REQUEST_STATUS.IDLE
  return [success, failure, loading, idle]
}


function compareObjects (obj1, obj2) {
  const loc1keys = Object.keys(obj1).sort();
  const loc2keys = Object.keys(obj2).sort();
  if (loc1keys.length !== loc2keys.length) {
    return false;
  } else {
    const areEqual = loc1keys.every((key, index) => {
      const objValue1 = obj1[key];
      const objValue2 = obj2[loc2keys[index]];
      return objValue1 === objValue2;
    });
    return !!areEqual;
  }
}

function convertNestedToNotNested (obj) {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      for (const nestedKey in obj[key]) {
        const newKey = `${key}.${nestedKey}`;
        result[newKey] = obj[key][nestedKey];
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

function convertNotNestedToNested (obj) {
  const result = {};

  for (const key in obj) {
    const nestedKeys = key.split('.');
    let nestedObj = result;

    for (let i = 0; i < nestedKeys.length - 1; i++) {
      const nestedKey = nestedKeys[i];

      if (!nestedObj[nestedKey]) {
        nestedObj[nestedKey] = {};
      }

      nestedObj = nestedObj[nestedKey];
    }

    nestedObj[nestedKeys[nestedKeys.length - 1]] = obj[key];
  }

  return result;
}

function formatSpreadSheetRow (rowData, index) {
  const validKeys = ["name", "title", "description", "busStop", "status"];
  const rowKeys = Object.keys(rowData);

  const row = rowKeys.reduce((acc, key) => {
    if (validKeys.includes(key)) {
      acc[key] = rowData[key];
    }
    return acc;
  }, {});

  if (!row.name || !row.title || !row.description || !row.busStop)
    return null;
  if (!NO_SPECIAL_CHARS_REGEX.test(row.name)) return null;
  if (!NO_SPECIAL_CHARS_REGEX.test(row.title)) return null;
  if (!NO_SPECIAL_CHARS_REGEX.test(row.description)) return null;
  if (!NO_SPECIAL_CHARS_REGEX.test(row.busStop)) return null;
  if (!BINARY_REGEX.test(row.status)) return null;
  return row;
}


export { statusCheck, convertNestedToNotNested, convertNotNestedToNested, compareObjects, formatSpreadSheetRow };