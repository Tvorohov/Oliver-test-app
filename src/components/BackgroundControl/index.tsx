import { Flex } from '@radix-ui/themes'
import { Collapsible } from '../Collapsible'
import { ColorControl } from '../ColorControl'
import { UrlInput } from '../UrlInput'
import { getSelectedComponentStyles, updateStyle } from '@/store/slices/layoutSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from '../Select'

const backgroundSize = ['auto', 'cover', 'contain', 'initial', 'inherit']

export const BackgroundControl = () => {
  const dispatch = useDispatch();
  const styles = useSelector(getSelectedComponentStyles);

  const handleChangeStyle = (name: string) => (value: string) => dispatch(updateStyle({ name, value }));

  return (
    <Collapsible label='Background'>
      <Flex mt='3' gap='3' direction='column' pl='3'>
        <ColorControl label='Background color' name='backgroundColor' />
        <UrlInput name='backgroundImage' label='Background url' />
        <Select
          title='Background size'
          options={backgroundSize}
          value={styles?.['backgroundSize'] ?? backgroundSize[0]}
          onChange={handleChangeStyle('backgroundSize')}
          size='1' />
      </Flex>
    </Collapsible>
  )
}