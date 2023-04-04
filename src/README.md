# **Run application on localhost**
Reference: https://docs.netlify.com/cli/get-started/#run-a-local-development-environment

*Make sure that you've installed all basic dependencies (check README.md in the root)*
</br>
</br>
</br>


### **1.** Install netlify dependencies
```sh
npm install netlify-cli -g
```

### **2.** Link the project
```sh
netlify init

# Choose these options from the command line

? What would you like to do? ⇄  Connect this directory to an existing Netlify site

? How do you want to link this folder to a site? Use current git remote origin (https://github.com/rashdeva/swami.market)
```
</br>

### **3** Run the app
```sh
netlify dev
```
