import chalk from "chalk";
import prompts from "prompts";
import { randomInt } from "node:crypto";
import fs from "node:fs";

let output = [];

function display(message, color = "white")
{
    console.log(chalk[color](message));
    output.push(message);
}

display("GUESS THE NUMBER!", "magenta");
display("Guess a number between 1 and 10.", "white");
display("You have 3 attempts!", "yellow");

const secretNumber = randomInt(1, 11);
const maxAttempts = 3;

let attempts = 0;
let won = false;

while (attempts < maxAttempts) 
    {
    const response = await prompts({
        type: "text",
        name: "guess",
        message: `Attempt ${attempts + 1}/${maxAttempts}: Enter your guess:`
    });

    try {
        const input = response.guess;
        output.push(`Attempt ${attempts + 1}/${maxAttempts}: Enter your guess: ${input ?? ""}`);


        if (input === undefined || input.trim() === "")
        {
            throw new Error("Input cannot be empty");
        }

        const guess = Number(input);

        if (!Number.isInteger(guess)) 
        {
            throw new Error("Please enter a valid number");
        }

        if (guess <= 0) 
        {
            throw new Error("Number must be greater than zero");
        }

        if (guess > 10) 
        {
            throw new Error("Number cannot be greater than 10");
        }

        attempts++;

        if (guess === secretNumber)
        {
            display("YAY!! You guessed correctly!", "green");
            won = true;
            break;
        } else if (guess < secretNumber) 
        {
            display("Too low!", "yellow");
        } else 
        {
            display("Too high!", "yellow");
        }

    } catch (error) 
    {
        display(error.message, "red");
    }
}

if (!won) 
{
    display(`Game over! The number was ${secretNumber}.`, "magenta");
}

display("Game output saved to game-output.txt", "blue");
fs.writeFileSync("game-output.txt", output.join("\n"));
