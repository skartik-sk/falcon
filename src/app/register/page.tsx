'use client';
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useWriteContract } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../lib/constant'

const Page = () => {
    const { 
        data: hash, 
        writeContract 
      } = useWriteContract()
const verify = async () => {
    console.log("verifying user")
    
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'registerUser',
        args: ["kartik", 34,'345','345'],
      })
     
}
useEffect(() => {
    console.log(hash);
}
, [hash]);

  return (
    <div>
        <h1>Register</h1>
        <Button onClick={verify}>
            verify
        </Button>
    </div>
  )
}

export default Page