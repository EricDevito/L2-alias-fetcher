import { useState } from "react";
import { isAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";

const L1_TO_L2_ALIAS_OFFSET = "0x1111000000000000000000000000000000001111";

const bnToAddress = (bn: BigNumber): string => {
  return "0x" + bn.toHexString().slice(2).padStart(40, "0");
};

const applyL1ToL2Alias = (address: string): string => {
  if (!isAddress(address)) {
    throw new Error(`not a valid address: ${address}`);
  }
  return bnToAddress(BigNumber.from(address).add(L1_TO_L2_ALIAS_OFFSET));
};

const undoL1ToL2Alias = (address: string): string => {
  if (!isAddress(address)) {
    throw new Error(`not a valid address: ${address}`);
  }
  return bnToAddress(BigNumber.from(address).sub(L1_TO_L2_ALIAS_OFFSET));
};

function App() {
  const [l1Address, setL1Address] = useState("");
  const [l2Alias, setL2Alias] = useState("");
  const [l1Result, setL1Result] = useState("");
  const [l2Result, setL2Result] = useState("");
  const [error, setError] = useState("");

  const handleL1ToL2 = () => {
    setError("");
    setL1Result("");
    try {
      const result = applyL1ToL2Alias(l1Address);
      setL1Result(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleL2ToL1 = () => {
    setError("");
    setL2Result("");
    try {
      const result = undoL1ToL2Alias(l2Alias);
      setL2Result(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-[20%] py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            L2 Alias Fetcher
          </h2>

          <div className="space-y-6">
            {/* L1 to L2 Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-700">
                L1 to L2 Alias
              </h4>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="l1-address"
                    className="block mb-2 font-medium text-gray-600"
                  >
                    L1 Mainnet Address
                  </label>
                  <input
                    id="l1-address"
                    type="text"
                    value={l1Address}
                    onChange={(e) => setL1Address(e.target.value)}
                    placeholder="Enter L1 address"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleL1ToL2}
                  className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Get L2 Alias
                </button>
                {l1Result && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2 text-gray-700">
                      L2 Alias:
                    </h3>
                    <div className="bg-gray-50 p-3 rounded break-all relative border border-gray-200">
                      {l1Result}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* L2 to L1 Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-700">
                L2 to L1 Address
              </h4>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="l2-alias"
                    className="block mb-2 font-medium text-gray-600"
                  >
                    L2 Alias
                  </label>
                  <input
                    id="l2-alias"
                    type="text"
                    value={l2Alias}
                    onChange={(e) => setL2Alias(e.target.value)}
                    placeholder="Enter L2 alias"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleL2ToL1}
                  className="w-full py-2 px-4 bg-green-500 text-white font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Get L1 Address
                </button>
                {l2Result && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2 text-gray-700">
                      L1 Address:
                    </h3>
                    <div className="bg-gray-50 p-3 rounded break-all relative border border-gray-200">
                      {l2Result}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
