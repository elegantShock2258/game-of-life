import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  boardParent: {
    overflow: 'hidden',
  },
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'white',
  },
  modeBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100,
    zIndex: 9,
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translate(-50%)',
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#000000a0',
    padding: 10,
  },
  buttonBar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 200,

    zIndex: 9,
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: 'translate(-50%)',
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#000000a0',
    padding: 10,
  },
  button:{
    color: '#FFFFFF',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
