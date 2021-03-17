export default function toTitleCase(str: string) {
  const chars = str.toLowerCase().split('');
  chars[0] = chars[0].toUpperCase();
  return chars.join('');
}
