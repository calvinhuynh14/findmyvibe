import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

function CustomButton({ title, onPress, color = '#E68369' }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#ECCEAE' : color },
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    color: '#131842',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FBF6E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
