import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import AllAuctions from "./containers/Auction/AllAuctions"
import AuctionView from "./containers/Auction/AuctionView"
import CreateAuction from "./containers/Auction/CreateAuction"
import YourAuctions from "./containers/Auction/YourAuctions"
import Auth from "./containers/Auth/Auth"

const Routes = props => {
    const {user} = props

    return (
        <Switch>
            <Route path="/" exact component={AllAuctions}></Route>
            <Route path="/auction/:id" exact component={AuctionView}></Route>
            {user && <Route path="/create-auction" exact component={CreateAuction}></Route>}
            {user && <Route path="/your-auctions" exact component={YourAuctions}></Route>}
            {!user && <Route path="/auth" exact component={Auth} />}
            <Redirect path="*" exact to="/"></Redirect>
        </Switch>
    )
}

export default Routes