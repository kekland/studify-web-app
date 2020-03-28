import React from 'react'
import { IUserMinimal } from '../../api/data/user'
import { StyledText } from '../text/text'
import { SizedBox } from '../sized-box/sized-box'
import { Row } from '../flex/flex'
import { Center } from '../center/center'

export const TypingStatusPanel: React.FC<{ typingUsers: IUserMinimal[] }> = ({ typingUsers }) => {
  let someoneTyping = typingUsers.length > 0
  let usernames = ''
  typingUsers.forEach(user => usernames += user.username + ',')
  usernames = usernames.substring(0, usernames.length - 1)

  let prefix = typingUsers.length === 1 ? 'is' : 'are'

  return (
    <SizedBox height='64px' padding='12px'>
      <SizedBox height='48px' padding='12px' style={{
        borderRadius: '12px',
        backgroundColor: 'var(--color-surface)',
        opacity: someoneTyping? '1' : '0',
        transform: someoneTyping ? 'translate(0, 0)' : 'translate(0, -10px)',
        transition: 'opacity 150ms ease-in-out, transform 150ms ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.075)'
      }}>
        <Center>
          <Row mainAxisSize='max' crossAxisAlignment='center'>
            <StyledText fontWeight={500}>{usernames}</StyledText>
            <SizedBox flexSize='6px' />
            <StyledText type='caption'>{prefix} typing</StyledText>
          </Row>
        </Center>
      </SizedBox>
    </SizedBox>
  )
}