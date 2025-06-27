import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cmd2 = `docker ps -a --filter "ancestor=nearhuscarl/up-interview" -q | xargs -r docker rm -f`;
console.log(cmd2);
execSync(cmd2, { stdio: "inherit" });

const cmd = `docker run --rm -t -p 4200:4200 -p 3000:3000 -v ${path.resolve(__dirname, "..")}/apps:/app/apps nearhuscarl/up-interview`;
console.log(cmd);
execSync(cmd, { stdio: "inherit" });
