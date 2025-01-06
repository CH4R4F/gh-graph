const { promisify } = require("util");
const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

async function runCommand(command) {
  try {
    const execAsync = promisify(exec);
    const { stdout, stderr } = await execAsync(command);
    if (stderr) console.error("stderr:", stderr);
    return stdout;
  } catch (error) {
    console.error("Error executing command:", error);
    throw error;
  }
}

function getContributionsPerDay(maxCommits) {
  const max = Math.min(Math.max(maxCommits, 1), 20);
  return getRandomInt(1, max);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function contribute(date) {
  const message = `Contribution: ${date.toISOString().slice(0, 19)}`;
  const readmePath = path.join(process.cwd(), "README.md");

  await fs.appendFile(readmePath, message + "\n\n");
  await runCommand("git add .");
  await runCommand(`git commit -m "${message}" --date="${formatDate(date)}"`);
}

function formatDate(date) {
  return date.toISOString().replace("T", " ").slice(0, 19);
}

module.exports = {
  runCommand,
  getContributionsPerDay,
  contribute,
};
