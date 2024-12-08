import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [metaMask()],
  transports: {
    [baseSepolia.id]: http()
  }
})