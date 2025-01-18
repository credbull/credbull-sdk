"use client";

import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/error";
import { ManualValueOracle } from "@credbull-sdk/credbull";
import { enzymeCredbullClient } from "@/app/fund/_components/fund-client";

export default function SetFundNavUpdater() {
  const [newNavUpdater, setNewNavUpdater] = useState<string>("");
  const [currentNavUpdater, setCurrentNavUpdater] = useState<string | null>(
    null,
  );
  const [newNavUpdaterTxn, setNewNavUpdaterTxn] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const account = useActiveAccount();

  const manualValueOracleProxy =
    enzymeCredbullClient.chainConfig.flexibleLoans[0].manualValueOracleProxy;

  const manualValueOracle = new ManualValueOracle(
    enzymeCredbullClient,
    manualValueOracleProxy,
  );

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const navUpdater = await manualValueOracle.getUpdater();
        setCurrentNavUpdater(navUpdater); // Assuming `nav.nav` contains the value you need
      } catch (err) {
        console.error("Error Fetching Nav Updater:", err);
        setError("Failed to fetch NAV Updater");
      }
    };
    fetchNav();
  }, []); // run only once on component mount

  const handleSetNavUpdater = () => {
    setError(null);
    setNewNavUpdaterTxn(null);

    try {
      const txnResults = "// TODO - call actual setNavUpdater here...";

      setNewNavUpdaterTxn(txnResults);
    } catch (err: unknown) {
      console.error("Decoding Error:", err); // Log error to the console
      if (err instanceof Error) {
        setError(`Decoding Error: ${err.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  if (!account) {
    return (
      <div className="card-container">
        <h2 className="card-title">Connect Your Wallet</h2>
        <p>Connect your wallet to set the Nav updater</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Set Nav Updater</h2>
        <div className="form-control">
          {/* Display Current NAV */}
          {currentNavUpdater !== null && (
            <div className="label-value-pair">
              <span className="label">Current NAV Updater: </span>
              <span className="value">{currentNavUpdater}</span>
            </div>
          )}
          {/* Input Box */}
          <input
            type="text"
            className="input input-bordered w-full text-base"
            placeholder="Enter New Nav Updater"
            value={newNavUpdater}
            onChange={(e) => setNewNavUpdater(e.target.value)}
          />
          {/* Submit Button */}
          <button
            className="btn btn-lg"
            onClick={handleSetNavUpdater}
            disabled={!newNavUpdater.trim()}
          >
            Submit
          </button>
          {/* Set Nav Updater Result */}
          {newNavUpdaterTxn && (
            <div className="card-section">
              <h3 className="card-section-title">Set Updater Results</h3>

              {/* Function Name */}
              <div className="label-value-pair">
                <span className="label">Transaction Results:</span>
                <span className="value">{newNavUpdaterTxn}</span>
              </div>
            </div>
          )}
          {/* Error Message */}
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  );
}
