import React, { useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const CustomScrollbars: React.FC<any> = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback(scrollbarsRef => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view);
    } else {
      forwardedRef(null);
    }
  }, [forwardedRef]);

  return (
    <Scrollbars
      ref={refSetter}
      autoHide
      style={{ ...style, overflow: "hidden" }}
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  );
};

export const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));
