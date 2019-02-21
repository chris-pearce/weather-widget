export default function(str) {
  return str.replace(/^./, str => str.toUpperCase());
}
