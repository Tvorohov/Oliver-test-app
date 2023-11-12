import { IconButton } from '@radix-ui/themes';
import { Minimize } from 'react-feather';
import { DimensionInput } from '../DimensionInput';

import cls from './styles.module.css';

interface AdditionalDimensionControlProps {
  onClick?: () => void;
  options: {
    name: string;
    position: string;
  }[]
}

export const AdditionalDimensionControl = ({
  onClick,
  options
}: AdditionalDimensionControlProps) => {
  return (
    <div className={cls.addControls}>
      {onClick && (<div className={cls.gridButton}>
        <IconButton variant="ghost" color="gray" onClick={onClick}>
          <Minimize size={14} />
        </IconButton>
      </div>)}
      {
        options.map((option) => (
          <div key={option.name} className={cls[option.position]}>
            <DimensionInput
              name={option.name}
            />
          </div>
        ))
      }
    </div>
  )
}