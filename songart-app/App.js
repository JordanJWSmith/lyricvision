import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = () => {
      fetch('http://192.168.1.70:8000/api/reverse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input1, input2 }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Test App: String Reversal</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput1}
        value={input1}
        placeholder="Input 1"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput2}
        value={input2}
        placeholder="Input 2"
      />
      <Button title="Submit" onPress={handleSubmit} />
      {result.result1 !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Results:</Text>
          <Text style={styles.result}>{result.result1}</Text>
          <Text style={styles.result}>{result.result2}</Text>
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
  resultContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  resultHeader: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 20,
  },
});