require('dotenv').config()
const fs = require('fs')
const Client = require('ssh2-sftp-client')
const { NodeSSH } = require('node-ssh')

const sftp = new Client()
const ssh = new NodeSSH()

const start = async () => {
  try {
    const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH)
    await sftp.connect({
      host: process.env.HOST,
      username: process.env.USERNAME,
      privateKey
    })

    await ssh.connect({
      host: process.env.HOST,
      username: process.env.USERNAME,
      privateKey: privateKey.toString(),
      tryKeyboard: true
    })

    console.log('Uploading ...')
    await sftp.uploadDir('./build', `/home/${process.env.USERNAME}`)

    console.log('Removing old build ...')
    await ssh.exec('sudo', [`rm -fr ${process.env.WEBSITE_FOLDER_PATH}`], {
      execOptions: { pty: true },
      stdin: `${process.env.SUDO_PASSWORD}\n`
    })

    console.log('Copying new build ...')
    // NOTE: use execCommand because with exec there are some wrong characters that cause "command not found"
    await ssh.execCommand(`sudo cp -fr /home/${process.env.USERNAME}/* ${process.env.WEBSITE_FOLDER_PATH}`, {
      execOptions: { pty: true },
      stdin: `${process.env.SUDO_PASSWORD}\n`
    })

    console.log('Deploy finished succesfully!')
  } catch (_err) {
    console.error(_err)
    process.exit(-1)
  }

  await sftp.end()
  process.exit(0)
}

start()
