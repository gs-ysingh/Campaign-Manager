import React from "react";
import { connect } from 'react-redux';
// import Loadable from 'react-loadable';
import Listing from "../Listing/Listing";
import History from "../History/History";
import styles from './Landing.module.css';
import { Header } from "../Header/Header";

export const Landing = (props) => {
  // const HeaderLoadable = Loadable({
  //   loader: () => import('../../components/Header/Header'),
  //   loading: () => {
  //     return <h1>Loading...</h1>
  //   },
  // });
  return (
    <div>
      <Header />
      <div className={styles.listing}>
        <Listing />
        <History />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
}

export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);