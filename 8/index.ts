import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8');

const grid = input.split('\n').map(row => row.split(''));
grid.pop();

const seenTrees: string[] = [];
// console.log(grid);

function visibleTrees() {
    let visibleTreeCount = 0;
    visibleTreeCount += treesLeft(grid);
    visibleTreeCount += treesRight(grid);
    visibleTreeCount += treesDown(grid);
    visibleTreeCount += treesUp(grid);
    console.log(visibleTreeCount);
}

function treesLeft(grid: string[][]) {
    let visibleTreeCount = 0;
    for(let y = 0; y < grid.length; y++) {
        let tallestTree = -1;
        for(let x = 0; x < grid[y].length; x++) {
            const currTree = parseInt(grid[y][x]);
            if(tallestTree < currTree) {
                tallestTree = currTree;
                if(treeSighting(x, y)) {
                    visibleTreeCount++;
                }
            }
        }
    }
    return visibleTreeCount;
}

function treesRight(grid: string[][]) {
    let visibleTreeCount = 0;
    for(let y = 0; y < grid.length; y++) {
        let tallestTree = -1;
        for(let x = grid[y].length-1; x >= 0; x--) {
            const currTree = parseInt(grid[y][x]);
            if(tallestTree < currTree) {
                tallestTree = currTree;
                if(treeSighting(x, y)) {
                    visibleTreeCount++;
                }
            }
        }
    }
    return visibleTreeCount;
}


function treesDown(grid: string[][]) {
    let visibleTreeCount = 0;
    for(let x = 0; x < grid[0].length; x++) {
        let tallestTree = -1;
        for(let y = 0; y < grid.length; y++) {
            const currTree = parseInt(grid[y][x]);
            if(tallestTree < currTree) {
                tallestTree = currTree;
                if(treeSighting(x, y)) {
                    visibleTreeCount++;
                }
            }
        }
    }
    return visibleTreeCount;
}

function treesUp(grid: string[][]) {
    let visibleTreeCount = 0;
    for(let x = 0; x < grid[0].length; x++) {
        let tallestTree = -1;
        for(let y = grid.length-1; y >= 0; y--) {
            const currTree = parseInt(grid[y][x]);
            if(tallestTree < currTree) {
                tallestTree = currTree;
                if(treeSighting(x, y)) {
                    visibleTreeCount++;
                }
            }
        }
    }
    return visibleTreeCount;
}
function treeSighting(x: number, y: number): boolean {
    const coords = `x${x}y${y}`;
    if(!seenTrees.includes(coords)) {
        seenTrees.push(coords);
        return true;
    }
    return false;
}

console.log(grid);

visibleTrees();

// 11 visible from left in test
//

// function treesByRow(grid: string[][], direction: "left" | "right") {
//     let visibleTreeCount = 0;
//     const treeGrid = direction === 'left' ? grid : grid.map(row => row.reverse());
//     for(const [y, row] of treeGrid.entries()) {
//         let tallestTree = -1;
//         for(const [x, tree] of row.entries()) {
//             const currTree = parseInt(tree);
//             console.log(`x: ${x+1}, y: ${y+1}, curr: ${currTree}, tt: ${tallestTree}`);
//             if(tallestTree < currTree) {
//                 tallestTree = currTree;
//                 if(treeSighting(x, y)) {
//                     visibleTreeCount++;
//                 }
//             }
//             // console.log(`currRow: ${i}, ttree: ${tallestTree}, currTree: ${currTree}, total: ${visibleTreeCount}`);
//         }
//     }
//     if(direction === "right") {
//         grid = treeGrid.map(row => row.reverse());
//     }
//     console.log(direction);
//     console.log(grid);
//     return visibleTreeCount;
// }

// function treesByCol(grid: string[][], direction: "up" | "down") {
//     let visibleTreeCount = 0;
//     const treeGrid = direction === "down" ? grid : grid.reverse();
//     for(let x = 0; x < treeGrid[0].length; x++) {
//         let tallestTree = -1;
//         for(let y = 0; y < treeGrid.length; y++) {
//             const currTree = parseInt(treeGrid[y][x]);
//             console.log(`x: ${x+1}, y: ${y+1}, curr: ${currTree}, tt: ${tallestTree}`);
//             if(tallestTree < currTree) {
//                 tallestTree = currTree;
//                 if(treeSighting(x, y)) {
//                     visibleTreeCount++;
//                 }
//             }
//         }
//     }
//     if(direction === "up") {
//         grid = treeGrid.reverse();
//     }
//     console.log(direction);
//     console.log(grid);
//     return visibleTreeCount;
// }
//
