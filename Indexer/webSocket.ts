import { MsgExecuteContract } from '@terra-money/terra.js'
import WebSocket from 'ws'
import { txDecode } from './decodeLCDTx'
const ws = new WebSocket("wss://terra-rpc.easy2stake.com/websocket")

//Connect WebSocket
ws.on('open', () => {
    console.log('Connected to: ' + "wss://terra-rpc.easy2stake.com/websocket")
    
    //tm.event = "NewBlock" or "Tx" depending on your needs. 
    const rpcParams = {
        jsonrpc: "2.0", 
        method: "subscribe", 
        id: "1", 
        params: {
            query: "tm.event='Tx'"
        }
    }

    ws.send(JSON.stringify(rpcParams))
})

//On New Block or Tx
ws.on('message', (data: WebSocket.RawData) => {
    // Tx decode
    const res = JSON.parse(data.toString())["result"]
    const decodedTx = txDecode(res?.data?.value?.TxResult?.tx)

    // use Tx here
    decodedTx?.body.messages.forEach(message => {
        const readableMessage = JSON.parse(message.toJSON())
        const typeOfMessage = readableMessage['@type']

        if(typeOfMessage.endsWith("MsgExecuteContract")) {
            console.log(readableMessage)
        }
    })
})

ws.on('close', () => {
    console.error('Websocket disconnected')
})

ws.on('error', () => {
    console.error('Websocket error')
})