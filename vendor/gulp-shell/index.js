import { spawn } from "child_process";

const runCommand = (command, options = {}) => {
  if (typeof command !== "string" || command.trim() === "") {
    throw new TypeError("Command must be a non-empty string");
  }

  return (done) => {
    const child = spawn(command, {
      shell: true,
      stdio: options.quiet ? "pipe" : "inherit",
      env: { ...process.env, ...options.env },
    });

    if (options.quiet) {
      child.stdout?.on("data", (data) => process.stdout.write(data));
      child.stderr?.on("data", (data) => process.stderr.write(data));
    }

    const handleExit = (code) => {
      if (code && code !== 0 && !options.ignoreErrors) {
        const error = new Error(`Command failed with exit code ${code}: ${command}`);
        error.code = code;
        done?.(error);
      } else {
        done?.();
      }
    };

    child.on("error", (error) => {
      if (!options.ignoreErrors) {
        done?.(error);
      } else {
        done?.();
      }
    });

    child.on("close", handleExit);
    return child;
  };
};

const runSerial = (commands, options = {}) => {
  const tasks = commands.map((cmd) => runCommand(cmd, options));

  return (done) => {
    let index = 0;

    const next = (error) => {
      if (error) {
        done?.(error);
        return;
      }

      if (index >= tasks.length) {
        done?.();
        return;
      }

      const task = tasks[index];
      index += 1;
      try {
        task((taskError) => next(taskError));
      } catch (taskError) {
        next(taskError);
      }
    };

    next();
  };
};

const shell = {
  task(command, options = {}) {
    if (Array.isArray(command)) {
      if (command.length === 0) {
        throw new Error("Command array must not be empty");
      }

      return runSerial(command, options);
    }

    return runCommand(command, options);
  },
};

export default shell;
