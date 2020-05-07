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
    timeIn: new Date(),
    timeOut: new Date()
  });

  const handleTimeIn = date => {
    setContractor({
      ...contractor,
      timeIn: date
    });
    setTimeInDialog(false);
  };

  const handleTimeOut = date => {
    setContractor({
      ...contractor,
      timeOut: date
    });
    setTimeOutDialog(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="Contractor Info." navigation={props.navigation} />
      <View style={{ marginHorizontal: hp('2%'), flex: 1 }}>
        <Input
          placeholder="First Name"
          label="First Name"
          value={contractor.firstname}
          containerStyle={{ height: hp("4%"), marginVertical: hp('3%') }}
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
              setContractor({ ...contractor, category: value.label });
            }}
          />
        </View>
        <View>
          <Text style={{ color: "grey", fontWeight: "bold", fontSize: 17 }}>
            Location
          </Text>
          <ModalSelector
            data={locations}
            initValue="Choose Location"
            onChange={value => {
              setContractor({ ...contractor, location: value.label });
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: hp("1%")
          }}
        >
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setTimeInDialog(true)}>
              <Text style={{fontSize: 20}}>Set Time In</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 15}}>{moment(contractor.timeIn).format("hh:mm A")}</Text>
          </View>
          <DateTimePickerModal
            isVisible={timeInDialog}
            mode="time"
            value={contractor.timeIn}
            onConfirm={handleTimeIn}
            onCancel={() => setTimeInDialog(false)}
          />
           <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setTimeOutDialog(true)}>
              <Text style={{fontSize: 20}}>Set Time Out</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 15}}>{moment(contractor.timeOut).format("hh:mm A")}</Text>
          </View>
          <DateTimePickerModal
            isVisible={timeOutDialog}
            mode="time"
            value={contractor.timeOut}
            onConfirm={handleTimeOut}
            onCancel={() => setTimeOutDialog(false)}
          />
        </View>
        <TouchableOpacity
        onPress={() => console.log(contractor)}
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 15
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Next
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Application2;
