import React from "react";
import ActionSheet from "react-native-actionsheet";
import { Linking } from "react-native";
import { Icon } from "react-native-elements";
import DialogInput from "react-native-dialog-input";
import Database from "../../Database/favoriteDB";

const favDB = new Database();

export default class RightComponent extends React.Component {
  state = {
    dialog: false,
    flag: false
  };

  UNSAFE_componentWillMount = () => {
    // this.fetchFav();
  };

  fetchFav = () => {
    favDB.getFavorites().then(data => {
      data.forEach(element => {
        if (element.contractorId === this.props.contractor.id) {
          this.setState({ flag: true });
        }
      });
    });
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
            this.state.flag === true
              ? "Remove From Favorite"
              : "Mark As Favorite",
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
            } else if (index === 2) {
              Linking.openURL(
                `whatsapp://send?phone=${this.props.contractor.number}`
              );
            } else if (index === 1) {
              // favDB.delete()
              Linking.openURL(`tel:${this.props.contractor.number}`);
            } 
            // else if (index === 0) {
            //   if (this.state.flag === true) {
            //     favDB.removeContractor(this.props.contractor.id);
            //     this.setState({ flag: !this.state.flag });
            //     this.fetchFav();
            //   } else {
            //     const contractor = {
            //       id: this.props.contractor.id,
            //       name: this.props.contractor.name,
            //       image: this.props.contractor.profileImage
            //     };
            //     favDB.addFavorite(contractor);
            //     this.fetchFav();
            //   }
            // }
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
