import React, { useEffect } from "react";
import admob, { MaxAdContentRating } from "@react-native-firebase/admob";
import {
  BannerAd,
} from "@react-native-firebase/admob";
import { BannerAdSize } from "@react-native-firebase/admob";

function Admobs(props) {
  useEffect(() => {
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true
      })
      .then(() => {
        // Request config successfully set!
      });
  }, []);

  return <BannerAd unitId={props.id} size={BannerAdSize.LARGE_BANNER} />;
}

export default Admobs;
