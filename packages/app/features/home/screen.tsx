'use client'

import { View } from 'app/design/view'
import { styles } from './styles'
import { useState, useRef } from 'react'
import { Text, Pressable } from 'react-native'

// -1 -> eraser
// 0 -> not editable
// 1 -> creator
type modes = 0 | 1 | -1

export function HomeScreen() {
  const width = 100
  const height = 100
  const cellHeight = 3

  const cellWidth = (cellHeight * width) / height

  const numCells = Math.ceil((width * height) / (cellHeight * cellWidth))

  let [board, setBoard] = useState<number[]>(new Array(numCells).fill(0))

  let [mode, setMode] = useState<modes>(0)
  let paused = false
  let isPlaying = false
  let timer = useRef<NodeJS.Timer>()
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
        <Pressable
          onPress={() => {
            if (!isPlaying) {
              setMode(0)
              paused = false
              isPlaying = true
              timer.current = setInterval(() => {
                if (isPlaying) {
                  console.log('f', isPlaying)
                  setBoard((board) => nextGeneration(board, width, height))
                }
              }, 1000)
            }
          }}
          style={({ pressed, hovered }) => [
            styles.button,
            isPlaying && styles.buttonPressed,
            hovered && styles.buttonHovered,
          ]}
        >
          <Text style={styles.button}>Start</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setMode(0)
            isPlaying = false
            paused = true
            clearInterval(timer.current!)
          }}
          style={({ pressed, hovered }) => [
            styles.button,
            paused && styles.buttonPressed,
            hovered && styles.buttonHovered,
          ]}
        >
          <Text style={styles.button}>Pause</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setMode(0)
            let temp = new Array(numCells).fill(0)
            setBoard(temp)
            clearInterval(timer.current!)
          }}
          style={styles.button}
        >
          <Text style={styles.button}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.modeBar}>
        <Pressable
          onPress={() => {
            setMode(1)
          }}
          style={({ pressed, hovered }) => [
            styles.button,
            mode == 1 && styles.buttonPressed,
            hovered && styles.buttonHovered,
          ]}
        >
          <Text style={styles.buttonText}>Creator</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setMode(-1)
          }}
          style={({ pressed, hovered }) => [
            styles.button,
            mode == -1 && styles.buttonPressed,
            hovered && styles.buttonHovered,
          ]}
        >
          <Text style={styles.buttonText}>Eraser</Text>
        </Pressable>
      </View>
    </View>
  )
}
function getNeighborCount(
  grid: number[],
  x: number,
  y: number,
  width: number,
  height: number,
): number {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  let count = 0
  for (const [dx, dy] of directions) {
    const newX = x + dx!
    const newY = y + dy!
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      count += grid[newY * width + newX]!
    }
  }
  return count
}

function nextGeneration(
  grid: number[],
  width: number,
  height: number,
): number[] {
  const newGrid = [...grid]

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x
      const liveNeighbors = getNeighborCount(grid, x, y, width, height)
      if (grid[index] === 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          newGrid[index] = 0 // Cell dies
        }
      } else {
        if (liveNeighbors === 3) {
          newGrid[index] = 1 // Cell becomes alive
        }
      }
    }
  }

  return newGrid
}
