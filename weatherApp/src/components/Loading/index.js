import React, { useEffect, useState } from 'react';
import { Easing, Animated, View } from 'react-native';

export default function Loading() {
  const [ball1, setBall1] = useState(new Animated.Value(0));
  const [ball2, setBall2] = useState(new Animated.Value(0));
  const [ball3, setBall3] = useState(new Animated.Value(0));
  const [balls, setBalls] = useState([ball1, ball2, ball3]);

  const styles = {
    backgroundColor: '#2b283d',
    marginRight: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ball1, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
        }),
        Animated.timing(ball2, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
        }),
        Animated.timing(ball3, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
        }),
      ])
    ).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      {balls.map(ball => (
        <Animated.View
          style={[
            styles,
            {
              transform: [
                {
                  scale: ball.interpolate({
                    inputRange: [0.2, 0.5, 0.7, 1],
                    outputRange: [1, 1.2, 1, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}
