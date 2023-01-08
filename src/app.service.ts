import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { first } from 'rxjs';
import { Alphabet, ChoosePoints, RockPaperScissors } from 'utils/enum';

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

      // firstLetter = Number(firstArray[index].split(',')[0].slice(0, 1));
      // secondLetter = Number(firstArray[index].split(',')[0].slice(2, 4));
      // thirdLetter = Number(firstArray[index].split(',')[1].slice(0, 1));
      // fourthLetter = Number(firstArray[index].split(',')[1].slice(2, 4));
      //TO DO FIX
      console.log(firstLetter, secondLetter, thirdLetter, fourthLetter);
      // if (
      //   // (firstLetter >= thirdLetter && secondLetter <= fourthLetter) ||
      //   firstLetter < thirdLetter &&
      //   secondLetter > fourthLetter
      // ) {
      //   console.log('Pair inside: ', firstArray[index].split(','));
      //   sum += 1;
      // }
      // if (firstLetter > thirdLetter && secondLetter < fourthLetter) {
      //   console.log('Pair inside: ', firstArray[index].split(','));
      //   sum += 1;
      // }
      // if (firstLetter === thirdLetter || secondLetter === fourthLetter) {
      //   console.log('Pair inside: ', firstArray[index].split(','));
      //   sum += 1;
      // }
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
    // for (let i = 0; i < firstArray.length; i += 2) {
    //   console.log(firstArray[i].split(','));
    //   // this.returnRangOf2Points(firstArray[i].split(','));
    // }
  }

  async inputParseDay5(input) {
    const firstArray = input.input.split('\n');
    console.log(firstArray);

    // const array_one = ['F', 'T', 'C', 'L', 'R', 'P', 'G', 'Q'];
    // const array_two = ['N', 'Q', 'H', 'W', 'R', 'F', 'S', 'J'];
    // const awway_three = ['F', 'B', 'H', 'W', 'P', 'M', 'Q'];
    const exemple_one = ['N', 'Z'];
    const exemple_two = ['D', 'C', 'M'];
    const exemple_three = ['P'];
  }
}
