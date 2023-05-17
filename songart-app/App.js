import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Modal, TouchableOpacity, ActivityIndicator, CameraRoll } from 'react-native';
import mainLogo from './assets/lyricvision_coral.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastContainer, toast } from 'react-native-toast-message';


// run: expo start --port 8000

export default function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [songInfo, setSongInfo] = useState(' ');
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

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
          setSaveButtonDisabled(false);
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

  const handleSave = () => {
    // Handle saving the image
  
    toast.show({
      type: 'success',
      text1: 'Saved!',
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  

  return (
    <View style={styles.container}>
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
      <View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
            setSongInfo(' ');
          }}
          // style={{ backgroundColor: '#7ba6ff', borderRadius: 10, marginTop: 10 }}
          style={ loading ? genButtonDisabledStyle : genButtonActiveStyle }
          disabled={loading}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10 }}>
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
          <View style={styles.galleryBox}>
            <Image
              source={require('./assets/splat.png')}
              style={styles.splat}
              resizeMode="contain"
            /> 
          </View>
        )}
      </View>
      <ImageViewer />

      <View>
        <TouchableOpacity
          onPress={() => {
            handleSave();
          }}
          style={ saveButtonDisabled ? saveButtonDisabledStyle : saveButtonActiveStyle}
          disabled={(saveButtonDisabled || loading)}
        >
          <Icon name="download" size={20} color="white" style={{ paddingHorizontal: 20, paddingVertical: 15 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Built by Jordan</Text>
      </View>
      {/* <ToastContainer position="bottom" /> */}
    </View>
  );
}

const saveButtonDisabledStyle = {
  backgroundColor: '#e4ebec',
  borderRadius: 10,
  marginTop: 0,
  marginBottom: 15,
};

const saveButtonActiveStyle = {
  backgroundColor: '#ff857b',
  borderRadius: 10,
  marginTop: 0,
  marginBottom: 15,
};

const genButtonActiveStyle = { 
  backgroundColor: '#7ba6ff', 
  borderRadius: 10, 
  marginTop: 10 
}

const genButtonDisabledStyle = { 
  backgroundColor: '#e4ebec', 
  borderRadius: 10, 
  marginTop: 10 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-between',
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
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  genButton: {
    borderRadius: 10,
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
    marginTop: 10,
    width: 350,
    height: 350,
    borderWidth: 0,
    // borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e4ebec',
    borderRadius: 8,
  },
  logo: {
    width:'100%',
    height: 90,
    marginBottom: 10,
    marginTop: 45
  },
  navbar: {
    backgroundColor: '#b4deef',
    height: 20,
    justifyContent: 'center',
    width: '100%'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingBottom: 5,
  },
  footerText: {
    color: 'grey',
    fontSize: 12,
  },
  splat: {
    width: '80%',
    height: '80%',
    opacity: 0.3,
  }

});
