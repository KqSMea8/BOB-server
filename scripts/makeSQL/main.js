const fs = require('fs');
const nodePath = require('path')
const [, , txtPath, name] = process.argv

const lineReader = require('readline').createInterface({
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
  console.log('Line from file:', line);
  const data = line.split(/\t|,/);
  writeStream.write(`INSERT INTO bob.${tableName} (${head}) VALUES (${data.map(o => transform(o)).join(',')});`, 'utf8');
});

lineReader.on('close', function () {
  writeStream.end();
})

writeStream.on('finish', function () {
  console.log("写入完成。");
});

writeStream.on('error', function (err) {
  console.log(err.stack);
});

console.log("程序执行完毕");