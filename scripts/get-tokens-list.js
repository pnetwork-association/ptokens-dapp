import https from 'https'

import ExcelJS from 'exceljs'

const url = 'https://mainnet--bootnode-eu-1.p.network/peers'

const rows = []

const getUrl = (url) =>
  new Promise((resolve, reject) => {
    console.info('url', url)
    https
      .get(url, function (res) {
        let body = ''
        res.on('data', function (chunk) {
          body += chunk
        })
        res.on('end', function () {
          try {
            const response = JSON.parse(body)
            return resolve(response)
          } catch (_err) {
            return reject(new Error('aaaa'))
          }
        })
      })
      .on('error', function (e) {
        console.error('Got an error: ', e)
        return reject(e)
      })
  })

function processFeature(response) {
  rows.push([
    response.native_blockchain,
    response.native_network,
    response.native_symbol,
    response.native_smart_contract_address,
    response.host_blockchain,
    response.host_network,
    response.host_symbol,
    response.host_smart_contract_address || response.smart_contract_address,
    response.native_vault_address,
    response.versions.network === 'v2' ? true : false,
  ])
}

async function processPeers(response) {
  await Promise.all(
    response.peers.map(async (p) => {
      // if (
      //   p.webapi.includes('pbtconpolygon-node-1a') ||
      //   p.webapi.includes('pbtconarbitrum-node-1a') ||
      //   p.webapi.includes('peosonpolygon-node-1a') ||
      //   p.webapi.includes('pethoneos-node-1a') ||
      //   p.webapi.includes('pbep20oneth-node-1a') ||
      //   p.webapi.includes('pbep20onpolygon-node-1a')
      // )
      //   return
      await Promise.all(
        p.features.map(async (f) => {
          console.info('querying', p.webapi)
          try {
            const resp = await getUrl(p.webapi + '/' + f + '/get-info')
            processFeature(resp)
          } catch (err) {
            console.error('error for ', p.webapi + '/' + f + '/get-info')
          }
        })
      )
    })
  )
}

async function main() {
  const peers = await getUrl(url)
  await processPeers(peers)

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('pTokens')
  worksheet.addTable({
    name: 'pTokens',
    ref: 'A1',
    headerRow: true,
    style: {
      theme: 'TableStyleDark3',
      showRowStripes: true,
    },
    columns: [
      { name: 'Native blockchain', filterButton: true },
      { name: 'Native network', filterButton: true },
      { name: 'Native symbol', filterButton: true },
      { name: 'Native contract', filterButton: true },
      { name: 'Host blockchain', filterButton: true },
      { name: 'Host network', filterButton: true },
      { name: 'Host symbol', filterButton: true },
      { name: 'Host contract', filterButton: true },
      { name: 'Vault address', filterButton: true },
      { name: 'isV2', filterButton: true },
    ],
    rows: rows,
  })

  await workbook.xlsx.writeFile('ptokens.xlsx')
}

main()
