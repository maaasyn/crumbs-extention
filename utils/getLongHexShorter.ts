export const getLongHexShorter = (someLongHex: string) => {
  return `${someLongHex.slice(0, 6)}...${someLongHex.slice(-4)}`;
};
