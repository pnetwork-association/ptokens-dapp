const fs = require('fs')

const dirList = ['swap', 'migration', 'migration/a', 'migration/b', 'migration/c', 'migration/d', 'risks', 'nfts']
const basePath = './build'

for (let i = 0; i < dirList.length; i++) {
  let dir = dirList[i]
  let dirSub = dir
  let path = basePath + '/' + dir
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  /*
   * This script takes the current url and adds '/#/' before the directory name.
   * Afterwords it redirects the browser to the new created URL.
   * This allows to redirect old links of the type 'https://dapp/directory' to
   * 'https://dapp/#/directory' for all the directories listed in `dirList`
   */
  if (dir === 'migration/a') {
    dirSub = 'migration/pBTC-v1-to-v2'
  }
  fs.writeFileSync(
    `${path}/index.html`,
    `<script>
      window.location.replace(window.location.href.replace('/${dir}/','/#/${dirSub}'));
      </script>
      `,
    { encoding: 'utf8', flag: 'w' }
  )
}
