// build.js

const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

// 确保构建目录存在
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

// 确保配置目录存在
const configDir = path.join(buildDir, 'config');
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}

try {
    // 复制必要的文件到构建目录
    const filesToCopy = [
        { src: 'src/app.js', dest: 'build/app.js' },
        { src: 'src/monitor.js', dest: 'build/monitor.js' },
        { src: 'config/config.js', dest: 'build/config/config.js' },
        { src: 'package.json', dest: 'build/package.json' }
    ];
    filesToCopy.forEach(file => {
        const sourcePath = path.join(__dirname, file.src);
        const targetPath = path.join(__dirname, file.dest);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied ${file.src} to ${file.dest}`);
        } else {
            console.warn(`Warning: ${file.src} not found`);
        }
    });

    // 创建构建信息文件
    const buildInfo = {
        buildTime: new Date().toISOString(),
        version: require('./package.json').version,
        node: process.version
    };

    console.log('Build completed successfully!');
    console.log('Build information:', buildInfo);

} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}