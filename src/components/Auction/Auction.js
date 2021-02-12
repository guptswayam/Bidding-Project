import React from "react"
import {Button, Card, Col, Row} from "antd"
import { defaultPictureUrl, limitLength } from "../../utils/utility"
import {useHistory } from "react-router-dom"


const Auction = props => {

    const {auction} = props
    const history = useHistory()

    return (
        <Card
            bordered={true}
            style={{maxWidth: "350px", marginBottom: "40px", boxShadow: "1px 1px 4px black"}}
            cover={
            <img
                alt="Item Image"
                src={auction.pictureUrl || defaultPictureUrl}
                height={225}
                width={300}
                style={{border: "1px solid black"}}
            />
            
            
            }
        >
            <Row>
                <Col span={12}><h3> {limitLength(auction.title)}</h3></Col>
                <Col span={2}></Col>
                {!props.yourAuction && <Col span={10}>Min. Amount: <strong>₹ {auction.highestBid.amount}</strong></Col>}
                {props.yourAuction && <Col span={10}>Sold Price: <strong>₹{auction.highestBid.amount}</strong></Col>}
            </Row>
            {!props.yourAuction && <Button type="danger" onClick={()=>history.push(`/auction/${auction.id}`)}>View Details</Button>}
            {props.yourAuction && 
                <Row>
                    <Col span={12}>Status: <strong>{auction.highestBid.bidder ? "SOLD" : "NOT SOLD"}</strong></Col>
                    <Col span={2}></Col>
                    {auction.status === "OPEN" && <Col span={10}><Button type="danger" onClick={props.onClose} loading={props.btnLoading}>Close Now!</Button></Col>}
                    {auction.status !== "OPEN" && <Col span={10}><Button type="primary" onClick={props.onClose} disabled>Closed</Button></Col>}
                </Row>
            }
        </Card>
    )
}


export default Auction