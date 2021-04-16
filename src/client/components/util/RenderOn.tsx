import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  mobile?: boolean
  desktop?: boolean
}

const Container = styled.div<ContainerProps>`
  display: none;
  display: ${(props) => (props.mobile ? 'block' : '')};
  
  @media (min-width: ${(props) => props.theme.md}px) {
    display: none;
    display: ${(props) => (props.desktop ? 'block' : '')};
  }
`

interface RenderOnProps extends ContainerProps {
  children: React.ReactNode
}

const RenderOn = ({ children, ...rest }: RenderOnProps) => (
  <Container {...rest}>
    {children}
  </Container>
)

export default RenderOn
