
import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "node:crypto";

console.log(chalk.blue("GUESS THE NUMBER!"));
console.log(chalk.yellow("Guess a number between 1 and 10."));
console.log(chalk.yellow("You have 3 attempts"));

const secretNumber = randomInt(1, 11);

const maxAttempts = 3;

const response = await prompts({
    type: "text",
    name: "guess",
    message: "Enter a number between 1 and 10:"
});

console.log("You entered:", response.guess);