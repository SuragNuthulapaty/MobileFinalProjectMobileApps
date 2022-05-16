import React, {Component} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from './AppStyles';

import {
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
// const [toggleCheckBox, setToggleCheckBox] = false;
let pizza = 'pizza yaya'

export default class App extends Component {
  state = {
    passVal: '123456',
    emailVal: 'a@b.com',
    isPassword: false,
    userCur: '',
    emailPath: '',

    loginPageDisplay: 'flex',
    settingsPageDisplay: 'none',
    gamePageDisplay: 'none',
    upgradePageDisplay: 'none',

    currencyAmt: '0.00',
    currencyType: 'iron',

    initialUpgrades: [
      {
        name: 'Decrease Upgrade Cost',
        index: 0,
        costPerLevel: 1.5,
        currentLevel: 0,
        maxUpgradeLevel: 10,
        currentEffect: 1,
        addedEffectPerUpgrade: -0.02,
        costType: 'exp',
        neededForNextUpgrade: 15,
        flatMult: 10,
        prefix: 'Cost :',
        info: 'Lowers cost of every upgrade by 2% (non compounding)',
      },
      {
        name: 'More Money',
        index: 1,
        costPerLevel: 50,
        currentLevel: 0,
        maxUpgradeLevel: 1000,
        currentEffect: 0,
        addedEffectPerUpgrade: 1,
        costType: 'lin',
        neededForNextUpgrade: 50,
        initialAmount: 50,
        prefix: 'Cost :',
        info: 'Increase Earned Money Per Click By 1',
      },
      {
        name: 'Multiplier',
        index: 2,
        costPerLevel: 3,
        currentLevel: 0,
        maxUpgradeLevel: 20,
        currentEffect: 1,
        addedEffectPerUpgrade: 1,
        costType: 'exp',
        neededForNextUpgrade: 2,
        flatMult: 2,
        prefix: 'Cost :',
        info: 'Multiplies Earned Money Per Click By Level +1',
      },
      {
        name: 'Offline Active',
        index: 3,
        costPerLevel: 5000,
        currentLevel: 0,
        maxUpgradeLevel: 1,
        currentEffect: 0,
        addedEffectPerUpgrade: 1,
        costType: 'lin',
        neededForNextUpgrade: 5000,
        flatMult: 2,
        isOffline: false,
        prefix: 'Cost :',
        info: 'Activates Offline Earnings',
      },
      {
        name: 'More Offline Money',
        index: 4,
        costPerLevel: 50,
        currentLevel: 0,
        maxUpgradeLevel: 1000,
        currentEffect: 0,
        addedEffectPerUpgrade: 1,
        costType: 'lin',
        neededForNextUpgrade: 50,
        initialAmount: 50,
        prefix: 'Cost :',
        info: 'Increases Flat Money Per Unit Time Away',
      },
      {
        name: 'Offline Multiplier',
        index: 5,
        costPerLevel: 3,
        currentLevel: 0,
        maxUpgradeLevel: 20,
        currentEffect: 1,
        addedEffectPerUpgrade: 1,
        costType: 'exp',
        neededForNextUpgrade: 2,
        flatMult: 2,
        prefix: 'Cost :',
        info: 'Multiplies Flat Money Per Unit Time Away',
      },
    ],

    upgrades: [],
  };
  passInfo = () => {
    Alert.alert(
      'Password',
      'Password must be 6 characters or more',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  makingAccount = () => {
    database()
      .ref('/users/' + this.state.emailPath)
      .set({
        CurMoney: 0,
        UpgradeArray: this.state.initialUpgrades,
      })
      .then(() => console.log('dataset'));
  };

  signOut = () => {
    this.setLastInputTime(auth().currentUser.uid);

    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        this.setState({
          userCur: '',
          emailPath: '',
          currencyAmt: '0.00',
          passVal: '123456',
          isPassword: false,
          emailVal: 'a@b.com',
          upgrades: this.state.initialUpgrades,
        });
        this.handleLoginPagePress();
      })
      .then(() => console.log('signed Out'))
      .catch((error) => {
        console.log(error);
      });
  };

  signUp = () => {
    auth()
      .createUserWithEmailAndPassword(this.state.emailVal, this.state.passVal)
      .then(() => {
        console.log('User account created & signed in!');
        const user = auth().currentUser;
        this.setState({
          userCur: user,
          emailPath: user.uid,
        });
        console.log(user.uid);
        this.makingAccount();
        this.gamePageLoad();
        console.log(user.email);
        this.setLastInputTime(auth().currentUser.uid);
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.message.replace(error.code, '').replace('[]', ''),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );

        console.log(error);
      });
  };

  setLastInputTime = () => {
    let lastAction = new Date().getTime();
    database()
      .ref('/users/' + this.state.emailPath)
      .update({
        LastActionTime: lastAction,
      })
      .catch((error) => console.log(error));
  };

  signIn = () => {
    auth()
      .signInWithEmailAndPassword(this.state.emailVal, this.state.passVal)
      .then(() => {
        console.log('User account signed in!');
        const user = auth().currentUser;
        this.setState({
          userCur: user,
          emailPath: user.uid,
        });
        console.log(user.uid);
        this.gamePageLoad();
        console.log(user.email);
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.message.replace(error.code, '').replace('[]', ''),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };

  giveInactiveMoney = (lastInput, isOffline) => {
    console.log(isOffline && lastInput >= 90000);
    console.log(lastInput >= 90000);
    console.log(isOffline);
    if (isOffline && lastInput >= 90000) {
      console.log(lastInput + ' last input');
      let offlineEarningsBefore =
        (lastInput / 1000 / 60 + this.state.upgrades[4].currentEffect) *
        this.state.upgrades[5].currentEffect;
      let offlineEarnings =
        Number(this.state.currencyAmt) +
        Number(lastInput / 1000 / 60) +
        Number(this.state.upgrades[4].currentEffect) *
          Number(this.state.upgrades[5].currentEffect);
      console.log('off earn: ' + offlineEarnings.toFixed(2));
      Alert.alert(
        'Offline Earnings',
        'While you were offline, you earned: ' +
          offlineEarningsBefore.toFixed(2),
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      this.setState({
        currencyAmt: offlineEarnings.toFixed(2),
      });
      database()
        .ref('/users/' + this.state.emailPath)
        .update({
          CurMoney: Number(offlineEarnings.toFixed(2)),
        })
        .catch((error) => console.log(error));
    }
  };

  resetAccount = () => {
    database()
      .ref('users/' + auth().currentUser.uid)
      .set({
        CurMoney: 0,
        UpgradeArray: this.state.initialUpgrades,
        LastActionTime: new Date().getTime(),
      })
      .then(console.log('account deleted'))
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      currencyAmt: 0,
      upgrades: this.state.initialUpgrades,
    });
    this.signOut();
    this.handleLoginPagePress();
  };

  deleteAccount = () => {
    this.state.userCur.delete();
    this.resetAccount();
  };

  handlePasswordChange = (passVal) => {
    this.setState({passVal});
    this.setState({
      isPassword: true,
    });
  };

  handleGamePagePress = () =>
    this.setState({
      loginPageDisplay: 'none',
      gamePageDisplay: 'flex',
      settingsPageDisplay: 'none',
      upgradePageDisplay: 'none',
    });

  handleSettingsPagePress = () => {
    this.setState({
      loginPageDisplay: 'none',
      gamePageDisplay: 'none',
      settingsPageDisplay: 'flex',
      upgradePageDisplay: 'none',
    });

    this.doOfflineStuff();
  };

  gamePageLoad = () => {
    database()
      .ref('/users/' + this.state.emailPath)
      .once('value')
      .then((snapshot) => {
        let newArray;
        let money;
        if (snapshot.val().UpgradeArray == null) {
          newArray = this.state.initialUpgrades;
        } else {
          newArray = snapshot.val().UpgradeArray;
        }

        if (snapshot.val().CurMoney == null) {
          money = 0;
        } else {
          money = Number(snapshot.val().CurMoney).toFixed(2);
        }

        this.setState({
          currencyAmt: money,
          upgrades: newArray,
        });
        console.log(newArray[3]);

        Alert.alert(
          'Please Wait',
          'Please Wait To Be Signed In',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      })
      .then(
        setTimeout(() => {
          this.gamePageLoadPart2();
        }, 3500),
      );
  };

  gamePageLoadPart2 = () => {
    this.handleGamePagePress();
    this.doOfflineStuff();
  };

  handleLoginPagePress = () =>
    this.setState({
      loginPageDisplay: 'flex',
      gamePageDisplay: 'none',
      settingsPageDisplay: 'none',
      upgradePageDisplay: 'none',
    });

  totalGivingUpgradeMoney = () => {
    let time = 15;
    database()
      .ref('/users/' + this.state.emailPath)
      .once('value')
      .then((snapshot) => {
        time = snapshot.val().LastActionTime;
      });
    setTimeout(() => {
      this.giveInactiveMoney(
        new Date().getTime() - time,
        this.state.upgrades[3].isOffline,
      );
    }, 600);

    setTimeout(() => {
      this.setLastInputTime();
    }, 1000);
  };

  handleUpgradePagePress = () => {
    this.setState({
      loginPageDisplay: 'none',
      gamePageDisplay: 'none',
      settingsPageDisplay: 'none',
      upgradePageDisplay: 'flex',
    });
    this.totalGivingUpgradeMoney();
    this.doOfflineStuff();
  };

  clickerPress = () => {
    console.log(this.state.currencyAmt + 'currency amt');
    let newMoney = Number(
      Number(1 + this.state.upgrades[1].currentEffect) *
        Number(this.state.upgrades[2].currentEffect),
    );

    this.setState({
      currencyAmt: Number.parseFloat(
        newMoney + Number(this.state.currencyAmt),
      ).toFixed(2),
    });

    database()
      .ref('/users/' + this.state.emailPath)
      .update({
        CurMoney: Number.parseFloat(
          newMoney + Number(this.state.currencyAmt),
        ).toFixed(2),
      })
      .catch((error) => console.log(error));
    this.setLastInputTime();
  };

  doOfflineStuff = () => {
    console.log('in doOfflineStuff');
    let time = 0;
    let shouldOff = false;
    database()
      .ref('/users/' + this.state.emailPath)
      .once('value')
      .then((snapshot) => {
        time = snapshot.val().LastActionTime;
        shouldOff = snapshot.val().UpgradeArray[3].isOffline;
        console.log('time in get' + time);
      }),
      setTimeout(() => {
        console.log('after get; lastTime: ' + time);
        this.giveInactiveMoney(new Date().getTime() - time, shouldOff);
        this.setLastInputTime();
      }, 1500);
  };

  stateIncreaseUpgrade = (index, newEffect, newLevel, needAmt) => {
    this.setState((prevState) => {
      const copyUpgrade = prevState.upgrades.map((upgrade, curIndex) => {
        let curUpgrade = {...upgrade};
        if (index == curIndex) {
          curUpgrade.currentEffect = newEffect;
          curUpgrade.currentLevel = newLevel;
          curUpgrade.neededForNextUpgrade =
            curUpgrade.neededForNextUpgrade *
            prevState.upgrades[0].currentEffect;
        }
        console.log('in curUpgrade ' + curUpgrade.currentEffect);
        return curUpgrade;
      });
      console.log(this.state.upgrades[index].currentLevel + ' cur level');
      console.log(this.state.upgrades[index].maxUpgradeLevel + ' max level');

      return {
        upgrades: copyUpgrade,
        currencyAmt: (Number(this.state.currencyAmt) - needAmt).toFixed(2),
      };
    });
  };

  increaseUpgrade = (index) => {
    let needAmt = this.state.upgrades[index].neededForNextUpgrade;
    let newLevel = this.state.upgrades[index].currentLevel + 1;
    let newEffect =
      this.state.upgrades[index].currentEffect +
      this.state.upgrades[index].addedEffectPerUpgrade;
    if (
      this.state.upgrades[index].currentLevel <
      this.state.upgrades[index].maxUpgradeLevel
    ) {
      if (this.state.currencyAmt >= needAmt) {
        this.stateIncreaseUpgrade(index, newEffect, newLevel, needAmt);
        setTimeout(() => {
          this.forNextUpgrade(index);
        }, 200);

        setTimeout(() => {
          database()
            .ref('/users/' + this.state.emailPath)
            .update({
              UpgradeArray: this.state.upgrades,
              CurMoney: Number(this.state.currencyAmt).toFixed(2),
            })
            .then(this.workaround(index))
            .catch((error) => console.log(error));
        }, 500);
      } else {
        Alert.alert(
          'Not Enough Money',
          this.state.upgrades[index].name + ' Was Not Upgraded',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    } else {
      Alert.alert(
        this.state.upgrades[index].name + ' is Already Max Level',
        this.state.upgrades[index].name + ' Was Not Upgraded',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
    this.setLastInputTime();
  };

  workaround = (index) => {
    if (
      this.state.upgrades[index].currentLevel >=
      this.state.upgrades[index].maxUpgradeLevel
    ) {
      this.stateMaxLevel(index);
    }
  };
  stateMaxLevel = (index) => {
    this.setState((prevState) => {
      const copyUpgrade = prevState.upgrades.map((upgrade, curIndex) => {
        let curUpgrade = {...upgrade};
        if (index == curIndex) {
          curUpgrade.neededForNextUpgrade = '';
          curUpgrade.prefix = 'Max Level';
        }
        return curUpgrade;
      });
      return {
        upgrades: copyUpgrade,
      };
    });
  };

  forNextUpgrade = (index) => {
    let needAmt = 0;
    if (index !== 0) {
      if (this.state.upgrades[index].costType === 'lin') {
        needAmt =
          (this.state.upgrades[index].currentLevel + 1) *
          this.state.upgrades[index].costPerLevel *
          this.state.upgrades[0].currentEffect;
      } else if (this.state.upgrades[index].costType === 'exp') {
        needAmt =
          this.state.upgrades[index].flatMult *
          Math.pow(
            this.state.upgrades[index].currentLevel + 1,
            this.state.upgrades[index].costPerLevel,
          ) *
          this.state.upgrades[0].currentEffect;
      }
      console.log(needAmt);
      this.stateForNextUpgrade(needAmt, index);
    } else {
      needAmt =
        this.state.upgrades[0].flatMult *
        Math.pow(
          this.state.upgrades[0].currentLevel + 1,
          this.state.upgrades[0].costPerLevel,
        ) *
        this.state.upgrades[0].currentEffect;
      this.stateForNextUpgrade(needAmt, 0);

      console.log(
        'At mid of forNextUpgrade' + this.state.upgrades[0].currentEffect,
      );

      console.log(this.state.upgrades[0].currentEffect);
      for (var i = 1; i < this.state.upgrades.length; i++) {
        if (this.state.upgrades[i].costType === 'lin') {
          needAmt =
            (this.state.upgrades[i].currentLevel + 1) *
            this.state.upgrades[i].costPerLevel *
            this.state.upgrades[0].currentEffect;
        } else if (this.state.upgrades[i].costType === 'exp') {
          needAmt =
            this.state.upgrades[i].flatMult *
            Math.pow(
              this.state.upgrades[i].currentLevel + 1,
              this.state.upgrades[i].costPerLevel,
            ) *
            this.state.upgrades[0].currentEffect;
        }
        this.stateForNextUpgrade(needAmt, i);
      }
      console.log(
        'At end of forNextUpgrade' + this.state.upgrades[0].currentEffect,
      );
    }
  };

  stateForNextUpgrade = (neededForNext, index) => {
    this.setState((prevState) => {
      const copyUpgrade = prevState.upgrades.map((upgrade, curIndex) => {
        let curUpgrade = {...upgrade};
        if (index == curIndex) {
          curUpgrade.neededForNextUpgrade = neededForNext.toFixed(2);
        }
        return curUpgrade;
      });
      return {
        upgrades: copyUpgrade,
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSpace} />
        <View style={{display: this.state.loginPageDisplay}}>
          <ImageBackground
            style={styles.loginPage}
            source={require('./Assets/racecar-background.jpg')}>
            <TextInput
              value={this.state.emailVal}
              onChangeText={(emailVal) => this.setState({emailVal})}
              style={styles.loginTxtInput}
            />
            <View style={styles.passTxtInputView}>
              <TextInput
                value={this.state.passVal}
                onChangeText={this.handlePasswordChange}
                secureTextEntry={this.state.isPassword}
                style={styles.passTxtInput}
              />
              <TouchableHighlight
                onPress={() => this.passInfo()}
                underlayColor="white">
                <Image
                  style={styles.passImage}
                  source={require('./Assets/infoBtn.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              onPress={() => this.signIn()}
              underlayColor="white">
              <View style={styles.signUpButton}>
                <Text style={styles.signUpText}>Sign In</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                this.signUp();
              }}
              underlayColor="white">
              <View style={styles.signUpButton}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </View>
            </TouchableHighlight>
          </ImageBackground>
        </View>

        <View style={{display: this.state.gamePageDisplay}}>
          <View style={styles.gamePage}>
            <View style={styles.gameTopView}>
              <Text style={styles.currencyTxt}>{this.state.currencyAmt}</Text>
              <Text style={styles.currencyTypTxt}>
                {this.state.currencyType}
              </Text>
            </View>
            <View style={styles.gameMidView}>
              <TouchableHighlight
                underlayColor="white"
                onPress={this.clickerPress}>
                <Image
                  source={require('./Assets/pixel-car-basic.png')}
                  style={{
                    height: (191 * deviceHeight) / 280,
                    width: deviceWidth,
                  }}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.gameBotView}>
              <TouchableHighlight
                underlayColor="white"
                style={styles.barButtonUp}
                onPress={this.handleUpgradePagePress}>
                <Text style={styles.upgradeBtnTxt}>Upgrades</Text>
              </TouchableHighlight>
              <View style={styles.barButtonSet}>
                <TouchableHighlight
                  onPress={this.handleSettingsPagePress}
                  underlayColor="white">
                  <Image
                    source={require('./Assets/cogwheel.png')}
                    style={{height: deviceHeight / 8, width: deviceWidth / 4}}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>

        <View style={{display: this.state.settingsPageDisplay}}>
          <View style={styles.settingsPage}>
            <Text style={styles.signUpText}>Settings Page</Text>
            <TouchableHighlight onPress={this.signOut} underlayColor="white">
              <View style={styles.signUpButton}>
                <Text style={styles.settingsText}>Sign out </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.resetAccount}
              underlayColor="white">
              <View style={styles.signUpButton}>
                <Text style={styles.settingsText}>Reset Account</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.deleteAccount}
              underlayColor="white">
              <View style={styles.signUpButton}>
                <Text style={styles.settingsText}>Delete Account</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handleGamePagePress}
              underlayColor="white"
              activeOpacity={1}>
              <View style={styles.signUpButton}>
                <Text style={styles.settingsText}>Back</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.curEmailView}>
              <Text style={styles.settingsText}>Current Email:</Text>
              <Text style={styles.settingsText}>
                {this.state.userCur.email}
              </Text>
            </View>
          </View>
        </View>

        <View style={{display: this.state.upgradePageDisplay}}>
          <View style={styles.upgradePage}>
            <View style={styles.upgradeMoneyView}>
              <Text style={styles.upgradeMoneyTxt}>
                {this.state.currencyAmt}
              </Text>
            </View>
            <ScrollView
              directionalLockEnabled={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.upgradeScroll}>
                {this.state.upgrades.map((objIndex) => (
                  <View
                    style={styles.upgradeOption}
                    key={'totalBox' + objIndex.name}>
                    <View
                      style={styles.upgradeOptionTop}
                      key={'topBox' + objIndex.name}>
                      <View
                        style={styles.upgradeTopLeftView}
                        key={'topLeftBox' + objIndex.name}>
                        <Text
                          style={styles.topUpgradesTxt}
                          key={'topBoxLTxt' + objIndex.name}>
                          {objIndex.name}
                        </Text>
                        <Text
                          style={styles.topUpgradesTxt}
                          key={'topBoxRTxt' + objIndex.name}>
                          Level: {objIndex.currentLevel}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: deviceWidth / 6,
                          height: deviceHeight / 14,
                          justifyContent: 'flex-end',
                          backgroundColor: 'red',
                          // paddingRight: 15,
                          // paddingTop: 15,
                        }}>
                        <Image
                          style={styles.upgradeImage}
                          source={require('./Assets/infoBtn.png')}
                          key={'infoBtn' + objIndex.name}
                        />
                      </View>
                    </View>
                    <TouchableHighlight
                      onPress={() => this.increaseUpgrade(objIndex.index)}
                      key={'pressHighlight'}
                      underlayColor="white">
                      <View
                        style={styles.upgradeOptionBot}
                        key={'pressHighlightView'}>
                        <Text
                          style={styles.costUpgradesTxt}
                          key={'pressHighlightTxt'}>
                          {objIndex.prefix +
                            ' ' +
                            objIndex.neededForNextUpgrade}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.upgradeBotView}>
              <TouchableHighlight
                underlayColor="white"
                onPress={this.handleGamePagePress}
                style={styles.upgradeBackButton}>
                <Text style={styles.upgradeBackTxt}>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
