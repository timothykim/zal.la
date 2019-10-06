export const isValidUrl = (string) => {
  if (!string.includes('https://') || !string.includes('http://')) {
    string = `https://${string}`;
  }

  try {
    return new URL(string);
  } catch {
    return false;
  }
};