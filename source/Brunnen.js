import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Main, Map, Info, Detail } from './screens'
import TabBarIcon from '../components/TabBarIcon';
import { Platform } from 'react-native'

const MainStackNavigator = createStackNavigator({
  main: Main,
  detail: Detail
  
})

const TabNavigation = createBottomTabNavigator({
  MainStackNavigator,
  Map,
  Info,
},
  
)

// const StackNavigator = createStackNavigator({
//   TabNavigation,
// })


const AppContainer = createAppContainer(TabNavigation)

MainStackNavigator.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `md-water${focused ? '' : '-outline'}`
          : 'md-water'
      }
    />
  ),
  
    headerTitle: 'Brunnen',
    headerStyle: {
      backgroundColor: '#6ACCFF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: "vibes",
      fontWeight: "200",
      marginTop: 15,
      fontSize: 45,
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center'
    },

  },

Map.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `md-map${focused ? '' : '-outline'}`
          : 'md-map'
      }
    />
  ),
};

Info.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `md-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

class Brunnen extends React.Component {

  render() {
    return <AppContainer />
  }
}

export default Brunnen;
