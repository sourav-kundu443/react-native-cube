import React, {Component, PropTypes} from 'react';
import {Dimensions, PanResponder, StyleSheet, Text, View} from 'react-native';
import {transformOrigin, rotateXY, rotateXZ} from './utils';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  parentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // position: 'absolute',
    // left: WIDTH / 2 - 50,
    // top: HEIGHT / 2 - 50,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },
  rectangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    // zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
    });
  }

  handlePanResponderMove(e, gestureState) {
    const {dx, dy} = gestureState;
    const origin = {x: 0, y: 0, z: -50};
    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    this.refViewTop.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    this.refViewBottom.setNativeProps({
      style: {transform: [{perspective: 1000}, {matrix: matrix}]},
    });
  }

  renderLeft(color) {
    return (
      <View
        ref={component => (this.refViewRight = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>A</Text>
      </View>
    );
  }

  renderRight(color) {
    return (
      <View
        ref={component => (this.refViewLeft = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>B</Text>
      </View>
    );
  }

  renderFront(color) {
    return (
      <View
        ref={component => (this.refViewFront = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>C</Text>
      </View>
    );
  }

  renderBack(color) {
    return (
      <View
        ref={component => (this.refViewBack = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>D</Text>
      </View>
    );
  }

  renderTop(color) {
    return (
      <View
        ref={component => (this.refViewTop = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>E</Text>
      </View>
    );
  }

  renderBottom(color) {
    return (
      <View
        ref={component => (this.refViewBottom = component)}
        style={[styles.rectangle, color ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>F</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          {this.renderBack('#ff33ff')}
          {this.renderLeft('green')}
          {this.renderRight('#d1426b')}
          {this.renderTop('#ff9768')}
          {this.renderBottom('#4c72e0')}
          {this.renderFront('#ffd700')}
        </View>
      </View>
    );
  }
}
