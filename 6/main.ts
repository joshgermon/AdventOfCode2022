const input = Deno.readTextFileSync('input.txt');
const letters = input.split('');

for(const [idx, letter] of letters.entries()) {
  const fourLetters = letters.slice(idx, idx+14);
  const deDupe = new Set(fourLetters);
  console.log(fourLetters, deDupe)
  if(fourLetters.length === deDupe.size) {
    console.log(letters[idx], idx+14);
    break;
  }
}