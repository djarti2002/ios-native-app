# 🚀 Budowanie iOS App przez GitHub Actions

Ten projekt używa GitHub Actions do automatycznego budowania aplikacji iOS w chmurze - **całkowicie za darmo**, bez potrzeby Apple Developer Program!

## 📋 Jak to działa?

1. **Push'ujesz kod** na GitHub
2. **GitHub Actions** automatycznie buduje IPA na macOS runner
3. **Pobierasz IPA** z zakładki Actions
4. **Instalujesz** przez Sideloadly na iPhone

## 🚀 Szybki start

### Krok 1: Utwórz repozytorium na GitHub

1. Wejdź na [github.com/new](https://github.com/new)
2. Nazwij repo np. `ios-native-app`
3. Ustaw jako **Public** lub **Private** (oba działają)
4. **NIE** zaznaczaj "Initialize with README"
5. Kliknij **Create repository**

### Krok 2: Push kod na GitHub

```bash
cd /Users/djarti2002/maker/ios-native-app

# Dodaj wszystkie pliki
git add .

# Commit
git commit -m "Initial commit - iOS Native App"

# Dodaj remote (zamień USERNAME na swoją nazwę użytkownika GitHub)
git remote add origin https://github.com/USERNAME/ios-native-app.git

# Push na GitHub
git branch -M main
git push -u origin main
```

### Krok 3: Uruchom build

GitHub Actions automatycznie rozpocznie budowanie po push'u!

**Lub uruchom ręcznie:**
1. Wejdź na GitHub → Twoje repo
2. Zakładka **Actions**
3. Wybierz workflow **Build iOS App**
4. Kliknij **Run workflow** → **Run workflow**

### Krok 4: Pobierz IPA

1. Poczekaj ~10-15 minut na zakończenie buildu
2. W zakładce **Actions** kliknij na zakończony workflow
3. Przewiń w dół do sekcji **Artifacts**
4. Kliknij **ios-app-unsigned** aby pobrać IPA
5. Rozpakuj plik ZIP - wewnątrz znajdziesz `iosnativeapp.ipa`

### Krok 5: Zainstaluj przez Sideloadly

1. Otwórz **Sideloadly**
2. Podłącz iPhone przez USB
3. Przeciągnij `iosnativeapp.ipa` do Sideloadly
4. Wprowadź Apple ID (darmowe konto)
5. Kliknij **Start**
6. Gotowe! 🎉

## 🔄 Aktualizowanie aplikacji

Gdy wprowadzisz zmiany w kodzie:

```bash
# Zapisz zmiany
git add .
git commit -m "Opis zmian"
git push

# GitHub Actions automatycznie zbuduje nową wersję!
```

## 📊 Status buildu

Możesz dodać badge do README pokazujący status buildu:

```markdown
![Build Status](https://github.com/USERNAME/ios-native-app/workflows/Build%20iOS%20App/badge.svg)
```

## ⚙️ Konfiguracja

Workflow znajduje się w: `.github/workflows/build-ios.yml`

**Możesz dostosować:**
- Wersję Node.js
- Wersję Xcode
- Czas przechowywania artifacts (domyślnie 30 dni)
- Triggery (kiedy budować)

## 🐛 Rozwiązywanie problemów

### Build się nie uruchamia
- Sprawdź czy masz włączone GitHub Actions w ustawieniach repo
- Settings → Actions → General → Allow all actions

### Build failuje
- Sprawdź logi w zakładce Actions
- Kliknij na failed job aby zobaczyć szczegóły

### Nie widzę Artifacts
- Artifacts pojawiają się tylko gdy build się powiedzie
- Sprawdź czy build zakończył się sukcesem (zielony checkmark)

## 💡 Wskazówki

- **Darmowe limity GitHub Actions:** 2000 minut/miesiąc dla darmowych kont
- **Czas buildu:** ~10-15 minut na build
- **Artifacts:** Przechowywane przez 30 dni
- **Private repo:** Działa tak samo jak public

## 🔗 Przydatne linki

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
- [Sideloadly](https://sideloadly.io/)

---

**Gotowe!** Teraz możesz budować aplikacje iOS bez Mac i bez Apple Developer Program! 🚀
