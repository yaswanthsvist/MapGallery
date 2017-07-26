import React from 'react';
import { StyleSheet, Text,Button, View,ScrollView,StatusBar,Image } from 'react-native';
import {addNavigationHelpers,TabNavigator,DrawerNavigator,StackNavigator,DrawerItems} from 'react-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Galery from "./../components/galery";
import Capture from './../components/capture';

const DrawerComponent=(props)=>(
  <View style={{flex:1}}>
    <View style={{flex:3,paddingBottom:20,paddingTop:20,backgroundColor:"#095974",justifyContent:'center'}}>
    </View>
    <View style={{flex:7}}>
      <DrawerItems {...props}/>
    </View>
  </View>
)

export const AppNavigator=DrawerNavigator({
    Capture:{
      screen:Capture,
    },
    Galery:{
      screen:Galery,
    },
  },{
    contentComponent:DrawerComponent,
    drawerWidth:240
  }
)


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});
const mapDispatchToProps=(dispatch)=>{
  return {
    dispatch,
  }
}

export default AppWithNavigationState=connect(mapStateToProps)(AppWithNavigationState);