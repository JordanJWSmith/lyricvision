// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

// // run: expo start --port 8000

// export default function App() {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [result, setResult] = useState('');

//   const handleSubmit = () => {
//       fetch('http://192.168.0.56:8000/api/reverse', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ input1, input2 }),
//     }) 
//       .then((response) => response.json())
//       .then((data) => setResult(data))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Test App: String Reversal</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput1}
//         value={input1}
//         placeholder="Song Title"
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput2}
//         value={input2}
//         placeholder="Artist"
//       />
//       <Button title="Generate Art" onPress={handleSubmit} />
//       {result.result1 !== '' && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultHeader}>Results:</Text>
//           <Text style={styles.result}>{result.result1}</Text>
//           <Text style={styles.result}>{result.result2}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '80%',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   resultContainer: {
//     marginTop: 20,
//     alignItems: 'center'
//   },
//   resultHeader: {
//     fontSize: 26,
//     fontWeight: 'bold',
//   },
//   result: {
//     fontSize: 20,
//   },
// });



// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

// // run: expo start --port 8000

// export default function App() {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [imageUri, setImageUri] = useState('');

//   const handleSubmit = () => {
//     fetch('http://192.168.0.56:8000/api/generate/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ input1, input2 }),
//     })
//       .then(response => {
//         return response.blob();
//       })
//       .then(blob => {
//         setImageUri(URL.createObjectURL(blob));
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Test App: Art Generation!</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput1}
//         value={input1}
//         placeholder="Song Title"
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput2}
//         value={input2}
//         placeholder="Artist"
//       />
//       <Button title="Generate Art" onPress={handleSubmit} />
//       {imageUri !== '' && (
//         <View style={styles.imageContainer}>
//           <Image
//             source={{ uri: imageUri }}
//             style={{ width: 200, height: 200 }}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '80%',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center'
//   },
// });

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

// // run: expo start --port 8000

// export default function App() {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = () => {
//     fetch('http://192.168.0.56:8000/api/generate/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ input1, input2 }),
//       responseType: 'blob',
//     })
//       .then((response) => response.blob())
//       .then((blob) => {
//         const objectUrl = URL.createObjectURL(blob);
//         setImage(objectUrl);
//       })
//       .catch((error) => {
//         console.error(error);
//         setError('An error occurred while generating art');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Test App: Art Generator!</Text>
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput1}
//         value={input1}
//         placeholder="Song Title"
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={setInput2}
//         value={input2}
//         placeholder="Artist"
//       />
//       <Button title="Generate Art" onPress={handleSubmit} />
//       {error && <Text style={styles.error}>{error}</Text>}
//       {image && (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: image }} style={styles.image} />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '80%',
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: '80%',
//     height: undefined,
//     aspectRatio: 1,
//   },
//   error: {
//     color: 'red',
//     marginVertical: 10,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

// run: expo start --port 8000

export default function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleSubmit = () => {
    fetch('http://192.168.0.56:8000/api/generate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input1, input2 }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImageUri(url);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test App: Generate Art</Text>
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
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUri }} />
        </View>
      )}
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
    width: 200,
    height: 200,
  },
});
