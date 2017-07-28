import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

class Ticker extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Ticker Task',
  };
  componentWillMount() {

    let id=setInterval(updateTickers)
  }
  updateTickers=()=>{

     const {first_ticker,second_ticker,toggle_message}=this.props.ticker;

  }
  constructor(props) {
    super(props);
    this.imageMarkers=[];
    this.props.dispatch({type:"RESET_TICKERS"})
    this.startTickers=this.startTickers.bind(this);
    this.updateTickers=this.updateTickers.bind(this);
    this.startTickers();
    
  }
  componentWillReceiveProps(nextProps) {

  }
  async componentWillReceiveProps(nextProps) {

  }
  render() {
    //console.log(this.props);
    return (
      <View>
        <View></View>

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
