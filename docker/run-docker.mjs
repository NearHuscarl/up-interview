import chalk from "chalk";
import { execSync } from "child_process";
import path from "path";

const absPath = path.resolve("dist/interview-repo");
const cmd = `docker run --rm -p 4200:4200 -p 3000:3000 -v ${absPath}/apps:/app/apps up-interview`;

console.log(chalk.grey(cmd));
execSync(cmd, { stdio: "inherit" });
