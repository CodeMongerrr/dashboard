import React, { useCallback, useMemo } from 'react';
import useBondStats from '../../hooks/useBondStats';
import useBombFinance from '../../hooks/useBombFinance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useTokenBalance from '../../hooks/useTokenBalance';
import PurchaseBondCard from './PurchaseBondCard';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';

const BondsSummaryCard = () => {
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const cashPrice = useCashPriceInLastTWAP();
  const addTransaction = useTransactionAdder();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const bondsPurchasable = useBondsPurchasable();
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );
  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );

  return (
    <div className="boardroom-card vertical-flex" style={{backdropFilter:"blur(4px)"}}>
      <div className="horizontal-flex">
        <div className="navTokenIcon bbond table"></div>
        <div className="vertical-flex">
          <h3>Bonds</h3>
          BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
        </div>
      </div>
      <div style={{margin:"2rem 1rem 1rem 1rem"}}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr'}}>
          <div>
            <p>Current Price : (Bomb)^2</p>
            <h3>{Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTC</h3>
          </div>
          <div>
            <p>Available to redeem</p>
            <div className="horizontal-flex">
              <div className="navTokenIcon bbond table"></div>
              <h3>{getDisplayBalance(bondBalance)}</h3>
            </div>
          </div>
            <div>
              <div className="spaceBtwHorizontal">
                <div className="vertical-flex">
                  <b>Purchase BBond</b>
                  {!isBondPurchasable
                    ? 'BOMB is over peg'
                    : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'}
                </div>
                <div>
                  <PurchaseBondCard
                    action="Purchase"
                    fromToken={bombFinance.BOMB}
                    fromTokenName="BOMB"
                    toToken={bombFinance.BBOND}
                    toTokenName="BBOND"
                    priceDesc={
                      !isBondPurchasable
                        ? 'BOMB is over peg'
                        : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                    }
                    onExchange={handleBuyBonds}
                    disabled={!bondStat || isBondRedeemable}
                  />
                </div>
              </div>
              <hr />
              <div className="spaceBtwHorizontal">
                <div className="vertical-flex">
                  <b>Redeem Bomb</b>
                </div>
                <PurchaseBondCard
                  action="Redeem"
                  fromToken={bombFinance.BBOND}
                  fromTokenName="BBOND"
                  toToken={bombFinance.BOMB}
                  toTokenName="BOMB"
                  priceDesc={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                  disabledDescription={!isBondRedeemable ? `Enabled when 10,000 BOMB > ${BOND_REDEEM_PRICE}BTC` : null}
                />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BondsSummaryCard;
