import React from 'react';
import { Modal } from 'antd';

const AppModal = (props) => {
  

  return (
    <Modal title="Basic Modal" visible={true} onCancel={props.onCancel} footer={[]}>
        {props.children}
    </Modal>
  );
};

export default AppModal