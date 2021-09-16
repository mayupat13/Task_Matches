import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

//utilities
export const { width, height } = Dimensions.get('window');
const Colors = {
  primaryBlue: '#026786',
  primaryYellow: '#FFCD05',
  screenBG: '#FCFCFC',
  gray1: '#E6E6E6',
  fullWhite: '#FFFFFF',
  secondaryBlue: '#EFF7F8'
}
class TextInputUI extends Component {
  render() {
    let {
      value,
      onChangeText,
      placeholder,
      placeholderTextColor,
      editable,
      password,
      keyboardType,
      maxLength,
      returnKeyTypes,
      returnKeyLabels,
      leftIconSize,
      leftIconColor,
      leftIconName,
      rightIconSize,
      rightIconColor,
      rightIconName,
      width,
      inputBackground,
      leftText,
      onRightIconPress,
      backgroundColor,
      leftTextColor,
      elevation,
      height,
      leftTextSize,
      inputBorderR,
      textInputStyles,
      otherStyle,
      leftViewStyle,
      label,
      labelSize,
      labelColor,
      labelStyle,
      multiline,
      numberOfLines,
      autoFocus,
      blurOnSubmit,
      onSubmitEditing,
      refData,
      onEndEditing,
      rightText,
      rightViewStyle,
      rightTextColor,
      rightTextSize,
      bottomBorderColor,
      autoCapitalize,
      textAlignVertical,
      noBottomBorder,
    } = this.props;
    return (
      <>
        {label ? (
          <Text
            style={[{ fontSize: labelSize, color: labelColor }, { ...labelStyle }]}>
            {label}
          </Text>
        ) : null}
        <View
          style={[
            styles.__inputView,
            {
              width:
                width === 'sm'
                  ? __inpSmall
                  : width === 'md'
                    ? __inpMid
                    : width === 'lg'
                      ? __inpLarge
                      : width,
              height: height,
              backgroundColor: backgroundColor,
              elevation: elevation,
              borderRadius: inputBorderR,
              ...otherStyle,
            },
          ]}>
          {leftIconName ? (
            <View style={styles.__leftIconView}>
              <Icon
                size={leftIconSize}
                color={leftIconColor}
                name={leftIconName}
              />
            </View>
          ) : null}
          {leftText ? (
            <View style={[styles.__leftTextView, { ...leftViewStyle }]}>
              <Text
                style={[
                  styles.__leftText,
                  { color: leftTextColor, fontSize: leftTextSize },
                ]}>
                {leftText}
              </Text>
            </View>
          ) : null}
          <View
            style={[
              styles.__textInputView,
              {
                width: '100%'
              },
            ]}>
            <TextInput
              ref={refData}
              value={value}
              style={[
                styles.__input,
                {
                  backgroundColor: inputBackground,
                },
                { ...textInputStyles },
              ]}
              autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              editable={editable}
              secureTextEntry={password}
              keyboardType={keyboardType}
              maxLength={maxLength}
              returnKeyType={returnKeyTypes}
              returnKeyLabel={returnKeyLabels}
              multiline={multiline}
              numberOfLines={numberOfLines}
              blurOnSubmit={blurOnSubmit}
              onSubmitEditing={onSubmitEditing}
              autoFocus={autoFocus}
              onEndEditing={onEndEditing}
              textAlignVertical={textAlignVertical}
            />
          </View>
          {rightIconName ? (
            <View style={styles.__rightIconView}>
              <Icon
                size={rightIconSize}
                color={rightIconColor}
                name={rightIconName}
                onPress={onRightIconPress}
              />
            </View>
          ) : null}
          {rightText ? (
            <View style={[styles.__rightTextView, { ...rightViewStyle }]}>
              <Text
                style={[
                  styles.__rightText,
                  { color: rightTextColor, fontSize: rightTextSize },
                ]}>
                {rightText}
              </Text>
            </View>
          ) : null}
        </View>
        {bottomBorderColor ? (
          <View
            style={{
              borderBottomColor: bottomBorderColor
                ? bottomBorderColor
                : '#a1a1a1',
              borderBottomWidth: 1,
              marginHorizontal: 10,
            }}
          />
        ) : null}
        {/* {!noBottomBorder ? (
          <View
            style={{
              borderBottomColor: bottomBorderColor
                ? bottomBorderColor
                : '#a1a1a1',
              borderBottomWidth: 1,
              marginHorizontal: 10,
            }}
          />
        ) : null} */}
      </>
    );
  }
}

const __inpSmall = width / 2 + 10;

const __inpMid = width / 2 + 60;

const __inpLarge = width - 25;

TextInputUI.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  editable: PropTypes.bool,
  password: PropTypes.bool,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  returnKeyTypes: PropTypes.string,
  returnKeyLabels: PropTypes.string,
  leftIconSize: PropTypes.number,
  leftIconColor: PropTypes.string,
  leftIconName: PropTypes.string,
  rightIconSize: PropTypes.number,
  rightIconColor: PropTypes.string,
  rightIconName: PropTypes.string,
  width: PropTypes.any,
  inputBackground: PropTypes.string,
  leftText: PropTypes.string,
  onRightIconPress: PropTypes.any,
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  leftTextSize: PropTypes.number,
  height: PropTypes.number,
  inputBorderR: PropTypes.number,
  textInputStyles: PropTypes.any,
  otherStyle: PropTypes.object,
  leftViewStyle: PropTypes.object,
  labelSize: PropTypes.number,
  labelColor: PropTypes.string,
  labelStyle: PropTypes.object,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.bool,
  onSubmitEditing: PropTypes.any,
  onEndEditing: PropTypes.func,
  rightText: PropTypes.string,
  rightViewStyle: PropTypes.object,
  rightTextColor: PropTypes.string,
  rightTextSize: PropTypes.number,
  textAlignVertical: PropTypes.string,
};

TextInputUI.defaultProps = {
  editable: true,
  password: false,
  keyboardType: 'default',
  returnKeyTypes: 'default',
  returnKeyLabels: '',
  maxLength: 200,
  width: 'sm',
  backgroundColor: 'transparent',
  leftTextColor: Colors.primaryBlue,
  inputBackground: Colors.fullWhite,
  elevation: 0,
  leftTextSize: 17,
  height: 50,
  inputBorderR: 1,
  labelSize: 16,
  labelColor: Colors.primaryBlue,
  multiline: false,
  autoFocus: false,
  blurOnSubmit: true,
  onSubmitEditing: () => { },
  onEndEditing: () => { },
  rightTextColor: Colors.primaryBlue,
  rightTextSize: 17,
  textAlignVertical: 'auto',
};

const styles = StyleSheet.create({
  __inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingLeft: 15,
  },
  __leftIconView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  __textInputView: {
    flex: 1,
    justifyContent: 'center',
  },
  __input: {
    fontSize: 16,
  },
  __rightIconView: {
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 8,
  },
  __leftTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  __leftText: {},
  __rightTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});

export default TextInputUI;