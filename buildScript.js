const fs = require('fs')
const fse = require('fs-extra')
const childProcess = require('child_process')

if (fs.existsSync('./build')) {
  fse.removeSync('./build')
}

if (fs.existsSync('./dist')) {
  fse.removeSync('./dist')
}

// Run 'react-scripts build' script
childProcess.execSync('react-scripts build', { stdio: 'inherit' })
childProcess.execSync('tsc --project server/tsconfig.json', { stdio: 'inherit' })

// Move app build to server/build directory
fse.moveSync('./build', './dist/app', { overwrite: true })
fse.copySync('./node_modules', './dist/node_modules', { overwrite: true})