

const fs = require('fs')
const cordovaConfigPath = 'config.xml'

console.log(`renaming ${cordovaConfigPath}.backup to ${cordovaConfigPath}`)
fs.renameSync(`${cordovaConfigPath}.backup`, cordovaConfigPath)