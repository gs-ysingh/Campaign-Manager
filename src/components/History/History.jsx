import React from "react";
import { connect } from 'react-redux';
import styles from './History.module.css';

export const History = (props) => {
  const data = props.data[props.activeIndex];
  const userActions = data && data.userActions;
  if(!userActions) {
    return (
      <div className={styles.historyContainer}>
        <div>No history present</div>
      </div>
    );
  }
  return (
    <div className={styles.historyContainer}>
      <div>History</div>
      <div>{data.name}</div>
      <div className={styles.history}>
        {
          userActions.map((userAction) => {
            return (
              <div>
                <div>{userAction.label}</div>
                <div>by <span className={styles.by}>{userAction.by}</span></div>  
                <div>{userAction.value}</div>
                <div>
                  <span className={styles.stike}>{userAction.prevValue}</span>&nbsp;
                  <span>{userAction.currentValue}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    activeIndex: state.activeIndex
  };
}

export default connect(mapStateToProps)(History);