import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SizedBox } from '../sized-box/sized-box';
import { Row } from '../flex/flex';
import { StyledText } from '../text/text';
import { Center } from '../center/center';

export interface IListItemButtonProps {
  onTap: () => void;
  label: string;
  icon: IconDefinition;
  padding?: string;
  iconWidth?: string;
}

export const ListItemButton: React.FC<IListItemButtonProps> = (props) => {
  return (
    <SizedBox className='tappable' padding={props.padding} onTap={props.onTap} width='100%'>
      <Row crossAxisAlignment='center'>
        <SizedBox width={props.iconWidth} height='36px'>
          <Center>
            <FontAwesomeIcon icon={props.icon} color='var(--color-text-muted)' />
          </Center>
        </SizedBox>
        <SizedBox width={props.padding} />
        <StyledText type='button'>{props.label}</StyledText>
      </Row>
    </SizedBox>
  )
}