import React from 'react';
import { Text, View, Dimensions} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import TodayScent from './TodayScent';
import DeviceSlide from './DeviceSlide';



const bookmarkIcon = (<Icon name="bookmark" size={20} color="#000" />)
const shareIcon = (<Icon name="share-alt" size={20} color="#000" />)


const data = [];
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <View style = {styles.container}>
        <TodayScent todayScent = {this.props.todayScent}/>
        <DeviceSlide devices = {this.props.devices}/>
      </View>
    )
  }
}

export default HomeScreen;


const screenWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    marginTop: 50
  },
  smallContainer: {
    width: '90%',
    borderWidth: 2
  },
  rowView: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 30
  }
});