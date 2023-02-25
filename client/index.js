const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = process.argv[2];
  if(!name) {
    console.log('Enter a name between quotation marks')
    return
  }
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof
  });

  console.log({ gift });
}

main();