import React from "react";
import ActionSheet from "react-native-actionsheet";
import { Linking } from "react-native";
import { Icon } from "react-native-elements";
import DialogInput from "react-native-dialog-input";

export default class RightComponent extends React.Component {
  state = {
    dialog: false
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  render() {
    return (
      <>
        <Icon name="more-horiz" onPress={() => this.showActionSheet()} />
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={[
            "Mark As Favorite",
            "Call",
            "WhatsApp",
            "Post A Review",
            "Cancel"
          ]}
          cancelButtonIndex={4}
          destructiveButtonIndex={4}
          onPress={index => {
            if (index === 3) {
              this.setState({ dialog: true });
            } else if (index === 2){
              Linking.openURL(`whatsapp://send?phone=${this.props.number}`);
            } else if (index === 1){
              Linking.openURL(`tel:${this.props.number}`)
            }
          }}
        />
        <DialogInput
          isDialogVisible={this.state.dialog}
          title={"Post a review"}
          message={"Tell others whats on you think"}
          submitInput={inputText => {
            this.props.post(inputText);
            this.setState({ dialog: false });
          }}
          closeDialog={() => {
            this.setState({ dialog: false });
          }}
        ></DialogInput>
      </>
    );
  }
}
