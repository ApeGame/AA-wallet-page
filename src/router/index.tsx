/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import Home from '@/views/Home';
import { Navigate } from 'react-router-dom';
import { ChainInfo } from '@/components/ChainInfo/ChainInfo';

const Mint = lazy(() => import('@/views/MockBank/Mint'));
const GenerateBankAccount = lazy(() => import('@/views/MockBank/GenerateBankAccount'));
const AutomaticMint = lazy(() => import('@/views/MockBank/AutomaticMint'));
const WithdrawList = lazy(() => import('@/views/MockBank/Withdraw'));
const Audit = lazy(() => import('@/views/Audit/Audit'));
const Rules = lazy(() => import('@/views/Rules/Rules'));

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routes = [
  {
    path: '/',
    element: <Navigate to="/audit/audit" />,
  },
  {
    path: '/',
    element: (
      <ChainInfo>
        <Home />
      </ChainInfo>
    ),
    children: [
      {
        path: '/mock_bank/mint',
        element: withLoadingComponent(<Mint />),
      },
      {
        path: '/mock_bank/generateBankAccount',
        element: withLoadingComponent(<GenerateBankAccount />),
      },
      {
        path: '/mock_bank/automaticMint',
        element: withLoadingComponent(<AutomaticMint />),
      },
      {
        path: '/mock_bank/withdraw',
        element: withLoadingComponent(<WithdrawList />),
      },
      {
        path: '/audit/audit',
        element: withLoadingComponent(<Audit />),
      },
      {
        path: '/rules/rules',
        element: withLoadingComponent(<Rules />),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/audit/audit" />,
  },
];

export default routes;
