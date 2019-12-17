import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import Table from './Table';
import DressRecomandation from './DressRecomandation';
//import Geolocation from 'react-native-geolocation-service';
//import * as Permissions from 'expo-permissions';


export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      dressModalVisible: false
    }

    this.update = this.update.bind(this);
    this.toogleModalVisibility = this.toogleModalVisibility.bind(this);
    
  }

toogleModalVisibility(){
  let toogleVisibility = !this.state.dressModalVisible;
  this.setState({
    dressModalVisible: toogleVisibility
  });
}


update(){
  const that = this; // save this object before enter the fetch child function
  navigator.geolocation.getCurrentPosition(function(position){
    const locUrl = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=LrltGW8HIbhBXo6GZsMLJP08tUGdJ3nT&q='+ position.coords.latitude+'%2C'+ position.coords.longitude;

  fetch(locUrl)
  .then(function(response){
   that.setState({place: response})  
   return response.json()
 })
  .then(response => response.Key)
  .then(loc => fetch('https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + loc +'?apikey=LrltGW8HIbhBXo6GZsMLJP08tUGdJ3nT&details=true&metric=true'))
  .then(function(response) {
    return response.json();
  })
  .then(function(response){ // insert key
response.map(function(val,index,arr){return val.key = index})
that.setState({data: response})
})
})
}

//TESTING UPDATE//////
// update(){
//    let response = [{"DateTime":"2015-07-26T22:00:00+02:00","EpochDateTime":1532635200,"WeatherIcon":1,"IconPhrase":"Partly cloudy","IsDaylight":true,"Temperature":{"Value":23.1,"Unit":"C","UnitType":17},"RealFeelTemperature":{"Value":23.7,"Unit":"C","UnitType":17},"WetBulbTemperature":{"Value":20.6,"Unit":"C","UnitType":17},"DewPoint":{"Value":19.2,"Unit":"C","UnitType":17},"Wind":{"Speed":{"Value":5.6,"Unit":"km/h","UnitType":7},"Direction":{"Degrees":308,"Localized":"NW","English":"NW"}},"WindGust":{"Speed":{"Value":9.3,"Unit":"km/h","UnitType":7}},"RelativeHumidity":78,"Visibility":{"Value":11.3,"Unit":"km","UnitType":6},"Ceiling":{"Value":9144,"Unit":"m","UnitType":5},"UVIndex":0,"UVIndexText":"Low","PrecipitationProbability":25,"RainProbability":25,"SnowProbability":0,"IceProbability":0,"TotalLiquid":{"Value":0,"Unit":"mm","UnitType":3},"Rain":{"Value":0,"Unit":"mm","UnitType":3},"Snow":{"Value":0,"Unit":"cm","UnitType":4},"Ice":{"Value":0,"Unit":"mm","UnitType":3},"CloudCover":35,"MobileLink":"http://m.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&hbhhour=22&unit=c&lang=en-us"}, 

//     {"DateTime":"2018-07-26T23:00:00+02:00","EpochDateTime":1532638800,"WeatherIcon":36,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":22.7,"Unit":"C","UnitType":17},"RealFeelTemperature":{"Value":22.7,"Unit":"C","UnitType":17},"WetBulbTemperature":{"Value":20.2,"Unit":"C","UnitType":17},"DewPoint":{"Value":18.9,"Unit":"C","UnitType":17},"Wind":{"Speed":{"Value":5.6,"Unit":"km/h","UnitType":7},"Direction":{"Degrees":93,"Localized":"WNW","English":"WNW"}},"WindGust":{"Speed":{"Value":9.3,"Unit":"km/h","UnitType":7}},"RelativeHumidity":81,"Visibility":{"Value":9.7,"Unit":"km","UnitType":6},"Ceiling":{"Value":9144,"Unit":"m","UnitType":5},"UVIndex":0,"UVIndexText":"Low","PrecipitationProbability":34,"RainProbability":34,"SnowProbability":0,"IceProbability":0,"TotalLiquid":{"Value":0,"Unit":"mm","UnitType":3},"Rain":{"Value":0.5,"Unit":"mm","UnitType":3},"Snow":{"Value":0,"Unit":"cm","UnitType":4},"Ice":{"Value":0,"Unit":"mm","UnitType":3},"CloudCover":33,"MobileLink":"http://m.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&hbhhour=23&unit=c&lang=en-us"},

//     {"DateTime":"2018-07-26T22:00:00+02:00","EpochDateTime":1532635200,"WeatherIcon":4,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":3.1,"Unit":"C","UnitType":17},"RealFeelTemperature":{"Value":23.7,"Unit":"C","UnitType":17},"WetBulbTemperature":{"Value":20.6,"Unit":"C","UnitType":17},"DewPoint":{"Value":19.2,"Unit":"C","UnitType":17},"Wind":{"Speed":{"Value":13.6,"Unit":"km/h","UnitType":7},"Direction":{"Degrees":308,"Localized":"NW","English":"NW"}},"WindGust":{"Speed":{"Value":9.3,"Unit":"km/h","UnitType":7}},"RelativeHumidity":78,"Visibility":{"Value":11.3,"Unit":"km","UnitType":6},"Ceiling":{"Value":9144,"Unit":"m","UnitType":5},"UVIndex":0,"UVIndexText":"Low","PrecipitationProbability":25,"RainProbability":25,"SnowProbability":0,"IceProbability":0,"TotalLiquid":{"Value":0,"Unit":"mm","UnitType":3},"Rain":{"Value":0.5,"Unit":"mm","UnitType":3},"Snow":{"Value":0.1,"Unit":"cm","UnitType":4},"Ice":{"Value":0.1,"Unit":"mm","UnitType":3},"CloudCover":35,"MobileLink":"http://m.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&hbhhour=22&unit=c&lang=en-us"},

//     {"DateTime":"2018-08-26T22:00:00+02:00","EpochDateTime":1532635200,"WeatherIcon":31,"IconPhrase":"Partly cloudy","IsDaylight":true,"Temperature":{"Value":-3.1,"Unit":"C","UnitType":17},"RealFeelTemperature":{"Value":23.7,"Unit":"C","UnitType":17},"WetBulbTemperature":{"Value":20.6,"Unit":"C","UnitType":17},"DewPoint":{"Value":19.2,"Unit":"C","UnitType":17},"Wind":{"Speed":{"Value":0.6,"Unit":"km/h","UnitType":7},"Direction":{"Degrees":308,"Localized":"NW","English":"NW"}},"WindGust":{"Speed":{"Value":9.3,"Unit":"km/h","UnitType":7}},"RelativeHumidity":78,"Visibility":{"Value":11.3,"Unit":"km","UnitType":6},"Ceiling":{"Value":9144,"Unit":"m","UnitType":5},"UVIndex":0,"UVIndexText":"Low","PrecipitationProbability":25,"RainProbability":25,"SnowProbability":0,"IceProbability":0,"TotalLiquid":{"Value":0,"Unit":"mm","UnitType":3},"Rain":{"Value":0,"Unit":"mm","UnitType":3},"Snow":{"Value":1,"Unit":"cm","UnitType":4},"Ice":{"Value":0,"Unit":"mm","UnitType":3},"CloudCover":35,"MobileLink":"http://m.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&hbhhour=22&unit=c&lang=en-us"}
//  ];


//     this.setState({data: response})
//    // console.warn("hello from update")

//   }
///////////////////////

   componentDidMount(){
    this.update();
   }



  render(){
    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={()=>{this.toogleModalVisibility()}}><Text style={styles.startText}>WEATHER </Text></TouchableOpacity>
        <Modal visible={this.state.dressModalVisible} >
        <TouchableOpacity onPress={()=>{this.toogleModalVisibility()}}>
        <DressRecomandation data={this.state.data}/>
        </TouchableOpacity>
        </Modal>
        <Table data={this.state.data} place={this.state.place}/>
        <View style={styles.footer}>
          <Image source={require('./assets/eCAAMKAt.png')} style={styles.logo}/>
          <Text style={styles.signature}>by Joemand</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F05514',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  startText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
    alignSelf: 'center',
    margin: 30,
  },
  logo: {
    margin: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signature: {
    color: 'white',
    fontSize: 10,
    margin: 10,
  }
});



