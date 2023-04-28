import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    getApiKey();
  }, []);

  const getApiKey = async () => {
    try {
      const value = await AsyncStorage.getItem('OPENAI_API_KEY');
      if (value !== null) {
        setApiKey(value);
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  };

  const saveApiKey = async () => {
    try {
      await AsyncStorage.setItem('OPENAI_API_KEY', apiKey);
      Alert.alert('Success', 'API key saved successfully!');
    } catch (error) {
      console.error('Error saving API key:', error);
      Alert.alert('Error', 'Failed to save API key.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>OpenAI API Key:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setApiKey(text)}
        value={apiKey}
        placeholder="Enter your OpenAI API Key"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={saveApiKey} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;
