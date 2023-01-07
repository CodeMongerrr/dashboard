import React from 'react';
import { Button } from '@material-ui/core';
import useBombFinance from '../../hooks/useBombFinance';
import useModal from '../../hooks/useModal';
import ExchangeModal from '../Bond/components/ExchangeModal';
import ERC20 from '../../bomb-finance/ERC20';
import useTokenBalance from '../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useCatchError from '../../hooks/useCatchError';

interface PurchaseBondProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}

const PurchaseBondCard: React.FC<PurchaseBondProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useBombFinance();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (<>
  {approveStatus !== ApprovalState.APPROVED && !disabled ? (
        <Button
          className="shinyButton"
          disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
          onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
        >
          {`Approve ${fromTokenName}`}
        </Button>
      ) : (
        <Button
          className={disabled ? 'shinyButtonDisabled' : 'shinyButton'}
          onClick={onPresent}
          disabled={disabled}
        >
          {disabledDescription || action}
        </Button>
      )}
    </>
  );
};


export default PurchaseBondCard;

