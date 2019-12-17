import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import icons from './assets/weather_icons';
import { LinearGradient } from 'expo-linear-gradient';



class Table extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalVisible: [false, false, false, false, false, false, false, false, false, false, false, false],

    }

    this.renderItems = this.renderItems.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }


  setModalVisible(index, visible){
    let previousState = this.state.modalVisible;
    previousState[index] = !previousState[index];

    this.setState({
      modalVisible: previousState
    })
  }



  renderItems(){
    const data = this.props.data;
    let LastbgColor;
    let rows = data.map((value, index)=>{
      let windDirection = value.Wind.Direction.Degrees+90+'deg';
      let saturation = 100 - value.CloudCover;
      let daylightBgColor = `hsl(197, ${saturation}%, 73%)`;
      let nightBgColor = `hsl(236, ${saturation}%, 20%)`
      let bgColor = value.IsDaylight? daylightBgColor : nightBgColor;
      let last = LastbgColor;
      LastbgColor = bgColor;
      if(!last){last = bgColor}

      return (
        
        <View key={index} >
          <Modal visible={this.state.modalVisible[index]} transparent={false} animationType='slide'>
            <TouchableOpacity onPress={()=>{this.setModalVisible(index)}}>
              <View style={{margin: 20, width: '90%', height: '90%'}}>
                <Image source={icons['icon'+value.WeatherIcon]} style={{position: 'absolute', top: 0, right: 0}}/>
                <Text style={{fontWeight: 'bold'}}> {value.IconPhrase}</Text>
                <Text>
                Temperature: {value.Temperature.Value} &#8451;
                {'\n'}RealFeel: {value.RealFeelTemperature.Value} &#8451;
                {'\n'}WetBulbTemperature: {value.WetBulbTemperature.Value} &#8451;
                {'\n'}DewPoint: {value.DewPoint.Value} &#8451;
                {'\n'}Relative Humidity: {value.RelativeHumidity} %
                {'\n'}Cloud Cover: {value.CloudCover} %
                {'\n'}Wind: {value.Wind.Speed.Value} km/h, 
                {'\n'}Wind Direction: {value.Wind.Direction.English}
                {'\n'}Wind Gust: {value.WindGust.Speed.Value} km/h
                {'\n'}Percipitation Probability: {value.PercipitationProbability} %
                {'\n'}Rain Probability: {value.RainProbability} %
                {'\n'}Rain: {value.Rain.Value} mm
                {'\n'}Snow Probability: {value.SnowProbability} %
                {'\n'}Snow: {value.Snow.Value} cm
                {'\n'}Ice Probability: {value.IceProbability} %
                {'\n'}Ice: {value.Ice.Value} mm
                {'\n'}Total Liquid: {value.TotalLiquid.Value} mm
                {'\n'}UV Index: {value.UVIndex}, {value.UVIndexText}
                {'\n'}Visibility: {value.Visibility.Value} km 
                {'\n'}Ceiling: {value.Ceiling.Value} m 
                {'\n'}{value.IsDaylight?"Daylight":"Night"}
                {'\n'}Link: {value.MobileLink} 
                </Text>
                <Text style={{fontWeight: 'bold'}}>Date: {value.DateTime.match(/\d{4}-\d{2}-\d{2}/)} {'\n'}Time: {value.DateTime.match(/\d{2}:\d{2}/)} h</Text>
                <Text style={{transform: [{ rotate: windDirection}], position: 'absolute', bottom: 0, left: 0, fontSize: 30}}>&#8694;</Text>
              </View>
            </TouchableOpacity>
          </Modal>

          <LinearGradient colors={[last, bgColor]} style={{padding: 1}}>
            <TouchableOpacity onPress={()=>{this.setModalVisible(index)}} style={{flex: 1, flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-around', padding: 10, alignItems: 'center' }}>
              <Text style={{flex: 1, color: '#F05514', fontWeight: 'bold'}}>{value.DateTime.match(/\d{2}:\d{2}/)}</Text>
              <View style={{flex: 1}}>
                <Image source={icons['icon'+value.WeatherIcon]} />
              </View>
            <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: '#F05514', textAlign: 'right', marginRight: 10}}>{String(value.Temperature.Value).match(/\-?\d+/)}&nbsp;&#8451; </Text>
            <View>   
              <Text style={{color: '#F05514', transform: [{ rotate: windDirection}] }}>&#10148;</Text> 
            </View>
            <Text style={{color: '#F05514', fontSize: 8}}>  Wind: {value.Wind.Speed.Value} km/h{'\n'}  RH: {value.RelativeHumidity}%{'\n'}  RealFeel: {value.RealFeelTemperature.Value} &#8451; </Text>
            <View style={{flex: .5, flexDirection: 'row'}}>

              {value.Rain.Value>0 && (
              <Text style={{flex: 1, color: 'white'}} > &#9730;</Text>
              )}
              {value.Snow.Value>0 && (
              <Text style={{flex: 1, color: 'white'}} > &#10054;</Text>
              )}
              {value.Ice.Value>0 && (
              <Text style={{flex: 1, color: 'white'}}> &#9976;</Text>
              )}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>   
  )
})
return rows;
}

  render(){

    return (
  	<ScrollView >{this.renderItems()}</ScrollView>
    )
} 
}


export default Table;