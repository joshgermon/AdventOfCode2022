const text = await Deno.readTextFile("./input.txt");

const rps = {
  A: 0, // rock
  B: 1, // paper
  C: 2, // sc
  X: 0, // rock
  Y: 1, // paper
  Z: 2, // scissors
}

const result = {
  X: "loss",
  Y: "draw",
  Z: "win"
}

const games = text.split('\n');

const scoresOfGames = games.map(game => {
  const [cpu, me] = game.split(' ');
  return getWinner(rps[cpu], findRightShape(rps[cpu], result[me]));
});

const total = scoresOfGames.reduce((prev, curr, acc) => prev + curr, 0);

console.log(total)

console.log(scoresOfGames);

function getWinner(cpu: number, me: number): number {
  console.log(`cpu: ${cpu}`);
  console.log(`me: ${me}`);

  if((cpu+1) % 3 === me) {
    return me+7;
  }else if(cpu === me) {
    return me + 4;
  }else {
    return me+1;
  }
}

function findRightShape(cpu: number, res: string): number | null {
  console.log(cpu, res)
  if(res === "win") {
    if(cpu === 0) {
      return 1;
    }else if(cpu === 1) {
      return 2
    }else if(cpu === 2) {
      return 0;
    }
  }else if(res === "loss") {
    if(cpu === 0) {
      return 2;
    }else if(cpu === 1) {
      return 0
    }else if(cpu === 2) {
      return 1;
    }
  }else {
    return cpu;
  }
  return null;
}