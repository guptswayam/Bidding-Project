import { notification } from "antd"
import React, {useState, useEffect} from "react"
import { auctionAxios } from "../../axios"
import Auction from "../../components/Auction/Auction"
import AppLoader from "../../components/Loader/AppLoader"

const YourAuctions = () => {
    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [closeBtnLoading, setCloseBtnLoading] = useState(false)

    const fetchAuctions = async () =>{
        try {
            const response = await auctionAxios.get(`/getYourAuctions`)
            console.log(response.data)
            setAuctions(response.data)
            setLoading(false)   
        } catch (error) {
            setLoading(false)
            setError("Something Went Wrong")
        }
    }

    const closeAuction = async (id) => {
        setCloseBtnLoading(true)
        try {
            const response = await auctionAxios.get(`/auction/${id}/close`)
            console.log(response.data)
            notification.success({message: "Auction successfully closed!"})
        } catch (error) {
            notification.error({message: "Auction not closed!"})
        }
        await fetchAuctions()
        setCloseBtnLoading(false)
    }


    useEffect(()=>{
        fetchAuctions()
    }, [])


    let content;

    if(loading)
        content = <AppLoader />
    else if(error)
        content = <h3>Something went Wrong</h3>
    else if(auctions.length<=0)
        content = <h3>You haven't created any auctions!</h3>
    else
        content = (
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                {auctions.map(auction=>{
                    return <Auction key={auction.id} auction={auction} yourAuction btnLoading={closeBtnLoading} onClose={() => {closeAuction(auction.id)}} />
                })}
            </div>
        )

    return content
}

export default YourAuctions