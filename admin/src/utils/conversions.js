function convertNestedToNotNested(obj) {
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

function convertNotNestedToNested(obj) {
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


export { convertNestedToNotNested, convertNotNestedToNested };