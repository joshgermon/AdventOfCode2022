const textFile = await Deno.readTextFile("./calories.txt");
const listOfAllItemsCals = textFile.split('\n\n');
const mapOfElfsItems = listOfAllItemsCals.map(items => items.split('\n'))
const totalOfEachElfsItems = mapOfElfsItems.map(items => items.reduce((prev, curr) => (BigInt(prev) + BigInt(curr)).toString()), 0).sort((a,b)=>a<b?-1:(a>b?1:0));
Deno.writeTextFileSync('./output.txt', totalOfEachElfsItems)

console.log(totalOfEachElfsItems);