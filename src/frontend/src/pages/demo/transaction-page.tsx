import { useState } from 'react';
import { backend_service_transaction } from '@/declarations/backend_service_transaction';
import { Principal } from '@dfinity/principal';

export default function TransactionPage() {
  const [plugConnected, setPlugConnected] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  // Function to connect Plug Wallet
  const connectPlugWallet = async () => {
    if (!window.ic?.plug) {
      setStatus('Plug Wallet is not installed.');
      return;
    }

    try {
      await window.ic.plug.requestConnect();
      const userPrincipal = await window.ic.plug.agent.getPrincipal();

      setPrincipal(userPrincipal.toText());
      setPlugConnected(true);
      setStatus('Connected to Plug Wallet');
    } catch (error) {
      setStatus('Failed to connect to Plug Wallet.');
    }
  };

  // Function to initiate ICP transfer
  const transferICP = async () => {
    if (!plugConnected || !principal) {
      setStatus('Please connect to Plug Wallet first.');
      return;
    }

    try {
      const recipientPrincipal = Principal.fromText(recipient); // ✅ Fix: Convert to Principal
      const amountNat64 = BigInt(parseFloat(amount) * 10 ** 8); // Convert to e8s

      const response = await backend_service_transaction.transferICP(
        amountNat64,
        recipientPrincipal,
      );

      if ('ok' in response) {
        setStatus(`Success: ${response.ok}`);
      } else {
        setStatus(`Error: ${response.err}`);
      }
    } catch (error) {
      setStatus('Transaction failed. Check console for details.');
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ICP Transaction Page</h2>

      <button
        onClick={connectPlugWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {plugConnected ? 'Connected ✅' : 'Connect Plug Wallet'}
      </button>

      {plugConnected && (
        <div>
          <p>
            <strong>Your Principal:</strong> {principal}
          </p>

          <input
            type="text"
            placeholder="Recipient Principal ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border p-2 w-full mt-2"
          />

          <input
            type="number"
            placeholder="Amount (ICP)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full mt-2"
          />

          <button
            onClick={transferICP}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Transfer ICP
          </button>
        </div>
      )}

      {status && <p className="mt-4 text-red-500">{status}</p>}
    </div>
  );
}
