# 📸 SnapEdit Pro

**Advanced Photo Editor for iOS** - Professional-grade photo editing with real-time filters and adjustments.

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![Platform](https://img.shields.io/badge/platform-iOS%2015%2B-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎨 **Real-Time Filters**
- **B&W** - Classic black and white
- **Sepia** - Vintage brown tones
- **Cool** - Cold blue tones (9000K)
- **Warm** - Warm orange tones (3500K)
- **Vibrant** - Enhanced saturation

### ⚙️ **Advanced Adjustments**
- ☀️ **Brightness** (0.5 - 2.0)
- 🌓 **Contrast** (0.5 - 2.0)
- 🌈 **Saturation** (0 - 3.0)
- Live preview with real-time updates

### 🛠️ **Tools**
- 🔄 **Rotate** - 90° rotation
- ↔️ **Flip** - Horizontal mirror
- 💾 **Save** - Save to photo library
- 📷 **Camera** - Take new photos
- 📁 **Gallery** - Choose from library

---

## 🚀 Quick Start

### Option 1: Download Pre-built IPA (Recommended)

1. **Download IPA**
   - Go to [GitHub Actions](https://github.com/djarti2002/ios-native-app/actions)
   - Click on the latest successful build
   - Scroll to "Artifacts" and download `ios-app-unsigned`

2. **Install with Sideloadly**
   - Download [Sideloadly](https://sideloadly.io/)
   - Connect your iPhone via USB
   - Drag the IPA file into Sideloadly
   - Enter your Apple ID (free account works!)
   - Click "Start"

3. **Trust Certificate**
   - Settings → General → VPN & Device Management
   - Tap your Apple ID → Trust

4. **Done!** 🎉

---

### Option 2: Build Locally

```bash
# Clone repository
git clone https://github.com/djarti2002/ios-native-app.git
cd ios-native-app

# Install dependencies
npm install --legacy-peer-deps

# Run on iOS simulator (requires Mac + Xcode)
npm run ios

# Or test with Expo Go
npm start
```

---

## 📱 Requirements

- **iOS:** 15.0 or later
- **Device:** iPhone 7 or newer
- **Installation:** Sideloadly or AltStore (for unsigned IPA)

---

## 🎨 Screenshots

### Main Interface
- Dark theme with cyan accents (#00d4ff)
- Intuitive filter selection
- Real-time preview

### Filters in Action
- Instant filter application
- Smooth transitions
- High-quality output

---

## 🔧 Tech Stack

- **React Native** 0.76.5
- **Expo** SDK 52
- **react-native-image-filter-kit** - Real-time filters
- **expo-image-picker** - Camera & gallery access
- **expo-media-library** - Save to photo library
- **expo-image-manipulator** - Rotate & flip

---

## 📖 Documentation

- [GitHub Actions Build Guide](./GITHUB_ACTIONS.md)
- [Installation Guide](./INSTALLATION.md)
- [Full Documentation](./README_FULL.md)

---

## 🐛 Known Issues

- Filters use GPU acceleration - may be slower on older devices
- First filter application may take 1-2 seconds
- Saved images are JPEG compressed (90% quality)

---

## 🚧 Roadmap

- [ ] Crop tool
- [ ] Blur effect
- [ ] Text overlay
- [ ] Stickers
- [ ] Export to different formats (PNG, HEIC)
- [ ] Batch editing
- [ ] Presets (Instagram, Twitter sizes)

---

## 📄 License

MIT License - feel free to use and modify!

---

## 🙏 Credits

Built with ❤️ using React Native and Expo

**Libraries:**
- [react-native-image-filter-kit](https://github.com/iyegoroff/react-native-image-filter-kit)
- [Expo](https://expo.dev/)

---

## 📞 Support

Having issues? Check the [Installation Guide](./INSTALLATION.md) or open an issue on GitHub!

---

**Made for iPhone 7 (iOS 15) with jailbreak support** 🚀
