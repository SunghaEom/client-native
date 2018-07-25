import React from 'react';
import { TextInput, ScrollView, Text, View, TouchableOpacity, Slider } from 'react-native';
import { SelectPicker } from 'react-native-select-picker';
import { MaterialDialog, SinglePickerMaterialDialog, MultiPickerMaterialDialog } from 'react-native-material-dialog';
console.log ("hello");
import DatePicker from 'react-native-datepicker';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';
import Immutable from 'immutable';
//const { fromJS } = require('immutable')


class AddAlarmScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      device_id: undefined,
      reservation_id : this.device_id + '_reservation_' + this.makeRandomString(8),

      startTime : "00:00",
      endTime : "01:00",
      every : [],
      invokeTime : 0,
      notification : 'true',
      notificationIds: [
        0
      ],
      light: 0,
      fanPower: 0,
      scentInfo: {
        name: "Happy Orange",
        img: "",
        cartridges: [
          {
            scent: "lavender",
            fan: 0
          }
        ]
      },
      label: undefined,
      //date: "00:00",
      device_name: undefined,

      showDevice: false,
      singleDeviceSelectedItem: undefined,

      showDay: false,
      multipleDaySelectedItem: [],

      showLabel: false,
    };
  };



  makeRandomString = (number) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < number; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log ("this is makeRandomString(8): ", text);
    return text;
  };

  showSelectPicker = () => {
    this.setState ({show: !this.state.show});
  };

  render () {
    let _this = this;

    let { navigation } = this.props;
    let cur_device_name; 
    let cur_device_id;

    var device = this.props.device.toJS ();
    //var fromJS = Immutable.fromJS;
    var device_state = Immutable.Map (this.props.device_state);

    console.log ("device_State " ,device_state);
    

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> 향기 알람 추가 </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => { console.log ("_.values (device): ", _.values (device));
            this.setState ({ showDevice: true});
          }} >
            <Text> arom 기기 선택 </Text>
          </TouchableOpacity>

        </View>
        <View>
          <SinglePickerMaterialDialog
            title={'arom 기기 선택'}
            items={_.values(device).map((row, index) => ({ value: index, label: row }))}
            visible={this.state.showDevice}
            selectedItem={this.state.singleDeviceSelectedItem}
            onCancel={() => this.setState({ showDevice: false })}
            onOk={result => {
              this.setState({ showDevice: false });
              this.setState({ singleDeviceSelectedItem: result.selectedItem });
              this.setState({ device_name: result.selectedItem.label});
              this.setState({ device_id: _.keys(device)[result.selectedItem.value]});
              console.log (result);
              console.log (_.keys(device)[result.selectedItem.value]);
            }}
          />
          <Text> {this.state.device_name} </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => {
            this.setState ({ showDay: true});
          }} >
            <Text> 반복 </Text>
          </TouchableOpacity>
        </View>
        <View>
          <MultiPickerMaterialDialog
            title={"반복"}
            items={['월요일마다', '화요일마다', '수요일마다', '목요일마다', '금요일마다', '토요일마다', '일요일마다'].map ((row, index) => ({ value: index, label: row}))}
            visible={this.state.showDay}
            selectedItem={this.state.multipleDaySelectedItem}
            onCancel={() => this.setState ({ showDay: false})}
            onOk={result => {
              this.setState ({ showDay: false});
              this.setState ({ multipleDaySelectedItem: result.selectedItems });
              {result.selectedItems.forEach (x => {(this.state.every).push (x.label)})};
              console.log (result);
              console.log ( result.selectedItems);
              console.log ( _.filter (result.selectedItems, {'selected': true}));
              console.log ( this.state.every);
            }}
          />
          <Text> {JSON.stringify(this.state.every)} </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => {this.setState ({ showLabel: true })}}>
            <Text> 레이블 </Text>
          </TouchableOpacity>
        </View>
        <View>
          <MaterialDialog
            title={'레이블'}
            visible={this.state.showLabel}
            onOk={() => this.setState({ showLabel : false })}
            onCancel={() => this.setState({ showLabel : false })}
          >
            <TextInput
              onChangeText={(text) => this.setState({label: text})}
              value={this.state.label}
            />
          </MaterialDialog>
        </View>

        <View>
          <Text> 조명 밝기 </Text>
        </View>

        <View>
          <Text> 시작시간 </Text>
          <DatePicker date={this.state.startTime} mode="time" confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(time) => {
            this.setState ({startTime: time});
            console.log ("startTime set to : " , this.state.startTime);
          }} showIcon={false} />
        </View>

        <View>
          <Text> 종료시간 </Text>
          <DatePicker date={this.state.endTime} mode="time" confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(time) => {
            this.setState ({endTime: time});
            console.log ("endTime set to : " , this.state.endTime);
          }} showIcon={false} />
        </View>
        
        <View>
          <TouchableOpacity onPress={() => {this.props.onGetDeviceStatePress (this.state.device_id)}}>
            <Text> aldjf;afjea </Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.device_id &&
            <Text> {JSON.stringify (device_state.toJS ())} </Text> ||
            <Text> {device_state.getIn ([this.state.device_id, "state", "reported"])} </Text>
          }
        </View>


        <View> 
          <Text> 세부 설정 </Text>
        </View>

        <View>
          <Text> 조명 밝기 </Text>
          <Slider
            onValueChange={(value) => this.setState ({light: value})}
          />
        </View>

        <View>
          <TouchableOpacity onPress={ () => { console.log ("onPress this.state.label: ", this.state.label);
            this.props.onAddReservationPress (this.state.device_id, this.state.reservation_id, this.state.startTime, this.state.endTime, this.state.every, this.state.invokeTime, this.state.notification, this.state.notificationIds, this.state.light, this.state.fanPower, this.state.scentInfo, this.state.label)}}>
            <Text> 알람 추가 </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
    )
  }
};

export default AddAlarmScreen;

const styles = EStyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    marginBottom: 63.75,
  },
  titleContainer: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontFamily: 'Noto Sans Bold',
    fontSize: 20,
  },
  listContainer: {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  listLeftContainer: {
    //position: 'absolute',
    left: 0,

  },
  listRightContainer: {
    //position: 'absolute',
    right: 0,
  },
  listLeft: {
    fontFamily: 'Noto Sans',
    fontSize: 20,
  },
  listRight: {
    fontFamily: 'Noto Sans',
    fontSize: 20,
    color: 'grey',
  },
  startTime: {
    borderColor: 'transparent',
  },
})
