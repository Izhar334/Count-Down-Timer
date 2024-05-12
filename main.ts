#! /usr/bin/env node
import inqirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";

console.log(chalk.bold.blue.italic("<<<", "-".repeat(60), ">>>"));
console.log(
  chalk.bold.yellow.italic("\n\tWell-Come to 'Izhar': Count-Down-Timer\t\n")
);
console.log(chalk.bold.blue.italic("<<<", "-".repeat(60), ">>>"));

const res = await inqirer.prompt([
  {
    name: "input",
    type: "number",
    message: "Enter the amount of seconds under 60",
    validate: (input) => {
      if (isNaN(input)) {
        return chalk.bold.red("Please Enter a Valid Number");
      } else if (input > 60) {
        return chalk.bold.red("Seconds must be in 60 Seconds");
      } else {
        return true;
      }
    },
  },
]);
let input = res.input;

const setTimer = (val: number) => {
  const intialTimer = new Date().setSeconds(new Date().getSeconds() + val);
  const interalTimer = new Date(intialTimer);
  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(interalTimer, currentTime);
    if (timeDiff <= 0) {
      console.log(chalk.yellowBright.bold.bgCyanBright("Time's Up!"));
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(
      `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    );
  }, 1000);
};
setTimer(input);
