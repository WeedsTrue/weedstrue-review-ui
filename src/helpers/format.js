const toTitleCase = str => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

const stripDateOfUTC = date => {
  return date.replace('Z', '');
};

export { stripDateOfUTC, toTitleCase };
