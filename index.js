var prompt = require("prompt");

const schema = {
  properties: {
    frequency: {
      description: "Percentage of days to commit (1-100)",
      type: "number",
      default: 80,
      required: true,
      message: "Please enter a number between 1 and 100",
      conform: function (value) {
        return value >= 1 && value <= 100;
      },
    },
    maxCommits: {
      description: "Maximum number of commits per day (1-20)",
      type: "number",
      default: 10,
      required: true,
      message: "Please enter a number between 1 and 20",
      conform: function (value) {
        return value >= 1 && value <= 20;
      },
    },
    daysBefore: {
      description: "Number of days before current date",
      type: "number",
      default: 365,
      required: true,
      message: "Please enter a number greater than 0",
      conform: function (value) {
        return value > 0;
      },
    },
    noWeekends: {
      description: "Avoid weekends (yes/no)",
      type: "string",
      default: "yes",
      required: true,
      message: "Please enter yes or no",
      conform: function (value) {
        return value === "yes" || value === "no";
      },
    },
  },
};

async function start() {
  // start the prompt
  prompt.start();

  // get the user input
  const { frequency, maxCommits, daysBefore, noWeekends } = await prompt.get(schema);
}

start();
