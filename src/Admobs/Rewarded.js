import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import {
  RewardedAd,
  RewardedAdEventType
} from "@react-native-firebase/admob";

const adId = "ca-app-pub-6510981239392097/4229197199";

const rewarded = RewardedAd.createForAdRequest(adId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing", "gaming"]
});

function Admobs() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log("User earned reward of ", reward);
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      title="Show Rewarded Ad"
      onPress={() => {
    rewarded.show()
      }}
    />
  );
}

export default Admobs;
