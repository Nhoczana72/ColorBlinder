import React from 'react';
import {View, Text, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import {styles} from './Home.styles';
import {HomeLogic} from './Home.logic';
import * as Animatable from 'react-native-animatable';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Font} from '~assets/fonts';
import {navigate} from '~core/helper/navigate';
import {useSelector} from 'react-redux';
import {ScoreSelector} from '~modules/setting';

export const Home: React.FC<any> = props => {
  const {} = props;
  const {} = HomeLogic();
  const {highScore} = useSelector(ScoreSelector);

  const zoomOut: Animatable.CustomAnimation = {
    0: {
      opacity: 1,
      marginTop: hp(40),
    },
    1: {
      opacity: 1,
      marginTop: hp(5),
    },
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation={zoomOut}
        duration={3000}
        style={styles.tx_header}>
        <Text style={styles.tx_headerRed}>C</Text>
        <Text style={styles.tx_headerOrange}>o</Text>
        <Text style={styles.tx_headerYellow}>l</Text>
        <Text style={styles.tx_headerGreen}>o</Text>
        <Text style={styles.tx_headerBlue}>r</Text>
        blinder
      </Animatable.Text>
      <View style={{height: '50%', marginTop: '40%'}}>
        <Animatable.View delay={3000} duration={3000} animation={'slideInLeft'}>
          <TouchableOpacity
            onPress={() => {
              navigate('PlayingGame');
            }}>
            <Animatable.Text
              delay={6000}
              duration={2000}
              iterationCount={'infinite'}
              animation={'tada'}
              style={[
                styles.tx_header,
                {color: 'white', fontFamily: Font.GothicA1_Bold},
              ]}>
              PLAY
            </Animatable.Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          delay={3000}
          duration={3000}
          animation={'slideInRight'}>
          <TouchableOpacity
            onPress={() => {
              // navigate('PlayingGame');
            }}>
            <Animatable.Text
              delay={6000}
              duration={2000}
              iterationCount={'infinite'}
              animation={'tada'}
              style={[
                styles.tx_header,
                {
                  color: 'yellow',
                  fontFamily: Font.GothicA1_Bold,
                  marginTop: hp(10),
                },
              ]}>
              High Score: {highScore}
            </Animatable.Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};
