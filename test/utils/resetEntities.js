const fs = require('fs');
const path = require('path');

const directory = './entities';

files = fs.readdirSync(directory);
for (const file of files) {
  console.log("resetEntities script, deleting: ",file);
  fs.unlinkSync(path.join(directory, file));
}
