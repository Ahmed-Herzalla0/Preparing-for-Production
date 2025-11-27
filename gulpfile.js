import gulp from "gulp";
import shell from "gulp-shell";

// Default task - Build and serve with Parcel on port 1234
gulp.task("default", shell.task("npx parcel index.html --port 1234"));

// Build task - Build for production with Parcel
gulp.task("build", shell.task("npx parcel build index.html"));

// Test task - Run Mocha unit tests
gulp.task("test", shell.task("npx mocha"));

// Cypress task - Run Cypress E2E tests
gulp.task("cypress", shell.task("npx cypress run"));

// E2E task - Run Cypress E2E tests (alias)
gulp.task("e2e", shell.task("npx cypress run"));
