import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";

import axios from "axios";

const Main = () => {
  const [userList, setUserList] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const response = await axios.get(
        "https://exercise-b342.restdb.io/rest/group-1",
        {
          headers: { "x-apikey": "63722be4c890f30a8fd1f370" },
        }
      );
      setUserList(response.data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="filter users by city..."
      />
      {loading ? (
        <Text>loading data....</Text>
      ) : (
        <FlatList
          data={userList.filter((user) =>
            user.CITY.toLowerCase().includes(input.toLowerCase())
          )}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

const ListItem = ({ item }) => {
  return (
    <View style={styles.listItemContainer}>
      <Text
        style={{ ...styles.item, fontSize: 25 }}
      >{`${item.NAME} ${item.SURNAME}`}</Text>
      <View>
        <Text style={styles.item}>AGE {item.AGE}</Text>
        <Text style={styles.item}>{item.CITY}</Text>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  listItemContainer: {
    marginVertical: 2,
    padding: 5,
    borderStyle: "solid",
    borderColor: "#A9A9A9",
    borderWidth: 2,
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 50,
  },
});
