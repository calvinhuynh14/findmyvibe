import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "./components/SearchBar";
import CustomButton from "./components/CustomButton";
import PlaylistContainer from "./components/PlaylistContainer";

function App() {
  // NOTE: Spotify credential values have been omitted due to security reasons.
  //       Please refer to the README.md file for instructions for this app.
  // API variables
  const CLIENT_ID = "YOUR_SPOTIFY_CRED";
  const CLIENT_SECRET = "YOUR_SPOTIFY_CRED";

  // useStates for app
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  /**
   * useEffect to get access token from Spotify
   */
  useEffect(() => {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    };

    fetch(authOptions.url, {
      method: "POST",
      headers: authOptions.headers,
      body: authOptions.body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
          //console.log('Access Token:', data.access_token);
          //console.log('Token data:', data.token_type);
        } else {
          console.error("Token not received:", data);
        }
      })
      .catch((error) => console.error("Error fetching token:", error));
  }, []);

  /**
   * Search Spotify for playlists containing search query
   */
  const searchQuery = async () => {
    if (!token) {
      console.error("ERROR: No token found");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          search
        )}&type=playlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setPlaylists(data.playlists.items);

      console.log("Playlists", data.playlists.items);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  /**
   * Reset search results
   */
  const resetSearch = () => {
    setSearch("");
    setPlaylists([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find my Vibe</Text>

      <SearchBar search={search} setSearch={setSearch} />

      <View style={styles.buttonsContainer}>
        <CustomButton title="Search" onPress={searchQuery} color="#E68369" />
        <CustomButton title="Reset" onPress={resetSearch} color="#CB6040" />
      </View>

      {playlists.length > 0 && <PlaylistContainer playlists={playlists} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#131842",
    justifyContent: "center",
  },

  header: {
    fontSize: 40,
    color: "#E68369",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
export default App;
