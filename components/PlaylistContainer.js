import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import PlaylistItem from './PlaylistItem';

function PlaylistContainer({ playlists }) {
  // Filter out null values from the playlists array
  const validPlaylists = playlists?.filter(item => item !== null);

  if (!validPlaylists || validPlaylists.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No playlists available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={validPlaylists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaylistItem playlist={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default PlaylistContainer;
