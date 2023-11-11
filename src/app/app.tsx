'use client'
import React from 'react';
import { Controls } from '@/components/Controls';

import { Flex } from '@radix-ui/themes';
import { RenderComponets } from '@/components/RenderComponets';

const App: React.FC = () => {
  return (
    <Flex>
      <Controls />
      < RenderComponets />
    </Flex>
  );
};

export default App;
