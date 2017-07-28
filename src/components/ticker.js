import React from 'react';
import {connect} from 'react-redux';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableHighlight,
  CameraRoll,
  View,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import MapView from 'react-native-maps';

class Ticker extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Ticker Task',
  };
  constructor(props) {
    super(props);
    this.imageMarkers=[];
    this.props.dispatch({type:"RESET_TICKERS"})
    this.startTickers();
  }
  async componentWillReceiveProps(nextProps) {

  }
  render() {
    //console.log(this.props);
    return (
      <View>
      </View>
    );
  }
  async (){

  }

}

const mapStateToProps = state => ({
  images: state.images,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap:'wrap',
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default connect(mapStateToProps)(Galery);
