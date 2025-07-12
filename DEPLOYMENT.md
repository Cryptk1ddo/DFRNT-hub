# 🚀 Deployment Guide: GitHub Pages + Telegram Mini App

This guide will walk you through setting up your Productivity Hub webapp on GitHub Pages and connecting it to a Telegram Mini App.

## 📋 Prerequisites

- GitHub account
- Telegram account
- Basic knowledge of Git commands

## 🗂️ Project Structure

Your project should have this structure:
```
productivity-hub/
├── index.html              # Main HTML file
├── app.js                  # React application
├── package.json            # Project configuration
├── README.md              # Project documentation
├── telegram-app.json      # Telegram Mini App config
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
└── icons/                 # App icons (create this folder)
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

## 🔧 Step 1: Set Up GitHub Repository

### 1.1 Create New Repository
1. Go to [GitHub](https://github.com) and click "New repository"
2. Name it `productivity-hub`
3. Make it **Public** (required for GitHub Pages)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 1.2 Clone and Push Your Code
```bash
# Clone your new repository
git clone https://github.com/yourusername/productivity-hub.git
cd productivity-hub

# Copy all your files to this directory
# (index.html, app.js, package.json, etc.)

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Productivity Hub webapp"

# Push to GitHub
git push origin main
```

### 1.3 Update Configuration Files
Before pushing, update these files with your actual GitHub username:

**package.json:**
```json
{
  "repository": {
    "url": "https://github.com/YOUR_USERNAME/productivity-hub.git"
  },
  "homepage": "https://YOUR_USERNAME.github.io/productivity-hub"
}
```

**telegram-app.json:**
```json
{
  "app_url": "https://YOUR_USERNAME.github.io/productivity-hub"
}
```

## 🌐 Step 2: Enable GitHub Pages

### 2.1 Configure GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch (will be created by GitHub Actions)
6. Click **Save**

### 2.2 Verify GitHub Actions
1. Go to **Actions** tab in your repository
2. You should see the deployment workflow running
3. Wait for it to complete (green checkmark)

### 2.3 Test Your Site
Your site will be available at: `https://YOUR_USERNAME.github.io/productivity-hub`

## 🤖 Step 3: Create Telegram Bot

### 3.1 Create Bot with BotFather
1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Follow the instructions:
   - Choose a name: `Productivity Hub`
   - Choose a username: `your_productivity_bot`
4. Save the bot token (you'll need it later)

### 3.2 Configure Bot Commands
Send this to BotFather:
```
/setcommands
@your_productivity_bot

start - Open Productivity Hub
nootropics - Get nootropic recommendations
binaural - Start binaural beats session
pomodoro - Start pomodoro timer
training - Access training programs
```

### 3.3 Create Mini App
1. Send `/newapp` to BotFather
2. Select your bot
3. Choose a title: `Productivity Hub`
4. Add a short description
5. Upload an icon (create a 512x512 PNG)
6. Set the URL: `https://YOUR_USERNAME.github.io/productivity-hub`

## 🔗 Step 4: Connect Bot to Webapp

### 4.1 Create Bot Backend (Optional)
If you want to handle bot commands, create a simple backend:

```javascript
// bot.js (Node.js with node-telegram-bot-api)
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('YOUR_BOT_TOKEN', {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://YOUR_USERNAME.github.io/productivity-hub';
  
  bot.sendMessage(chatId, 'Welcome to Productivity Hub!', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🚀 Open App', web_app: { url: webAppUrl } }
      ]]
    }
  });
});

bot.onText(/\/nootropics/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://YOUR_USERNAME.github.io/productivity-hub#nootropics';
  
  bot.sendMessage(chatId, 'Get personalized nootropic recommendations:', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🧠 Nootropics', web_app: { url: webAppUrl } }
      ]]
    }
  });
});
```

### 4.2 Add Telegram Web App Integration
Add this to your `app.js` to detect when running in Telegram:

```javascript
// Add this at the top of your App component
useEffect(() => {
  // Check if running in Telegram Web App
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // Set theme
    tg.setHeaderColor('#ea580c');
    tg.setBackgroundColor('#111827');
  }
}, []);
```

## 🎨 Step 5: Create App Icons

Create these icon files in an `icons/` folder:
- `icon-16.png` (16x16)
- `icon-32.png` (32x32)
- `icon-48.png` (48x48)
- `icon-128.png` (128x128)

You can use any icon design tool or online generator.

## 🚀 Step 6: Deploy and Test

### 6.1 Push Changes
```bash
git add .
git commit -m "Add Telegram Mini App integration"
git push origin main
```

### 6.2 Test Your Mini App
1. Open Telegram
2. Search for your bot: `@your_productivity_bot`
3. Send `/start`
4. Click "Open App"
5. Test all features

## 🔧 Step 7: Continuous Deployment

### 7.1 Automatic Updates
Every time you push to the `main` branch, GitHub Actions will:
1. Build your project
2. Deploy to GitHub Pages
3. Update your live site automatically

### 7.2 Making Changes
```bash
# Make your changes to files
git add .
git commit -m "Description of changes"
git push origin main
# Site updates automatically in ~2 minutes
```

## 📱 Step 8: Telegram Mini App Features

### 8.1 Available Features
- **Web App Integration**: Opens in Telegram's built-in browser
- **Deep Linking**: Direct links to specific sections
- **Theme Integration**: Matches Telegram's theme
- **Back Button**: Users can return to chat
- **Share**: Users can share the app

### 8.2 Bot Commands
- `/start` - Opens main app
- `/nootropics` - Direct to nootropics section
- `/binaural` - Direct to binaural beats
- `/pomodoro` - Direct to pomodoro timer
- `/training` - Direct to training hub

## 🛠️ Troubleshooting

### Common Issues:

1. **Site not loading**: Check GitHub Actions for deployment errors
2. **Bot not responding**: Verify bot token and commands
3. **Mini App not opening**: Check URL in BotFather configuration
4. **Styling issues**: Ensure all CSS is properly loaded

### Debug Commands:
```bash
# Check deployment status
git status

# View GitHub Actions logs
# Go to Actions tab in your repository

# Test locally
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📈 Next Steps

1. **Analytics**: Add Google Analytics or Telegram analytics
2. **User Data**: Implement user preferences storage
3. **Notifications**: Add Telegram notifications for timer completion
4. **Sharing**: Enable sharing of nootropic stacks
5. **Mobile Optimization**: Ensure perfect mobile experience

## 🎉 Success!

Your Productivity Hub is now:
- ✅ Hosted on GitHub Pages
- ✅ Connected to Telegram Mini App
- ✅ Automatically deploying on updates
- ✅ Ready for users worldwide!

**Your app URL**: `https://YOUR_USERNAME.github.io/productivity-hub`
**Your bot**: `@your_productivity_bot`

Share your bot with friends and start boosting productivity! 🚀 