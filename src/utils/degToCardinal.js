// https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words/25867068#25867068
// https://gist.github.com/basarat/4670200
export default function degToCardinal(num) {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  return arr[val % 16];
}
