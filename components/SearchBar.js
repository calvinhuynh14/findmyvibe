import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function SearchBar({ search, setSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search... (e.g. ABC The Jackson 5)"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    color: '#FBF6E2',
    borderColor: '#E68369',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchBar;
