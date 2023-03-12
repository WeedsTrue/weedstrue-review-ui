const userPostSort = (a, b, sortby) => {
  switch (sortby?.toUpperCase()) {
    case 'TRENDING':
      return new Date(a.created - b.created);
    default:
      return new Date(a.created - b.created);
  }
};

export { userPostSort };
