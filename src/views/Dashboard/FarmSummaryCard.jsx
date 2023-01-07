import React, { useMemo } from 'react';
import { Button } from '@material-ui/core';
import useStatsForPool from '../../hooks/useStatsForPool';
import useRedeem from '../../hooks/useRedeem';
import useHarvest from './../../hooks/useHarvest';
import useEarnings from './../../hooks/useEarnings';
import useBombStats from './../../hooks/useBombStats';
import useShareStats from './../../hooks/usebShareStats';
import useStakedBalance from './../../hooks/useStakedBalance';
import useApprove, { ApprovalState } from './../../hooks/useApprove';
import { getDisplayBalance } from './../../utils/formatBalance';

import TokenSymbol from '../../components/TokenSymbol';

const FarmSummaryCard = ({ bank }) => {
  let depositToken = bank.depositTokenName.toUpperCase();
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const tShareStats = useShareStats();
  const bombStats = useBombStats();
  let statsOnPool = useStatsForPool(bank);
  const { onReward } = useHarvest(bank);
  const { onRedeem } = useRedeem(bank);
  const tokenStats = bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  if (depositToken === '80BOMB-20BTCB-LP') {
    depositToken = 'BOMB-MAXI';
  }
  if (depositToken === '80BSHARE-20WBNB-LP') {
    depositToken = 'BSHARE-MAXI';
  }
  return (
    <div className="farm-summary-card" style={{padding:"1rem  "}}>
      {/* This is what i will create */}
      <div className="spaceBtwHorizontal" style={{borderBottom:"1px solid white"}}>
        <div className="horizontal-flex">
          <TokenSymbol size={32} symbol={bank.depositTokenName} />{' '}
          <h3>{bank.depositTokenName} </h3>{' '}
        </div>
        <p>TVL : ${statsOnPool?.TVL}</p>
      </div>
      <div className="spaceBtwHorizontal" style={{alignItems:"flex-end"}}>
        <div className="horizontal-flex">
          <div>
            <p>Daily Returns</p>
            <p>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</p>
            <p>{`≈ $${earnedInDollars}`}</p>
          </div>
          <div>
            <p>Your Stake</p>
            <p> {getDisplayBalance(stakedBalance, bank.depositToken.decimal)}</p>
            <p>{`≈ $${earnedInDollars}`}</p>
          </div>
          <div>
            <p>Earned</p>
            <p> {getDisplayBalance(earnings)}</p>
          </div>
        </div>
        <div className="horizontal-flex">
          <Button
            style={{padding:"2px"}}
            disabled={
              bank.closedForStaking ||
              approveStatus === ApprovalState.PENDING ||
              approveStatus === ApprovalState.UNKNOWN
            }
            onClick={approve}
            className={
              bank.closedForStaking ||
                approveStatus === ApprovalState.PENDING ||
                approveStatus === ApprovalState.UNKNOWN
                ? 'shinyButtonDisabled'
                : 'shinyButton'
            }
          >
            {`Deposit`}
          </Button>
          <Button onClick={onRedeem} className="shinyButtonSecondary" >
            Withdraw
          </Button>
          <Button onClick={onReward} className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'} disabled={earnings.eq(0)}>
            Claim Rewards
          </Button>

        </div>
      </div>
    </div>
    /*
    <Button className="shinyButtonSecondary" component={Link} to={`/farm/${bank.contract}`}>
            View
          </Button>
    */
  );
};

export default FarmSummaryCard;
