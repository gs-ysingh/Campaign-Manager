import React from "react";
import { connect } from 'react-redux';
import Header from "../../components/Header/Header.jsx";
import Listing from "../../components/Listing/Listing.jsx";
import History from "../../components/History/History.jsx";
import styles from './Landing.module.css';

export const Landing = (props) => {
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