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
    this.imageMarkers=[];
    this.props.dispatch({type:"REMOVE_ALL_IMAGES"})
    this.getImages();
  }
  async componentWillReceiveProps(nextProps) {
    let {images}=nextProps;
    console.log(images);
    let imageMarkers=await Promise.all(images.filter( image => ( image.location != undefined ) )
        .map((image,i)=>{
            console.log(image);
            return new Promise((resolve,reject)=>(<Image onLoad={resolve} onerror={reject} source={{uri:image.uri}} style={{width:50,height:50}} ></Image>)
            ).then((res)=>{console.log(res);}).catch((err)=>{console.log(err);});
          }
        )
      ).then((res)=>{
        console.log(res);
      }).catch(()=>{
        console.log("err");
      });

      console.log(imageMarkers);

    //this.imageMarkers=await imageMarkers;
  //  console.log(this.imageMarkers);
  }
  render() {
    //console.log(this.props);
    let {images}=this.props;
    //console.log(images)

    var initialLatLang={
      latitude:37.78825,
      longitude:-122.4324,
    }
    if(images.length >=1 && (images[0].location!=undefined) &&images[0].location.latitude!=undefined ){
      initialLatLang.latitude=images[0].location.latitude;
      initialLatLang.longitude=images[0].location.longitude;
    }
    console.log(this.imageMarkers);
    return (
    <View>
      {
      <MapView
        style={{position :'absolute',top:0,left:0,width:400,height:400}}
        initialRegion={{
          latitude: initialLatLang.latitude,
          longitude: initialLatLang.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {
        images.filter(image=>(image.location!=undefined)).map((image,i)=>{
          console.log(image);
          return (
            <MapView.Marker  key={i+'img'}
            coordinate={image.location}

            >
              <View latlng={image.location} style={{width:50,borderWidth:1,height:50,backgroundColor:'rgba(0,0,0,0.1)'}}>
                  <Image  source={{uri:image.uri}} style={{width:50,height:50}} ></Image>
              </View>
            </MapView.Marker>
          )
        })
      }
      </MapView>
      }
      <View>
      {
        //(this.state.imageMarkers!=null&&this.state.imageMarkers[0])||null
      }
      </View>
      </View>
    );
  }
  async loadImages(){

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
