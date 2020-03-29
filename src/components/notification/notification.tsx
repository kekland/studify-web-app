import UIfx from 'uifx'
import notificationMp3 from '../../notification.mp3'

export const notificationSound = new UIfx(
  notificationMp3,
  {
    volume: 0.5,
    throttleMs: 100,
  }
)