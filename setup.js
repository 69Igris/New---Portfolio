#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Portfolio Website...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Install root dependencies
console.log('\n📦 Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.error('❌ Failed to install root dependencies:', error.message);
  process.exit(1);
}

// Install client dependencies
console.log('\n📦 Installing client dependencies...');
try {
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log('✅ Client dependencies installed');
} catch (error) {
  console.error('❌ Failed to install client dependencies:', error.message);
  process.exit(1);
}

// Install server dependencies
console.log('\n📦 Installing server dependencies...');
try {
  execSync('cd server && npm install', { stdio: 'inherit' });
  console.log('✅ Server dependencies installed');
} catch (error) {
  console.error('❌ Failed to install server dependencies:', error.message);
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, 'server', '.env');
const envExamplePath = path.join(__dirname, 'server', 'env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('\n📝 Creating .env file...');
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created from template');
    console.log('⚠️  Please update the .env file with your configuration');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
  }
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Update server/.env with your configuration');
console.log('2. Make sure MongoDB is running');
console.log('3. Run "npm run dev" to start both frontend and backend');
console.log('4. Open http://localhost:3000 to view the portfolio');
console.log('\n📚 For more information, check the README.md file');

