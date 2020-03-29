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
  loaderBuilder: () => React.ReactElement;
  onTopReached?: () => void;
  onBottomReached?: () => void;
}
export const InfiniteLoadingList: React.FC<IInfiniteLoadingListProps> = (props) => {
  const ref = createRef<Scrollbars>()
  const [previousScrollHeight, setPreviousScrollHeight] = useState<number>(0)

  useEffect(() => {
    if (ref.current) {
      if (props.fromBottom) {
        ref.current.scrollToBottom()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('prev', previousScrollHeight)
    if (ref.current)
      ref.current.scrollTop(ref.current.getScrollHeight() - previousScrollHeight)
  }, [props.children])

  const onScroll = (e: any) => {
    const offsetFromBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    console.log(e.target.scrollTop)

    setPreviousScrollHeight(e.target.scrollHeight)
    if (offsetFromBottom === 0 && props.onBottomReached) props.onBottomReached()
    if (e.target.scrollTop === 0 && props.onTopReached) props.onTopReached()
  }

  return (
    <Scrollbars key={'scrollbar-main'} autoHide onScroll={onScroll} ref={ref}>
      {props.isLoading && props.loaderBuilder()}
      {props.children}
    </Scrollbars>
  )
}