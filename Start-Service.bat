tasklist /fi "imagename eq node.exe" |find ":" > nul
IF errorlevel 1 taskkill /f /im "node.exe"

cd Redis-Server\Redis-x64-3.2.100
start redis-server.exe

cd ../..
set NODE_ENV=production&&node app.js

