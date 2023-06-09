import type { AbortOptions } from '../utils'
import type { Multiaddr } from '@multiformats/multiaddr'
import type { PeerId } from '@libp2p/interface-peer-id'

export interface API<OptionExtension = {}> {
  /**
   * List of known addresses of each peer connected
   */
  addrs: (options?: AbortOptions & OptionExtension) => Promise<AddrsResult[]>

  /**
   * Open a connection to a given address or peer id
   */
  connect: (multiaddrOrPeerId: Multiaddr | PeerId, options?: AbortOptions & OptionExtension) => Promise<void>

  /**
   * Close a connection to a given address or peer id
   */
  disconnect: (multiaddrOrPeerId: Multiaddr | PeerId, options?: AbortOptions & OptionExtension) => Promise<void>

  /**
   * Local addresses this node is listening on
   */
  localAddrs: (options?: AbortOptions & OptionExtension) => Promise<Multiaddr[]>

  /**
   * Return a list of connected peers
   */
  peers: (options?: PeersOptions & OptionExtension) => Promise<PeersResult[]>
}

export interface AddrsResult {
  id: PeerId
  addrs: Multiaddr[]
}

export interface PeersOptions extends AbortOptions {
  direction?: boolean
  streams?: boolean
  verbose?: boolean
  latency?: boolean
}

export interface PeersResult {
  addr: Multiaddr
  peer: PeerId
  latency?: string
  muxer?: string
  streams?: string[]
  direction?: 'inbound' | 'outbound'
}
