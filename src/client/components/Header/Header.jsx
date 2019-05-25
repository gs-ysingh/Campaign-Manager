import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import create from '../../libs/create';
import styles from './Header.module.css';


export const Header = (props) => {
  return (
    <div className={styles.heading}>
      <div className={styles.label}>All Campaigns</div>
      <div className={styles.list}>
        <span>Campaign List</span>
        <button onClick={() => {
          const name = prompt("Please enter Campaign name");
          if(name) {
            const len = _.keys(props.data).length;
            const data = {};
            data[len + 1] = {
              name: name,
              createdAt: Date.now(),
              createdBy: props.userName,
              isRunning: false,
              userActions: [
                {
                  name: 'Created',
                  by: props.userName,
                  label: 'Campaign Created',
                }
              ]
            };
            props.create(data);
          }
        }}>+ Create New</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    activeIndex: state.activeIndex,
    userName: state.userName
  };
}

export const mapDispatchToProps = dispatch => ({
  create(obj) {
    dispatch(create(obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);