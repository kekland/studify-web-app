import React, { createRef, useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'

export const List: React.FC = (props) => {
  return (
    <Scrollbars autoHide>
      {props.children}
    </Scrollbars>
  )
}

export interface IInfiniteLoadingListProps {
  fromBottom?: boolean;
  isLoading: boolean;
  hasMore: boolean;
  scrollRef?: React.RefObject<Scrollbars>,
  scrollTo?: number;
  loaderBuilder: () => React.ReactElement;
  onTopReached?: () => void;
  onBottomReached?: () => void;
}

export interface IScrollData {
  height: number;
  top: number;
}
export const InfiniteLoadingList: React.FC<IInfiniteLoadingListProps> = (props) => {
  const ref = props.scrollRef ?? createRef<Scrollbars>()
  const [previousScroll, setPreviousScroll] = useState<IScrollData>({ height: 0, top: 0 })

  useEffect(() => {
    if (ref.current) {
      if (props.fromBottom) {
        ref.current.scrollToBottom()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ref.current) {
      if (props.scrollTo) {
        ref.current.scrollTop(ref.current.getScrollHeight() - previousScroll.height - props.scrollTo)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scrollTo])

  useEffect(() => {
    console.log('prev', previousScroll)
    if (ref.current)
      ref.current.scrollTop(ref.current.getScrollHeight() - previousScroll.height + previousScroll.top)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children])

  const onScroll = (e: any) => {
    const offsetFromBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    console.log(e.target.scrollTop)

    setPreviousScroll({ height: e.target.scrollHeight, top: e.target.scrollTop })
    if (offsetFromBottom === 0 && props.onBottomReached) props.onBottomReached()
    if (e.target.scrollTop < 100 && props.onTopReached) props.onTopReached()
  }

  return (
    <Scrollbars key='scrollbar-main' autoHide onScroll={onScroll} ref={ref}>
      {props.hasMore ? props.loaderBuilder() : <div />}
      <div style={{ height: '12px' }} />
      {props.children}
    </Scrollbars>
  )
}