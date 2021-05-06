// import {Alert} from 'react-native';
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';
// import * as fromNorm from './App.js';
//
// //Cant use setState in this file
// passInfo = () => {
//   Alert.alert(
//     'Password',
//     'Password must be 6 characters or more',
//     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
//     {cancelable: false},
//   );
// };
//
// databaseEntry = () => {
//   database()
//     .ref('/project/test')
//     .set({
//       Test: 'data',
//     })
//     .then(() => console.log('dataset'));
// };
//
// signOut = () => {
//   auth()
//     .signOut()
//     .then(() => {
//       console.log('User signed out!');
//       fromNorm.handleLoginPagePress;
//     })
//     .then(() => console.log('signed Out'))
//     .catch((error) => {
//       console.log(error);
//     });
// };
