import React, { Component } from 'react'
import { View, Text, FlatList, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';

class App extends Component {

  state = {
    data: [
      { name: "A", isSelected: false, cardId: 0, id: 0 },
      { name: "B", isSelected: false, cardId: 1, id: 1 },
      { name: "C", isSelected: false, cardId: 2, id: 2 },
      { name: "D", isSelected: false, cardId: 3, id: 3 },
      { name: "E", isSelected: false, cardId: 4, id: 4 },
      { name: "F", isSelected: false, cardId: 5, id: 5 },
      { name: "G", isSelected: false, cardId: 6, id: 6 },
      { name: "H", isSelected: false, cardId: 7, id: 7 },
      { name: "H", isSelected: false, cardId: 7, id: 8 },
      { name: "G", isSelected: false, cardId: 6, id: 9 },
      { name: "F", isSelected: false, cardId: 5, id: 10 },
      { name: "E", isSelected: false, cardId: 4, id: 11 },
      { name: "D", isSelected: false, cardId: 3, id: 12 },
      { name: "C", isSelected: false, cardId: 2, id: 13 },
      { name: "B", isSelected: false, cardId: 1, id: 14 },
      { name: "A", isSelected: false, cardId: 0, id: 15 }
    ],
    selectedItem1: null,
    selectedItem2: null,
    loading: true
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  selectHandler1 = (id, type, name) => {
    // console.log("name....", name);
    let newArray = this.state.data.map((val, i) => {
      if (val.id === id) {
        return { ...val, isSelected: type }
      } else {
        return val
      }
    })
    this.setState({ data: newArray })
    let selectedItem1 = this.state.selectedItem1;
    console.log(selectedItem1, name);

    if (selectedItem1 == null) {
      this.setState({
        selectedItem1: name
      })

    } else {
      this.setState({
        selectedItem2: name
      })
    }
    console.log("selectedItem1....", selectedItem1);
    console.log("selectedItem2....", name)
    this.matchPair(name, type)
  }

  matchPair = (name) => {
    let selectedItem1 = this.state.selectedItem1;
    if (selectedItem1 != null && name != null) {
      if (selectedItem1 == name) {
        ToastAndroid.show("Pair matched!", ToastAndroid.SHORT);
        let newArray = this.state.data.filter((val) => {
          if (val.name !== name) {
            return val
          }
        })
        this.setState({ data: newArray, selectedItem1: null })
      } else {
        ToastAndroid.show("Pair not matched!", ToastAndroid.SHORT);
        // console.log(this.state.data);
        let newArray2 = this.state.data;
        newArray2.forEach((value) => {
          return value.isSelected = false
        })
        this.setState({ data: newArray2, selectedItem1: null })
        // console.log(this.state.data)
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 50, backgroundColor: 'orange', elevation: 5, justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>MATCH THE FOLLOWING</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => this.selectHandler1(item.id, !item.isSelected, item.name)}>
                <View style={{
                  ...styles.itemView,
                  backgroundColor: item.isSelected ? 'orange' : '#f2f2f2'
                }}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            }
            numColumns={4}
          />
        </View>
      </View>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  itemView: {
    width: 70,
    height: 55,
    backgroundColor: "#f2f2f2",
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})