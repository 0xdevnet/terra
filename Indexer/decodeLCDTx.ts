import { Tx as Tx_pb } from "@terra-money/terra.proto/cosmos/tx/v1beta1/tx"
import { Tx } from "@terra-money/terra.js"

//LCD Tx Encoding: Google Protobuf + base64. 
export const txDecode = ( encodedTx?: string ): Tx | null => {
    if ( typeof encodedTx === "undefined" ) return null

    const tx_pb = Tx_pb.decode(Buffer.from(encodedTx, 'base64'))
    const decodedTx = Tx.fromProto(tx_pb)
    return decodedTx
}