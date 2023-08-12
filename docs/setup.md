
## Developer setup (Linux)
1. Install pnpm with `curl -fsSL https://get.pnpm.io/install.sh | sh -`. If necessary, install using [alternative methods](https://pnpm.io/installation#on-posix-systems).
2. Choose an appropriate place to clone the project and `cd` into it. For example, `mkdir ~/proj && cd ~/proj`
3. `git clone https://github.com/Vacansee/app` and `cd` into `app`
4. `pnpm install` to install dependencies

5. Done!
To view your changes, run `pnpm dev`. A local server will spin up using Vite at `localhost:<port>/app/`. The URL will be printed to the console.
