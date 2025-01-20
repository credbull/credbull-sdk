"use client";

import { useSendTransaction } from "thirdweb/react";
import ErrorMessage from "@/components/error";
import { useEffect, useState } from "react";
import CopyableText from "@/components/copyable-text";
import {
  Address,
  CredbullClient,
  EnzymeConfig,
  ManualValueOracle,
  testEnzymePolygonConfig,
} from "@credbull-sdk/credbull";
import { thirdwebClient } from "@/components/client";

export const enzymeCredbullClient = new CredbullClient<EnzymeConfig>(
  testEnzymePolygonConfig,
  thirdwebClient,
);

export const defaultManualValueOracleProxy: Address =
  enzymeCredbullClient.chainConfig.flexibleLoans[0].manualValueOracleProxy;

function createManualValueOracle(manualValueOracleProxy: string) {
  return new ManualValueOracle(enzymeCredbullClient, manualValueOracleProxy);
}

export default function SetFundNavUpdater() {
  const [newNavUpdater, setNewNavUpdater] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualValueOracleProxy, setManualValueOracleProxy] = useState<Address>(
    defaultManualValueOracleProxy,
  );

  const {
    mutate: sendTx,
    data: transactionResult,
    error: transactionError,
    status: transactionStatus,
  } = useSendTransaction();

  const handleSetNavUpdater = () => {
    setErrorMessage(null); // Clear any previous errors
    try {
      const manualValueOracle = createManualValueOracle(manualValueOracleProxy);
      const txn = manualValueOracle.setUpdaterTxn(newNavUpdater);
      sendTx(txn);
    } catch (error) {
      console.error("Error preparing transaction:", error);
      setErrorMessage(
        "Failed to prepare the transaction. Please check inputs.",
      );
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Set NAV Updater</h2>
        <div className="form-control">
          {/* Manual Value Oracle Proxy Input */}
          <div className="label-value-pair grid grid-cols-3 gap-4 items-center">
            <label className="label" htmlFor="manualValueOracleProxyInput">
              Oracle:
            </label>
            <input
              type="text"
              id="manualValueOracleProxyInput"
              className="input-value"
              value={manualValueOracleProxy}
              onChange={(e) => setManualValueOracleProxy(e.target.value)}
            />
          </div>
          {/* Display Current NAV Updater */}
          <div className="label-value-pair">
            <span className="label">Current Updater:</span>
            <span className="value">
              <GetFundNavUpdater
                manualValueOracleProxy={manualValueOracleProxy}
              />
            </span>
          </div>
          {/* NAV Updater Input Box */}
          <input
            type="text"
            className="input input-bordered w-full text-base"
            placeholder="Enter New NAV Updater Address"
            value={newNavUpdater}
            onChange={(e) => setNewNavUpdater(e.target.value)}
          />
          {/* Submit Button */}
          <button
            className="btn btn-lg"
            onClick={handleSetNavUpdater}
            disabled={!newNavUpdater.trim()}
          >
            {"Submit"}
          </button>
          {/* Transaction Result */}
          {transactionResult && (
            <div className="card-section">
              <h3 className="card-section-title">Transaction Details</h3>
              {/* Transaction Status */}
              <div className="label-value-pair">
                <span className="label">Txn Status:</span>
                <span className="value">{transactionStatus}</span>
              </div>
              {/* Transaction Hash */}
              {transactionResult?.transactionHash && (
                <div className="label-value-pair">
                  <span className="label">Txn Hash:</span>
                  <span className="value text-sm font-mono break-all">
                    <CopyableText text={transactionResult.transactionHash} />
                  </span>
                </div>
              )}
            </div>
          )}
          {/* Error Message */}
          {(errorMessage || transactionError?.message) && (
            <ErrorMessage
              message={
                errorMessage || transactionError?.message || "Unknown error"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function GetFundNavUpdater({
  manualValueOracleProxy,
}: {
  manualValueOracleProxy: string;
}) {
  const [navUpdater, setNavUpdater] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdater = async () => {
      try {
        const manualValueOracle = createManualValueOracle(
          manualValueOracleProxy,
        );
        const updater = await manualValueOracle.getUpdater();
        setNavUpdater(updater);
      } catch (error) {
        console.error("Error fetching NAV updater:", error);
        setNavUpdater("Error fetching data");
      }
    };

    fetchUpdater();
  }, [manualValueOracleProxy]);

  return <span>{navUpdater || "Loading..."}</span>;
}
