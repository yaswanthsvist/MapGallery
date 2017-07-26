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

class Galery extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Galery',
  };
  constructor(props) {
    super(props)

    this.props.dispatch({type:"REMOVE_ALL_IMAGES"})
    this.getImages();
  }
  render() {
    console.log(this.props);
    let {images}=this.props;
    console.log(images)
    return (
    <ScrollView>
      <View style={styles.container}>
        {
          images.map((image,i)=>{
            console.log(image);
            return (<View style={{width:50,borderWidth:1,height:50,backgroundColor:'rgba(0,0,0,0.1)'}}  key={i+'img'}>
                    <Image style={{width:50,height:50}}  source={{uri:image.uri}}>
                    </Image>
                  </View>)
          })
        }
      </View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      </ScrollView>
    );
  }

  async getImages(){
    let data=await CameraRoll.getPhotos({
      'first':10,
    });
    if(data.edges!=undefined){
      const {dispatch}=this.props;
      data.edges.map(async (data)=>{
        //const uri=await ImageResizer.createResizedImage(data.node.image.uri , 300, 300, 'JPEG', 100);
        //if(typeof uri=="string")
          dispatch({type:"ADD_IMAGE",image:data.node.image.uri,location:data.node.location})
      })
    }
    return data;
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