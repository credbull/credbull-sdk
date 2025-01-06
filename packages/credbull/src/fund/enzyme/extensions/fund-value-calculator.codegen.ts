import {
  type AbiParameterToPrimitiveType,
  type BaseTransactionOptions,
  prepareContractCall,
  readContract,
} from 'thirdweb';

/**
 * ===========================================================================================================
 * ========================================= Generated DO NOT MODIFY =========================================
 * ===========================================================================================================
 *
 * Contract: Enzyme's FundValueCalculator
 * Polygon: 0xcdf038dd3b66506d2e5378aee185b2f0084b7a33 (see: https://github.com/enzymefinance/sdk/blob/main/packages/environment/src/deployments/polygon.ts#L157)
 *
 * More details: https://portal.thirdweb.com/typescript/v5/extensions/generate
 *
 */

/**
 * Contract read functions
 */

/**
 * Represents the parameters for the "calcProtocolFeeDueForFund" function.
 */
export type CalcProtocolFeeDueForFundParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
};

/**
 * Calls the "calcProtocolFeeDueForFund" function on the contract.
 * @param options - The options for the calcProtocolFeeDueForFund function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { calcProtocolFeeDueForFund } from "FundValueCalculator";
 *
 * const result = await calcProtocolFeeDueForFund({
 *  vaultProxy: ...,
 * });
 *
 * ```
 */
export async function calcProtocolFeeDueForFund(options: BaseTransactionOptions<CalcProtocolFeeDueForFundParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x140a9924',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'sharesDue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy],
  });
}

/**
 * Calls the "getFeeManager" function on the contract.
 * @param options - The options for the getFeeManager function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getFeeManager } from "FundValueCalculator";
 *
 * const result = await getFeeManager();
 *
 * ```
 */
export async function getFeeManager(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xf2d63826',
      [],
      [
        {
          internalType: 'address',
          name: 'feeManager_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getProtocolFeeTracker" function on the contract.
 * @param options - The options for the getProtocolFeeTracker function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getProtocolFeeTracker } from "FundValueCalculator";
 *
 * const result = await getProtocolFeeTracker();
 *
 * ```
 */
export async function getProtocolFeeTracker(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x749cc8f5',
      [],
      [
        {
          internalType: 'address',
          name: 'protocolFeeTracker_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getValueInterpreter" function on the contract.
 * @param options - The options for the getValueInterpreter function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getValueInterpreter } from "FundValueCalculator";
 *
 * const result = await getValueInterpreter();
 *
 * ```
 */
export async function getValueInterpreter(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x875fb4b3',
      [],
      [
        {
          internalType: 'address',
          name: 'valueInterpreter_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Contract write functions
 */

/**
 * Represents the parameters for the "calcGav" function.
 */
export type CalcGavParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
};

/**
 * Calls the "calcGav" function on the contract.
 * @param options - The options for the "calcGav" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcGav } from "FundValueCalculator";
 *
 * const transaction = calcGav({
 *  vaultProxy: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcGav(options: BaseTransactionOptions<CalcGavParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x037276c1',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'denominationAsset_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'gav_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy],
  });
}

/**
 * Represents the parameters for the "calcGavInAsset" function.
 */
export type CalcGavInAssetParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
  quoteAsset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_quoteAsset'; type: 'address' }>;
};

/**
 * Calls the "calcGavInAsset" function on the contract.
 * @param options - The options for the "calcGavInAsset" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcGavInAsset } from "FundValueCalculator";
 *
 * const transaction = calcGavInAsset({
 *  vaultProxy: ...,
 *  quoteAsset: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcGavInAsset(options: BaseTransactionOptions<CalcGavInAssetParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x51ac29c7',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_quoteAsset',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'gav_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy, options.quoteAsset],
  });
}

/**
 * Represents the parameters for the "calcGrossShareValue" function.
 */
export type CalcGrossShareValueParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
};

/**
 * Calls the "calcGrossShareValue" function on the contract.
 * @param options - The options for the "calcGrossShareValue" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcGrossShareValue } from "FundValueCalculator";
 *
 * const transaction = calcGrossShareValue({
 *  vaultProxy: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcGrossShareValue(options: BaseTransactionOptions<CalcGrossShareValueParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xc3552663',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'denominationAsset_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'grossShareValue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy],
  });
}

/**
 * Represents the parameters for the "calcGrossShareValueInAsset" function.
 */
export type CalcGrossShareValueInAssetParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
  quoteAsset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_quoteAsset'; type: 'address' }>;
};

/**
 * Calls the "calcGrossShareValueInAsset" function on the contract.
 * @param options - The options for the "calcGrossShareValueInAsset" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcGrossShareValueInAsset } from "FundValueCalculator";
 *
 * const transaction = calcGrossShareValueInAsset({
 *  vaultProxy: ...,
 *  quoteAsset: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcGrossShareValueInAsset(options: BaseTransactionOptions<CalcGrossShareValueInAssetParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xeefcb1b3',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_quoteAsset',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'grossShareValue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy, options.quoteAsset],
  });
}

/**
 * Represents the parameters for the "calcNav" function.
 */
export type CalcNavParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
};

/**
 * Calls the "calcNav" function on the contract.
 * @param options - The options for the "calcNav" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcNav } from "FundValueCalculator";
 *
 * const transaction = calcNav({
 *  vaultProxy: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcNav(options: BaseTransactionOptions<CalcNavParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x53d467f3',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'denominationAsset_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'nav_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy],
  });
}

/**
 * Represents the parameters for the "calcNavInAsset" function.
 */
export type CalcNavInAssetParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
  quoteAsset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_quoteAsset'; type: 'address' }>;
};

/**
 * Calls the "calcNavInAsset" function on the contract.
 * @param options - The options for the "calcNavInAsset" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcNavInAsset } from "FundValueCalculator";
 *
 * const transaction = calcNavInAsset({
 *  vaultProxy: ...,
 *  quoteAsset: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcNavInAsset(options: BaseTransactionOptions<CalcNavInAssetParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xc65988ff',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_quoteAsset',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'nav_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy, options.quoteAsset],
  });
}

/**
 * Represents the parameters for the "calcNetShareValue" function.
 */
export type CalcNetShareValueParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
};

/**
 * Calls the "calcNetShareValue" function on the contract.
 * @param options - The options for the "calcNetShareValue" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcNetShareValue } from "FundValueCalculator";
 *
 * const transaction = calcNetShareValue({
 *  vaultProxy: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcNetShareValue(options: BaseTransactionOptions<CalcNetShareValueParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x3ba6b851',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'denominationAsset_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'netShareValue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy],
  });
}

/**
 * Represents the parameters for the "calcNetShareValueInAsset" function.
 */
export type CalcNetShareValueInAssetParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
  quoteAsset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_quoteAsset'; type: 'address' }>;
};

/**
 * Calls the "calcNetShareValueInAsset" function on the contract.
 * @param options - The options for the "calcNetShareValueInAsset" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcNetShareValueInAsset } from "FundValueCalculator";
 *
 * const transaction = calcNetShareValueInAsset({
 *  vaultProxy: ...,
 *  quoteAsset: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcNetShareValueInAsset(options: BaseTransactionOptions<CalcNetShareValueInAssetParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xfaf6eeef',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_quoteAsset',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'netShareValue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy, options.quoteAsset],
  });
}

/**
 * Represents the parameters for the "calcNetValueForSharesHolder" function.
 */
export type CalcNetValueForSharesHolderParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
  sharesHolder: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_sharesHolder'; type: 'address' }>;
};

/**
 * Calls the "calcNetValueForSharesHolder" function on the contract.
 * @param options - The options for the "calcNetValueForSharesHolder" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcNetValueForSharesHolder } from "FundValueCalculator";
 *
 * const transaction = calcNetValueForSharesHolder({
 *  vaultProxy: ...,
 *  sharesHolder: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcNetValueForSharesHolder(options: BaseTransactionOptions<CalcNetValueForSharesHolderParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x81dfa95b',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_sharesHolder',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'denominationAsset_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'netValue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy, options.sharesHolder],
  });
}

/**
 * Represents the parameters for the "calcNetValueForSharesHolderInAsset" function.
 */
export type CalcNetValueForSharesHolderInAssetParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
  sharesHolder: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_sharesHolder'; type: 'address' }>;
  quoteAsset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_quoteAsset'; type: 'address' }>;
};

/**
 * Calls the "calcNetValueForSharesHolderInAsset" function on the contract.
 * @param options - The options for the "calcNetValueForSharesHolderInAsset" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { calcNetValueForSharesHolderInAsset } from "FundValueCalculator";
 *
 * const transaction = calcNetValueForSharesHolderInAsset({
 *  vaultProxy: ...,
 *  sharesHolder: ...,
 *  quoteAsset: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function calcNetValueForSharesHolderInAsset(
  options: BaseTransactionOptions<CalcNetValueForSharesHolderInAssetParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x4807ccbd',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_sharesHolder',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_quoteAsset',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: 'netValue_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy, options.sharesHolder, options.quoteAsset],
  });
}
