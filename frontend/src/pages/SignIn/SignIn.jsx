import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signin } from '../../redux/auth/auth.actions';

const SignIn = ({ signin, auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='center mw5 mw6-ns hidden mv4'>
      <button
        className='f6 link dim ba bw2 ph3 pv2 mb2 dib black'
        onClick={signin}
      >
        Sign In With Google
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signin: () => {
      dispatch(signin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
