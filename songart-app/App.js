import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Modal, TouchableOpacity, ActivityIndicator, CameraRoll } from 'react-native';
import mainLogo from './assets/lyricvision_logo.png'
// import 'typeface-roboto'

// run: expo start --port 8000

export default function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [songInfo, setSongInfo] = useState(' ');

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;

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
          setSongInfo(`${capitalize(input1)} by ${capitalize(input2)}`)
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

  

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>lyric vision</Text> */}
      <Image source={mainLogo} style={styles.logo}/>
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
      {/* <View style={styles.genButton}>
        <Button 
          color='#19b4bb'
          title="Generate Art" 
          onPress={() => {
              handleSubmit();
              // setInput1('');
              // setInput2('');
              // setSongInfo(null);
            }} 
        />
      </View> */}
      <View style={styles.genButton}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={{ backgroundColor: '#19b4bb', borderRadius: 10 }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>
            Generate Art
          </Text>
        </TouchableOpacity>
      </View>
      
      {songInfo ? <Text style={styles.songTitle}>{songInfo}</Text> : null}
      <View style={styles.galleryBox}>
        {loading ? (
          <ActivityIndicator size="large" color="grey" style={styles.loadingIndicator} />
        ) : imageUri ? (
          <Image style={styles.image} source={{ uri: imageUri }} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      <ImageViewer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#f6f6f6',
    borderWidth: 0,
    borderBottomWidth : 1.0,
    // borderRadius: 8,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    fontFamily: 'Silkscreen'
  },
  genButton: {
    borderRadius: 10,
    // color: '#19b4bb'
  },
  songTitle: {
    marginTop: 40,
    fontWeight: 'bold'
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
    marginTop: 50,
  },
  galleryBox: {
    marginTop: 20,
    width: 350,
    height: 350,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#d9cbc5',
    borderRadius: 8,
    // background: "linear-gradient(#e66465, #9198e5)"
  },
  logo: {
    width:250,
    height: 100
  }

});
