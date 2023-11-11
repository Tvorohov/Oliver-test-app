import { Flex, Text, Box } from "@radix-ui/themes"
import { ColorInput } from "../ColorInput";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedComponentStyles, updateStyle } from "@/store/slices/layoutSlice";


interface ColorControlProps {
  label: string;
  name: string;
}


export const ColorControl = ({ label, name }: ColorControlProps) => {

  const dispatch = useDispatch();
  const styles = useSelector(getSelectedComponentStyles);

  const handleOnChange = (value: string) => {
    dispatch(updateStyle({ name, value }))
  }


  return (
    <Flex gap="3" align='center'>
      <Text size='2' weight='bold' className="box-width" >
        {label}:
      </Text>
      <ColorInput
        value={styles?.[name]}
        onChange={handleOnChange}
      />
    </Flex>
  )
}