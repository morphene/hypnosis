// @flow
import morpheneJS from '@boone-development/morphene-js';
import type { accountStateType } from '../reducers/account';
import * as ProcessingActions from './processing';

export const ACCOUNT_CUSTOM_OPS_STARTED = 'ACCOUNT_CUSTOM_OPS_STARTED';
export const ACCOUNT_CUSTOM_OPS_RESOLVED = 'ACCOUNT_CUSTOM_OPS_RESOLVED';
export const ACCOUNT_CUSTOM_OPS_FAILED = 'ACCOUNT_CUSTOM_OPS_FAILED';
export const ACCOUNT_CUSTOM_OPS_COMPLETED = 'ACCOUNT_CUSTOM_OPS_COMPLETED';
export const ACCOUNT_DATA_MINIMUM_ACCOUNT_DELEGATION = 'ACCOUNT_DATA_MINIMUM_ACCOUNT_DELEGATION';
export const ACCOUNT_DATA_UPDATE = 'ACCOUNT_DATA_UPDATE';
export const ACCOUNT_DATA_UPDATE_FAILED = 'ACCOUNT_DATA_UPDATE_FAILED';
export const ACCOUNT_DATA_UPDATE_PENDING = 'ACCOUNT_DATA_UPDATE_PENDING';
export const ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_PENDING = 'ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_PENDING';
export const ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_FAILED = 'ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_FAILED';
export const ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE = 'ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE';
export const ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_PENDING = 'ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_PENDING';
export const ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_FAILED = 'ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_FAILED';
export const ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE = 'ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE';
export const ACCOUNT_GET_TRANSACTIONS = 'ACCOUNT_GET_TRANSACTIONS';
export const ACCOUNT_GET_TRANSACTIONS_RESOLVED = 'ACCOUNT_GET_TRANSACTIONS_RESOLVED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_STARTED = 'ACCOUNT_DELEGATE_VESTING_SHARES_STARTED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_RESOLVED = 'ACCOUNT_DELEGATE_VESTING_SHARES_RESOLVED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_FAILED = 'ACCOUNT_DELEGATE_VESTING_SHARES_FAILED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_COMPLETED = 'ACCOUNT_DELEGATE_VESTING_SHARES_COMPLETED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_STARTED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_STARTED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_FAILED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_FAILED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_RESOLVED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_RESOLVED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_COMPLETED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_COMPLETED';
export const ACCOUNT_SET_VOTING_PROXY_STARTED = 'ACCOUNT_SET_VOTING_PROXY_STARTED';
export const ACCOUNT_SET_VOTING_PROXY_FAILED = 'ACCOUNT_SET_VOTING_PROXY_FAILED';
export const ACCOUNT_SET_VOTING_PROXY_RESOLVED = 'ACCOUNT_SET_VOTING_PROXY_RESOLVED';
export const ACCOUNT_SET_VOTING_PROXY_COMPLETED = 'ACCOUNT_SET_VOTING_PROXY_COMPLETED';
export const ACCOUNT_VOTE_WITNESS_STARTED = 'ACCOUNT_VOTE_WITNESS_STARTED';
export const ACCOUNT_VOTE_WITNESS_FAILED = 'ACCOUNT_VOTE_WITNESS_FAILED';
export const ACCOUNT_VOTE_WITNESS_RESOLVED = 'ACCOUNT_VOTE_WITNESS_RESOLVED';
export const ACCOUNT_VOTE_WITNESS_COMPLETED = 'ACCOUNT_VOTE_WITNESS_COMPLETED';
export const ACCOUNT_VESTING_WITHDRAW_COMPLETED = 'ACCOUNT_VESTING_WITHDRAW_COMPLETED';
export const ACCOUNT_VESTING_WITHDRAW_STARTED = 'ACCOUNT_VESTING_WITHDRAW_STARTED';
export const ACCOUNT_VESTING_WITHDRAW_FAILED = 'ACCOUNT_VESTING_WITHDRAW_FAILED';
export const ACCOUNT_VESTING_WITHDRAW_RESOLVED = 'ACCOUNT_VESTING_WITHDRAW_RESOLVED';
export const ACCOUNT_TRANSFER_STARTED = 'ACCOUNT_TRANSFER_STARTED';
export const ACCOUNT_TRANSFER_FAILED = 'ACCOUNT_TRANSFER_FAILED';
export const ACCOUNT_TRANSFER_RESOLVED = 'ACCOUNT_TRANSFER_RESOLVED';
export const ACCOUNT_TRANSFER_COMPLETED = 'ACCOUNT_TRANSFER_COMPLETED';

// This function automatically attempts to use the minimal account creation fee
// and delegation amount.
export function createAccountDelegated(wif: string, params: object, preferences = {}) {
  return (dispatch: () => void) => {
    dispatch(ProcessingActions.processingAccountCreate());
    dispatch(ProcessingActions.processingAccountCreateComplete());
    // dispatch(ProcessingActions.processingAccountCreateFailed(error));
  };
}

export function getVestingDelegations(account: string) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_PENDING
    });
    morpheneJS.api.getVestingDelegations(account, -1, 100, (err, results) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_FAILED,
          payload: err
        });
      } else {
        const payload = {};
        payload[account] = results;
        dispatch({
          type: ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE,
          payload
        });
      }
    });
  };
}

export function getTransactionsResolved(payload = {}) {
  return {
    type: ACCOUNT_GET_TRANSACTIONS_RESOLVED,
    payload: payload
  }
}

export function getTransactions(accounts: Array) {
  return async dispatch => {
    // const { category, author, permlink } = params;
    const response = await fetch(`http://localhost:5001`);
    if (response.ok) {
      const result = await response.json()
      let payload = {
        transactions: result.data
      }
      // if(result.forum) {
      //   payload.breadcrumb.unshift({
      //     name: result.forum.name,
      //     link: `/forum/${result.forum._id}`
      //   })
      // }
      // dispatch({
      //   type: types.SET_STATUS,
      //   payload: {
      //     network: result.network
      //   }
      // })
      dispatch(getTransactionsResolved(payload))
    } else {
      console.error(response.status);
      // dispatch(fetchPostResolved())
    }
  };
}

export function getWithdrawRoutes(account: string) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_PENDING
    });
    morpheneJS.api.getWithdrawRoutes(account, 'outgoing', (err, results) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_FAILED,
          payload: err
        });
      } else {
        const payload = {};
        payload[account] = results;
        dispatch({
          type: ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE,
          payload
        });
      }
    });
  };

}

export function refreshAccountData(accounts: Array) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_DATA_UPDATE_PENDING
    });
    morpheneJS.api.getAccounts(accounts, (err, results) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DATA_UPDATE_FAILED,
          payload: err
        });
      } else {
        const payload = {};
        results.forEach((data) => {
          payload[data.name] = data;
          // If we have withdraw routes, update those as well
          if (data.withdraw_routes > 0) {
            dispatch(getWithdrawRoutes(data.name));
          }
          // If we have delegated VESTS, update that data
          if (data.delegated_vesting_shares !== "0.000000 VESTS") {
            dispatch(getVestingDelegations(data.name));
          }
        });
        dispatch({
          type: ACCOUNT_DATA_UPDATE,
          payload
        });
      }
    });
  };
}

export function transfer(wif, params) {
  return (dispatch: () => void) => {
    const { from, to, amount, memo } = params;
    dispatch({
      type: ACCOUNT_TRANSFER_STARTED
    });
    morpheneJS.broadcast.transfer(wif, from, to, amount, memo, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_TRANSFER_FAILED,
          payload: err
        });
      } else {
        refreshAccountData([from, to]);
        dispatch({
          type: ACCOUNT_TRANSFER_RESOLVED
        });
      }
    });
  };
}

export function transferCompleted() {
  return {
    type: ACCOUNT_TRANSFER_COMPLETED,
  }
}

export function setDelegateVestingShares(wif, params) {
  return (dispatch: () => void) => {
    const { delegator, delegatee, vestingShares } = params;
    dispatch({
      type: ACCOUNT_DELEGATE_VESTING_SHARES_STARTED
    });
    const formattedVestingShares = [parseFloat(vestingShares).toFixed(6), 'VESTS'].join(' ');
    morpheneJS.broadcast.delegateVestingShares(wif, delegator, delegatee, formattedVestingShares, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DELEGATE_VESTING_SHARES_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([delegator]));
        dispatch({
          type: ACCOUNT_DELEGATE_VESTING_SHARES_RESOLVED
        });
      }
    });
  };
}

export function setDelegateVestingSharesCompleted() {
  return {
    type: ACCOUNT_DELEGATE_VESTING_SHARES_COMPLETED,
  }
}

export function setWithdrawVestingRoute(wif, params) {
  return (dispatch: () => void) => {
    const { account, target, percent, autoVest } = params;
    dispatch({
      type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_STARTED
    });
    morpheneJS.broadcast.setWithdrawVestingRoute(wif, account, target, percent * 100, autoVest, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_RESOLVED
        });
      }
    });
  };
}

export function setWithdrawVestingRouteCompleted() {
  return {
    type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_COMPLETED,
  }
}

export function setVotingProxy(wif, params) {
  return (dispatch: () => void) => {
    const { account, proxy } = params;
    dispatch({
      type: ACCOUNT_SET_VOTING_PROXY_STARTED
    });
    morpheneJS.broadcast.accountWitnessProxy(wif, account, proxy, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_SET_VOTING_PROXY_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_SET_VOTING_PROXY_RESOLVED
        });
      }
    });
  };
}

export function setVotingProxyCompleted() {
  return {
    type: ACCOUNT_SET_VOTING_PROXY_COMPLETED,
  }
}

export function voteWitness(wif, params) {
  return (dispatch: () => void) => {
    const { account, witness, approve } = params;
    dispatch({
      type: ACCOUNT_VOTE_WITNESS_STARTED
    });
    morpheneJS.broadcast.accountWitnessVote(wif, account, witness, approve, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_VOTE_WITNESS_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_VOTE_WITNESS_RESOLVED
        });
      }
    });
  }
}

export function voteWitnessCompleted() {
  return {
    type: ACCOUNT_VOTE_WITNESS_COMPLETED,
  }
}

export function withdrawVesting(wif, params) {
  return (dispatch: () => void) => {
    const { account, vests } = params;
    const vestsFormat = [vests, "VESTS"].join(" ");
    dispatch({
      type: ACCOUNT_VESTING_WITHDRAW_STARTED
    });
    morpheneJS.broadcast.withdrawVesting(wif, account, vestsFormat, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_RESOLVED
        });
      }
    });
  };
}

export function withdrawVestingCompleted() {
  return {
    type: ACCOUNT_VESTING_WITHDRAW_COMPLETED,
  }
}

export function cancelWithdrawVesting(wif, params) {
  return (dispatch: () => void) => {
    const { account } = params;
    dispatch({
      type: ACCOUNT_VESTING_WITHDRAW_STARTED
    });
    morpheneJS.broadcast.withdrawVesting(wif, account, '0.000000 VESTS', (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_RESOLVED
        });
      }
    });
  };
}

export function send(wif, params) {
  return (dispatch: () => void) => {
    const { operations, extensions } = params
    console.log(operations, extensions)
    dispatch({
      type: ACCOUNT_CUSTOM_OPS_STARTED
    })
    morpheneJS.broadcast.send({ operations, extensions }, { posting: wif }, function(err, result) {
      if(result) {
        dispatch({
          type: ACCOUNT_CUSTOM_OPS_RESOLVED
        })
      }
      if(err) {
        dispatch({
          type: ACCOUNT_CUSTOM_OPS_FAILED,
          payload: err
        })
      }
    });
  };
}
