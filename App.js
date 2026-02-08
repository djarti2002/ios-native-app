import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, Alert, Dimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
import {
  Grayscale,
  Sepia,
  ColorMatrix,
  Saturate,
  Brightness,
  Contrast,
  Temperature,
} from 'react-native-image-filter-kit';

const { width } = Dimensions.get('window');

export default function App() {
  const [image, setImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Original');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [temperature, setTemperature] = useState(6500);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const filters = [
    { name: 'Original', icon: '📷' },
    { name: 'B&W', icon: '⚫' },
    { name: 'Sepia', icon: '🟤' },
    { name: 'Cool', icon: '❄️' },
    { name: 'Warm', icon: '🔥' },
    { name: 'Vibrant', icon: '🌈' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to use this app.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setSelectedFilter('Original');
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
      setTemperature(6500);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to use this app.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setSelectedFilter('Original');
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
      setTemperature(6500);
    }
  };

  const saveImage = async () => {
    if (!image) return;

    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant photo library permissions to save images.');
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert('Success!', 'Image saved to your photo library! 📸');
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const rotateImage = async () => {
    if (!image) return;

    try {
      const result = await ImageManipulator.manipulateAsync(
        image,
        [{ rotate: 90 }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to rotate image');
    }
  };

  const flipImage = async () => {
    if (!image) return;

    try {
      const result = await ImageManipulator.manipulateAsync(
        image,
        [{ flip: ImageManipulator.FlipType.Horizontal }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to flip image');
    }
  };

  const resetAdjustments = () => {
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    setTemperature(6500);
    setSelectedFilter('Original');
  };

  const renderFilteredImage = () => {
    if (!image) return null;

    let FilterComponent = null;
    const imageProps = {
      source: { uri: image },
      style: styles.image,
      resizeMode: 'contain',
    };

    // Apply selected filter
    switch (selectedFilter) {
      case 'B&W':
        FilterComponent = <Grayscale {...imageProps} />;
        break;
      case 'Sepia':
        FilterComponent = <Sepia {...imageProps} />;
        break;
      case 'Cool':
        FilterComponent = <Temperature amount={9000} {...imageProps} />;
        break;
      case 'Warm':
        FilterComponent = <Temperature amount={3500} {...imageProps} />;
        break;
      case 'Vibrant':
        FilterComponent = <Saturate amount={2} {...imageProps} />;
        break;
      default:
        FilterComponent = <Image {...imageProps} />;
    }

    // Apply adjustments on top of filter
    if (brightness !== 1 || contrast !== 1 || saturation !== 1) {
      return (
        <Brightness amount={brightness}>
          <Contrast amount={contrast}>
            <Saturate amount={saturation}>
              {FilterComponent}
            </Saturate>
          </Contrast>
        </Brightness>
      );
    }

    return FilterComponent;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📸 SnapEdit Pro</Text>
          <Text style={styles.subtitle}>Advanced Photo Editor</Text>
        </View>

        {/* Image Display */}
        <View style={styles.imageContainer}>
          {image ? (
            renderFilteredImage()
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>📷</Text>
              <Text style={styles.placeholderText}>No image selected</Text>
              <Text style={styles.placeholderSubtext}>Choose a photo to start editing</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        {!image && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={pickImage}>
              <Text style={styles.buttonText}>📁 Choose Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
              <Text style={styles.secondaryButtonText}>📷 Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Filters */}
        {image && (
          <>
            <Text style={styles.sectionTitle}>🎨 Filters</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersContainer}
              contentContainerStyle={styles.filtersContent}
            >
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterButton,
                    selectedFilter === filter.name && styles.filterButtonActive
                  ]}
                  onPress={() => setSelectedFilter(filter.name)}
                >
                  <Text style={styles.filterIcon}>{filter.icon}</Text>
                  <Text style={[
                    styles.filterName,
                    selectedFilter === filter.name && styles.filterNameActive
                  ]}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Adjustments */}
        {image && (
          <View style={styles.adjustments}>
            <View style={styles.adjustmentHeader}>
              <Text style={styles.sectionTitle}>⚙️ Adjustments</Text>
              <TouchableOpacity onPress={resetAdjustments}>
                <Text style={styles.resetButton}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>☀️ Brightness</Text>
                <Text style={styles.sliderValue}>{brightness.toFixed(2)}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2}
                value={brightness}
                onValueChange={setBrightness}
                minimumTrackTintColor="#00d4ff"
                maximumTrackTintColor="#2a2a3e"
                thumbTintColor="#00d4ff"
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>🌓 Contrast</Text>
                <Text style={styles.sliderValue}>{contrast.toFixed(2)}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2}
                value={contrast}
                onValueChange={setContrast}
                minimumTrackTintColor="#00d4ff"
                maximumTrackTintColor="#2a2a3e"
                thumbTintColor="#00d4ff"
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>🌈 Saturation</Text>
                <Text style={styles.sliderValue}>{saturation.toFixed(2)}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={3}
                value={saturation}
                onValueChange={setSaturation}
                minimumTrackTintColor="#00d4ff"
                maximumTrackTintColor="#2a2a3e"
                thumbTintColor="#00d4ff"
              />
            </View>
          </View>
        )}

        {/* Tools */}
        {image && (
          <View style={styles.tools}>
            <TouchableOpacity style={styles.toolButton} onPress={rotateImage}>
              <Text style={styles.toolIcon}>🔄</Text>
              <Text style={styles.toolText}>Rotate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={flipImage}>
              <Text style={styles.toolIcon}>↔️</Text>
              <Text style={styles.toolText}>Flip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={saveImage}>
              <Text style={styles.toolIcon}>💾</Text>
              <Text style={styles.toolText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolButton} onPress={pickImage}>
              <Text style={styles.toolIcon}>🔄</Text>
              <Text style={styles.toolText}>New</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b8b9f',
  },
  imageContainer: {
    height: 280,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#1a1a2e',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#8b8b9f',
  },
  actionButtons: {
    paddingHorizontal: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#00d4ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0f0f23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a2a3e',
  },
  secondaryButtonText: {
    color: '#8b8b9f',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filtersContainer: {
    maxHeight: 100,
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1a1a2e',
    borderWidth: 2,
    borderColor: '#2a2a3e',
    minWidth: 80,
  },
  filterButtonActive: {
    borderColor: '#00d4ff',
    backgroundColor: '#1a2a3e',
  },
  filterIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  filterName: {
    fontSize: 12,
    color: '#8b8b9f',
    fontWeight: '600',
  },
  filterNameActive: {
    color: '#00d4ff',
  },
  adjustments: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  adjustmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resetButton: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '600',
  },
  sliderContainer: {
    marginBottom: 12,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  sliderValue: {
    fontSize: 12,
    color: '#00d4ff',
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  tools: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  toolButton: {
    alignItems: 'center',
    padding: 12,
  },
  toolIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  toolText: {
    fontSize: 12,
    color: '#8b8b9f',
    fontWeight: '600',
  },
});
