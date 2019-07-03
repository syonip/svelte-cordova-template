if (!process.env.CORDOVA_PLATFORM) {
  console.log('process.env.CORDOVA_PLATFORM not defined. Not running before-prepare.js hook.')
  return;
}

const fs = require('fs')
const production = process.env.CORDOVA_PROD;

function info(msg) {
  console.log(msg)
}

function getIP() {

  const os = require('os');
  let networkInterfaces = os.networkInterfaces()
  let interfaces = []
  for (let int in networkInterfaces) {
    let isLocalhost = networkInterfaces[int].map(x => x.address).includes('127.0.0.1')

    if (!isLocalhost) {
      interfaces.push(networkInterfaces[int])
    }
  }

  let ip = interfaces[0].filter(x => x.family == 'IPv4').map(x => x.address)[0]
  return ip
}


function updateConfigUrl(cordovaConfigPath, url) {
  fs.copyFileSync(cordovaConfigPath, `${cordovaConfigPath}.backup`)
  info(`updating ${cordovaConfigPath} content to ${url}`)

  let cordovaConfig = fs.readFileSync(cordovaConfigPath, 'utf-8')
  const lines = cordovaConfig.split(/\r?\n/g).reverse()

  const contentIndex = lines.findIndex(line => line.match(/\s+<content/))
  let allowNavigationIndex = lines.findIndex(line => line.match(/\s+<allow-navigation/))
  if (contentIndex >= 0) {
    lines[contentIndex] = `    <content src="${url}" />`
  }

  let allowNavigation = `    <allow-navigation href="${url}" />`
  if (allowNavigationIndex >= 0) {
    if (production) {
      lines.splice(allowNavigationIndex, 1)
    } else {
      lines[allowNavigationIndex] = allowNavigation
    }
  } else {
    if (!production) {
      lines.splice(contentIndex, 0, allowNavigation)
    }
  }
  cordovaConfig = lines.reverse().join('\n')
  fs.writeFileSync(cordovaConfigPath, cordovaConfig)
}

function generateIndexHtml(ctx) {
  let htmlContent = fs.readFileSync('../public/index.html', 'utf-8')
  const lines = htmlContent.split(/\r?\n/g).reverse()

  const bodyIndex = lines.findIndex(line => line.match(/\s+<\/body/))

  let isIos = ctx.opts.platforms.includes('ios')
  const cordovaJsLocation = isIos ? 'bundle' : 'assts';
  let cordovaJsScript = `        <script src="cdvfile://localhost/${cordovaJsLocation}/www/cordova.js"></script>`

  if (bodyIndex >= 0) {
    lines.splice(bodyIndex + 1, 0, cordovaJsScript)
  } else {
    console.error("couldn't find </body> tag in public/index.html")
  }
  htmlContent = lines.reverse().join('\n')
  fs.writeFileSync('www/index.html', htmlContent)
}

module.exports = function(ctx) {
  const ip = getIP();
  const url = production ? 'index.html' : `http://${ip}:5000`

  const cordovaConfigPath = 'config.xml'
  if (!url || !cordovaConfigPath) {
    console.error(`url or config path don't exist`)
    return
  }

  updateConfigUrl(cordovaConfigPath, url)

  generateIndexHtml(ctx)
}