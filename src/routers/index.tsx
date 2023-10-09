import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {CodePushSelector} from '~modules/setting/settingStore';
import {Splash, Auth, Home, PlayingGame} from '~view';
import {navigationRef} from '~core/helper/navigate';
const Stack = createNativeStackNavigator();

const privateScreen: any[] = [Auth];

const MainRouter = () => {
  const {splash} = useSelector(CodePushSelector);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PlayingGame" component={PlayingGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(MainRouter);
