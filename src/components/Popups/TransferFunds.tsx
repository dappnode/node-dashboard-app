import React from 'react'
import Image from 'next/image'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import 'reactjs-popup/dist/index.css'
import {
  WhiteGreenButtonLink,
  Inter400,
  Inter500,
  Inter700,
  SimpleButton,
  SpaceBetween,
  GreenButton,
} from '../Styles'
import { isMainnet } from '../../lib/web3-utils'

function TransferFunds() {
  return (
    <StyledPopup trigger={<SimpleButton>Transfer funds</SimpleButton>} modal>
      {close => (
        <div className="modal">
          <Spaced>
            <h2>Transfer Funds</h2>
            <img alt="close" src='/assets/closeModal.svg' onClick={close} />
          </Spaced>
          <div>
            <Inter700>From</Inter700>
            <LabelNetwork className={isMainnet(1) ? 'blue' : 'green'}>
              { isMainnet(1) ? 'ETH' : 'DN' } Network
            </LabelNetwork>
          </div>
          <div>
            <Inter700>To</Inter700>
            <LabelNetwork className={isMainnet(1) ? 'green' : 'blue'}>
              { isMainnet(1) ? 'DN' : 'ETH' } Network
            </LabelNetwork>
          </div>
          <div>
            <GreenButton className="long">Transfer</GreenButton>
          </div>
        </div>
      )}
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  &-content {
    border-radius: 24px;
    min-width: 100px;
    padding: 32px;
  }
`

const LabelNetwork = styled.label`
  background: #eefcfb;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Inter-Bold';
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: #23c8bc;
  margin: 8px 0;
  &.blue {
    color: #0d91f0;
    background: #eef6fc;
  }
  &.green {
    color: #819896;
    background: #f4f6f6;
  }
`

const Spaced = styled(SpaceBetween)`
  position: absolute;
  width: calc(100% - 15px);
  top: -57px;
  left: 15px;
  img {
    cursor: pointer;
  }
  h2 {
    font-family: 'Inter-Bold';
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
  }
`

export default TransferFunds
