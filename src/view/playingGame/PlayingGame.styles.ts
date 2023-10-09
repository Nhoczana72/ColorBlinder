import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  tx_header: {
    color: 'white',
    fontSize: wp(9),
    marginTop: hp(5),
  },
  tx_headerRed: {
    color: 'red',
    fontSize: wp(9),
  },
  tx_headerOrange: {
    color: 'orange',
    fontSize: wp(9),
  },
  tx_headerYellow: {
    color: 'yellow',
    fontSize: wp(9),
  },
  tx_headerGreen: {
    color: 'green',
    fontSize: wp(9),
  },
  tx_headerBlue: {
    color: 'blue',
    fontSize: wp(9),
  },
});
