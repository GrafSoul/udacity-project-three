# Project Three - Weather Journal App (JavaScript).
Training project for [Udacity.com]

### Install, Start & Test
Install [NodeJS] and run the following commands in consle.
```
// Installing npm modules.
npm install

// Starting local Server and App.
npm start 

// Start testing the project using Jasmine.
npm test
```

### Project structure
```
├── /spec/                         // Jasmine file folder.
│       └── support/
│             └── jasmine.json     // Jasmine configuration file.
├── /website/                      // Application file folder.
│       ├── /css/                  // CSS file folder.
│       │     └── style.css        // CSS styles file.
│       ├── /images/               // Images file folder.
│       │     └── ...              // Image files.   
│       ├── app.js                 // File with application functionality.
│       └── index.html             // HTML file of the application.
├── server.js                      // Express server functionality for application development.
├── .eslintrc.js                   // Сonfiguration file for Eslint.
├── .gitignore                     // File to exclude files and folders from the repository.
├── package-lock.json              // Npm configuration file.
└── package.json                   // Npm configuration file.
```

### Copyright
The project is based on the [Udacity repository].  
The project uses [OpenWeather] Web API.

[Udacity.com]: https://www.udcity.com/
[Udacity repository]: https://github.com/udacity/fend/tree/refresh-2019/
[NodeJS]: https://nodejs.org/
[OpenWeather]: https://openweathermap.org/