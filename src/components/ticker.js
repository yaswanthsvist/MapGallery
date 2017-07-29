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
  }
  componentWillUnmount() {
    const {first_tickerid}=this.props.ticker;
      clearInterval(first_tickerid);
  }

  constructor(props) {

    super(props);
    this.imageMarkers=[];
    this.props.dispatch({type:"RESET_TICKERS"})
    this.startTickers=this.startTickers.bind(this);
    this.startTickers();

  }
  startTickers(){
    const {dispatch}=this.props;
    const updateTickers=()=>{
      let {first_ticker,second_ticker,toggle_message}=this.props.ticker;
      console.log(this.props.ticker);
      first_ticker++;
      if(first_ticker%10==0){
        console.log("first_ticker%10==0");
        toggle_message=false;
        second_ticker++;
      }
      if(first_ticker%30==0){

        toggle_message=true;
      }
      console.log(first_ticker,second_ticker,toggle_message);
      console.log(this.props.ticker);
      dispatch({type:"UPDATE_TICKER",toggle_message,first_ticker,second_ticker});
    }
    const id=setInterval(updateTickers,1000);
    dispatch({type:"SET_FIRST_TIMER_ID",id});
  }
  render() {
    let {first_ticker,second_ticker,toggle_message}=this.props.ticker;
    let message=``;
    if(toggle_message){
      message=`This message will dissapear in ${10-first_ticker%10} secs`;
    }
    return (
      <View>
        <Text>{`${second_ticker} : ${first_ticker}`}</Text>

        <Text>{`${message}`}</Text>
      </View>
    );
  }
  async (){

  }

}

const mapStateToProps = state => ({
  ticker: state.ticker,
});

export default connect(mapStateToProps)(Ticker);
