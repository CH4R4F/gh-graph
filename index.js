const fs = require("fs").promises;
const prompt = require("prompt");
const { runCommand, getContributionsPerDay, contribute } = require("./utils/helpers");

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
  try {
    // start the prompt
    prompt.start();

    // get the user input
    const { frequency, maxCommits, daysBefore, noWeekends } = await prompt.get(schema);

    const currentDate = new Date();
    const directory = `commits-${currentDate.getTime()}`;

    // create a new directory
    await fs.mkdir(directory, { recursive: true });

    // change the current working directory
    process.chdir(directory);

    // initialize the git repository
    await runCommand("git init -b main");
    await runCommand("git config gc.auto 0");

    // calculate date range
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - daysBefore);
    startDate.setHours(20, 0, 0, 0); // 8:00 PM

    const totalDays = daysBefore;

    // generate commits
    for (let i = 0; i <= totalDays; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);

      // skip weekends if the user chooses to
      if (noWeekends === "yes" && (currentDay.getDay() === 0 || currentDay.getDay() === 6)) {
        continue;
      }

      // not accurate to the percentage FR
      // TODO: implement the percentage of days to commit
      if (Math.random() * 100 < frequency) {
        // get the number of commits for the current day
        const commitsToday = getContributionsPerDay(maxCommits);

        // generate commits for the current day
        for (let j = 0; j < commitsToday; j++) {
          const commitDate = new Date(currentDay);
          commitDate.setMinutes(commitDate.getMinutes() + j);

          // contribute to the repository
          await contribute(commitDate);
        }

        console.log(`Generated ${commitsToday} commits for ${currentDay.toDateString()}`);
      }
    }

    console.log("\nRepository generation completed successfully! ");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

start();
