import React, { useMemo } from 'react';
import moment from 'moment';
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import useBombFinance from '../../hooks/useBombFinance';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { roundAndFormatNumber } from '../../0x';
import {Button } from '@material-ui/core';
import ProgressCountdown from './../Boardroom/components/ProgressCountdown.tsx';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useXbombAPR from '../../hooks/useXbombAPR';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';



const SummaryCard = () => {

  const bombStats = useBombStats();
  const TVL = useTotalValueLocked();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  const currentEpoch = useCurrentEpoch();
  const xbombAPR = useXbombAPR();
  const { to } = useTreasuryAllocationTimes();


  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);

  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );

  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const xbombTVL = useMemo(() => (xbombAPR ? Number(xbombAPR.TVL).toFixed(0) : null), [xbombAPR]);
  
  return (
    <div className="SummaryCard">
      <div className="heading">Bomb Finance Summary</div>
      <hr></hr>
      <div className="contents">
        <div className="Supply-table" >
          <table cellPadding={10} cellSpacing= {2}><tbody>
            <tr  style={{fontSize:"0.8rem",fontWeight:"light"}}>
              <th></th>
              <th>Current Supply</th>
              <th> Total Supply</th>
              <th> Price</th>
              <th></th>
              {/* BOMB */}
            </tr>
            <tr >
              <td>
                <div className="navTokenIcon bomb table"></div>
                {'$BOMB'}
              </td>
              <td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
              <td>{roundAndFormatNumber(bombTotalSupply, 2)}</td>
              <td rowSpan={2}>{"$"}{bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}<br/>{bombPriceInBNB ? roundAndFormatNumber(bombPriceInBNB, 4) : '-.----'} BTC</td>
              <td> <Button
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BOMB');
                  }}
                >
                  {''}
                  <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                </Button></td>
                
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
    
            {/* BShare */}
            <tr  >
              <td>
                <div className="navTokenIcon bshare table"></div>{'$BSHARE'}
              </td>
              <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</td>
              <td>{roundAndFormatNumber(bShareTotalSupply, 2)}</td>
              <td rowSpan={2}>{"$"}{bSharePriceInDollars ? roundAndFormatNumber(bSharePriceInDollars, 2) : '-.--'}<br/>{bSharePriceInBNB ? roundAndFormatNumber(bSharePriceInBNB, 4) : '-.----'} BTC</td>
              <td>
                <Button
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BSHARE');
                  }}
                >
                  {' '}
                  <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                </Button>
              </td>
            </tr>
            <tr  >
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* BBond */}
            <tr  >
              <td>
                <div className="navTokenIcon bbond table"></div>
                {'$BBOND'}
              </td>
              <td>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
              <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
              <td rowSpan={2}>{"$"}{tBondPriceInDollars ? roundAndFormatNumber(tBondPriceInDollars, 2) : '-.--'}<br/>{tBondPriceInBNB ? roundAndFormatNumber(tBondPriceInBNB, 4) : '-.----'} BTC
              </td>
              <td>
                <Button
                  onClick={() => {
                    bombFinance.watchAssetInMetamask('BBOND');
                  }}
                >
                  {' '}
                  <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                </Button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr></tbody>
          </table>
        </div>
        <div className='EpochStats'>
          <p>Current Epoch</p>
          <p className="textBig">{Number(currentEpoch)}</p>
          <hr/>
          <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
          <p>Next Epoch in</p>
          <hr />
          Live TWAP  &nbsp;&nbsp;: &nbsp; <span className="neonColor">{TVL}</span>
          <br />
          TVL &nbsp;&nbsp; &nbsp;&nbsp;:  &nbsp;<span className="neonColor">${roundAndFormatNumber(xbombTVL, 2)}</span>
          <br />
          Last Epoch TWAP &nbsp;&nbsp; :  &nbsp;<span className="neonColor">{Number(tBondStats?.tokenInFtm).toFixed(4) || '-'}</span>

          
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
