import React, { useCallback, useEffect, useRef, useState } from "react"
import { auctionAxios } from "../../axios"
import Auction from "../../components/Auction/Auction"
import AppLoader from "../../components/Loader/AppLoader"
import AppModal from "../../components/Modal/Modal"
import { WebSocketUrl } from "../../utils/utility"


const AllAuctions = props => {

    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const ws = useRef(null)

    const onWebsocketOpen = useCallback(()=>{
        ws.current.send(JSON.stringify({action: "createConnection", data: {path: "/"}}))
    }, [])

    const fetchAuctions = async () =>{
        try {
            const response = await auctionAxios.get(`/auctions?status=OPEN`)
            console.log(response.data)
            setAuctions(response.data)
            setLoading(false)   
        } catch (error) {
            setLoading(false)
            setError("Something Went Wrong")
        }
    }

    useEffect(() => {
        ws.current = new WebSocket(WebSocketUrl)
        ws.current.onopen = onWebsocketOpen
        ws.current.onmessage = function(event) {
            console.log(event)
            const data = JSON.parse(event.data)
        
            if(data.type === "AMOUNT_UPDATED")
                fetchAuctions()
        }

        return () => {
            ws.current.close()
        }
    }, [])


    useEffect(()=>{
        fetchAuctions()
    }, [])


    const showModal = (id) => {
        console.log(id)
        setIsModalVisible(true)
    }

    const cancelModal = () => {
        setIsModalVisible(false)
    }


    let content;

    if(loading)
        content = <AppLoader />
    else if(error)
        content = <h3>Something went Wrong</h3>
    else if(auctions.length<=0)
        content = <h3>No Open Auctions right Now...</h3>
    else
        content = (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                {isModalVisible && <AppModal onCancel={cancelModal} />}
                {auctions.map(auction=>{
                    return <Auction key={auction.id} auction={auction} />
                })}
            </div>
        )

    return content
}

export default AllAuctions