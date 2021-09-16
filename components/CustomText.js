import React, { Component } from 'react';
import { Text } from 'react-native';


export default props => <Text {...props} style={[{ fontFamily: 'MuseoSans-3l00' }, props.style]}>{props.children}</Text>
