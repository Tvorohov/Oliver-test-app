'use client'
import React, { useEffect } from 'react';
import { Controls } from '@/components/Controls';

import { Flex } from '@radix-ui/themes';
import { RenderComponets } from '@/components/RenderComponets';
import { useDispatch } from 'react-redux';
import { loadState } from '@/utils';
import { setupComponents } from '@/store/slices/layoutSlice';



const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const preloadedState = loadState();
    if (preloadedState) {
      dispatch(setupComponents(preloadedState));
    }
  }, [dispatch]);

  return (
    <Flex>
      <Controls />
      < RenderComponets />
    </Flex>
  );
};

export default App;
