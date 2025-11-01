'use client'; // This marks the component as a Client Component for hooks

import { useState } from 'react';
import { ethers } from 'ethers';

// ⬇️ *** YOU MUST REPLACE THIS *** ⬇️
// This is the unique API endpoint you get after deploying your YAML file on Kwala
const KWALA_WORKFLOW_API_ENDPOINT = "https://...YOUR_KWALA_API_ENDPOINT_HERE";

// This should match the 'target' in your YAML's condition
const EVENT_ID = "HACKATHON_2025"; 

function AttendanceChecker() {
  const [walletAddress, setWalletAddress] = useState('');
  const [status, setStatus] = useState('Connect Wallet'); // Manages button text and state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Connects to the user's MetaMask (or other EIP-1193) wallet
   */
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setErrorMessage('MetaMask is not installed!');
      return;
    }
    
    setIsLoading(true);
    setStatus('Connecting...');
    setErrorMessage('');
    
    try {
      // Use Ethers v6's new BrowserProvider
      const provider = new ethers.BrowserProvider(window.ethereum);
      // Request account access
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setWalletAddress(address);
      setStatus('Check In & Mint NFT');
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setErrorMessage('Wallet connection rejected by user.');
      setStatus('Connect Wallet');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Called when the user clicks "Check In & Mint NFT"
   * This function sends the wallet data to the Kwala API endpoint.
   */
  const handleCheckIn = async () => {
    if (!walletAddress) {
      setErrorMessage('Please connect your wallet first.');
      return;
    }

    setIsLoading(true);
    setStatus('Automating Mint...');
    setErrorMessage('');
    setSuccessMessage('');

    // This is the data your Kwala workflow expects
    const payload = {
      walletAddress: walletAddress,
      eventID: EVENT_ID,
    };

    try {
      // Send the data to your Kwala workflow endpoint
      const response = await fetch(KWALA_WORKFLOW_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle API errors (e.g., Kwala workflow failed)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kwala workflow failed to execute.');
      }

      // Success!
      const result = await response.json();
      setSuccessMessage('Check-in successful! Your PoP-NFT is being minted.');
      setStatus('✅ Minting Initiated!');

    } catch (error) {
      console.error("Kwala API call failed:", error);
      setErrorMessage(`Error: ${error.message}`);
      setStatus('Check In & Mint NFT');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Main button logic:
   * - If no wallet, show "Connect Wallet"
   * - If wallet connected, show "Check In & Mint NFT"
   */
  const renderButton = () => {
    if (!walletAddress) {
      return (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="w-full px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      );
    }
    
    return (
      <button
        onClick={handleCheckIn}
        disabled={isLoading || status === '✅ Minting Initiated!'}
        className="w-full px-8 py-4 text-xl font-bold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Automating Mint...' : status}
      </button>
    );
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient from-teal-400 to-blue-500 mb-4">
        Web3 Attendance
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Check in to get your Proof-of-Presence NFT!
      </p>

      {/* Wallet Address Display */}
      {walletAddress && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-500">Connected as:</p>
          <p className="text-lg text-teal-300 font-mono">
            {walletAddress}
          </p>
        </div>
      )}

      {/* Main Action Button */}
      <div className="mt-8">
        {renderButton()}
      </div>

      {/* Status Messages */}
      {errorMessage && (
        <p className="mt-4 text-center text-red-400">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-4 text-center text-green-400">{successMessage}</p>
      )}
    </div>
  );
}

export default AttendanceChecker;