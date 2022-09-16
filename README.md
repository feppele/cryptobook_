This is MyCryptoBook. 

mycryptobook.io

This project contains a React-App, a server folder and a appServer folder.
The appServer folder is just a simple Node.js application, which hosts the build version of the React-App.
The server folder contains the backend for the React-App. It is a Node.js/ Express.js server, which saves images and is connected to a PSQL-Database to store all necessary information.

This project is a decentralized Application (dApp) so it needs to be connected to the Ethereum Blockchain as a second backend as well.
The Smart Contract are stored in the contract folder. 



Build the react app in the main folder with 

npm run build

And provide it to the appServer folder.


For testing or Production Build change the Fetch URL in globalData.js

To create SQL Tables use createSQLTables.txt. In this case PSQL is used.
