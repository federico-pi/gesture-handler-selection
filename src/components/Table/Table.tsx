import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  LayoutChangeEvent,
  FlatList,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
  Text,
} from 'react-native';

import { isNumber } from 'lodash';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface CellSize {
  height: number;
  width: number;
}

interface Coordinates {
  x: number;
  y: number;
}

interface Selection {
  start: number;
  end: number;
}

const TABLE_ROWS = 4;
const TABLE_COLUMNS = 3;

export function Table() {
  const cellSize = useRef<CellSize>();

  const [startIndex, setStartIndex] = useState<number>();
  const [endIndex, setEndIndex] = useState<number>();
  const [selection, setSelection] = useState<Selection>();

  const resetState = () => {
    setEndIndex(undefined);
    setStartIndex(undefined);
  };

  const isWithinRange = useCallback(
    (index: number) => {
      if (!isNumber(startIndex) || !isNumber(endIndex)) {
        return false;
      }

      return (
        (index >= startIndex && index <= endIndex) ||
        (index >= endIndex && index <= startIndex)
      );
    },
    [startIndex, endIndex]
  );

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

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(({ x, y }) => {
          setSelection(undefined);

          const index = handleDragSelection({ x, y });

          setStartIndex(index);
          setEndIndex(index);
        })
        .onChange(({ x, y }: Coordinates) =>
          setEndIndex(handleDragSelection({ x, y }))
        )
        .onFinalize(() => {
          if (isNumber(startIndex) && isNumber(endIndex)) {
            setSelection({ start: startIndex, end: endIndex });
            resetState();
          }
        })
        .shouldCancelWhenOutside(true)
        .onTouchesCancelled(resetState),
    [startIndex, endIndex, handleDragSelection]
  );

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
      <View style={styles.tooltipWrapper}>
        {selection && (
          <Text style={styles.tooltip}>
            {`Selected cells from index ${selection.start} to ${selection.end} 🎉`}
          </Text>
        )}
        {!selection && isNumber(startIndex) && (
          <Text style={styles.tooltip}>{`Selecting...`}</Text>
        )}
      </View>
      <GestureDetector gesture={gesture}>
        <FlatList
          style={styles.table}
          data={new Array(TABLE_COLUMNS * TABLE_ROWS).fill(1)}
          keyExtractor={(_, i) => i.toString()}
          scrollEnabled={false}
          numColumns={TABLE_COLUMNS}
          renderItem={({ index }: ListRenderItemInfo<1[]>) => {
            const isSelected = isWithinRange(index);

            return (
              <View
                onLayout={onLayout}
                style={[
                  styles.cell,
                  {
                    backgroundColor: isSelected ? '#FFFFFF' : '#FFFFFF05',
                    shadowRadius: isSelected ? 2 : 5,
                  },
                ]}
              />
            );
          }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipWrapper: {
    height: 20,
    marginBottom: 32,
  },
  tooltip: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
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
