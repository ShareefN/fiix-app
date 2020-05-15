import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  RefreshControl,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView
} from "react-native";
import Header from './Components/Header';
import * as Animated from "react-native-animatable";
import { FAB } from "react-native-paper";
import { Divider } from "react-native-elements";
import RNSecureKeyStore from "react-native-secure-key-store";
import { ListItem } from "react-native-elements";
import {
  postReminder,
  updateReminder,
  deleteReminders,
  getReminders
} from '../../Api/api';
import { DotIndicator } from "react-native-indicators";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function ContractorTodoList(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [list, setList] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    setLoadingIndocator(true);
    RNSecureKeyStore.get("contractor_id").then(async res => {
      await getReminders("contractor", res)
        .then(({ data }) => {
          setList(data);
          setLoadingIndocator(false);
        })
        .catch(err => setLoadingIndocator(false));
    });
  };

  const postItem = () => {
    if (item && item.length <= 3) {
      Alert.alert("Item too short!");
    } else {
      setLoadingIndocator(true);
      RNSecureKeyStore.get("contractor_id").then(async res => {
        await postReminder("contractor", res, item);
        setItem(null);
        fetchList();
      });
    }
  };

  const update = (reminderId, status) => {
    setLoadingIndocator(true);
    RNSecureKeyStore.get("contractor_id").then(async res => {
      await updateReminder("contractor", res, reminderId, status);
      fetchList();
    });
  };

  const deleteItem = reminderId => {
    setLoadingIndocator(true);
    RNSecureKeyStore.get("contractor_id").then(async res => {
      await deleteReminders("contractor", res, reminderId);
      fetchList();
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchList();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View
      style={{ backgroundColor: "white", flex: 1 }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
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
          onChangeText={item => setItem(item)}
          value={item}
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
          <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            {list &&
              list.map((elm, index) => {
                return (
                  <ListItem
                    key={index}
                    title={elm.item}
                    titleStyle={{
                      fontSize: 18,
                      color: elm.status === "new" ? "black" : "grey"
                    }}
                    subtitle={elm.review}
                    bottomDivider
                    rightIcon={{
                      name: "delete",
                      color: "grey",
                      onPress: () => {
                        deleteItem(elm.id);
                      }
                    }}
                    leftIcon={{
                      name: elm.status === "new" ? "crop-din" : "done",
                      color: elm.status === "new" ? "black" : "green",
                      onPress: () => {
                        elm.status === "new"
                          ? update(elm.id, "done")
                          : update(elm.id, "new");
                      }
                    }}
                  />
                );
              })}
          </View>
        </ScrollView>
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default ContractorTodoList;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
