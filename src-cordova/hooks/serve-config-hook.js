const fs = require('fs')
const production = process.env.CORDOVA_PROD;

function info(msg) {
    console.log(msg)
}

const os = require('os');
let networkInterfaces = os.networkInterfaces()
let interfaces = []
for (let int in networkInterfaces) {
  interfaces.push(networkInterfaces[int])
}

let ip = interfaces[0].filter(x => x.family == 'IPv4').map(x => x.address)[0]

const url = production ? 'index.html' : `http://${ip}:5000`

const cordovaConfigPath = 'config.xml'
if (!url || !cordovaConfigPath) {
  console.error(`url or config path don't exist`)
  return
}
info(`updating ${cordovaConfigPath} content to ${url}`)

let cordovaConfig = fs.readFileSync(cordovaConfigPath, 'utf-8')
const lines = cordovaConfig.split(/\r?\n/g).reverse()
const regexContent = /\s+<content/
const contentIndex = lines.findIndex(line => line.match(regexContent))

const allowNavigation = `    <allow-navigation href="${url}" />`
if (contentIndex >= 0) {
  lines[contentIndex] = `    <content src="${url}" />`
  if (url && !production) {
    lines.splice(contentIndex, 0, allowNavigation)
  }
  cordovaConfig = lines.reverse().join('\n')
  fs.writeFileSync(cordovaConfigPath, cordovaConfig)
}
