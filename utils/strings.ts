const capitalize = (name: string): string => {
  return name[0].toUpperCase() + name.substring(1);
};

const exportedFunctions = {
  capitalize,
};

export default exportedFunctions;
