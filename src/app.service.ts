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

    // let array_one = ['F', 'T', 'C', 'L', 'R', 'P', 'G', 'Q'];
    // let array_two = ['N', 'Q', 'H', 'W', 'R', 'F', 'S', 'J'];
    // let awway_three = ['F', 'B', 'H', 'W', 'P', 'M', 'Q'];
    // let array_four = ['V', 'S', 'T', 'D', 'F'];
    // let array_five = ['Q', 'L', 'D', 'W', 'V', 'F', 'Z'];
    // let array_six = ['Z', 'C', 'L', 'S'];
    // let array_seven = ['Z', 'B', 'M', 'V', 'D', 'F'];
    // let array_eight = ['T', 'J', 'B'];
    // let array_nine = ['Q', 'N', 'B', 'G', 'L', 'S', 'P', 'H'];

    // let array_one: any = ['Z', 'N'];
    // let array_two: any = ['M', 'C', 'D'];
    // let awway_three: any = ['P'];
    // let array_four = [];
    // let array_five = [];
    // let array_six = [];
    // let array_seven = [];
    // let array_eight = [];
    // let array_nine = [];

    // firstArray.forEach(async (element) => {
    //   [
    //     array_one,
    //     array_two,
    //     awway_three,
    //     array_four,
    //     array_five,
    //     array_six,
    //     array_seven,
    //     array_eight,
    //     array_nine,
    //   ] = this.updateArrays(
    //     array_one,
    //     array_two,
    //     awway_three,
    //     array_four,
    //     array_five,
    //     array_six,
    //     array_seven,
    //     array_eight,
    //     array_nine,
    //     element.split(' '),
    //   );
    // });

    // const result =
    //   array_one.slice(-1).pop() +
    //   array_two.slice(-1).pop() +
    //   awway_three.slice(-1).pop() +
    //   array_four.slice(-1).pop() +
    //   array_five.slice(-1).pop() +
    //   array_six.slice(-1).pop() +
    //   array_seven.slice(-1).pop() +
    //   array_eight.slice(-1).pop() +
    //   array_nine.slice(-1).pop();

    // console.log(result);
  }

  updateArrays(
    array_one,
    array_two,
    array_three,
    array_four,
    array_five,
    array_six,
    array_seven,
    array_eight,
    array_nine,
    element,
  ) {
    console.log(
      'ANTES 1:',
      array_one,
      'ANTES 2:',
      array_two,
      'ANTES 3:',
      array_three,
      'ANTES 4:',
      array_four,
      'ANTES 5:',
      array_five,
      'ANTES 6:',
      array_six,
      'ANTES 7:',
      array_seven,
      'ANTES 8:',
      array_eight,
      'ANTES 9:',
      array_nine,
    );
    // let arrOne = array_one;
    // let arrTwo = array_two;
    // let arrThree = array_three;
    // console.log(element);
    console.log(element);
    const numberOfSlotstoMove = Number(element[1]);

    // const from = Number(element[3]);
    // const to = Number(element[5]);
    // const crater = array_two.slice(-1).pop();
    // console.log(crater);
    // console.log(array_two);
    // console.log(ArraysEnum['1']);
    // if (ArraysEnum[from].length > numberOfSlotstoMove) {
    //   console.log(Ar)
    // }

    //Array that will be moved
    switch (element[3]) {
      case '1':
        if (array_one.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_one.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_one.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_one.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_one.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_one.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_one.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_one.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_one.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_one.slice(-1).pop());
              default:
                break;
            }
            array_one.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_one.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_one.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_one.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_one.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_one.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_one.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_one.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_one.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_one.reverse()];
              break;

            default:
              break;
          }

          array_one = [];
        }
        break;
      case '2':
        // console.log('array one antes:', array_one);
        // console.log('array two antes:', array_two);
        if (array_two.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_two.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_two.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_two.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_two.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_two.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_two.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_two.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_two.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_two.slice(-1).pop());
                break;
              default:
                break;
            }
            array_two.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_two.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_two.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_two.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_two.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_two.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_two.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_two.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_two.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_two.reverse()];
              break;

            default:
              break;
          }

          array_two = [];
        }
        break;
      case '3':
        if (array_three.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_three.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_three.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_three.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_three.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_three.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_three.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_three.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_three.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_three.slice(-1).pop());
              default:
                break;
            }
            array_three.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_three.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_three.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_three.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_three.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_three.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_three.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_three.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_three.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_three.reverse()];
              break;

            default:
              break;
          }

          array_three = [];
        }
        break;
      case '4':
        if (array_four.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_four.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_four.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_four.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_four.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_four.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_four.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_four.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_four.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_four.slice(-1).pop());
                break;
              default:
                break;
            }
            array_four.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_four.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_four.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_four.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_four.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_four.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_four.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_four.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_four.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_four.reverse()];
              break;

            default:
              break;
          }

          array_four = [];
        }
        break;
      case '5':
        if (array_five.length > numberOfSlotstoMove) {
          console.log(array_five);
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_five.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_five.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_five.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_five.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_five.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_five.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_five.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_five.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_five.slice(-1).pop());
                break;
            }
            array_five.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_five.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_five.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_five.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_five.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_five.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_five.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_five.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_five.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_five.reverse()];
              break;

            default:
              break;
          }

          array_five = [];
        }
        break;
      case '6':
        if (array_six.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_six.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_six.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_six.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_six.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_six.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_six.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_six.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_six.slice(-1).pop());
                break;
              case '9':
              default:
                break;
            }
            array_six.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_six.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_six.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_six.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_six.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_six.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_six.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_six.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_six.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_six.reverse()];
              break;

            default:
              break;
          }

          array_six = [];
        }
        break;

      case '7':
        if (array_seven.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_seven.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_seven.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_seven.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_seven.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_seven.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_seven.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_seven.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_seven.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_seven.slice(-1).pop());
                break;
              default:
                break;
            }
            array_seven.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_seven.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_seven.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_seven.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_seven.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_seven.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_seven.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_seven.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_seven.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_seven.reverse()];
              break;

            default:
              break;
          }

          array_seven = [];
        }
        break;
      case '8':
        if (array_eight.length > numberOfSlotstoMove) {
          for (let i = 0; i < numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_eight.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_eight.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_eight.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_eight.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_eight.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_eight.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_eight.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_eight.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_eight.slice(-1).pop());
              default:
                break;
            }
            array_eight.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_eight.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_eight.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_eight.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_eight.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_eight.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_eight.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_eight.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_eight.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_eight.reverse()];
              break;

            default:
              break;
          }

          array_eight = [];
        }
        break;
      case '9':
        if (array_nine.length > numberOfSlotstoMove) {
          for (let i = 0; i <= numberOfSlotstoMove; i++) {
            switch (element[5]) {
              case '1':
                array_one.push(array_nine.slice(-1).pop());
                break;
              case '2':
                array_two.push(array_nine.slice(-1).pop());
                break;
              case '3':
                array_three.push(array_nine.slice(-1).pop());
                break;
              case '4':
                array_four.push(array_nine.slice(-1).pop());
                break;
              case '5':
                array_five.push(array_nine.slice(-1).pop());
                break;
              case '6':
                array_six.push(array_nine.slice(-1).pop());
                break;
              case '7':
                array_seven.push(array_nine.slice(-1).pop());
                break;
              case '8':
                array_eight.push(array_nine.slice(-1).pop());
                break;
              case '9':
                array_nine.push(array_nine.slice(-1).pop());
                break;
              default:
                break;
            }
            array_nine.pop();
          }
        } else {
          switch (element[5]) {
            case '1':
              array_one = [...array_one, ...array_nine.reverse()];
              break;
            case '2':
              array_two = [...array_two, ...array_nine.reverse()];
              break;
            case '3':
              array_three = [...array_three, ...array_nine.reverse()];
              break;
            case '4':
              array_four = [...array_four, ...array_nine.reverse()];
              break;
            case '5':
              array_five = [...array_five, ...array_nine.reverse()];
              break;
            case '6':
              array_six = [...array_six, ...array_nine.reverse()];
              break;
            case '7':
              array_seven = [...array_seven, ...array_nine.reverse()];
              break;
            case '8':
              array_eight = [...array_eight, ...array_nine.reverse()];
              break;
            case '9':
              array_nine = [...array_nine, ...array_nine.reverse()];
              break;

            default:
              break;
          }

          array_nine = [];
        }
        break;

      default:
        break;
    }
    console.log(
      '1:',
      array_one,
      '2:',
      array_two,
      '3:',
      array_three,
      '4:',
      array_four,
      '5:',
      array_five,
      '6:',
      array_six,
      '7:',
      array_seven,
      '8:',
      array_eight,
      '9:',
      array_nine,
    );

    return [
      array_one,
      array_two,
      array_three,
      array_four,
      array_five,
      array_six,
      array_seven,
      array_eight,
      array_nine,
    ];
  }
}
