const input = Deno.readTextFileSync('input.txt');

let totalWithinRange = 0;
let totalWithSharedNums = 0;

function getPairs(line: string) {
  const pairs = line.split(',');
  const HLpairs = pairs.map(p => p.split('-').map(x => parseInt(x)));
  return HLpairs
}

function isWithinRange(pairs: number[][]) {
  if(pairs[0][0] <= pairs[1][0]) {
    if(pairs[0][1] >= pairs[1][1]) {
      return true;
    }
  }
  if(pairs[1][0] <= pairs[0][0]) {
    if(pairs[1][1] >= pairs[0][1]) {
      return true;
    }
  }
  return false;
}

function sharesAnyNumbers(pairs: number[][]) {
  if(pairs[0][0] > pairs[1][1]) {
    return false;
  }
  if(pairs[1][0] > pairs[0][1]) {
    return false
  }
  return true;
}


input.split('\n').forEach(line => {
  const hlpair = getPairs(line);

  const isInRange = isWithinRange(hlpair);
  const numsShared = sharesAnyNumbers(hlpair);
  if(isInRange) { totalWithinRange++ }
  if(numsShared) { totalWithSharedNums++ }
})

console.log("Total in range: " + totalWithinRange)
console.log("Total with Shared Nums: " + totalWithSharedNums)