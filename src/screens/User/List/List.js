import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  StyleSheet
} from "react-native";
import Header from "../Components/HeaderComponent";
import Database from "../Database/listDB";
import { Divider } from "react-native-elements";
import RNSecureKeyStore from "react-native-secure-key-store";
import * as Animated from "react-native-animatable";
import { FAB } from "react-native-paper";
import { ListItem } from "react-native-elements";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function List(props) {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [chore, setChore] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const db = new Database();

  useEffect(() => {
    RNSecureKeyStore.get("user_id").then(res => {
      setUserId(res);
    });
    // db.delete()
    fetchList();
  }, []);

  const fetchList = () => {
    db.getList(userId).then(data => {
      setData(data);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchList();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const postItem = () => {
    if (chore.length <= 1) {
      alert("Item too short!");
    } else {
      const data = {
        itemId: Date.now(),
        userId: userId,
        itemTitle: chore,
        itemStatus: "new"
      };

      db.addItem(data)
        .then(result => {
          fetchList();
          setChore("");
        })
        .catch(err => console.log(err));
    }
  };

  const updateItemStatus = (id, status) => {
    db.updateItemStatus(id, status).then(result => {
      fetchList();
    });
  };

  const deleteItem = id => {
    db.deleteItem(id).then(result => {
      fetchList();
    });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="FiiX List" value="list" />
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TextInput
          placeholder="Whats on your agenda?"
          style={styles.textInput}
          onChangeText={chore => setChore(chore)}
          value={chore}
          multiline
          placeholderTextColor="grey"
        />
        <FAB
          style={styles.fab}
          icon="plus"
          color="black"
          small
          onPress={() => postItem()}
        />
      </View>
      <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ marginVertical: 10 }}>
            {data &&
              data.map((elm, index) => {
                return (
                  <ListItem
                    key={index}
                    title={elm.itemTitle}
                    titleStyle={{
                      fontWeight: "bold",
                      color: elm.itemStatus === "new" ? "black" : "grey"
                    }}
                    bottomDivider
                    leftIcon={{
                      name: elm.itemStatus === "new" ? "crop-din" : "done",
                      color: elm.itemStatus === "new" ? "black" : "green",
                      onPress: () => {
                        elm.itemStatus === "new"
                          ? updateItemStatus(elm.itemId, "done")
                          : updateItemStatus(elm.itemId, "new");
                      }
                    }}
                    rightIcon={{
                      name: "delete",
                      color: "black",
                      onPress: () => {
                        deleteItem(elm.itemId);
                      }
                    }}
                  />
                );
              })}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  },
  fab: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    marginRight: 20
  }
});
