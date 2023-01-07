import useHarvest from './../../hooks/useHarvest';
import React from 'react';


const HarvestAll2 =  async ({ bank }) => {
  const { onReward } = useHarvest(bank);
  await onReward();
  return (
    <div></div>
  );
};


export {HarvestAll2};