"use strict";

const filePath = "./import.txt";

const fs = require("fs");
const readLine = require("readline");
const rlSync = require("readline-sync");

class Ingredient {
  constructor(id, name, unitOfMeasurement, availability, allergy) {
    this.id = id;
    this.name = name;
    this.unitOfMeasurement = unitOfMeasurement;
    this.availability = availability;
    this.allergy = allergy;
  }
}

let dbData = [new Ingredient(1, "Aardappel", "kg", 0.5, "none"),
  new Ingredient(2, "Witte broodjes", "st", 15, "gluten"),
  new Ingredient(3, "Mayonnaise", "ml", 600, "none")];

const ingredients = JSON.parse(JSON.stringify(dbData));

const fileLines = [];
const messages = [];

console.log("Initial situation: \n");
console.log(ingredients);
console.log("\n");

function ask(questionForUser) {
  return rlSync.question(questionForUser);
}

function printIds() {
  let output = "";

  for (let i = 0; i < ingredients.length; i++) {
    const currentIngr = ingredients[i];

    output += "\n" + currentIngr.id + " - " + currentIngr.name;
  }

  console.log(output);
}

function manualMatch(name) {
  printIds();
  const answer = ask("No match found for \"" + name + "\". Please input id for ingredient manually, or hit enter to skip: ");

  return Number(answer);
}

function matchToIngredient(name) {
  for (let i = 0; i < ingredients.length; i++) {
    const currentIngr = ingredients[i];

    if (name.toLowerCase() === currentIngr.name.toLowerCase()) {
      return currentIngr.id;
    }
  }

  return manualMatch(name);
}

function handleLine(line) {
  const segments = line.split(" ");

  let amount, unit, name;

  amount = Number(segments[0]);
  unit = segments[1];
  name = segments[2];

  // Compatibility for if ingredient name consists of more than 1 word
  if (segments.length > 2) {
    for (let i = 3; i < segments.length; i++) {
      name += String(" " + segments[i]);
    }
  }

  const matchedIngredient = matchToIngredient(name);

  if (matchedIngredient) {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].id === matchedIngredient) {
        const selectedIngr = ingredients[i];

        if (selectedIngr.unitOfMeasurement.toLowerCase() != unit.toLowerCase()) {
          const answer = ask("Error: Unit \"" + unit + "\" of \"" + line + "\" doesn't match unit \"" + selectedIngr.unitOfMeasurement + "\" in database. Please enter amount in " + selectedIngr.unitOfMeasurement + " or press enter to skip: ");
          if (answer == "") {
            console.log("Skipping line " + line);
            return;
          }

          amount = answer;
        }

        selectedIngr.availability += Number(amount);

        const message = "Modified: Added " + amount + " " + selectedIngr.unitOfMeasurement + " to " + name + ". We now have " + selectedIngr.availability + " " + selectedIngr.unitOfMeasurement + " of " + name;
        console.log(message);
        messages.push(message);
      }
    }
  } else {
    console.log("Skipping line " + line);
  }
}

function commitChanges() {
  console.log("\n");

  for (let i = 0; i < messages.length; i++) {
    console.log(messages[i]);
  }

  const response = ask("Do you want to save the above changes? Enter y to save or enter to discard: ");

  if (response.toLowerCase() == "y") {
    console.log("Saving changes...");
    dbData = ingredients;
  } else {
    console.log("Changes discarded");
  }
}

const rl = readLine.createInterface({
  input: fs.createReadStream(filePath)
});

rl.on("line", function(line) {
  fileLines.push(line);
});

rl.on("close", function() {
  for (let i = 0; i < fileLines.length; i++) {
    handleLine(fileLines[i]);
  }

  commitChanges();

  console.log("\nFinal situation: \n");
  console.log(dbData);
});
