import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';

function PlaylistItem({ playlist }) {
  const { images, name, description, owner, tracks, external_urls } = playlist;
  const imageURL = images?.[0]?.url;
  const playlistUrl = external_urls?.spotify.toString();

  console.log(playlistUrl);

  /**
   * Click playlist to redirect to playlist page
   */
  const onPress = () => {
    if (playlistUrl) {
      Linking.openURL(playlistUrl);
    }
  };

  // Truncate playlist description if it is too long
  const truncateDescription =
    description?.length > 50 ? description.slice(0, 80) + '...' : description;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {imageURL && (
        <Image source={{ uri: imageURL }} style={styles.coverImage} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>
          {truncateDescription || 'No description provided.'}
        </Text>
        <Text style={styles.description}>Creator: {owner.display_name}</Text>
        <Text style={styles.description}>{tracks.total} Tracks</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FBF6E2',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E68369',
    borderStyle: 'solid',
    borderRadius: 10,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },

  coverImage: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#131842',
    borderStyle: 'solid',
  },

  title: {
    padding: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#131842',
    borderBottomWidth: 2,
    borderColor: '#E68369',
  },

  description: {
    fontSize: 16,
    padding: 5,
    color: '#E68369',
  },
});

export default PlaylistItem;
