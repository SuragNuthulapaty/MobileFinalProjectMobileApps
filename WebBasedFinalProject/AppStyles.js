import {StyleSheet, Dimensions} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
  },
  topSpace: {
    height: deviceHeight / 20,
    width: deviceWidth,
    backgroundColor: 'black',
  },
  loginTxtInput: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: (2 * deviceWidth) / 3,
    height: deviceHeight / 11,
    color: 'black',
    fontSize: deviceHeight / 20,
    margin: 15,
    paddingLeft: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  loginPage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (19 * deviceHeight) / 20,
    width: deviceWidth,
  },
  signUpButton: {
    width: (2 * deviceWidth) / 3,
    height: deviceHeight / 13,
    marginTop: deviceHeight / 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  signUpText: {
    fontSize: deviceHeight / 25,
  },
  gamePage: {
    height: (19 * deviceHeight) / 20,
    width: deviceWidth,
  },
  gameTopView: {
    width: deviceWidth,
    height: deviceHeight / 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameMidView: {
    width: deviceWidth,
    height: (191 * deviceHeight) / 280,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopWidth: 0,
  },
  gameBotView: {
    width: deviceWidth,
    height: deviceHeight / 7,
    flexDirection: 'row',
  },
  barButtonSet: {
    width: deviceWidth / 3,
    height: deviceHeight / 7,
    borderWidth: 2,
    borderTopWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barButtonUp: {
    width: (2 * deviceWidth) / 3,
    height: deviceHeight / 7,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeBtnTxt: {
    color: 'black',
    fontSize: deviceHeight / 25,
  },
  passTxtInput: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: (1 * deviceWidth) / 2,
    height: deviceHeight / 12,
    color: 'black',
    fontSize: deviceHeight / 20,
    paddingLeft: 5,
    backgroundColor: 'white',
  },
  passTxtInputView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: (2 * deviceWidth) / 3,
    height: deviceHeight / 11,
    color: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  passImage: {
    width: (1 * deviceHeight) / 15,
    height: deviceHeight / 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyTxt: {
    fontSize: deviceHeight / 15,
  },
  currencyTypTxt: {
    fontSize: deviceHeight / 25,
  },
  settingsPage: {
    padding: 25,
    height: (19 * deviceHeight) / 20,
    width: deviceWidth,
    alignItems: 'center',
  },
  settingsText: {
    fontSize: deviceHeight / 25,
  },
  curEmailView: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBotView: {
    height: deviceHeight / 10,
    width: deviceWidth,
  },
  upgradeBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderTopWidth: 5,
  },
  upgradeBackTxt: {
    fontSize: deviceHeight / 25,
  },
  upgradeScroll: {
    height: (85 * deviceHeight) / 100,
    width: deviceWidth,
  },
  upgradeOption: {
    width: deviceWidth,
    height: deviceHeight / 7,
    borderBottomWidth: 2,
  },
  upgradePage: {
    alignItems: 'center',
    height: (19 * deviceHeight) / 20,
    width: deviceWidth,
  },
  upgradeMoneyTxt: {
    fontSize: deviceHeight / 15,
  },
  upgradeMoneyView: {
    height: deviceHeight / 7,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
  },
  upgradeOptionBot: {
    width: deviceWidth,
    height: deviceHeight / 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeOptionTop: {
    flexDirection: 'row',
    width: deviceWidth,
    height: deviceHeight / 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  costUpgradesTxt: {
    fontSize: deviceHeight / 25,
  },
  topUpgradesTxt: {
    margin: 15,
    fontSize: deviceHeight / 45,
  },
  upgradeImage: {
    height: deviceHeight / 20,
    width: deviceHeight / 20,
    justifyContent: 'flex-end',
  },
  upgradeTopLeftView: {
    height: deviceHeight / 14,
    width: (2 * deviceWidth) / 3,
  },
});
