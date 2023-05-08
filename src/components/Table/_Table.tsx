import React, { useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  LayoutChangeEvent,
} from 'react-native';

import { isNumber, memoize } from 'lodash';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

/** Demo */

/** Availability calendar example */

/** Excalidraw explanation */

/** Memoize everything */

interface CellSize {
  width: number;
  height: number;
}

interface Coordinates {
  x: number;
  y: number;
}

/** 1 */
const TABLE_ROWS = 4;
const TABLE_COLUMNS = 3;

export function Table() {
  /** 5 */
  const cellSize = useRef<CellSize>();

  /** 7 */
  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();

  /** 9 */
  const resetState = () => {
    setStartIndex(undefined);
    setEndIndex(undefined);
  };

  /** 8 */
  const isWithinRange = useCallback(
    (index: number) => {
      if (!isNumber(startIndex) || !isNumber(endIndex)) {
        return;
      }

      return (
        (index >= startIndex && index <= endIndex) ||
        (index >= endIndex && index <= startIndex)
      );
    },
    [startIndex, endIndex]
  );

  /** 6 */
  const handleDragSelection = useCallback(({ x, y }: Coordinates) => {
    if (!cellSize.current) {
      return;
    }

    const cellWidth = cellSize.current.width + CELL_MARGIN * 2;
    const cellHeight = cellSize.current.height + CELL_MARGIN * 2;

    const targetColumn = Math.floor((x - CELL_MARGIN) / cellWidth);
    const targetRow = Math.floor((y - CELL_MARGIN) / cellHeight);

    return targetRow * TABLE_COLUMNS + targetColumn;
  }, []);

  /** 4 onChange logs */
  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(({ x, y }) => {
          const index = handleDragSelection({ x, y });

          setStartIndex(index);
          setEndIndex(index);
        })
        .onChange(({ x, y }) => setEndIndex(handleDragSelection({ x, y })))
        .onFinalize(() => {
          if (!isNumber(startIndex) || !isNumber(endIndex)) {
            return;
          }

          Alert.alert(`Selected from ${startIndex} to ${endIndex}`);
          resetState();
        })
        .shouldCancelWhenOutside(true)
        .onTouchesCancelled(resetState),
    [startIndex, endIndex, handleDragSelection]
  );

  /** 5 */
  const onLayout = useCallback(
    (event: LayoutChangeEvent) =>
      event.target.measure(
        (_: number, __: number, width: number, height: number) =>
          (cellSize.current = { width, height })
      ),
    []
  );

  return (
    <View style={styles.container}>
      {/** 3 */}
      <GestureDetector gesture={gesture}>
        {/** 2 */}
        <FlatList
          style={styles.table}
          data={new Array(TABLE_COLUMNS * TABLE_ROWS).fill(1)}
          keyExtractor={(_, i) => i.toString()}
          scrollEnabled={false}
          numColumns={TABLE_COLUMNS}
          renderItem={memoize(({ index }) => {
            /** 8 */
            const isSelected = isWithinRange(index);

            return (
              <View
                onLayout={
                  /** 5 */
                  onLayout
                }
                style={[
                  styles.cell,
                  {
                    backgroundColor: isSelected ? '#fff' : '#FFFFFF05',
                    shadowRadius: isSelected ? 2 : 5,
                  },
                ]}
              />
            );
          })}
        />
      </GestureDetector>
    </View>
  );
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
const CELL_MARGIN = 5;
const CELL_WIDTH =
  ((SCREEN_WIDTH - TABLE_COLUMNS * (CELL_MARGIN * 2)) / TABLE_COLUMNS) * 0.9;
const CELL_HEIGHT =
  ((SCREEN_HEIGHT - TABLE_ROWS * (CELL_MARGIN * 2)) / TABLE_ROWS) * 0.33;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    flexGrow: 0,
  },
  cell: {
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
    margin: CELL_MARGIN,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowOpacity: 1,
    shadowColor: 'white',
    shadowOffset: { height: 1, width: 0 },
  },
});
