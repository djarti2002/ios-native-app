# 🚀 iOS Native App - Quick Start Guide

Prosta aplikacja React Native z nowoczesnym interfejsem, zbudowana dla iPhone 7 (iOS 15+).

## 📱 Instalacja na iPhone

### Opcja 1: GitHub Actions (Zalecane - bez Mac, bez Apple Developer)

**Najłatwiejszy sposób!** Zbuduj IPA w chmurze za darmo:

1. **Utwórz repo na GitHub** i push kod
2. **GitHub automatycznie zbuduje IPA** (~10-15 min)
3. **Pobierz IPA** z zakładki Actions → Artifacts
4. **Zainstaluj przez Sideloadly** na iPhone

📖 **Szczegóły:** Zobacz [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md)

### Opcja 2: Expo Go (Najszybsze - do testowania)

```bash
npm start
# Zeskanuj QR code aplikacją Expo Go z App Store
```

### Opcja 3: Budowanie lokalne (wymaga Mac z Xcode)

```bash
npx expo prebuild --platform ios
npx expo run:ios --device
```

## 🎨 Funkcje

- ⚡ Płynne animacje
- 🎯 Interaktywny licznik
- 🌙 Ciemny motyw
- 📱 Zoptymalizowane dla iOS 15+

## 🛠️ Development

```bash
# Instalacja
npm install

# Start development server
npm start

# Build przez GitHub Actions
git push  # Automatycznie buduje IPA!
```

## 📚 Dokumentacja

- [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md) - Budowanie przez GitHub Actions
- [INSTALLATION.md](./INSTALLATION.md) - Instalacja przez Sideloadly
- [README_FULL.md](./README_FULL.md) - Pełna dokumentacja

## 🔗 Szybkie linki

- **Sideloadly:** [sideloadly.io](https://sideloadly.io/)
- **Expo Go:** [App Store](https://apps.apple.com/app/expo-go/id982107779)

---

**Made with ❤️ using React Native & Expo**
