import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [paused, setPaused] = useState(false)
  const [over, setOver] = useState(false)
  const [[h, m, s], setTime] = useState([hours, minutes, seconds])

  const tick = () => {
    if (paused || over) return
    if (h === 0 && m === 0 && s === 0) setOver(true)
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59])
    } else if (s === 0) {
      setTime([h, m - 1, 59])
    } else {
      setTime([h, m, s - 1])
    }
  }

  const reset = () => {
    setTime([Number(hours), Number(minutes), Number(seconds)])
    setPaused(false)
    setOver(false)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)

    return () => {
      clearInterval(timerID)
    }
  })

  return (
    <>
      <p>{`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
        .toString()
        .padStart(2, '0')}`}</p>
      <div>{over ? "Time's up!" : ''}</div>
      <button
        onClick={() => {
          setPaused(!paused)
        }}
      >
        {paused ? (
          <FontAwesomeIcon icon="play" />
        ) : (
          <FontAwesomeIcon icon="pause" />
        )}
      </button>
      <button onClick={() => reset()}>
        <FontAwesomeIcon icon="redo" />
      </button>
    </>
  )
}

export default CountDown
