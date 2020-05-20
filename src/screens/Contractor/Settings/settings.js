import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "./Header";
import RNSecureKeyStore from "react-native-secure-key-store";
import { Input } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import Dialog from "react-native-dialog";
import DialogInput from "react-native-dialog-input";
import Loading from "react-native-loading-spinner-overlay";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";
import {
  getContractor,
  updateContractor,
  deactivateAccount,
  contractorLogout
} from "../../../Api/contractorApi";
import moment from "moment";
import { locations } from "../../User/Application/Components/locations";
import { DotIndicator } from "react-native-indicators";

function ContractorSettings(props) {
  const [loading, setLoading] = useState(false);
  const [timeInDialog, setTimeInDialog] = useState(false);
  const [timeOutDialog, setTimeOutDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [contractor, setContractor] = useState({
    location: null,
    bio: null,
    timeIn: null,
    timeOut: null
  });
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  useEffect(() => {
    setLoading(true);
    me();
  }, []);

  const me = () => {
    RNSecureKeyStore.get("contractor_id").then(async res => {
      await getContractor(res)
        .then(({ data }) => {
          setContractor({
            ...contractor,
            location: data.location,
            bio: data.bio,
            timeIn: data.timeIn,
            timeOut: data.timeOut
          });
          setLoading(false);
        })
        .catch(err => setLoading(false));
    });
  };

  const handleTimeIn = date => {
    setContractor({
      ...contractor,
      timeIn: moment(date).format('HH:MM A')
    });
    setTimeInDialog(false);
  };

  const handleTimeOut = date => {
    setContractor({
      ...contractor,
      timeOut: moment(date).format('HH:MM A')
    });
    setTimeOutDialog(false);
  };

  const hanleUpdateContractor = () => {
    setLoading(true);
    if (
      (contractor.bio && contractor.bio.length <= 3) ||
      contractor.bio.length >= 99
    ) {
      Alert.alert("Bio length should be between 3 to 100 charachters");
    } else {
      RNSecureKeyStore.get("contractor_id").then(async res => {
        await updateContractor(res, contractor)
          .then(() => {
            setLoading(false);
            setSuccessDialog(true);
          })
          .catch(err => {
            Alert.alert(
              "Error Updating Profile",
              "Please try again later!",
              [
                {
                  text: "Ok",
                  onPress: () => setLoading(false)
                }
              ],
              { cancelable: false }
            );
          });
      });
    }
  };

  const handleDeactivate = password => {
    RNSecureKeyStore.get("contractor_id")
      .then(async res => {
        await deactivateAccount(res, password);
      })
      .then(async () => {
        await contractorLogout();
        RNRestart.Restart();
      })
      .catch(err => Alert.alert("Invalid Password"));
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <Header title="Settings" navigation={props.navigation} />
      <View
        style={{
          alignItems: "flex-end",
          marginHorizontal: 25
        }}
      >
        <TouchableOpacity
          onPress={() => hanleUpdateContractor()}
          style={{
            backgroundColor: "green",
            height: hp("4%"),
            width: wp("25%"),
            borderRadius: 5,
            marginTop: hp("2%"),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Input
          placeholder="Bio"
          label="Bio"
          value={contractor.bio}
          containerStyle={{ height: hp("4%"), marginVertical: 25 }}
          onChangeText={value => setContractor({ ...contractor, bio: value })}
        />
        <View style={{ marginVertical: "5%", marginHorizontal: 10 }}>
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
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity onPress={() => setTimeInDialog(true)}>
              <Text style={{ fontSize: 20 }}>Set Time In</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>
              {contractor.timeIn ? contractor.timeIn : "--"}
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={timeInDialog}
            mode="time"
            value={contractor.timeIn}
            onConfirm={handleTimeIn}
            onCancel={() => setTimeInDialog(false)}
          />
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity onPress={() => setTimeOutDialog(true)}>
              <Text style={{ fontSize: 20 }}>Set Time Out</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>
              {contractor.timeOut ? contractor.timeOut : "--"}
            </Text>
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
          onPress={() => props.navigation.navigate("updatePassword")}
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
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDialogVisible(true)}
          style={{
            backgroundColor: "red",
            height: hp("7%"),
            marginHorizontal: wp("3%"),
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 15
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Deactivate account
          </Text>
        </TouchableOpacity>
        <DialogInput
          isDialogVisible={dialogVisible}
          title={"Deactivate Account"}
          message={"Please confirm by entering password"}
          submitInput={inputText => {
            handleDeactivate(inputText);
          }}
          closeDialog={() => {
            setDialogVisible(false);
          }}
        ></DialogInput>
      </View>
      <Dialog.Container visible={successDialog}>
        <Dialog.Title>Success</Dialog.Title>
        <Dialog.Description>
          Contractor have been successfully updated
        </Dialog.Description>
        <Dialog.Button label="close" onPress={() => setSuccessDialog(false)} />
      </Dialog.Container>
      <Loading visible={loading} color="black" size="large" />
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}

export default ContractorSettings;
