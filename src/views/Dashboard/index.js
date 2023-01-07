import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import {Container, Typography} from '@material-ui/core';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
//import FarmImage from '../../assets/img/farm.png';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import HomeImage from '../../assets/img/background.jpg';
import SummaryCard from './SummaryCard';
import InvestmentCard from './InvestmentCard';
import BombFarmCard from './BombFarmCard';
import BondsSummaryCard from './BondsSummaryCard';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const TITLE = 'bomb.money | Dashboard';

const Dashboard = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                Dashboard
              </Typography>
              <SummaryCard/>
              <InvestmentCard/>
              <BombFarmCard />
              <BondsSummaryCard />
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Dashboard;
