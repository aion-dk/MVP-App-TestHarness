import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'ballot',
    loadChildren: () => import('./pages/ballot/ballot.module').then((m) => m.BallotPageModule),
  },
  {
    path: 'ballot-form',
    loadChildren: () => import('./pages/ballot-form/ballot-form.module').then((m) => m.BallotFormPageModule),
  },
  {
    path: 'ballot-complete',
    loadChildren: () => import('./pages/ballot-complete/ballot-complete.module').then((m) => m.BallotCompletePageModule),
  },
  {
    path: 'print',
    loadChildren: () => import('./pages/print/print.module').then((m) => m.PrintPageModule),
  },
  {
    path: 'access-code',
    loadChildren: () => import('./pages/access-code/access-code.module').then((m) => m.AccessCodePageModule),
  },
  {
    path: 'ballot-fingerprint',
    loadChildren: () => import('./pages/ballot-fingerprint/ballot-fingerprint.module').then((m) => m.BallotFingerprintPageModule),
  },
  {
    path: 'code_invalid_access00004_error',
    loadChildren: () =>
      import('./pages/code_invalid_access00004_error/failed-authorization.module').then((m) => m.FailedAuthorizationPageModule),
  },
  {
    path: 'copy-confirmed',
    loadChildren: () => import('./pages/copy-confirmed/copy-confirmed.module').then((m) => m.CopyConfirmedPageModule),
  },
  {
    path: 'sending',
    loadChildren: () => import('./pages/sending/sending.module').then((m) => m.SendingPageModule),
  },
  {
    path: 'test-results',
    loadChildren: () => import('./pages/test-results/test-results.module').then((m) => m.TestResultsPageModule),
  },
  {
    path: 'new-ballot-fingerprint',
    loadChildren: () =>
      import('./pages/new-ballot-fingerprint/new-ballot-fingerprint.module').then((m) => m.NewBallotFingerprintPageModule),
  },
  {
    path: 'check_network_request00001_error',
    loadChildren: () => import('./pages/check_network_request00001_error/check-network.module').then((m) => m.CheckNetworkPageModule),
  },
  {
    path: 'check',
    loadChildren: () => import('./pages/check/check.module').then((m) => m.CheckPageModule),
  },
  {
    path: 'sending-confirmation',
    loadChildren: () => import('./pages/sending-confirmation/sending-confirmation.module').then((m) => m.SendingConfirmationPageModule),
  },
  {
    path: 'check-servers',
    loadChildren: () => import('./pages/check-servers/check-servers.module').then((m) => m.CheckServersPageModule),
  },
  {
    path: 'digital-return-next-steps',
    loadChildren: () =>
      import('./pages/digital-return-next-steps/digital-return-next-steps.module').then((m) => m.DigitalReturnNextStepsPageModule),
  },
  {
    path: 'print-return',
    loadChildren: () => import('./pages/print-return/print-return.module').then((m) => m.PrintReturnPageModule),
  },
  {
    path: 'user-time-out',
    loadChildren: () => import('./pages/user-time-out/user-time-out.module').then((m) => m.UserTimeOutPageModule),
  },
  {
    path: 'tobecontinue',
    loadChildren: () => import('./pages/tobecontinue/tobecontinue.module').then((m) => m.TobecontinuePageModule),
  },
  {
    path: 'ballot-test-failed',
    loadChildren: () => import('./pages/ballot-test-failed/ballot-test-failed.module').then((m) => m.BallotTestFailedPageModule),
  },
  {
    path: 'code_expired_access00003_error',
    loadChildren: () => import('./pages/code_expired_access00003_error/expired-code.module').then((m) => m.ExpiredCodePageModule),
  },
  {
    path: 'howditgo',
    loadChildren: () => import('./pages/howditgo/howditgo.module').then((m) => m.HowditgoPageModule),
  },
  {
    path: 'request-access-code',
    loadChildren: () => import('./pages/request-access-code/request-access-code.module').then((m) => m.RequestAccessCodePageModule),
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then((m) => m.TestPageModule),
  },
  {
    path: 'check_network_construct00007_error',
    loadChildren: () =>
      import('./pages/check_network_construct00007_error/network-error-access-code.module').then((m) => m.NetworkErrorAccessCodePageModule),
  },
  {
    path: 'calloutoforder_construct00006_error',
    loadChildren: () =>
      import('./pages/calloutoforder_construct00006_error/ballot-test-error.module').then((m) => m.BallotTestErrorPageModule),
  },
  {
    path: 'ballot-prep-error',
    loadChildren: () => import('./pages/ballot-prep-error/ballot-prep-error.module').then((m) => m.BallotPrepErrorPageModule),
  },
  {
    path: 'before-you-finish',
    loadChildren: () => import('./pages/before-you-finish/before-you-finish.module').then((m) => m.BeforeYouFinishPageModule),
  },
  {
    path: 'corrupt_cv_construct00008_error',
    loadChildren: () =>
      import('./pages/corrupt_cv_construct00008_error/ballot-oops-screen.module').then((m) => m.BallotOopsScreenPageModule),
  },
  {
    path: 'test-results-faild-error',
    loadChildren: () =>
      import('./pages/test-results-faild-error/test-results-faild-error.module').then((m) => m.TestResultsFaildErrorPageModule),
  },
  {
    path: 'check-network-access00005-error',
    loadChildren: () =>
      import('./pages/check-network-access00005-error/check-network-access00005-error.module').then(
        (m) => m.CheckNetworkAccess00005ErrorPageModule
      ),
  },
  {
    path: 'test-results-ballot-prep-error',
    loadChildren: () =>
      import('./pages/test-results-ballot-prep-error/test-results-ballot-prep-error.module').then(
        (m) => m.TestResultsBallotPrepErrorPageModule
      ),
  },
  {
    path: 'ballot-ready-prep-error',
    loadChildren: () =>
      import('./pages/ballot-ready-prep-error/ballot-ready-prep-error.module').then((m) => m.BallotReadyPrepErrorPageModule),
  },
  {
    path: 'check_network_spoil00010_error',
    loadChildren: () =>
      import('./pages/check_network_spoil00010_error/network-error-access-ten.module').then((m) => m.NetworkErrorAccessTenPageModule),
  },
  {
    path: 'calloutoforder_spoil00009_error',
    loadChildren: () =>
      import('./pages/calloutoforder_spoil00009_error/ballot-test-fail-err.module').then((m) => m.BallotTestFailErrPageModule),
  },
  {
    path: 'check_server_spoil00011_error',
    loadChildren: () =>
      import('./pages/check_server_spoil00011_error/server-commit-network-error-access.module').then(
        (m) => m.ServerCommitNetworkErrorAccessPageModule
      ),
  },
  {
    path: 'check_network_submit00012_error',
    loadChildren: () =>
      import('./pages/check_network_submit00012_error/network-error-access12.module').then((m) => m.NetworkErrorAccess12PageModule),
  },
  {
    path: 'calloutoforder_submit00013_error',
    loadChildren: () =>
      import('./pages/calloutoforder_submit00013_error/ballot-access-error13.module').then((m) => m.BallotAccessError13PageModule),
  },
  {
    path: 'voter_record_notfound00000_error',
    loadChildren: () =>
      import('./pages/voter_record_notfound00000_error/access-code-error.module').then((m) => m.AccessCodeErrorPageModule),
  },
  {
    path: 'ballot-test-failed-test',
    loadChildren: () =>
      import('./pages/ballot-test-failed-test/ballot-test-failed-test.module').then((m) => m.BallotTestFailedTestPageModule),
  },
  {
    path: 'ballot-resealed',
    loadChildren: () => import('./pages/ballot-resealed/ballot-resealed.module').then((m) => m.BallotResealedPageModule),
  },
  {
    path: 'calloutoforder-access00002-error',
    loadChildren: () =>
      import('./pages/calloutoforder-access00002-error/calloutoforder-access00002-error.module').then(
        (m) => m.CalloutoforderAccess00002ErrorPageModule
      ),
  },
  {
    path: 'ballot-test-failed-test',
    // eslint-disable-next-line sonarjs/no-identical-functions
    loadChildren: () =>
      import('./pages/ballot-test-failed-test/ballot-test-failed-test.module').then((m) => m.BallotTestFailedTestPageModule),
  },
  {
    path: 'cannot-see-ballot',
    loadChildren: () => import('./pages/cannot-see-ballot/cannot-see-ballot.module').then((m) => m.CannotSeeBallotPageModule),
  },
  {
    path: 'check-your-pairing-codes',
    loadChildren: () =>
      import('./pages/check-your-pairing-codes/check-your-pairing-codes.module').then((m) => m.CheckYourPairingCodesPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
