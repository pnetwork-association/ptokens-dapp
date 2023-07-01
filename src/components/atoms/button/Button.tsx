import styled from 'styled-components'

const Button = styled.button`
  width: 100%;
  color: white;
  background: ${({ theme }) => theme.primary1};
  border: 0;
  border-radius: 20px;
  height: 70px;
  font-size: 24px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: ${({ theme }) => theme.primary1Transparentized};
    &:hover {
      background: ${({ theme }) => theme.primary1Transparentized};
    }
  }
  &:hover {
    background: ${({ theme }) => theme.primary1Hovered};
  }
  @media (max-width: 767.98px) {
    height: 60px;
    font-size: 20px;
  }
`

export default Button
