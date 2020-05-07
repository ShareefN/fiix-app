import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";
import Header from "../Categories/Components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalSelector from "react-native-modal-selector";
import { categories } from "../Categories/Components/categories";
import { locations } from "./Components/locations";
import moment from "moment";

function Application2(props) {
  const [timeInDialog, setTimeInDialog] = useState(false);
  const [timeOutDialog, setTimeOutDialog] = useState(false);
  const [contractor, setContractor] = useState({
    firstname: "",
    lastname: "",
    category: "",
    location: "",
    timeIn: new Date(1598051730000),
    timeOut: new Date(1598051730000)
  });

  const handleTimeIn = async date => {
    setContractor({
      ...contractor,
      timeIn: await moment(date).format("hh:mm A")
    });
    setTimeInDialog(false);
  };

  const handleTimeOut = async date => {
    setContractor({
      ...contractor,
      timeOut: await moment(date).format("hh:mm A")
    });
    setTimeOutDialog(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="Contractor Info." navigation={props.navigation} />
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Input
          placeholder="First Name"
          label="First Name"
          value={contractor.firstname}
          containerStyle={{ height: hp("4%"), marginVertical: 25 }}
          onChangeText={value =>
            setContractor({ ...contractor, firstname: value })
          }
        />
        <Input
          placeholder="Last Name"
          label="Last Name"
          value={contractor.lastname}
          containerStyle={{ height: hp("4%"), marginVertical: 25 }}
          onChangeText={value =>
            setContractor({ ...contractor, lastname: value })
          }
        />
        <View style={{ marginVertical: hp("4%"), marginHorizontal: wp("2%") }}>
          <Text style={{ color: "grey", fontWeight: "bold", fontSize: 17 }}>
            Category
          </Text>
          <ModalSelector
            data={categories}
            initValue="Choose Category"
            onChange={value => {
              setContractor({ ...contractor, category: value });
            }}
          />
        </View>
        <View style={{ marginHorizontal: wp("2%") }}>
          <Text style={{ color: "grey", fontWeight: "bold", fontSize: 17 }}>
            Location
          </Text>
          <ModalSelector
            data={locations}
            initValue="Choose Location"
            onChange={value => {
              setContractor({ ...contractor, location: value });
            }}
          />
        </View>
        <TouchableOpacity onPress={() => setTimeInDialog(true)}>
          <Text>Set Time In</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={timeInDialog}
          mode="time"
          value={contractor.timeIn}
          onConfirm={handleTimeIn}
          onCancel={() => setTimeInDialog(false)}
        />
        <TouchableOpacity onPress={() => setTimeOutDialog(true)}>
          <Text>Set Time Out</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={timeOutDialog}
          mode="time"
          value={contractor.timeOut}
          onConfirm={handleTimeOut}
          onCancel={() => setTimeOutDialog(false)}
        />
      </View>
    </View>
  );
}

export default Application2;
