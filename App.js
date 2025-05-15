import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import io from 'socket.io-client';

const App = () => {
  useEffect(() => {
    const socket = io('https://nm.ajs-engineer.com');  // Replace with your actual URL
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('packet', (data) => {
      console.log('Packet data:', data);
      // Handle packet data or send to WebView here
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Network Monitor</Text>
      <WebView
        source={{ uri: 'https://nm.ajs-engineer.com' }}  // Your web content
        javaScriptEnabled={true}
        style={{ flex: 1 }}
        onMessage={(event) => {
          console.log('Received from WebView:', event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    color: '#00f0ff',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default App;
