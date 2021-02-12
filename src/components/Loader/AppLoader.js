import React from "react"
import { Spin, Space } from 'antd'

const AppLoader = () => {
    return (
        <Space size="large" style={{textAlign: "center", display: "block"}}>
            <Spin size="large" />
        </Space>
    )
}

export default AppLoader;