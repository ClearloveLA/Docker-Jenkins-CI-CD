// build.js

const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// 确保构建目录存在
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
    console.log('Created build directory');
}

try {
    // 复制必要的文件到构建目录
    const filesToCopy = [
        'src/app.js',
        'src/monitor.js',
        'config/config.js',
        'package.json'
    ];

    filesToCopy.forEach(file => {
        const sourcePath = path.join(__dirname, file);
        const targetPath = path.join(buildDir, path.basename(file));
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied ${file} to build directory`);
        } else {
            console.warn(`Warning: ${file} not found`);
        }
    });

    // 创建构建信息文件
    const buildInfo = {
        buildTime: new Date().toISOString(),
        version: require('./package.json').version,
        node: process.version
    };

    fs.writeFileSync(
        path.join(buildDir, 'build-info.json'),
        JSON.stringify(buildInfo, null, 2)
    );

    console.log('Build completed successfully!');
    console.log('Build information:', buildInfo);

} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}