import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const START = { x: -0.2, y: 1.2 };
const END = { x: 1.2, y: -0.2 };
const COLORS = [
  '#04040c',
  '#111',
  '#111',
  '#081838',
  '#04040c',
  '#111',
];
const LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const MOVEMENT = LOCATIONS[1] / 20;
const INTERVAL = 65;

interface AnimatedGradientProps {
  containerStyle: ViewStyle;
  children: ReactNode;
}

/** 
 * @credit Chelsea @ MissCoding
 * https://www.youtube.com/watch?v=xLQ7a3lNwCo
 */
export function Gradient({
  containerStyle,
  children,
}: AnimatedGradientProps) {
  const [gradientOptions, setGradientOptions] = useState({
    start: START,
    end: END,
    locations: LOCATIONS,
    colors: COLORS,
  });

  const gradientOptionsRef = useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

  const updateColors = useCallback(() => {
    const gradientColors = [...gradientOptionsRef.current.colors];

    gradientColors.shift();
    gradientColors.push(gradientColors[1]);

    setGradientOptions({
      colors: gradientColors,
      locations: LOCATIONS,
      start: START,
      end: END,
    });
  }, []);

  const updateLocations = useCallback(() => {
    let updatedLocations = gradientOptionsRef.current.locations.map(
      (location, index) =>
        index === gradientOptionsRef.current.locations.length
          ? 1
          : parseFloat(Math.max(0, location - MOVEMENT).toFixed(2))
    );

    setGradientOptions({
      colors: [...gradientOptionsRef.current.colors],
      locations: updatedLocations,
      start: START,
      end: END,
    });
  }, []);

  useEffect(() => {
    setInterval(
      () =>
        gradientOptionsRef.current.locations[1] - MOVEMENT <= 0
          ? updateColors()
          : updateLocations(),
      INTERVAL
    );
  }, []);

  return (
    <LinearGradient
      style={containerStyle}
      start={gradientOptions.start}
      end={gradientOptions.end}
      colors={gradientOptions.colors}
      locations={gradientOptions.locations}
    >
      {children}
    </LinearGradient>
  );
}
