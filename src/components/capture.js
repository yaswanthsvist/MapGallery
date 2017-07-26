import React from 'react';
import {connect} from 'react-redux';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  CameraRoll,
  View,
} from 'react-native';
import Camera from 'react-native-camera';

const getLocation=()=>{
  return new Promise(function(resolve, reject) { 
          navigator.geolocation.getCurrentPosition(
          (pos)=>{
            resolve(pos);
          },
          (err)=>{
            reject(err);
          }, options);
  } );
}

var options = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 0
};

class Capture extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Capture',
  };
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fit}>
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  async takePicture(){
    const {dispatch} = this.props;
    const options = {};
    let pos =await getLocation();
    console.log(pos);
    options.location =pos; 
    console.log(options)
    let data=await this.camera.capture({metadata: options})
    dispatch({type:"ADD_IMAGE",image:data.path,location:pos});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default connect()(Capture);