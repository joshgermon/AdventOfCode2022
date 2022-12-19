const fs = require( 'fs' );

let totalSizeFound = 0;

class TreeNode {
    children: TreeNode[];
    value: string;
    isDir: boolean;
    parent: TreeNode | null;
    fileSize: number | null;
    constructor(value: string, parent: TreeNode | null = null, isDir: boolean = false) {
        this.children = [];
        this.value = value;
        this.parent = parent;
        this.isDir = isDir;
        this.fileSize = null;
    }
    addChild(node: TreeNode) {
        this.children.push(node);
    }
    setFileSize(size: string | number) {
        if(typeof size === 'string') {
            this.fileSize = parseInt(size);
        }else {
            this.fileSize = size;
        }
    }
    getTotalSize() {
        if(this.children.length <= 0) {
            return 0;
        }
        return this.children.reduce((prev, curr) => curr.fileSize ? prev + curr.fileSize : prev, 0);
    }
}

function createFileTree() {
    const rootNode = new TreeNode('/', null, true);
    const output = readFileLines();
    const commands = createCommandArray(output);
    runCommands(commands, rootNode);
    console.log(rootNode);
    console.log("Total Size: " + totalSizeFound);
}

// function getSizeOfAllDirectories(rootNode: TreeNode) {
//     if(rootNode.children) {
//
//     }
// }

function runCommands(commands: string[][], rootNode: TreeNode) {
    let currNode = rootNode;
    commands.forEach(input => {
        console.log("Running command: " + input);
        const [command, arg] = input[0].split(' ').slice(1);
        // remove command from input list
        console.log(command, arg);
        input.shift();
        // handle change dir
        if(command === 'ls') {
            listDirectory(input, currNode);
        }
        if(command === 'cd') {
            if(arg === '/') {
                currNode = rootNode;
            }else {
                currNode = changeDirectory(arg, currNode);
            }
        }
    });
}

// kinda gross need to refactor - but works
function createCommandArray(output: string[]) {
    let cmds: string[][] = [];
    output.forEach(ln => {
        if(ln.includes('$')) {
            let newCmd = [ln];
            cmds.push(newCmd);
        }else {
            cmds.length > 0 && cmds[cmds.length - 1].push(ln);
        }
    });
    return cmds;
}

function readFileLines() {
    const file = fs.readFileSync('./test.txt', 'utf8');
    return file.split('\n');
}

function changeDirectory(input: string, currentNode: TreeNode): TreeNode {
    console.log(input);
    if(input === '..') {
        if(currentNode.parent === null) { throw "Parent Missing"; }
        return currentNode.parent;
    }else {
        const newDir = currentNode.children.find(node => node.value === input);
        if(newDir) {
            return newDir;
        }
        throw "error";
    }
}

function listDirectory(fileList: string[], currentNode: TreeNode) {
    let dirFileSize = 0;
    fileList.forEach(file => {
        const [info, name] = file.split(' ');
        if(info === 'dir') {
            const newDir = new TreeNode(name, currentNode, true);
            currentNode.addChild(newDir);
        }else {
            const newFile = new TreeNode(name, currentNode);
            newFile.setFileSize(info);
            currentNode.addChild(newFile);
            console.log(newFile);
            if(newFile.fileSize) {
              dirFileSize += newFile.fileSize;
            console.log(dirFileSize, totalSizeFound, newFile.value);
            }
        }
    });
    if( dirFileSize <= 100000) {
        console.log(dirFileSize + ' is less');
        totalSizeFound = totalSizeFound + dirFileSize;
    }
}

createFileTree();
