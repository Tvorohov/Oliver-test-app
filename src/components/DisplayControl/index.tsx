import { Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../Select';
import { getSelectedComponentStyles, updateStyle } from '@/store/slices/layoutSlice';

interface DisplayPropertyOptions {
  [key: string]: {
    options: string[];
    label: string;
  };
}

const displayOptions = ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'];

const flexOptions: DisplayPropertyOptions = {
  flexDirection: {
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
    label: 'Flex Direction',
  },
  flexWrap: {
    options: ['nowrap', 'wrap', 'wrap-reverse'],
    label: 'Flex Wrap',
  },
  justifyContent: {
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    label: 'Justify Content',
  },
  alignItems: {
    options: ['center', 'stretch', 'flex-start', 'flex-end', 'baseline'],
    label: 'Align Items',
  },
  alignContent: {
    options: ['center', 'stretch', 'flex-start', 'flex-end', 'baseline'],
    label: 'Align Content',
  },
}

const gridOptions: DisplayPropertyOptions = {
  justifyContent: {
    options: ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'],
    label: 'Justify Content',
  },
  justifyItems: {
    options: ['center', 'stretch', 'start', 'end', 'baseline'],
    label: 'Justify Items',
  },
  alignItems: {
    options: ['center', 'stretch', 'start', 'end'],
    label: 'Align Items',
  },
  alignContent: {
    options: ['center', 'stretch', 'start', 'end', 'baseline'],
    label: 'Align Content',
  },

  gridAutoFlow: {
    options: ['row', 'column', 'row dense', 'column dense'],
    label: 'Grid Auto Flow',
  },
}

export const DisplayControl = () => {
  const [display, setDisplay] = useState<string>('block');
  const dispatch = useDispatch();

  const styles = useSelector(getSelectedComponentStyles);

  useEffect(() => {
    if (styles?.display) {
      setDisplay(styles.display);
    }
  }, [styles])

  const handleDisplayChange = (value: string) => {
    setDisplay(value);
    dispatch(updateStyle({ name: 'display', value }))
  }

  return (
    <>
      <Select
        options={displayOptions}
        value={display}
        onChange={handleDisplayChange}
        size='1'
        title='Display'
      />
      {display === 'flex' && (
        <Flex direction='column' gap='1' pl='3'>
          {
            Object.keys(flexOptions).map((key: string) => {
              const { options, label } = flexOptions[key];
              return (
                <Select
                  title={label}
                  key={key}
                  options={options}
                  value={styles?.[key] ?? options[0]}
                  onChange={(value) => dispatch(updateStyle({ name: key, value }))}
                  size='1'
                />
              )
            })
          }
        </Flex>
      )}

      {display === 'grid' && (
        <Flex direction='column' gap='1' pl='3'>
          {
            Object.keys(gridOptions).map((key: string) => {
              const { options, label } = gridOptions[key];
              return (
                <Select
                  title={label}
                  key={key}
                  options={options}
                  value={styles?.[key] ?? options[0]}
                  onChange={(value) => dispatch(updateStyle({ name: key, value }))}
                  size='1'
                />
              )
            })
          }
        </Flex>
      )}
    </>
  )
}