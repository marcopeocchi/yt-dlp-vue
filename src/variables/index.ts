export const RPC_ADDR = `ws://${localStorage.getItem('rpc-address') || 'localhost'}:${localStorage.getItem('rpc-port') || '4444'}/rpc-ws`
export const SAMPLE_SIZE = 16