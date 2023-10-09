import React from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar} from 'react-native';
import MainRouter from './src/routers';
import _BackgroundTimer from 'react-native-background-timer';
import CodePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';
import {toastConfig} from '~components';
import {IntlProvider} from 'react-intl';

import {AppLogic} from './src';
import MQTTProvider from '~core/helper/hooks/mqtt';
const App = () => {
  const {language, memoLangData, will, clientId} = AppLogic();

  return (
    <IntlProvider
      locale={language}
      messages={memoLangData}
      textComponent={Text}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={'black'}
          hidden={true}
          barStyle={'dark-content'}
        />
        <MainRouter />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </IntlProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'black',
  },
});

export default CodePush({
  checkFrequency: CodePush?.CheckFrequency?.MANUAL,
})(App);
