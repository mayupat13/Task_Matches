import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, SafeAreaView, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import TextInputUI from './components/TextInput'
export const { width, height } = Dimensions.get('window');
import ToggleSwitch from 'toggle-switch-react-native'
import RNSpeedometer from 'react-native-speedometer'
import Text from './components/CustomText'


const Colors = {
  primaryBlue: '#026786',
  primaryYellow: '#FFCD05',
  screenBG: '#FCFCFC',
  gray1: '#E6E6E6',
  gray2: '#EFEFEF',
  fullWhite: '#FFFFFF',
  secondaryBlue: '#EFF7F8'
}

const labels = [
  {
    name: 'Low Demand',
    labelColor: '#ff5400',
    activeBarColor: '#ff5400',
  },
  {
    name: 'Average demand',
    labelColor: '#f2cf1f',
    activeBarColor: '#f2cf1f',
  },
  {
    name: 'Good Demand',
    labelColor: '#00ff6b',
    activeBarColor: '#00ff6b',
  },
];

const days = [{ day: 'Monday', isSelected: true, id: 1 },
{ day: 'Tuesday', isSelected: false, id: 2 },
{ day: 'Wednesday', isSelected: false, id: 3 },
{ day: 'Thursday', isSelected: false, id: 4 },
{ day: 'Friday', isSelected: false, id: 5 },
{ day: 'Saturday', isSelected: true, id: 6 },
{ day: 'Sunday', isSelected: true, id: 0 }
]

export default function App() {

  const [rPrice, setRPrice] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [meterValue, setMeterValue] = useState(0);
  const [regularPriceCriteria, setRegularPriceCriteria] = useState(false);
  const [peakPriceCriteria, setPeakPriceCriteria] = useState(false);
  const [demand, setDemand] = useState('');

  useEffect(() => {
    calculateMeter(); // This is be executed when `loading` state changes
  }, [toggle1, toggle2, regularPriceCriteria, peakPriceCriteria, rPrice, pPrice, meterValue])

  const togglePeakdays = (isOn) => {
    setToggle1(isOn)
  }

  const calculateMeter = () => {
    let count = 0
    if (regularPriceCriteria == true) {
      count = count + 1;
    }
    if (peakPriceCriteria == true) {
      count = count + 1;
    }
    if (toggle1 == true) {
      count = count + 1;
    }
    if (toggle2 == true) {
      count = count + 1;
    }

    if (count == 4) {
      setMeterValue(75)
      setDemand('Good Demand')
    } else if (count == 2 || count == 3) {
      setMeterValue(45)
      setDemand('Average Demand')
    } else {
      setMeterValue(15)
      setDemand('Low Demand')
    }

  }

  const toggleLongTerm = (isOn) => {
    setToggle2(isOn)
  }

  const settingRegularPrice = (text) => {
    setRPrice(text)
    if (text > 55 && text < 70) {
      setRegularPriceCriteria(true)
    } else {
      setRegularPriceCriteria(false)
    }
  }

  const settingPeakPrice = (text) => {
    setPPrice(text)
    if (text > 75 && text < 90) {
      setPeakPriceCriteria(true)
    } else {
      setPeakPriceCriteria(false)
    }
  }




  return (
    <View style={styles.__container}>
      <StatusBar backgroundColor={Colors.primaryBlue} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.__topContainer}>
            <View style={styles.__leftTop}>
              <View style={styles.__pricingView}>
                <Text style={styles.__pricingText}>Pricing</Text>
                <Icon
                  name="chevron-small-down"
                  size={30}
                  color={Colors.fullWhite}
                />
              </View>
              <Text style={styles.__rightTopText}>Save & Exit</Text>
            </View>
            <Text style={styles.__topContainerNote}>Enter the price that you want to charge for renting out your car .</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.__textInputUI1}>
              <TextInputUI
                label={"Regular Price (Daily) *"}
                labelStyle={{ marginBottom: 5 }}
                width='100%'
                placeholder="00"
                // placeholderTextColor={placeHolderColor}
                onChangeText={(text) => { settingRegularPrice(text) }}
                value={rPrice}
                keyboardType={'number-pad'}
                // editable={ifCreate ? true : false}
                otherStyle={styles.__textInputOtherUI}
                textInputStyles={styles.__textInputUIStyle}
                backgroundColor={Colors.fullWhite}
                leftText={'$'}
              />
            </View>
            <View style={styles.__flexRow}>
              <Icon1
                name="info-circle"
                size={16}
                color={Colors.primaryBlue}
              />
              <Text style={styles.__textInputUI1Note}>Our pricing algorithm recommends price between $55 - 70 to maximise demand basis your car type and location</Text>
            </View>

            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <TextInputUI
                label={"Peak Price (Daily) *"}
                labelStyle={{ marginBottom: 5 }}
                width='100%'
                placeholder="00"
                // placeholderTextColor={placeHolderColor}
                onChangeText={(text) => { settingPeakPrice(text) }}
                value={pPrice}
                otherStyle={styles.__textInputOtherUI}
                textInputStyles={styles.__textInputUIStyle}
                backgroundColor={Colors.fullWhite}
                leftText={'$'}
              />
            </View>
            <View style={styles.__flexRow}>
              <Icon1
                name="info-circle"
                size={16}
                color={Colors.primaryBlue}
              />
              <Text style={styles.__textInputUI1Note}>Peak price allow you to charge extra for weekends or holidays.Recommended peak price for your car is between $75-90.</Text>
            </View>

            <View style={{ marginVertical: 20 }}>
              <Text style={styles.__daysListHeading}>Peak Price Days</Text>
              <FlatList
                horizontal
                data={days}
                renderItem={({ item }) =>
                  <View style={[styles.__eachDay, { backgroundColor: item.isSelected ? Colors.primaryBlue : Colors.secondaryBlue }]}>
                    <Text style={{ color: item.isSelected ? Colors.fullWhite : Colors.primaryBlue }}>
                      {(item.day).charAt(0)}
                    </Text>
                  </View>}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
            <View style={{ borderWidth: 0.5, borderColor: Colors.gray2 }} />
            <View style={{ marginVertical: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.__toggleHeading}>Set peak price on public holidays</Text>
                <ToggleSwitch
                  isOn={toggle1}
                  onColor={Colors.primaryBlue}
                  offColor={Colors.gray1}
                  size="small"
                  onToggle={isOn => togglePeakdays(isOn)}
                />
              </View>
              <Text style={styles.__toggleContent}>Automatically apply peak prices on public holidays.</Text>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: Colors.gray2 }} />

            <View style={{ marginVertical: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.__toggleHeading}>Long Term Rental</Text>
                <ToggleSwitch
                  isOn={toggle2}
                  onColor={Colors.primaryBlue}
                  offColor={Colors.gray1}
                  size="small"
                  onToggle={isOn => toggleLongTerm(isOn)}
                />
              </View>
              <Text style={styles.__toggleContent}>Allow guests to book your car for long term, ie greater than 2 months.</Text>
            </View>
          </View>
          <View style={styles.__meterView}>
            <RNSpeedometer
              value={meterValue}
              size={100}
              minValue={0}
              maxValue={90}
              labels={labels}
            />
            <Text style={{ marginLeft: 5, width: '70%', }}>
              <Text style={styles.__demandNote}>{demand}</Text>
              : lorem ipsum dolor sit amet, sed diam nonum et justo ut labore et justo urn
            </Text>
          </View>
        </ScrollView>
        <View style={styles.__bottomView}>
          <View style={styles.__backButtonView}>
            <Icon1
              name="arrow-left"
              size={16}
              color={Colors.primaryBlue}
            />
          </View>
          <TouchableOpacity style={styles.__nextButton}>
            <Text style={styles.__nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({

  __container: {
    flex: 1,
    backgroundColor: Colors.screenBG,
  },
  __topContainer: { backgroundColor: Colors.primaryBlue, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  __leftTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, },
  __pricingView: { flexDirection: 'row', alignItems: 'center', },
  __pricingText: { fontFamily: 'MuseoSans_500', color: Colors.fullWhite, fontSize: 18 },
  __rightTopText: { fontFamily: 'MuseoSans_700', color: Colors.primaryYellow, borderBottomWidth: 1, borderBottomColor: Colors.primaryYellow },
  __topContainerNote: { paddingHorizontal: 20, fontSize: 14, color: Colors.fullWhite, paddingVertical: 20 },
  __textInputUI1: { marginTop: 20, marginBottom: 10 },
  __textInputUI1Note: { color: Colors.primaryBlue, fontSize: 14, marginLeft: 5 },
  __textInputOtherUI: { borderWidth: 1, borderColor: Colors.gray1, borderRadius: 5, },
  __textInputUIStyle: { fontFamily: 'MuseoSans_500', color: Colors.primaryBlue },
  __daysListHeading: { color: Colors.primaryBlue, fontSize: 14, marginBottom: 10 },
  __eachDay: { height: 44, width: 44, borderRadius: 50, alignItems: 'center', justifyContent: 'center', margin: 3 },
  __toggleHeading: { fontFamily: 'MuseoSans_500', color: Colors.primaryBlue, fontSize: 18, marginBottom: 5 },
  __toggleContent: { color: Colors.primaryBlue, fontSize: 14, },
  __meterView: { flexDirection: 'row', backgroundColor: Colors.secondaryBlue, padding: 10 },
  __demandNote: { fontFamily: 'MuseoSans-700', fontSize: 18, color: Colors.primaryBlue },
  __bottomView: { backgroundColor: Colors.fullWhite, elevation: 5, flexDirection: 'row', padding: 20, },
  __backButtonView: { alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: Colors.fullWhite, elevation: 5, borderWidth: 1, borderColor: Colors.primaryBlue, borderRadius: 5 },
  __nextButton: { backgroundColor: Colors.primaryBlue, justifyContent: 'center', alignItems: 'center', width: width - 90, marginLeft: 10, borderRadius: 5 },
  __nextButtonText: { fontSize: 18, color: Colors.fullWhite, fontFamily: 'MuseoSans_700' },
  __flexRow: { flexDirection: 'row', }
})

