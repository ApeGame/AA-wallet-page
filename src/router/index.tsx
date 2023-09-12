/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import Home from '@/views/Home';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('@/views/Login/login'));
const Overview = lazy(() => import('@/views/Overviews/overviews'));
const SendToken = lazy(() => import('@/views/SendToken/sendToken'));
const TokenOverview = lazy(() => import('@/views/TokenOverviews/overviews'));
const NativeTokenOverview = lazy(() => import('@/views/TokenOverviews/nativeOverviews'));
const AddToken = lazy(() => import('@/views/AddToken/addToken'));
const MultisigWallet = lazy(() => import('@/views/MultisigWallet/multisigWallet'));
const RecoverBind = lazy(() => import('@/views/Login/bind'));
const NftDetail = lazy(() => import('@/views/Nft/nftDetail'));
const SendNft = lazy(() => import('@/views/Nft/sendNft'));

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/overview',
        element: withLoadingComponent(<Overview />),
      },
      {
        path: '/login',
        element: withLoadingComponent(<Login />),
      },
      {
        path: '/sendToken',
        element: withLoadingComponent(<SendToken />),
      },
      {
        path: '/tokenOverview',
        element: withLoadingComponent(<TokenOverview />),
      },
      {
        path: '/nativeTokenOverview',
        element: withLoadingComponent(<NativeTokenOverview />),
      },
      {
        path: '/addToken',
        element: withLoadingComponent(<AddToken />),
      },
      {
        path: '/multisigWallet',
        element: withLoadingComponent(<MultisigWallet />),
      },
      {
        path: '/recover_bind',
        element: withLoadingComponent(<RecoverBind />),
      },
      {
        path: '/nftDetail',
        element: withLoadingComponent(<NftDetail />),
      },
      {
        path: '/sendNFT',
        element: withLoadingComponent(<SendNft />),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];

export default routes;
