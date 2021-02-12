import { Form, Input, Button, Row, Col, Upload, notification } from "antd";
import React, { useState } from "react";
import { authAxios } from "../../authAxios";
import { auctionAxios } from "../../axios";
import { toBase64 } from "../../utils/utility";

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
const CreateAuction = (props) => {
    const [form] = Form.useForm();
    const [btnLoading, setBtnLoading] = useState(false)
  
    const onFinish = async (values) => {
      setBtnLoading(true)

      try {
        const base64String = await toBase64(values.upload.file.originFileObj)
        console.log(base64String)
        const response = await auctionAxios.post("/auction", {title: values.title, minimumPrice: Math.round(values.minimumPrice * 100)/100 })
        await auctionAxios.post(`/uploadAuctionItemPicture/${response.data.id}`, {base64String})
        notification.success({
            message: "Item Added Successfully!"
        })
      } catch (error) {
          notification.error({
              message: error.response ? error.response.data : "Something went wrong!"
          })
      }
      setBtnLoading(false)
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Row>
        <Col span={2}></Col>
        <Col span={22}>
          <h1>
            <i>Register an item to sold</i>
          </h1>
        </Col>
      </Row>
      <br />
      <Form.Item
        label="Item Name"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your item name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Base Price"
        name="minimumPrice"
        rules={[
          {
            required: true,
            message: "Please input your base price!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload Picture"
        rules= {[
            {
                required: true
            }
        ]}
      >
        <Upload name="logo" maxCount={1} accept="image/*" customRequest={(file)=>{file.onSuccess()}} showUploadList={{showRemoveIcon: false}}>
          <Button>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={btnLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAuction;
