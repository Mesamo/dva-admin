# dva-admin 

[![Build Status](https://travis-ci.org/Mesamo/dva-admin.svg?branch=master)](https://travis-ci.org/Mesamo/dva-admin)
[![GitHub version](https://badge.fury.io/gh/Mesamo%2Fdva-admin.svg)](https://badge.fury.io/gh/Mesamo%2Fdva-admin)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2431df871cfc4e7aa82e921e8652960c)](https://www.codacy.com/app/mesamo/dva-admin?utm_source=github.com&utm_medium=referral&utm_content=Mesamo/dva-admin&utm_campaign=badger)

A dashboard application built upon dva and ant-design

## Live Demo
This live demo is deploy on firebase hosting. You can view a live version of this demo [here](https://dva-admin.firebaseapp.com).

# Based on
* [Dva][dva-repo] - React and redux based, lightweight and elm-style framework. 
* [Ant Design][antd-repo] - A UI Design Language
* [Firebase][firebase-url] - Firebase helps you build better mobile apps and grow your business.

## Getting Started
Install dependencies
```bash
$ yarn
```

Start dev server
```bash
$ yarn start
```

Build
```bash
$ yarn build
```

## Debugging in the Editor

Need to have the latest version of VS Code and VS Code Chrome [Debugger Extension][extension] installed.  
Then add the block below to your launch.json file and put it inside the .vscode folder in your app’s root directory.
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:8000",
      "sourceMaps": true,
      "webRoot": "${workspaceRoot}/src",
      "smartStep": true,
      "internalConsoleOptions": "openOnSessionStart",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```
Start your app by running `yarn start`, and start debugging in VS Code by pressing F5 or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

## Talk
* [Slack](https://mesamo.slack.com)

## Special thanks to
zuiidea: [https://github.com/zuiidea/antd-admin](https://github.com/zuiidea/antd-admin)  
sorrycc: [https://github.com/dvajs/dva-example-user-dashboard](https://github.com/dvajs/dva-example-user-dashboard)  
pmg1989: [https://github.com/pmg1989/dva-admin](https://github.com/pmg1989/dva-admin)

## License
[MIT](https://tldrlegal.com/license/mit-license)



[demo-url]: https://dva-admin.firebaseapp.com  
[dva-repo]: https://github.com/dvajs/dva  
[antd-repo]: https://github.com/ant-design/ant-design  
[firebase-url]: https://firebase.google.com/  
[extension]: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
