const fs = require('fs');
const path = require('path');

const folder = 'version1.0'; // 对应您放固件的文件夹名字
const outDir = path.join('dist', folder);

// 1. 创建输出目录
fs.mkdirSync(outDir, { recursive: true });

// 2. 扫描 version1.0 里的所有 .bin 文件，复制过去并生成清单 files.json
const files = fs.readdirSync(folder).filter(f => f.endsWith('.bin'));
files.forEach(f => {
    fs.copyFileSync(path.join(folder, f), path.join(outDir, f));
});
fs.writeFileSync(path.join(outDir, 'files.json'), JSON.stringify(files));

// 3. 自动生成允许跨域的 _headers 文件
fs.writeFileSync(path.join('dist', '_headers'), '/*\n  Access-Control-Allow-Origin: *\n');
console.log('生成固件清单成功:', files);