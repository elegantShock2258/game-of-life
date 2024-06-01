'use client'

import { View } from 'app/design/view'
import { styles } from './styles'
import { useState, useEffect } from 'react'
import { Alert, Button, Text, Pressable } from 'react-native'
export function HomeScreen() {
  const width = 100
  const height = 100
  const cellHeight = 3

  const cellWidth = (cellHeight * width) / height

  const numCells = Math.ceil((width * height) / (cellHeight * cellWidth))

  let [board, setBoard] = useState<number[]>(new Array(numCells).fill(0))
  let [mode, setMode] = useState<number>(0)
  // -1 -> eraser
  // 0 -> not editable
  // 1 -> creator



  return (
    <View className={`h-full w-full bg-black`} style={styles.boardParent}>
      <View
        style={{ width: `${width}%`, height: `${height}%`, ...styles.board }}
      >
        {board.map((boardNumber, i) => (
          <Pressable
            onPress={() => {
              if (mode === 1) {
                const n = [...board]
                n[i] = 1
                setBoard(n)
              }
              if (mode === -1) {
                const n = [...board]
                n[i] = 0
                setBoard(n)
              }
              console.log(board, i)
            }}
            key={i}
            style={{
              ...styles.cell,
              backgroundColor: board[i] === 1 ? 'white' : 'black',
              width: `${cellHeight}%`,
              height: `${cellWidth}%`,
            }}
          />
        ))}
      </View>

      <View style={styles.buttonBar}>
        <Pressable onPress={() => {
          setMode(0)
          let n = nextGeneration(board,width,height);
          setBoard(n);
        }}>
          <Text style={styles.button}>Start</Text>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Text style={styles.button}>Pause</Text>
        </Pressable>
        <Pressable onPress={() => {}}>
          <Text style={styles.button}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.modeBar}>
        <Pressable
          onPress={() => {
            setMode(1)
          }}
        >
          <Text style={styles.button}>Creator</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setMode(-1)
          }}
        >
          <Text style={styles.button}>Eraser</Text>
        </Pressable>
      </View>
    </View>
  )
}
function getNeighborCount(grid: number[], x: number, y: number, width: number, height: number): number {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  let count = 0;
  for (const [dx, dy] of directions) {
    const newX = x + dx!;
    const newY = y + dy!;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      count += grid[newY * width + newX]!;
    }
  }
  return count;
}

function nextGeneration(grid: Grid, width: number, height: number): Grid {
  const newGrid = [...grid];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const liveNeighbors = getNeighborCount(grid, x, y, width, height);
      if (grid[index] === 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          newGrid[index] = 0; // Cell dies
        }
      } else {
        if (liveNeighbors === 3) {
          newGrid[index] = 1; // Cell becomes alive
        }
      }
    }
  }

  return newGrid;
}