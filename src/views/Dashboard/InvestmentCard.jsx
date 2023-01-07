import React, { useMemo } from 'react';
import { roundAndFormatNumber } from '../../0x';
import { Button } from '@material-ui/core';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useXbombAPR from '../../hooks/useXbombAPR';
import { getDisplayBalance } from '../../utils/formatBalance';
import useHarvestFromBoardroom from './../../hooks/useHarvestFromBoardroom';
import useClaimRewardCheck from './../../hooks/boardroom/useClaimRewardCheck';
import useEarningsOnBoardroom from './../../hooks/useEarningsOnBoardroom';
import useRedeemOnBoardroom from './../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from './../../hooks/useStakedBalanceOnBoardroom';
import useWithdrawCheck from './../../hooks/boardroom/useWithdrawCheck';
import useBombFinance from './../../hooks/useBombFinance';
import useApprove, {ApprovalState} from './../../hooks/useApprove';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useStakedTokenPriceInDollars from './../../hooks/useStakedTokenPriceInDollars';


const InvestmentCard = () => {
  const xbombAPR = useXbombAPR();
  const bombFinance = useBombFinance();
  const totalStaked = useTotalStakedOnBoardroom();
  const { onReward } = useHarvestFromBoardroom();
  const earnings = useEarningsOnBoardroom();
  const canClaimReward = useClaimRewardCheck();
  const { onRedeem } = useRedeemOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const boardroomAPR = useFetchBoardroomAPR();
  const canWithdraw = useWithdrawCheck();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);

  const xbombTVL = useMemo(() => (xbombAPR ? Number(xbombAPR.TVL).toFixed(0) : null), [xbombAPR]);
 
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  return (
    <div className="investment-card horizontal-flex" style={{backdropFilter:"blur(5px)"}}>
      <div className="investment-container vertical-flex">
        <a href="https://docs.bomb.money/strategies/general-quick-roi-strategy" target="_blank" rel="noopener noreferrer" style={{textAlign:"right",marginBottom:"5px",display:"block"}} className="neonColor">
          Read investment strategy &#62;{' '}
        </a>
        <button style={{background:"#21ebda"}}><a style = {{textDecoration:"none",color:'white'}} href="/">Invest Now</a></button>
        <div className="horizontal-flex">
          <button><a style = {{textDecoration:"none",color:'white'}} target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/94Aa4wSz3e">Chat on Discord</a></button>
          <button><a style = {{textDecoration:"none",color:'white'}} target="_blank" rel="noopener noreferrer" href="https://docs.bomb.money/welcome-start-here/readme">Read Docs</a></button>
        </div>
        <div className="boardroom-card vertical-flex">
          <div className="horizontal-flex" style={{borderBottom:"1px solid white",justifyContent:"space-between",alignItems:"flex-end"}}>
            <div className="horizontal-flex">
              <div className="navTokenIcon bomb table"></div>
              <div className="vertical-flex">
                <h3>Boardroom</h3>
                Stake BShare and earn BOMB for every epoch
              </div>
            </div>
            <div className="vertical-flex ">
              <div>TVL &nbsp;&nbsp;: ${roundAndFormatNumber(xbombTVL, 2)}</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>Total Staked &nbsp;: {getDisplayBalance(totalStaked)} </div>

          <div>
            <table cellPadding={10} cellSpacing={2} align="center"><tbody>
              <tr>
                <td>APR&nbsp;:</td>
                <td>Your stake&nbsp; :</td>
                <td> Earned&nbsp;:</td>
                <td>
                <Button
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                  onClick={approve}
                >
                  Deposit
                </Button>
                </td>
                <td>
                  <Button
                    disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                    onClick={onRedeem}
                    className={
                      stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                        ? 'shinyButtonDisabledSecondary'
                        : 'shinyButtonSecondary'
                    }
                  >
                    Withdraw
                  </Button>
                </td>
              </tr>
              <tr>
                <td>{boardroomAPR.toFixed(2)}%</td>
                <td> {getDisplayBalance(stakedBalance)} </td>
                <td>{getDisplayBalance(earnings)}</td>
                <td colSpan={2}>
                  <Button
                    onClick={onReward}
                    className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                    disabled={earnings.eq(0) || !canClaimReward}
                  >
                    Claim Reward
                  </Button>{' '}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>≈ ${tokenPriceInDollars}</td>
                <td>≈ ${earnedInDollars} </td>
                <td></td>
                <td></td>
              </tr></tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="news-card">
        Latest News
      </div>
    </div>
  );
};

export default InvestmentCard;
