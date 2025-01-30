module.exports = {
    default: {
      require: ["tests/steps/**/*.js"], // Load all step definitions
      format: ["progress-bar", "json:reports/cucumber-report.json"],
      paths: ["tests/features/*.feature"], // Ensure feature files are included
      //publishQuiet: true,
    },
  };
  