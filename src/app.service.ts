import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { first } from 'rxjs';
import {
  Alphabet,
  ArraysEnum,
  ChoosePoints,
  RockPaperScissors,
} from 'utils/enum';

@Injectable()
export class AppService {
  constructor() {}
  fileParse(file: any) {
    const input = fs.readFileSync(file.path, 'utf8');
    const byLineInput = input.split('\n');
    let count = 0;
    let countSum = 0;
    console.log(byLineInput[0]);
    for (const i in byLineInput) {
      if (parseInt(i) > 0) {
        const prevSum =
          parseInt(byLineInput[parseInt(i) - 1]) +
          parseInt(byLineInput[parseInt(i)]) +
          parseInt(byLineInput[parseInt(i) + 1]);
        const sum =
          parseInt(byLineInput[parseInt(i)]) +
          parseInt(byLineInput[parseInt(i) + 1]) +
          parseInt(byLineInput[parseInt(i) + 2]);
        console.log(prevSum, ':', sum);
        if (sum > prevSum) {
          countSum++;
        }
        if (byLineInput[i] > byLineInput[parseInt(i) - 1]) {
          count++;
        }
      }
    }
    console.log(count);
    console.log(countSum);

    // // console.log(byLineInput);
    // byLineInput.forEach((element, index) => {
    //   // console.log(element);
    //   // console.log(index + 1);
    // });

    return input;
  }
  getHello(): string {
    return 'Working!';
  }

  async inputDay1(input: any) {
    const resultArray = [];
    let countingGroup = 0;
    let sum = 0;

    const newArray = [];
    console.log(input.input.split('\n'));
    const res = input.input.split('\n');
    for (const index in res) {
      if (res[index] !== '' && res[index] !== undefined) {
        newArray.push(Number(res[index]));
      } else {
        newArray.push(res[index]);
      }
    }
    console.log(newArray);

    for (const number in newArray) {
      if (newArray[number] !== '') {
        sum += Number(newArray[number]);
      } else {
        resultArray.push({ group: countingGroup, sum: sum });
        countingGroup++;
        sum = 0;
      }
    }
    console.log(resultArray);
    //Highest Group
    const highestGroup = resultArray.reduce((prev, current) =>
      prev.sum > current.sum ? prev : current,
    );
    console.log(highestGroup);
    //Order DESC
    resultArray.sort((a, b) => {
      return b.sum - a.sum;
    });
    console.log(resultArray);
  }

  async inputParseDay2(input) {
    let sum = 0;
    const firstArray: string[] = input.input.split('\n');
    const secondArray = [];

    for (const index in firstArray) {
      secondArray.push(firstArray[index].split(' '));
    }

    for (const index in secondArray) {
      sum += await this.calculatePointsRockPaperScissors(
        RockPaperScissors[secondArray[index][0]],
        RockPaperScissors[secondArray[index][1]],
      );
    }

    console.log(sum);
  }

  // 'Y' = 'PAPER',
  // 'X' = 'ROCK',
  // 'Z' = 'SCISSORS',
  // 'A' = 'ROCK',
  // 'B' = 'PAPER',
  // 'C' = 'SCISSORS',
  // //

  async recalculateMove(player1, myChoice2) {
    if (myChoice2 === 'ROCK') {
      if (player1 === 'ROCK') {
        return 'SCISSORS';
      } else if (player1 === 'PAPER') {
        return 'ROCK';
      } else if (player1 === 'SCISSORS') {
        return 'PAPER';
      }
    } else if (myChoice2 === 'PAPER') {
      return player1;
    } else if (myChoice2 === 'SCISSORS') {
      if (player1 === 'ROCK') {
        return 'PAPER';
      } else if (player1 === 'PAPER') {
        return 'SCISSORS';
      } else if (player1 === 'SCISSORS') {
        return 'ROCK';
      }
    }
  }

  async calculatePointsRockPaperScissors(player1, myChoice) {
    let numberResult = 0;
    // myChoice = await this.recalculateMove(player1, myChoice);
    const newChoice = await this.recalculateMove(player1, myChoice);
    if (player1 === newChoice) {
      numberResult = ChoosePoints[newChoice] + 3;
      return numberResult;
    } else if (player1 === 'ROCK' && newChoice === 'SCISSORS') {
      numberResult = ChoosePoints[newChoice] + 0;
      return numberResult;
    } else if (player1 === 'SCISSORS' && newChoice === 'ROCK') {
      numberResult = ChoosePoints[newChoice] + 6;
      return numberResult;
    } else if (player1 === 'PAPER' && newChoice === 'ROCK') {
      numberResult = ChoosePoints[newChoice] + 0;
      return numberResult;
    } else if (player1 === 'ROCK' && newChoice === 'PAPER') {
      numberResult = ChoosePoints[newChoice] + 6;
      return numberResult;
    } else if (player1 === 'SCISSORS' && newChoice === 'PAPER') {
      numberResult = ChoosePoints[newChoice] + 0;
      return numberResult;
    } else if (player1 === 'PAPER' && newChoice === 'SCISSORS') {
      numberResult = ChoosePoints[newChoice] + 6;
      return numberResult;
    }
  }

  async inputParseDay3(input) {
    const finalWordArray = [];
    const firstArray: any = input.input.split('\n');
    for (const index in firstArray) {
      const n = firstArray[index].length / 2;

      const compareArray = firstArray[index].match(
        new RegExp('.{1,' + n + '}', 'g'),
      );
      const middleArray = [];
      for (const word in compareArray[0]) {
        if (compareArray[1].includes(compareArray[0][word])) {
          //
          if (!middleArray.includes(compareArray[0][word])) {
            middleArray.push(compareArray[0][word]);
          }
        }
      }
      finalWordArray.push(middleArray[0]);
    }

    let sum = 0;
    for (const index in finalWordArray) {
      sum += Alphabet[finalWordArray[index]];
    }
    console.log('Part one:', sum);
    this.inputParseDay3Part2(input);
  }

  async inputParseDay3Part2(input) {
    const firstArray: any = input.input.split('\n');
    const perChunk = 3; // items per chunk

    const result = firstArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    const finalArray = [];
    for (const index in result) {
      const middleArray = [];
      for (const word in result[index][0]) {
        if (
          result[index][1].includes(result[index][0][word]) &&
          result[index][2].includes(result[index][0][word])
        ) {
          //
          if (!middleArray.includes(result[index][0][word])) {
            middleArray.push(result[index][0][word]);
          }
        }
      }
      console.log(middleArray);
      finalArray.push(middleArray[0]);
    }
    console.log(finalArray);
    let sum = 0;
    for (const index in finalArray) {
      sum += Alphabet[finalArray[index]];
    }
    console.log('Part two:', sum);
  }

  async inputParseDay4(input) {
    const firstArray = input.input.split('\n');

    let sum = 0;
    for (const index in firstArray) {
      // this.returnRangOf2Points(firstArray[index].split(','));
      let firstLetter;
      let secondLetter;
      let thirdLetter;
      let fourthLetter;
      console.log(firstArray[index].split(','));
      firstArray[index].split(',').forEach((element, index) => {
        if (index === 0) {
          firstLetter = Number(element.split('-')[0]);
          secondLetter = Number(element.split('-')[1]);
        } else if (index === 1) {
          thirdLetter = Number(element.split('-')[0]);

          fourthLetter = Number(element.split('-')[1]);
        }
      });

      console.log(firstLetter, secondLetter, thirdLetter, fourthLetter);

      if (
        (firstLetter >= thirdLetter && firstLetter <= fourthLetter) ||
        (secondLetter >= thirdLetter && secondLetter <= fourthLetter) ||
        (thirdLetter >= firstLetter && thirdLetter <= secondLetter) ||
        (fourthLetter >= firstLetter && fourthLetter <= secondLetter)
      ) {
        sum += 1;
      }
    }
    console.log(sum);
  }

  async inputParseDay5(input) {
    const firstArray = input.input.split('\n');

    let array_one = ['F', 'T', 'C', 'L', 'R', 'P', 'G', 'Q'];
    let array_two = ['N', 'Q', 'H', 'W', 'R', 'F', 'S', 'J'];
    let array_three = ['F', 'B', 'H', 'W', 'P', 'M', 'Q'];
    let array_four = ['V', 'S', 'T', 'D', 'F'];
    let array_five = ['Q', 'L', 'D', 'W', 'V', 'F', 'Z'];
    let array_six = ['Z', 'C', 'L', 'S'];
    let array_seven = ['Z', 'B', 'M', 'V', 'D', 'F'];
    let array_eight = ['T', 'J', 'B'];
    let array_nine = ['Q', 'N', 'B', 'G', 'L', 'S', 'P', 'H'];

    let objArray = {
      '1': array_one,
      '2': array_two,
      '3': array_three,
      '4': array_four,
      '5': array_five,
      '6': array_six,
      '7': array_seven,
      '8': array_eight,
      '9': array_nine,
    };

    for (const index in firstArray) {
      console.log(firstArray[index].split(' '));
      const array = firstArray[index].split(' ');
      //move N from//Remove reverse to part two
      const arrayToMove = objArray[array[3]].slice(-Number(array[1])).reverse();
      //remove N from
      objArray[array[3]].splice(-Number(array[1]));
      //Array to receive
      objArray[array[5]].push(...arrayToMove);
    }
    let finalWord = '';
    for (const key in objArray) {
      console.log(objArray[key].slice(-1).pop());

      finalWord += objArray[key].slice(-1).pop();
    }
    console.log(finalWord);
    // for (const [key, value] of Object.entries(objArray)) {
    //   console.log(`${key}: ${value}`);
    // }
  }

  inputParseDay6(input) {
    const firstArray = input.input.split('\n');
    let result = 0;
    firstArray.forEach((element, index) => {
      console.log(index);
      console.log(element.split(''));
      let state = true;
      for (let i = 0; i < element.length; i++) {
        if (element.slice(i, i + 4).length === 4) {
          console.log(element.slice(i, i + 4).split(''));
          const arrayToCompare = element.slice(i, i + 4).split('');
          //rturn false if there is a no  duplicate
          console.log(arrayToCompare.some((e, i, arr) => arr.indexOf(e) !== i));
          if (
            !arrayToCompare.some((e, i, arr) => arr.indexOf(e) !== i) &&
            state === true
          ) {
            state = false;
            result = i + 4;
          }
        }
      }
    });
    console.log(result);
  }

  inputParseDay7(input) {
    const firstArray = input.input.trim().split('\n');
    console.log(firstArray);
    console.log(this.createTree(firstArray));
    this.printTree(this.createTree(firstArray));

    //Parte 1
    // const thresholdSize = 100000;
    // const tree = this.createTree(firstArray);

    // // printTree(tree);

    // let sumSmallFolder = 0;

    // this.getSize(tree, (name, size) => {
    //   if (size < thresholdSize) {
    //     sumSmallFolder += size;
    //   }
    // });

    // console.log(sumSmallFolder);

    //parte 2
    const totalDiskSpace = 70000000;
    const requiredSpace = 30000000;

    const tree = this.createTree(firstArray);

    const usedSpace = this.getSize(tree);
    const availableSpace = totalDiskSpace - usedSpace;
    if (availableSpace > requiredSpace) {
      throw new Error('There is already enough space');
    }
    const minimumFolderSize = requiredSpace - availableSpace;

    const candidates = [];

    this.getSize(tree, (name, size) => {
      if (size >= minimumFolderSize) {
        candidates.push({
          name,
          size,
        });
      }
    });

    candidates.sort((a, b) => a.size - b.size);

    console.log(candidates[0].size);
  }

  createTree(lines) {
    const tree = {
      name: '/',
      isDirectory: true,
      children: [],
      parent: null,
    }; // node: name, isDirectory, size, children, parent

    let currentNode = tree;
    let currentCommand = null;

    for (const line of lines) {
      if (line[0] === '$') {
        // command
        const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);

        currentCommand = match.groups.command;

        if (currentCommand === 'cd') {
          const target = match.groups.arg;
          switch (target) {
            case '/':
              currentNode = tree;
              break;
            case '..':
              currentNode = currentNode.parent;
              break;
            default:
              currentNode = currentNode.children.find(
                (folder) => folder.isDirectory && folder.name === target,
              );
          }
        }
      } else {
        if (currentCommand === 'ls') {
          // For now, it's a file/directory from a 'ls' command
          const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
          if (fileMatch) {
            const node = {
              name: fileMatch.groups.name,
              size: parseInt(fileMatch.groups.size),
              isDirectory: false,
              parent: currentNode,
            };
            currentNode.children.push(node);
          }
          const dirMatch = /^dir (?<name>.+)$/.exec(line);
          if (dirMatch) {
            const node = {
              name: dirMatch.groups.name,
              isDirectory: true,
              children: [],
              parent: currentNode,
            };
            currentNode.children.push(node);
          }
        } else {
          throw new Error('unkown state');
        }
      }
    }

    return tree;
  }

  printTree(node, depth = 0) {
    console.log(
      `${' '.repeat(depth * 2)}- ${node.name} (${
        node.isDirectory ? 'dir' : `file, size=${node.size}`
      })`,
    );
    if (node.isDirectory) {
      for (const child of node.children) {
        this.printTree(child, depth + 1);
      }
    }
  }

  getSize(node, directoryCallback = (node, directorySize) => {}) {
    if (!node.isDirectory) {
      return node.size;
    }
    const directorySize = node.children
      .map((child) => this.getSize(child, directoryCallback))
      .reduce((a, b) => a + b, 0);

    directoryCallback(node.name, directorySize);

    return directorySize;
  }
}
