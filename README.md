Requirements - .net 8.0 - npm and nodeJs - yarn

Clone Repo Setup Backend - open BackEnd.sln in Visual Studio or Jetbrains Rider - start solution if the solution doens't build run a nuget restore command - you can change the port in Properties/launcSettings.json if you do this update the front end .env file

Setup Frontend - cd into FrontEnd/spa - run yarn install - build with yarn build - start with yarn start - you can change the port in the env file by default it's 3100 but if you do this you need to update the cors setting in the back end Program.cs file
