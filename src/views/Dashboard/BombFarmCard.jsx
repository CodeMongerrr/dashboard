import React from 'react';
import { Button } from '@material-ui/core';
import useClaimRewardCheck from './../../hooks/boardroom/useClaimRewardCheck';
import useEarningsOnBoardroom from './../../hooks/useEarningsOnBoardroom';
import useBanks from '../../hooks/useBanks';
import FarmSummaryCard from './FarmSummaryCard';
import { HarvestAll2 } from './HarvestAll';

const BombFarmCard = () => {
  const [banks] = useBanks();
  const earnings = useEarningsOnBoardroom();
  const canClaimReward = useClaimRewardCheck();
  const activeBanks = banks.filter((bank) => !bank.finished);

  // We'll create a handler function that will call another function on a loop
  const harvestAll = async () => {
    activeBanks.map((banks) => {
      return (
        <div>
          await <HarvestAll2 bank={banks} />
        </div>
      );
    });
  };

  return (
    <div className="bombfarm-card" style={{backdropFilter:"blur(4px)"}}>
      <div className="spaceBtwHorizontal" >
          <div className="vertical-flex">
            <h3>Bomb farm</h3>
            <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
          </div>
          <Button className="shinyButton" onClick={harvestAll} disabled={earnings.eq(0) || !canClaimReward}>
            Claim All
          </Button>
      </div>
      <hr />
      <div>
        {activeBanks
          .filter((bank) => bank.sectionInUI === 3)
          .map((bank) => (
            <React.Fragment key={bank.name}>
              <FarmSummaryCard bank={bank} />
              <hr />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default BombFarmCard;
