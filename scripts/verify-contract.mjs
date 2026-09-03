import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const contractUrl = new URL('../docs/contracts/backend-api-v1.yaml', import.meta.url)
const manifestUrl = new URL('../docs/contracts/manifest.json', import.meta.url)
const [contract, manifestSource] = await Promise.all([
  readFile(contractUrl),
  readFile(manifestUrl, 'utf8'),
])
const manifest = JSON.parse(manifestSource)
const actual = createHash('sha256').update(contract).digest('hex').toUpperCase()

if (actual !== manifest.sha256) {
  console.error(`Contract checksum mismatch: expected ${manifest.sha256}, received ${actual}`)
  process.exit(1)
}

console.log(`Verified YNS API contract ${manifest.revision} (${actual})`)

