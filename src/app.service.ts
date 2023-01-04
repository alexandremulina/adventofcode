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
    // this.calculatePointsRockPaperScissors(
    //   RockPaperScissors[secondArray[1][0]],
    //   RockPaperScissors[secondArray[1][1]],
    // );
    console.log(sum);
  }

  async calculatePointsRockPaperScissors(player1, myChoice) {
    let numberResult = 0;
    console.log(player1, myChoice);
    if (player1 === myChoice) {
      numberResult = ChoosePoints[myChoice] + 3;
      return numberResult;
    } else if (player1 === 'ROCK' && myChoice === 'SCISSORS') {
      numberResult = ChoosePoints[myChoice] + 0;
      return numberResult;
    } else if (player1 === 'SCISSORS' && myChoice === 'ROCK') {
      numberResult = ChoosePoints[myChoice] + 6;
      return numberResult;
    } else if (player1 === 'PAPER' && myChoice === 'ROCK') {
      numberResult = ChoosePoints[myChoice] + 0;
      return numberResult;
    } else if (player1 === 'ROCK' && myChoice === 'PAPER') {
      numberResult = ChoosePoints[myChoice] + 6;
      return numberResult;
    } else if (player1 === 'SCISSORS' && myChoice === 'PAPER') {
      numberResult = ChoosePoints[myChoice] + 0;
      return numberResult;
    } else if (player1 === 'PAPER' && myChoice === 'SCISSORS') {
      numberResult = ChoosePoints[myChoice] + 6;
      return numberResult;
    }
  }
}
