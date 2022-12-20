"use strict";
const fs = require('fs');
let totalSizeFound = 0;
class TreeNode {
    constructor(value, parent = null, isDir = false) {
        this.children = [];
        this.value = value;
        this.parent = parent;
        this.isDir = isDir;
        this.fileSize = 0;
    }
    addChild(node) {
        this.children.push(node);
    }
    setFileSize(size) {
        var _a;
        console.log("size: " + size);
        if (typeof size === 'string') {
            this.fileSize = parseInt(size);
        }
        else {
            this.fileSize = size;
        }
        if (this.isDir && ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.fileSize)) {
            this.parent.fileSize += this.fileSize;
        }
        console.log("filesize set: " + this.fileSize);
    }
    calcDirectorySize() {
        if (this.children.length <= 0) {
            this.setFileSize(0);
        }
        const totalSize = this.children.reduce((prev, curr) => prev + curr.fileSize, 0);
        this.setFileSize(totalSize);
        // console.log("setting dir size for " + this.value + ": " + totalSize + " " + this.fileSize);
    }
}
function calcAllDirSizes(curr) {
    if (!curr) {
        return;
    }
    curr.children.forEach(child => calcAllDirSizes(child));
    if (curr.isDir) {
        curr.calcDirectorySize();
        if (curr.fileSize < 100000) {
            totalSizeFound += curr.fileSize;
        }
    }
    return;
}
function findDirToDelete(root) {
    const possibleDirsToDelete = [];
    const spaceAvailable = 70000000 - root.fileSize;
    // BFS for fun
    const queue = [root];
    while (queue.length) {
        const curr = queue.shift();
        // console.log(curr.fileSize );
        if (curr.isDir && curr.fileSize + spaceAvailable >= 30000000) {
            possibleDirsToDelete.push(curr);
        }
        curr === null || curr === void 0 ? void 0 : curr.children.forEach(child => queue.push(child));
    }
    return possibleDirsToDelete.sort((a, b) => b.fileSize - a.fileSize);
}
function createFileTree() {
    var _a;
    const rootNode = new TreeNode('/', null, true);
    const output = readFileLines();
    const commands = createCommandArray(output);
    runCommands(commands, rootNode);
    console.log(rootNode);
    console.log("Total Size: " + totalSizeFound);
    calcAllDirSizes(rootNode);
    // For Part 1
    // console.log(totalSizeFound);
    const possibleDirsToDelete = findDirToDelete(rootNode);
    console.log((_a = possibleDirsToDelete.pop()) === null || _a === void 0 ? void 0 : _a.fileSize);
}
function runCommands(commands, rootNode) {
    let currNode = rootNode;
    commands.forEach(input => {
        console.log("Running command: " + input);
        const [command, arg] = input[0].split(' ').slice(1);
        // remove command from input list
        console.log(command, arg);
        input.shift();
        // handle change dir
        if (command === 'ls') {
            listDirectory(input, currNode);
        }
        if (command === 'cd') {
            if (arg === '/') {
                currNode = rootNode;
            }
            else {
                currNode = changeDirectory(arg, currNode);
            }
        }
    });
}
// kinda gross need to refactor - but works
function createCommandArray(output) {
    let cmds = [];
    output.forEach(ln => {
        if (ln.includes('$')) {
            let newCmd = [ln];
            cmds.push(newCmd);
        }
        else {
            cmds.length > 0 && cmds[cmds.length - 1].push(ln);
        }
    });
    return cmds;
}
function readFileLines() {
    const file = fs.readFileSync('./input.txt', 'utf8');
    return file.split('\n');
}
function changeDirectory(input, currentNode) {
    console.log(input);
    if (input === '..') {
        if (currentNode.parent === null) {
            throw "Parent Missing";
        }
        return currentNode.parent;
    }
    else {
        const newDir = currentNode.children.find(node => node.value === input);
        if (newDir) {
            return newDir;
        }
        throw "error";
    }
}
function listDirectory(fileList, currentNode) {
    fileList.forEach(file => {
        const [info, name] = file.split(' ');
        if (info === 'dir') {
            const newDir = new TreeNode(name, currentNode, true);
            currentNode.addChild(newDir);
        }
        else {
            if (info.length) {
                const newFile = new TreeNode(name, currentNode);
                newFile.setFileSize(info);
                currentNode.addChild(newFile);
            }
        }
    });
}
createFileTree();
