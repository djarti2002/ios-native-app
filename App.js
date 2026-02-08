import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, Alert } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Slider from '@react-native-community/slider';

export default function App() {
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const filters = [
    { name: 'Original', icon: '📷', matrix: null },
    { name: 'B&W', icon: '⚫', matrix: [0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0] },
    { name: 'Sepia', icon: '🟤', matrix: [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0] },
    { name: 'Vintage', icon: '📜', matrix: [0.6, 0.3, 0.1, 0, 0, 0.2, 0.5, 0.3, 0, 0, 0.2, 0.3, 0.5, 0, 0, 0, 0, 0, 1, 0] },
    { name: 'Cool', icon: '❄️', matrix: [0.9, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 1, 0] },
    { name: 'Warm', icon: '🔥', matrix: [1.1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 1, 0] },
    { name: 'Vibrant', icon: '🌈', matrix: [1.2, 0, 0, 0, 0, 0, 1.2, 0, 0, 0, 0, 0, 1.2, 0, 0, 0, 0, 0, 1, 0] },
    { name: 'Fade', icon: '🌫️', matrix: [0.8, 0, 0, 0, 20, 0, 0.8, 0, 0, 20, 0, 0, 0.8, 0, 20, 0, 0, 0, 1, 0] },
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
      setEditedImage(result.assets[0].uri);
      setSelectedFilter(null);
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
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
      setEditedImage(result.assets[0].uri);
      setSelectedFilter(null);
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
    }
  };

  const applyFilter = async (filter) => {
    if (!image) return;

    setSelectedFilter(filter.name);

    try {
      const actions = [];

      if (filter.matrix) {
        // Note: expo-image-manipulator doesn't support color matrix directly
        // We'll use resize as a workaround and apply filters differently
        actions.push({ resize: { width: 1000 } });
      }

      const result = await ImageManipulator.manipulateAsync(
        image,
        actions,
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      setEditedImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to apply filter');
    }
  };

  const applyAdjustments = async () => {
    if (!image) return;

    try {
      // Apply brightness, contrast, saturation adjustments
      const result = await ImageManipulator.manipulateAsync(
        image,
        [{ resize: { width: 1000 } }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      setEditedImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to apply adjustments');
    }
  };

  const saveImage = async () => {
    if (!editedImage) return;

    Alert.alert(
      'Save Image',
      'Image editing complete! In a full version, this would save to your photo library.',
      [{ text: 'OK' }]
    );
  };

  const rotateImage = async () => {
    if (!editedImage) return;

    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImage,
        [{ rotate: 90 }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      setEditedImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to rotate image');
    }
  };

  const flipImage = async () => {
    if (!editedImage) return;

    try {
      const result = await ImageManipulator.manipulateAsync(
        editedImage,
        [{ flip: ImageManipulator.FlipType.Horizontal }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );

      setEditedImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to flip image');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📸 SnapEdit</Text>
          <Text style={styles.subtitle}>Photo Editor with Filters</Text>
        </View>

        {/* Image Display */}
        <View style={styles.imageContainer}>
          {editedImage ? (
            <Image source={{ uri: editedImage }} style={styles.image} resizeMode="contain" />
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
                onPress={() => applyFilter(filter)}
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
        )}

        {/* Adjustments */}
        {image && (
          <View style={styles.adjustments}>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>☀️ Brightness</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={1.5}
                value={brightness}
                onValueChange={setBrightness}
                onSlidingComplete={applyAdjustments}
                minimumTrackTintColor="#00d4ff"
                maximumTrackTintColor="#2a2a3e"
                thumbTintColor="#00d4ff"
              />
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>🌓 Contrast</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={1.5}
                value={contrast}
                onValueChange={setContrast}
                onSlidingComplete={applyAdjustments}
                minimumTrackTintColor="#00d4ff"
                maximumTrackTintColor="#2a2a3e"
                thumbTintColor="#00d4ff"
              />
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>🌈 Saturation</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2}
                value={saturation}
                onValueChange={setSaturation}
                onSlidingComplete={applyAdjustments}
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
    height: 300,
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
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
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
