
## Developer setup (Linux)
1. Install pnpm with `curl -fsSL https://get.pnpm.io/install.sh | sh -`. If necessary, install using [alternative methods](https://pnpm.io/installation#on-posix-systems).
2. Choose an appropriate place to clone the project and `cd` into it. For example, `mkdir ~/proj && cd ~/proj`
3. `git clone https://github.com/Vacansee/app` and `cd` into `app`
4. `pnpm install` to install dependencies

5. Done!
To view your changes, run `pnpm dev`. A local server will spin up using Vite at `localhost:<port>/app/`. The URL will be printed to the console.

## Debugging
It can be helpful to change the current time or date in order to evaluate edge cases or work with more active occasions.
To fix time at a particular date and hour, substitute each of the 3 lines which update time in `main.js` with the commented one below them.

If you want to watch time advance, use the `add()` or `subtract()` Moment.js methods on the lines in `main.js` which update time like so:

```
Moment.tz('America/New_York').subtract(5, 'hours').format('e:HHmm')
```

Also, any errors and console logs can be viewed in the `F12` Devtools menu in your browser preview.

