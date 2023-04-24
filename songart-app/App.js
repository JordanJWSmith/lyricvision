import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';

// run: expo start --port 8000

export default function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch('http://192.168.0.56:8000/api/generate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input1, input2 }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setImageUri(reader.result);
          setLoading(false);
        };
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const ImageViewer = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUri }} resizeMode="contain" />
          </View>
        </View>
      </Modal>
    );
  };

  const LoadingView = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 50 }} />
        <Text style={styles.loadingText}>Generating Image...</Text>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SongArt</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput1}
        value={input1}
        placeholder="Song Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput2}
        value={input2}
        placeholder="Artist"
      />
      <Button title="Generate Art" onPress={handleSubmit} />
      {imageUri !== '' && (
        <TouchableOpacity onPress={() => setVisible(true)}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUri }} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      )}
      <ImageViewer />
      {loading && <LoadingView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
    modal: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    loadingText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
    },
  });
