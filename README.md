# swami.market
Маркетплейс для handmade продуктов и услуг от мастеров

# Front-end
- React
- Styled Components
- MUI (need to move to mui base after release)

# Back-end
- Node.js (Deno maybe?)
- Google Firebase (Supabase maybe?)

# Install dependencies

## Macos

Install homebrew
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Add Homebrew to your PATH
```sh
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/<your_username>/.zprofile

eval "$(/opt/homebrew/bin/brew shellenv)"
```

Once you have Homebrew installed, you can use it to install nvm by running the following command:
```sh
brew install nvm
```
or for M1
```sh
arch -arm64 brew install
```

Manually add the directory to your $HOME/.zshrc (or $HOME/.bash_profile):
```sh
sudo nano $HOME/.zshrc
```
```sh
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh  # This loads NVM
```

## Install node dependencies:

Now that we have nvm, installing Node is a super short command:
```sh
nvm install node
```

Once you have npm installed you can run the following both to install and upgrade Yarn:
```sh
    npm install --global yarn
```

Install project dependencies: 
```sh
npm install

# It will suggest to run `npm audit fix`, but skip it. For this we need to fix package.json.
```

Install deno package:
```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Manually add the directory to your $HOME/.zshrc (or $HOME/.bash_profile) from the output of npm install e.g.
```sh
sudo nano $HOME/.zshrc
```

and then add these rows to the end of file:
```sh
export DENO_INSTALL="/Users/<username>/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```
</br>

# Run all services locally

### **1.** Make sure you installed all dependencies from ./src/README.md and ./server/README.md
</br>

----------------------------------------------------------------

Seems like telegram web apps can't be tested locally without ssl. So we decided to use --live option to make https url. Check the link for more information 
https://github.com/rashdeva/swami.market/issues/3

----------------------------------------------------------------
</br>

### **2** To make possible using web app with bot run the live version:
```sh
netlify dev --live
```

### **3.** Copy the url and set it as TWA_URL in ./server/.env. Every time the url is different.
</br>

### **4.** Run the bot in another terminal/process
```sh
yarn bot
```

Now when you open web app in the bot it will be local web app
