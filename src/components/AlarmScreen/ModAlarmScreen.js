import React from 'react';
import { TextInput, ScrollView, Text, View, TouchableOpacity, Slider } from 'react-native';
//import { SelectPicker } from 'react-native-select-picker';
import { MaterialDialog, SinglePickerMaterialDialog, MultiPickerMaterialDialog } from 'react-native-material-dialog';
console.log ("hello");
import DatePicker from 'react-native-datepicker';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';


class AddAlarmScreen extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      showDevice: false,
      singleDeviceSelectedItem: undefined,

      showDay: false,
      multipleDaySelectedItem: [],

      showLabel: false,
    };
  };


  render () {
    let _this = this;

    let { navigation } = this.props;
    let item = navigation.getParam ("item", "no such item");
    let cur_device_name = item[device_id];
    let cur_device_id = item[device_name];
    let cur_startTime = item[start_Time];
    let cur_endTime = item[end_Time];
    let cur_every = item[every];
    let cur_invokeTime = item[invokeTime];
    let cur_notification = item[notification];
    let cur_notificationId = item[notificatonIds];
    let cur_light = item[light];
    let cur_fanPower = item[fanPower];
    let cur_scentInfo = item[scentInfo];
    let cur_label = item[label];

    var device = this.props.device.toJS ();
    var device_state = this.props.device_state.toJS ();

    console.log ("_.values (Device): " , _.values (device));
    

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
              cur_device_name = result.selectedItem.label;
              cur_device_id = _.keys (device)[result.selectedItem.value];
              //this.setState({ device_name: result.selectedItem.label});
              //this.setState({ device_id: _.keys(device)[result.selectedItem.value]});
              console.log (result);
              console.log (_.keys(device)[result.selectedItem.value]);
            }}
          />
          <Text> {cur_device_name} </Text>
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
              {result.selectedItems.forEach (x => {(cur_every).push (x.label)})};
              console.log (result);
              console.log ( result.selectedItems);
              console.log ( _.filter (result.selectedItems, {'selected': true}));
              console.log ( this.state.every);
            }}
          />
          <Text> {JSON.stringify(cur_every)} </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => {this.setState ({ showLabel: true })}}>
            <Text> 레이블 </Text>
          </TouchableOpacity>
          {cur_label &&
            <Text> {cur_label} </Text>
          }
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
              value={cur_label}
            />
          </MaterialDialog>
        </View>

        <View>
          <Text> 조명 밝기 </Text>
        </View>

        <View>
          <Text> 시작시간 </Text>
          <DatePicker date={cur_startTime} mode="time" confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(time) => {
            cur_startTime = time;
            console.log ("startTime set to : " , cur_startTime);
          }} showIcon={false} />
        </View>

        <View>
          <Text> 종료시간 </Text>
          <DatePicker date={cur_endTime} mode="time" confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(time) => {
            cur_endTime = time;
            console.log ("endTime set to : " , cur_endTime);
          }} showIcon={false} />
        </View>
        
        <View>
          <TouchableOpacity onPress={() => {this.props.onGetDeviceStatePress (cur_device_id)}}>
            <Text> aldjf;afjea </Text>
          </TouchableOpacity>
        </View>


        <View> 
          <Text> 세부 설정 </Text>
        </View>

        <View>
          <Text> 조명 밝기 </Text>
          <Slider
            onValueChange={(value) => {cur_lgiht = value}}
          />
        </View>

        <View>
          <TouchableOpacity onPress={ () => { console.log ("onPress label: ", cur_label);
            this.props.onModReservationPress (cur_device_id, cur_reservation_id, cur_startTime, cur_endTime, cur_every, cur_invokeTime, cur_notification, cur_notificationIds, cur_light, cur_fanPower, cur_scentInfo, cur_label)}}>
            <Text> 알람 수정 </Text>
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
