const fs = require('fs');
const nodePath = require('path')
const readline = require('readline')
const [, , txtPath, name] = process.argv

const countLines = filePath => new Promise((resolve) => {
  let lineCount = 0;

  const reader = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  reader.on('line', () => {
    lineCount += 1;
  });

  reader.on('close', () => {
    resolve(lineCount);
  });
});

console.log('start count',  txtPath)

countLines(txtPath).then((lineCount)=>{

let index = 0

const lineReader = readline.createInterface({
  input: fs.createReadStream(txtPath)
});

const outputSQLPath = nodePath.parse(txtPath)
const tableName = name ? name : outputSQLPath.name
const writeStream = fs.createWriteStream(nodePath.join(__dirname, './sql', tableName + '.sql'))
const headerPath = nodePath.join(__dirname, './headers', tableName + '.txt')
const head = fs.readFileSync(headerPath);
const transform = (str) => {
  if (str === 'NULL') return 'NULL'
  else return `'${str}'`
}
lineReader.on('line', function (line) {
  index++
  process.stdout.write(`Line from file(${(index/lineCount*100).toFixed(2)}%)\r`);
  const data = line.split(/\t|,/);
  writeStream.write(`INSERT INTO bob.${tableName} (${head}) VALUES (${data.map(o => transform(o)).join(',')});`, 'utf8');
});


writeStream.on('finish', function () {
  console.log("写入完成。");
});

writeStream.on('error', function (err) {
  console.log(err.stack);
  process.exit()
});

})