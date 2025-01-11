# GitHub Contribution Generator

A customizable script to generate GitHub-style contribution patterns. This tool allows you to create commit patterns with configurable frequency, intensity, and time range.

## ⚠️ Disclaimer

This tool is for educational and testing purposes only. Using this to manipulate contribution statistics on real GitHub repositories may violate GitHub's terms of service.

## 🚀 Features

- Customizable commit frequency (1-100%)
- Configurable maximum commits per day (1-20)
- Adjustable historical range
- Option to exclude weekends
- Automatic timestamp distribution
- Random commit pattern generation

## 📋 Prerequisites

Before running the script, ensure you have the following installed:
- Node.js (version 12 or higher)
- npm (Node Package Manager)

## 🛠️ Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd <project-folder>
```

2. Install the required dependencies:
```bash
npm install
```

## 💻 Usage

Run the script using Node.js:
```bash
node index.js
```

You will be prompted to enter the following parameters:

1. **Frequency** (1-100):
   - Percentage of days that will contain commits
   - Default: 80
   - Example: A value of 50 means commits will be generated for approximately half of the days

2. **Maximum Commits Per Day** (1-20):
   - The maximum number of commits that can be generated for any given day
   - Default: 10
   - The actual number of commits per day will be randomly distributed between 1 and this maximum

3. **Days Before** (>0):
   - Number of days before the current date to generate commits for
   - Default: 365
   - Example: 365 will generate commits for the past year

4. **Avoid Weekends** (yes/no):
   - Option to skip generating commits on Saturdays and Sundays
   - Default: yes

## 🔍 How It Works

1. The script creates a new directory with a timestamp-based name
2. Initializes a new Git repository in this directory
3. Generates commits based on your specifications:
   - Commits are distributed throughout each day
   - Each commit is timestamped between working hours
   - Random commit patterns are generated based on the frequency parameter
   - Weekends are optionally excluded

## 📁 Output

The script will create:
- A new directory named `commits-[timestamp]`
- A Git repository initialized in this directory
- Generated commit history based on your parameters

Progress is logged to the console as commits are generated.

## 🐛 Troubleshooting

Common issues and solutions:

1. **Permission Denied**:
   ```bash
   Error: EACCES: permission denied
   ```
   Solution: Run the script with appropriate permissions or check directory access rights

2. **Git Not Found**:
   ```bash
   Error: git is not recognized as an internal or external command
   ```
   Solution: Ensure Git is installed and added to your system's PATH

## ⚙️ Configuration

The script uses the following default configurations which can be modified in the code:

- Default commit time: 8:00 PM
- Git branch name: main
- Git auto garbage collection: disabled

## 📝 Notes

- The actual percentage of days with commits might slightly vary from the specified frequency due to random distribution
- Commits are generated with placeholder content
- The repository is created locally and needs to be manually pushed to GitHub if desired

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
