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
        if(this.isDir && this.parent?.fileSize) {
            this.parent.fileSize += this.fileSize;
        }
        console.log("filesize set: " + this.fileSize);
    }
    calcDirectorySize() {
        if(this.children.length <= 0) {
            this.setFileSize(0);
        }
        const totalSize = this.children.reduce((prev, curr) => curr.fileSize ? prev + curr.fileSize : prev, 0);
        this.setFileSize(totalSize);
        // console.log("setting dir size for " + this.value + ": " + totalSize + " " + this.fileSize);
    }
}

function calcAllDirSizes(curr: TreeNode) {
    if(!curr) { return }

    curr.children.forEach(child => calcAllDirSizes(child));

    if(curr.isDir) {
        curr.calcDirectorySize();
        if(curr.fileSize && curr.fileSize < 100000) {
            totalSizeFound += curr.fileSize;
        }
    }

    return;
}


function createFileTree() {
    const rootNode = new TreeNode('/', null, true);
    const output = readFileLines();
    const commands = createCommandArray(output);
    runCommands(commands, rootNode);
    console.log(rootNode);
    console.log("Total Size: " + totalSizeFound);
    calcAllDirSizes(rootNode);
    console.log(totalSizeFound);
}

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
    const file = fs.readFileSync('./input.txt', 'utf8');
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
    fileList.forEach(file => {
        const [info, name] = file.split(' ');
        if(info === 'dir') {
            const newDir = new TreeNode(name, currentNode, true);
            currentNode.addChild(newDir);
        }else {
            const newFile = new TreeNode(name, currentNode);
            newFile.setFileSize(info);
            currentNode.addChild(newFile);
        }
    });
}

createFileTree();
