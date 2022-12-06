const textFile = Deno.readTextFileSync('input.txt');
const [crates, instructions] = textFile.split('\n\n');
const cratesLines = crates.split('\n');
cratesLines.pop();

const inventory: string[][] = [[], [], [], [], [], [], [], [], []];

for (const line of cratesLines) {
	const letters = line.split('');
	let cidx = 0;
	for (let i = 1; i < letters.length; i += 4) {
		if (letters[i] !== ' ') {
			inventory[cidx].unshift(letters[i]);
		}
		cidx++;
	}
}

console.log(inventory);

function runInstructions() {
  const instructionsLines = instructions.split('\n');
  instructionsLines.forEach(inst => {
    const match = inst.match(/\d+/g);
    if(!match) { return;}
    const [ amount, src, target ] = match;
    for(let i = 0; i < parseInt(amount); i++) {
      const moveCrate = inventory[parseInt(src) - 1].pop();
      if(!moveCrate) { console.log(inventory, amount, src, target); return console.log("no crate too move")}
      inventory[parseInt(target) - 1].push(moveCrate);
    }
  });
}

function runInstructions9001() {
  const instructionsLines = instructions.split('\n');
  instructionsLines.forEach(inst => {
    const match = inst.match(/\d+/g);
    if(!match) { return;}
    const [ amount, src, target ] = match;
    const srcArr = inventory[parseInt(src) - 1];
    const targetArr = inventory[parseInt(target) - 1];
    const cratesToMove = srcArr.splice(-parseInt(amount), parseInt(amount));
    targetArr.push(...cratesToMove)
  });
}


runInstructions9001();

const topItems = inventory.reduce((prev, curr) => {
  return (curr.length > 0) ? prev += curr.pop() : prev;
}, '');


console.log(topItems);
