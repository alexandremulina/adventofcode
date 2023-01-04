import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { ChoosePoints, RockPaperScissors } from 'utils/enum';

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
    const firstArray: string[] = input.input.split('\n');
    for (const index in firstArray) {
      console.log(firstArray[index].length);
    }
  }
}
