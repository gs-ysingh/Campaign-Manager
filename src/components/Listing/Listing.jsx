import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import setActive from '../../libs/setActive';
import deleteCampaign from '../../libs/delete';
import changeStatus from '../../libs/changeStatus';
import rename from '../../libs/rename';
import comment from '../../libs/comment';
import styles from './Listing.module.css';

export const Listing = (props) => {
  const keys = _.keys(props.data);
  let cx = classNames.bind(styles);

  const getDate = (date) => {
    return new Date(date).toString();
  };

  const renderPausePlay = (key) => {
    if(props.data[key].isRunning) {
      return <i onClick={() => {
        const status =  {
          name: 'Paused',
          by: props.data[key].userName,
          label: 'Campaign Paused',
          key: key
        }
        props.changeStatus(status);
        
      }} class="fas fa-pause"></i>;
    }
    return <i onClick={() => {
      const status =  {
        name: 'Resume',
        by: props.data[key].userName,
        label: 'Campaign Running',
        key: key
      }
      props.changeStatus(status);
      
    }} class="fas fa-play"></i>;
  }

  return (
    <div className={styles.listingHeader}>
      {
        keys.map((key, index) => {
          return (
            <div onClick={() => {
              props.setActive(key)
            }} className={cx({ item: true, active: props.activeIndex == key })}>
              <div className={styles.name}>
                  <div className={styles.campaign}>{props.data[key].name}</div>
                  <div className={styles.icons}>
                    {renderPausePlay(key)}
                    <i onClick={() => {
                      const newComment = prompt("Please enter Comment");
                      if(newComment) {
                        const commentObj = {
                          name: 'Added',
                          by: props.userName,
                          label: 'Comment Added',
                          value: newComment,
                          key: key
                        }
                        props.comment(commentObj);
                      }
                    }} class="fas fa-comment"></i>
                    <i onClick={() => {
                      const newName = prompt("Please enter New name for Campaign");
                      if(newName) {
                        const renameObj = {
                          name: 'Renamed',
                          by: props.userName,
                          label: 'Campaign renamed',
                          prevValue: props.data[key].name,
                          currentValue: newName,
                          key: key
                        }
                        props.rename(renameObj);
                      }
                    }} class="fas fa-edit"></i>
                    <i onClick={() => {
                      props.deleteCampaign(key);
                    }} class="fas fa-trash"></i>
                  </div>
              </div>
              <div className={styles.createdAt}>Created at {getDate(props.data[key].createdAt)}</div>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    activeIndex: state.activeIndex,
    userName: state.userName,
  };
}

export const mapDispatchToProps = dispatch => ({
  setActive(index) {
    dispatch(setActive(index));
  },
  deleteCampaign(index) {
    dispatch(deleteCampaign(index));
  },
  rename(obj) {
    dispatch(rename(obj));
  },
  comment(obj) {
    dispatch(comment(obj));
  },
  changeStatus(obj) {
    dispatch(changeStatus(obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);