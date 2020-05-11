import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function Terms(props) {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 25
          }}
        >
          <Text>
            <Text style={{ color: "grey", fontSize: 15 }}>
              Last updated: December 20, 2019{"\n"}
            </Text>
            {"\n"}
            Please read these Terms and Conditions carefully before using the
            application. Your access to and use of the application is
            conditioned on your acceptance of and compliance with these Terms.
            These Terms apply to all visitors, users and others who access or
            use the application. By accessing or using the application you agree
            to be bound by these Terms. If you disagree with any part of the
            terms then please do not access the application.{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Termination
            </Text>
            {"\n"}
            {"\n"}
            We may terminate or suspend access to our application immediately
            without limitation, if you breach the Terms. All provisions of the
            Terms which by their nature should survive termination shall survive
            termination, including, without limitation, ownership provisions,
            warranty disclaimers, indemnity and limitations of liability.{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Governing Law
            </Text>{" "}
            {"\n"}
            {"\n"}
            These Terms shall be governed and construed under the laws of
            Jordan, without regard to its conflict of law provisions. Our
            failure to enforce any right or provision of these Terms will not be
            considered a waiver of those rights. If any provision of these Terms
            is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect. These Terms
            constitute the entire agreement between us regarding our
            application, and supersede and replace any prior agreements we might
            have between us regarding the application.{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Changes</Text>
            {"\n"}
            {"\n"}
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is a material we will try to
            provide at least 15 days' notice before any new terms taking effect.
            What constitutes a material change will be determined at our sole
            discretion. By continuing to access or use our application after
            those revisions become effective, you agree to be bound by the
            revised terms. If you do not agree to the new terms, please stop
            using the application.{"\n"}
            {"\n"}
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Contact</Text>
            {"\n"}
          </Text>
          <TouchableOpacity
          onPress={() => Linking.openURL(`tel:0790524873`)}
            style={{
              width: wp('70&'),
              backgroundColor: "black",
              height: hp("4%"),
              marginHorizontal: 20,
              borderRadius: 35,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Call FiiX
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Terms;
