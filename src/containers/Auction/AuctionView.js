import { Button, Form, Input, message, notification } from "antd"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {useParams} from "react-router-dom"
import { auctionAxios } from "../../axios"
import AppLoader from "../../components/Loader/AppLoader"
import { capitalize, defaultPictureUrl, WebSocketUrl } from "../../utils/utility"
import classes from "./AuctionView.module.css"

let connectionStatus = false

const AuctionView = props => {

    const [auctionDetails, setAuctionDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [amount, setAmount] = useState(0)
    const ws = useRef(null)
    const [btnLoading, setBtnLoading] = useState(false)
    
    const {id} = useParams()

    const fetchAuctionDetails = async () => {
        try {
            const response = await auctionAxios.get(`/auction/${id}`)
            setAuctionDetails(response.data)
            setAmount(Math.floor(response.data.highestBid.amount + 1))
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAuctionDetails()
    }, [])

    const onCreateConnection = useCallback(() => {
        ws.current.send(JSON.stringify({action: "createConnection", data: {path: `/auction/${id}`}}))
        console.log("OPENED")
        connectionStatus = true
    }, [])

    const onMessage = useCallback(function(event) {
        // console.log(event)
        const data = JSON.parse(event.data)

        if(data.type === "BID_SUCCESSFUL"){
            notification.success({message: "Your bid is successfull!"})
            setBtnLoading(false)
        }
        else if(data.type === "AMOUNT_UPDATED"){
            console.log(data)
            setAuctionDetails(data.auction)
        }
        else if(data.type === "BID_UNSUCCESSFUL"){
            notification.error({message: data.message === "Unauthorized" ? "Please Login first!" : data.message})
            setBtnLoading(false)
        }

    }, [])

    const placeBid = (amount) => {
        if(connectionStatus){
            ws.current.send(JSON.stringify({action: "placeBid", data: {token: localStorage.getItem("token"), auctionId: id, amount: amount, path: `/auction/${id}`}}))
        } else {
            ws.current = new WebSocket(WebSocketUrl)
            ws.current.onmessage = onMessage
            ws.current.onopen = () => {
                onCreateConnection()
                ws.current.send(JSON.stringify({action: "placeBid", data: {token: localStorage.getItem("token"), auctionId: id, amount: amount, path: `/auction/${id}`}}))
            }
            ws.current.onclose = () => {
                notification.error({message: "You are not connected to Internet!"})
                connectionStatus = false
                setBtnLoading(false)
            }
        }
    }


    useEffect(() => {
        ws.current = new WebSocket(WebSocketUrl)
        ws.current.onopen = onCreateConnection
        ws.current.onmessage = onMessage
        ws.current.onclose = () => {
            notification.error({message: "You are not connected to Internet!"})
            connectionStatus = false
            setBtnLoading(false)
        }

        return () => {
            ws.current.onclose = () => {
                connectionStatus = false
            }
            ws.current.close();
        }

    }, [])


    const onInputChange = (val) =>{
        setAmount(val * 1)
    }

    const bidSubmit = (e) => {
        e.preventDefault()
        console.log(amount)
        setBtnLoading(true)
        placeBid(amount)
    }


    let content = <AppLoader />

    if(!loading && !auctionDetails)
        content = <h2>Something Went Wrong!</h2>
    else if(!loading && auctionDetails)
        content = (
            <div className={classes.mainDiv}>
                <img src={auctionDetails.pictureUrl || defaultPictureUrl } className={classes.image}/>
                <div>
                    <h2><i>{capitalize(auctionDetails.title)}</i></h2>
                    <p><strong>Current Bid:</strong> <i>₹ {auctionDetails.highestBid.amount}</i></p>
                    <p><strong>Highest Bidder: </strong> <i> {auctionDetails.highestBid.bidder || "No bidders yet!"}</i></p>
                    <form onSubmit={bidSubmit}>
                        <Form.Item label="Your Bid: " labelAlign="left">
                        <Input type="number" min={Math.floor(auctionDetails.highestBid.amount + 1)} value={amount} onChange={e=>onInputChange(e.target.value)}></Input>
                        </Form.Item>
                        <Button htmlType="submit" type="p" loading={btnLoading}>Bid Now!</Button>
                    </form>
                </div>
            </div>
        )

    return content
}

export default AuctionView