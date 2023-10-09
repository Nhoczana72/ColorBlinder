import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './PlayingGame.styles';
import {PlayingGameLogic} from './PlayingGame.logic';
import * as Animatable from 'react-native-animatable';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Timer from 'react-native-background-timer';
import {useSelector} from 'react-redux';
import {ScoreSelector} from '~modules/setting';
import settingStore from '~modules/setting/settingStore';
import store from '~core/store';
import lodash from 'lodash';
export const PlayingGame: React.FC<any> = props => {
  const {} = props;
  const {dispatch} = PlayingGameLogic();
  const isFocus = useIsFocused();
  const [startTime, setStartTime] = useState(5);
  const [index, setIndex] = useState(2);
  const [countWin, setCountWin] = useState(0);
  const [score, setScore] = useState(0);
  const refTime = useRef<any>();
  const [playingTime, setPlayingTime] = useState(12);
  const {highScore} = useSelector(ScoreSelector);
  // const [randomNumberIndexChange, setRandomNumberIndexChange] = useState(1);

  const [arr, setArr] = useState([1, 1, 1, 1]);
  const [arrColor, setArrColor] = useState([
    'red',
    'green',
    'yellow',
    'white',
    'orange',
  ]);
  const touch = useCallback(() => {
    const _color = lodash.shuffle(arrColor);
    setArrColor(_color);
    const randomNumberIndexChange =
      Math.floor(Math.random() * (index * index - 1)) + index / 2;

    const _arr = Array(index * index).fill(1);

    for (let i = 0; i <= randomNumberIndexChange; i++) {
      const randomNumber = Math.floor(Math.random() * (index * index - 0)) + 0;
      _arr[randomNumber] = 2;
    }

    setArr(_arr);
  }, [arr, index]);

  useEffect(() => {
    if (startTime >= 0) {
      Timer.setTimeout(() => {
        setStartTime(startTime - 1);
      }, 1000);
    } else {
      setStartTime(-1);
      touch();
    }
  }, [isFocus, startTime, index]);
  const changeColor = (index: number) => {
    const _arr = [...arr];
    _arr[index] = _arr[index] === 1 ? 2 : 1;
    setArr(_arr);
  };
  useEffect(() => {
    if (startTime === -1) {
      if (playingTime > 0) {
        refTime.current = Timer.setTimeout(() => {
          setPlayingTime(playingTime - 1);
        }, 1000);
      } else {
        Alert.alert('GAME OVER', `SCORE ${score}`, [
          {
            text: 'Go back Menu',
            onPress: () => {
              props.navigation.goBack();
            },
          },
          {
            text: 'Start game',
            onPress: () => {
              setStartTime(5), setPlayingTime(12), setIndex(2), setScore(0);
              if (score > highScore) {
                store.dispatch(settingStore.actions.setHighScore(score));
              }
            },
          },
        ]);
      }
    }
    return () => {
      Timer.clearTimeout(refTime.current);
    };
  }, [startTime, playingTime, index]);

  useEffect(() => {
    let count = 0;
    arr.forEach(item => {
      if (item === 1) {
        count += 1;
      }
    });

    if (count === arr.length || count === 0) {
      if (countWin === 5) {
        setIndex(index + 1);
        setCountWin(0);
      } else {
        setCountWin(countWin + 1);
      }
      if (countWin !== 0) {
        setScore(score + 1);
        if (score < 20) {
          setPlayingTime(playingTime + 1);
        } else {
          setPlayingTime(playingTime + 2);
        }
        Timer.clearTimeout(refTime.current);
      }
      touch();

      // Alert.alert('Win');
    }
  }, [arr, index]);

  return (
    <View style={styles.container}>
      <Text style={styles.tx_header}>
        <Text style={styles.tx_headerRed}>C</Text>
        <Text style={styles.tx_headerOrange}>o</Text>
        <Text style={styles.tx_headerYellow}>l</Text>
        <Text style={styles.tx_headerGreen}>o</Text>
        <Text style={styles.tx_headerBlue}>r</Text>
        blinder
      </Text>
      <Text style={{color: 'yellow'}}>High score:{highScore}</Text>

      {startTime !== -1 ? (
        <Animatable.Text
          iterationCount={'infinite'}
          animation={'bounce'}
          style={{color: 'white', fontSize: wp(40), marginTop: hp(25)}}>
          {startTime !== 0 ? startTime : 'Play'}
        </Animatable.Text>
      ) : (
        <>
          <View
            style={{
              width: wp(80),
              height: wp(80),
              marginTop: hp(20),
            }}>
            {Array(index)
              .fill(5)
              .map((item, indexItem) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: `${100 / index}%`,
                      flexDirection: 'row',
                    }}>
                    {Array(index)
                      .fill(5)
                      .map((item1, indexItem1) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              changeColor(indexItem * index + indexItem1);
                            }}
                            style={{
                              borderWidth: 0.5,
                              borderColor: 'black',
                              height: '100%',
                              width: `${100 / index}%`,
                              backgroundColor:
                                arrColor[arr[indexItem * index + indexItem1]],
                            }}></TouchableOpacity>
                        );
                      })}
                  </View>
                );
              })}
          </View>
          <View
            style={{
              paddingHorizontal: wp(5),
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: hp(5),
              width: wp(80),
            }}>
            <Text style={{color: 'white'}}>Score:{score}</Text>
            <Text style={{color: 'white', marginRight: wp(5)}}>
              Time:{playingTime}
            </Text>
          </View>
          <TouchableOpacity>
            <Text>Pause</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
