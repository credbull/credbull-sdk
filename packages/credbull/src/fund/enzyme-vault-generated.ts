import {
  type AbiParameterToPrimitiveType,
  type BaseTransactionOptions,
  prepareContractCall,
  prepareEvent,
  readContract,
} from 'thirdweb';

/**
 * Contract events
 */

/**
 * Creates an event object for the AccessorSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { accessorSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  accessorSetEvent()
 * ],
 * });
 * ```
 */
export function accessorSetEvent() {
  return prepareEvent({
    signature: 'event AccessorSet(address prevAccessor, address nextAccessor)',
  });
}

/**
 * Represents the filters for the "Approval" event.
 */
export type ApprovalEventFilters = Partial<{
  owner: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'owner'; type: 'address' }>;
  spender: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'spender'; type: 'address' }>;
}>;

/**
 * Creates an event object for the Approval event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { approvalEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  approvalEvent({
 *  owner: ...,
 *  spender: ...,
 * })
 * ],
 * });
 * ```
 */
export function approvalEvent(filters: ApprovalEventFilters = {}) {
  return prepareEvent({
    signature: 'event Approval(address indexed owner, address indexed spender, uint256 value)',
    filters,
  });
}

/**
 * Creates an event object for the AssetManagerAdded event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { assetManagerAddedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  assetManagerAddedEvent()
 * ],
 * });
 * ```
 */
export function assetManagerAddedEvent() {
  return prepareEvent({
    signature: 'event AssetManagerAdded(address manager)',
  });
}

/**
 * Creates an event object for the AssetManagerRemoved event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { assetManagerRemovedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  assetManagerRemovedEvent()
 * ],
 * });
 * ```
 */
export function assetManagerRemovedEvent() {
  return prepareEvent({
    signature: 'event AssetManagerRemoved(address manager)',
  });
}

/**
 * Represents the filters for the "AssetWithdrawn" event.
 */
export type AssetWithdrawnEventFilters = Partial<{
  asset: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'asset'; type: 'address' }>;
  target: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'target'; type: 'address' }>;
}>;

/**
 * Creates an event object for the AssetWithdrawn event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { assetWithdrawnEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  assetWithdrawnEvent({
 *  asset: ...,
 *  target: ...,
 * })
 * ],
 * });
 * ```
 */
export function assetWithdrawnEvent(filters: AssetWithdrawnEventFilters = {}) {
  return prepareEvent({
    signature: 'event AssetWithdrawn(address indexed asset, address indexed target, uint256 amount)',
    filters,
  });
}

/**
 * Represents the filters for the "EthReceived" event.
 */
export type EthReceivedEventFilters = Partial<{
  sender: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'sender'; type: 'address' }>;
}>;

/**
 * Creates an event object for the EthReceived event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ethReceivedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ethReceivedEvent({
 *  sender: ...,
 * })
 * ],
 * });
 * ```
 */
export function ethReceivedEvent(filters: EthReceivedEventFilters = {}) {
  return prepareEvent({
    signature: 'event EthReceived(address indexed sender, uint256 amount)',
    filters,
  });
}

/**
 * Represents the filters for the "ExternalPositionAdded" event.
 */
export type ExternalPositionAddedEventFilters = Partial<{
  externalPosition: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'externalPosition';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the ExternalPositionAdded event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { externalPositionAddedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  externalPositionAddedEvent({
 *  externalPosition: ...,
 * })
 * ],
 * });
 * ```
 */
export function externalPositionAddedEvent(filters: ExternalPositionAddedEventFilters = {}) {
  return prepareEvent({
    signature: 'event ExternalPositionAdded(address indexed externalPosition)',
    filters,
  });
}

/**
 * Represents the filters for the "ExternalPositionRemoved" event.
 */
export type ExternalPositionRemovedEventFilters = Partial<{
  externalPosition: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'externalPosition';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the ExternalPositionRemoved event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { externalPositionRemovedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  externalPositionRemovedEvent({
 *  externalPosition: ...,
 * })
 * ],
 * });
 * ```
 */
export function externalPositionRemovedEvent(filters: ExternalPositionRemovedEventFilters = {}) {
  return prepareEvent({
    signature: 'event ExternalPositionRemoved(address indexed externalPosition)',
    filters,
  });
}

/**
 * Creates an event object for the FreelyTransferableSharesSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { freelyTransferableSharesSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  freelyTransferableSharesSetEvent()
 * ],
 * });
 * ```
 */
export function freelyTransferableSharesSetEvent() {
  return prepareEvent({
    signature: 'event FreelyTransferableSharesSet()',
  });
}

/**
 * Creates an event object for the MigratorSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { migratorSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  migratorSetEvent()
 * ],
 * });
 * ```
 */
export function migratorSetEvent() {
  return prepareEvent({
    signature: 'event MigratorSet(address prevMigrator, address nextMigrator)',
  });
}

/**
 * Creates an event object for the NameSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { nameSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nameSetEvent()
 * ],
 * });
 * ```
 */
export function nameSetEvent() {
  return prepareEvent({
    signature: 'event NameSet(string name)',
  });
}

/**
 * Represents the filters for the "NominatedOwnerRemoved" event.
 */
export type NominatedOwnerRemovedEventFilters = Partial<{
  nominatedOwner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'nominatedOwner';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the NominatedOwnerRemoved event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { nominatedOwnerRemovedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nominatedOwnerRemovedEvent({
 *  nominatedOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function nominatedOwnerRemovedEvent(filters: NominatedOwnerRemovedEventFilters = {}) {
  return prepareEvent({
    signature: 'event NominatedOwnerRemoved(address indexed nominatedOwner)',
    filters,
  });
}

/**
 * Represents the filters for the "NominatedOwnerSet" event.
 */
export type NominatedOwnerSetEventFilters = Partial<{
  nominatedOwner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'nominatedOwner';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the NominatedOwnerSet event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { nominatedOwnerSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  nominatedOwnerSetEvent({
 *  nominatedOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function nominatedOwnerSetEvent(filters: NominatedOwnerSetEventFilters = {}) {
  return prepareEvent({
    signature: 'event NominatedOwnerSet(address indexed nominatedOwner)',
    filters,
  });
}

/**
 * Creates an event object for the OwnerSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownerSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownerSetEvent()
 * ],
 * });
 * ```
 */
export function ownerSetEvent() {
  return prepareEvent({
    signature: 'event OwnerSet(address prevOwner, address nextOwner)',
  });
}

/**
 * Represents the filters for the "OwnershipTransferred" event.
 */
export type OwnershipTransferredEventFilters = Partial<{
  prevOwner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'prevOwner';
    type: 'address';
  }>;
  nextOwner: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'nextOwner';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the OwnershipTransferred event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferredEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferredEvent({
 *  prevOwner: ...,
 *  nextOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownershipTransferredEvent(filters: OwnershipTransferredEventFilters = {}) {
  return prepareEvent({
    signature: 'event OwnershipTransferred(address indexed prevOwner, address indexed nextOwner)',
    filters,
  });
}

/**
 * Creates an event object for the ProtocolFeePaidInShares event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { protocolFeePaidInSharesEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  protocolFeePaidInSharesEvent()
 * ],
 * });
 * ```
 */
export function protocolFeePaidInSharesEvent() {
  return prepareEvent({
    signature: 'event ProtocolFeePaidInShares(uint256 sharesAmount)',
  });
}

/**
 * Creates an event object for the ProtocolFeeSharesBoughtBack event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { protocolFeeSharesBoughtBackEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  protocolFeeSharesBoughtBackEvent()
 * ],
 * });
 * ```
 */
export function protocolFeeSharesBoughtBackEvent() {
  return prepareEvent({
    signature: 'event ProtocolFeeSharesBoughtBack(uint256 sharesAmount, uint256 mlnValue, uint256 mlnBurned)',
  });
}

/**
 * Creates an event object for the SymbolSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { symbolSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  symbolSetEvent()
 * ],
 * });
 * ```
 */
export function symbolSetEvent() {
  return prepareEvent({
    signature: 'event SymbolSet(string symbol)',
  });
}

/**
 * Creates an event object for the TrackedAssetAdded event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { trackedAssetAddedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  trackedAssetAddedEvent()
 * ],
 * });
 * ```
 */
export function trackedAssetAddedEvent() {
  return prepareEvent({
    signature: 'event TrackedAssetAdded(address asset)',
  });
}

/**
 * Creates an event object for the TrackedAssetRemoved event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { trackedAssetRemovedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  trackedAssetRemovedEvent()
 * ],
 * });
 * ```
 */
export function trackedAssetRemovedEvent() {
  return prepareEvent({
    signature: 'event TrackedAssetRemoved(address asset)',
  });
}

/**
 * Represents the filters for the "Transfer" event.
 */
export type TransferEventFilters = Partial<{
  from: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'from'; type: 'address' }>;
  to: AbiParameterToPrimitiveType<{ indexed: true; internalType: 'address'; name: 'to'; type: 'address' }>;
}>;

/**
 * Creates an event object for the Transfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferEvent({
 *  from: ...,
 *  to: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferEvent(filters: TransferEventFilters = {}) {
  return prepareEvent({
    signature: 'event Transfer(address indexed from, address indexed to, uint256 value)',
    filters,
  });
}

/**
 * Creates an event object for the VaultLibSet event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { vaultLibSetEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  vaultLibSetEvent()
 * ],
 * });
 * ```
 */
export function vaultLibSetEvent() {
  return prepareEvent({
    signature: 'event VaultLibSet(address prevVaultLib, address nextVaultLib)',
  });
}

/**
 * Contract read functions
 */

/**
 * Represents the parameters for the "allowance" function.
 */
export type AllowanceParams = {
  owner: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_owner'; type: 'address' }>;
  spender: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_spender'; type: 'address' }>;
};

/**
 * Calls the "allowance" function on the contract.
 * @param options - The options for the allowance function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { allowance } from "TODO";
 *
 * const result = await allowance({
 *  owner: ...,
 *  spender: ...,
 * });
 *
 * ```
 */
export async function allowance(options: BaseTransactionOptions<AllowanceParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0xdd62ed3e',
      [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_spender',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [options.owner, options.spender],
  });
}

/**
 * Represents the parameters for the "balanceOf" function.
 */
export type BalanceOfParams = {
  account: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_account'; type: 'address' }>;
};

/**
 * Calls the "balanceOf" function on the contract.
 * @param options - The options for the balanceOf function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { balanceOf } from "TODO";
 *
 * const result = await balanceOf({
 *  account: ...,
 * });
 *
 * ```
 */
export async function balanceOf(options: BaseTransactionOptions<BalanceOfParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x70a08231',
      [
        {
          internalType: 'address',
          name: '_account',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
    ],
    params: [options.account],
  });
}

/**
 * Represents the parameters for the "canManageAssets" function.
 */
export type CanManageAssetsParams = {
  who: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_who'; type: 'address' }>;
};

/**
 * Calls the "canManageAssets" function on the contract.
 * @param options - The options for the canManageAssets function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { canManageAssets } from "TODO";
 *
 * const result = await canManageAssets({
 *  who: ...,
 * });
 *
 * ```
 */
export async function canManageAssets(options: BaseTransactionOptions<CanManageAssetsParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x714ca2d1',
      [
        {
          internalType: 'address',
          name: '_who',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'canManageAssets_',
          type: 'bool',
        },
      ],
    ],
    params: [options.who],
  });
}

/**
 * Represents the parameters for the "canMigrate" function.
 */
export type CanMigrateParams = {
  who: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_who'; type: 'address' }>;
};

/**
 * Calls the "canMigrate" function on the contract.
 * @param options - The options for the canMigrate function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { canMigrate } from "TODO";
 *
 * const result = await canMigrate({
 *  who: ...,
 * });
 *
 * ```
 */
export async function canMigrate(options: BaseTransactionOptions<CanMigrateParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x7de07cea',
      [
        {
          internalType: 'address',
          name: '_who',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'canMigrate_',
          type: 'bool',
        },
      ],
    ],
    params: [options.who],
  });
}

/**
 * Represents the parameters for the "canRelayCalls" function.
 */
export type CanRelayCallsParams = {
  who: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_who'; type: 'address' }>;
};

/**
 * Calls the "canRelayCalls" function on the contract.
 * @param options - The options for the canRelayCalls function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { canRelayCalls } from "TODO";
 *
 * const result = await canRelayCalls({
 *  who: ...,
 * });
 *
 * ```
 */
export async function canRelayCalls(options: BaseTransactionOptions<CanRelayCallsParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x36861889',
      [
        {
          internalType: 'address',
          name: '_who',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'canRelayCalls_',
          type: 'bool',
        },
      ],
    ],
    params: [options.who],
  });
}

/**
 * Calls the "decimals" function on the contract.
 * @param options - The options for the decimals function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { decimals } from "TODO";
 *
 * const result = await decimals();
 *
 * ```
 */
export async function decimals(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x313ce567',
      [],
      [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getAccessor" function on the contract.
 * @param options - The options for the getAccessor function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getAccessor } from "TODO";
 *
 * const result = await getAccessor();
 *
 * ```
 */
export async function getAccessor(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x5a53e348',
      [],
      [
        {
          internalType: 'address',
          name: 'accessor_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getActiveExternalPositions" function on the contract.
 * @param options - The options for the getActiveExternalPositions function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getActiveExternalPositions } from "TODO";
 *
 * const result = await getActiveExternalPositions();
 *
 * ```
 */
export async function getActiveExternalPositions(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xb8b7f147',
      [],
      [
        {
          internalType: 'address[]',
          name: 'activeExternalPositions_',
          type: 'address[]',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getCreator" function on the contract.
 * @param options - The options for the getCreator function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getCreator } from "TODO";
 *
 * const result = await getCreator();
 *
 * ```
 */
export async function getCreator(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x0ee2cb10',
      [],
      [
        {
          internalType: 'address',
          name: 'creator_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "getExternalPositionLibForType" function.
 */
export type GetExternalPositionLibForTypeParams = {
  typeId: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_typeId'; type: 'uint256' }>;
};

/**
 * Calls the "getExternalPositionLibForType" function on the contract.
 * @param options - The options for the getExternalPositionLibForType function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getExternalPositionLibForType } from "TODO";
 *
 * const result = await getExternalPositionLibForType({
 *  typeId: ...,
 * });
 *
 * ```
 */
export async function getExternalPositionLibForType(
  options: BaseTransactionOptions<GetExternalPositionLibForTypeParams>,
) {
  return readContract({
    contract: options.contract,
    method: [
      '0x75d8bb0e',
      [
        {
          internalType: 'uint256',
          name: '_typeId',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'externalPositionLib_',
          type: 'address',
        },
      ],
    ],
    params: [options.typeId],
  });
}

/**
 * Calls the "getExternalPositionManager" function on the contract.
 * @param options - The options for the getExternalPositionManager function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getExternalPositionManager } from "TODO";
 *
 * const result = await getExternalPositionManager();
 *
 * ```
 */
export async function getExternalPositionManager(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xb3fc38e9',
      [],
      [
        {
          internalType: 'address',
          name: 'externalPositionManager_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getFundDeployer" function on the contract.
 * @param options - The options for the getFundDeployer function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getFundDeployer } from "TODO";
 *
 * const result = await getFundDeployer();
 *
 * ```
 */
export async function getFundDeployer(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x97c0ac87',
      [],
      [
        {
          internalType: 'address',
          name: 'fundDeployer_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getGasRelayPaymasterFactory" function on the contract.
 * @param options - The options for the getGasRelayPaymasterFactory function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getGasRelayPaymasterFactory } from "TODO";
 *
 * const result = await getGasRelayPaymasterFactory();
 *
 * ```
 */
export async function getGasRelayPaymasterFactory(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xac259456',
      [],
      [
        {
          internalType: 'address',
          name: 'gasRelayPaymasterFactory_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getGasRelayTrustedForwarder" function on the contract.
 * @param options - The options for the getGasRelayTrustedForwarder function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getGasRelayTrustedForwarder } from "TODO";
 *
 * const result = await getGasRelayTrustedForwarder();
 *
 * ```
 */
export async function getGasRelayTrustedForwarder(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x6ea21143',
      [],
      [
        {
          internalType: 'address',
          name: 'trustedForwarder_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getMigrator" function on the contract.
 * @param options - The options for the getMigrator function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getMigrator } from "TODO";
 *
 * const result = await getMigrator();
 *
 * ```
 */
export async function getMigrator(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xcd63d578',
      [],
      [
        {
          internalType: 'address',
          name: 'migrator_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getMlnBurner" function on the contract.
 * @param options - The options for the getMlnBurner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getMlnBurner } from "TODO";
 *
 * const result = await getMlnBurner();
 *
 * ```
 */
export async function getMlnBurner(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xfe15c02a',
      [],
      [
        {
          internalType: 'address',
          name: 'mlnBurner_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getMlnToken" function on the contract.
 * @param options - The options for the getMlnToken function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getMlnToken } from "TODO";
 *
 * const result = await getMlnToken();
 *
 * ```
 */
export async function getMlnToken(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xe70e605e',
      [],
      [
        {
          internalType: 'address',
          name: 'mlnToken_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getNominatedOwner" function on the contract.
 * @param options - The options for the getNominatedOwner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getNominatedOwner } from "TODO";
 *
 * const result = await getNominatedOwner();
 *
 * ```
 */
export async function getNominatedOwner(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x288b6a36',
      [],
      [
        {
          internalType: 'address',
          name: 'nominatedOwner_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getOwner" function on the contract.
 * @param options - The options for the getOwner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getOwner } from "TODO";
 *
 * const result = await getOwner();
 *
 * ```
 */
export async function getOwner(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x893d20e8',
      [],
      [
        {
          internalType: 'address',
          name: 'owner_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getPositionsLimit" function on the contract.
 * @param options - The options for the getPositionsLimit function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getPositionsLimit } from "TODO";
 *
 * const result = await getPositionsLimit();
 *
 * ```
 */
export async function getPositionsLimit(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xff3cdf56',
      [],
      [
        {
          internalType: 'uint256',
          name: 'positionsLimit_',
          type: 'uint256',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getProtocolFeeReserve" function on the contract.
 * @param options - The options for the getProtocolFeeReserve function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getProtocolFeeReserve } from "TODO";
 *
 * const result = await getProtocolFeeReserve();
 *
 * ```
 */
export async function getProtocolFeeReserve(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xda41962e',
      [],
      [
        {
          internalType: 'address',
          name: 'protocolFeeReserve_',
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
 * import { getProtocolFeeTracker } from "TODO";
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
 * Calls the "getTrackedAssets" function on the contract.
 * @param options - The options for the getTrackedAssets function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getTrackedAssets } from "TODO";
 *
 * const result = await getTrackedAssets();
 *
 * ```
 */
export async function getTrackedAssets(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xc4b97370',
      [],
      [
        {
          internalType: 'address[]',
          name: 'trackedAssets_',
          type: 'address[]',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getVaultLib" function on the contract.
 * @param options - The options for the getVaultLib function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getVaultLib } from "TODO";
 *
 * const result = await getVaultLib();
 *
 * ```
 */
export async function getVaultLib(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x682cea19',
      [],
      [
        {
          internalType: 'address',
          name: 'vaultLib_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "getWethToken" function on the contract.
 * @param options - The options for the getWethToken function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getWethToken } from "TODO";
 *
 * const result = await getWethToken();
 *
 * ```
 */
export async function getWethToken(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x4c252f91',
      [],
      [
        {
          internalType: 'address',
          name: 'wethToken_',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "isActiveExternalPosition" function.
 */
export type IsActiveExternalPositionParams = {
  externalPosition: AbiParameterToPrimitiveType<{
    internalType: 'address';
    name: '_externalPosition';
    type: 'address';
  }>;
};

/**
 * Calls the "isActiveExternalPosition" function on the contract.
 * @param options - The options for the isActiveExternalPosition function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isActiveExternalPosition } from "TODO";
 *
 * const result = await isActiveExternalPosition({
 *  externalPosition: ...,
 * });
 *
 * ```
 */
export async function isActiveExternalPosition(options: BaseTransactionOptions<IsActiveExternalPositionParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x712bd102',
      [
        {
          internalType: 'address',
          name: '_externalPosition',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'isActiveExternalPosition_',
          type: 'bool',
        },
      ],
    ],
    params: [options.externalPosition],
  });
}

/**
 * Represents the parameters for the "isAssetManager" function.
 */
export type IsAssetManagerParams = {
  who: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_who'; type: 'address' }>;
};

/**
 * Calls the "isAssetManager" function on the contract.
 * @param options - The options for the isAssetManager function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isAssetManager } from "TODO";
 *
 * const result = await isAssetManager({
 *  who: ...,
 * });
 *
 * ```
 */
export async function isAssetManager(options: BaseTransactionOptions<IsAssetManagerParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x6487aa11',
      [
        {
          internalType: 'address',
          name: '_who',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'isAssetManager_',
          type: 'bool',
        },
      ],
    ],
    params: [options.who],
  });
}

/**
 * Represents the parameters for the "isTrackedAsset" function.
 */
export type IsTrackedAssetParams = {
  asset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_asset'; type: 'address' }>;
};

/**
 * Calls the "isTrackedAsset" function on the contract.
 * @param options - The options for the isTrackedAsset function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { isTrackedAsset } from "TODO";
 *
 * const result = await isTrackedAsset({
 *  asset: ...,
 * });
 *
 * ```
 */
export async function isTrackedAsset(options: BaseTransactionOptions<IsTrackedAssetParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x797ed339',
      [
        {
          internalType: 'address',
          name: '_asset',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'isTrackedAsset_',
          type: 'bool',
        },
      ],
    ],
    params: [options.asset],
  });
}

/**
 * Calls the "name" function on the contract.
 * @param options - The options for the name function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { name } from "TODO";
 *
 * const result = await name();
 *
 * ```
 */
export async function name(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x06fdde03',
      [],
      [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "proxiableUUID" function on the contract.
 * @param options - The options for the proxiableUUID function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { proxiableUUID } from "TODO";
 *
 * const result = await proxiableUUID();
 *
 * ```
 */
export async function proxiableUUID(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x52d1902d',
      [],
      [
        {
          internalType: 'bytes32',
          name: 'uuid_',
          type: 'bytes32',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "sharesAreFreelyTransferable" function on the contract.
 * @param options - The options for the sharesAreFreelyTransferable function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { sharesAreFreelyTransferable } from "TODO";
 *
 * const result = await sharesAreFreelyTransferable();
 *
 * ```
 */
export async function sharesAreFreelyTransferable(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x28c2ad9c',
      [],
      [
        {
          internalType: 'bool',
          name: 'sharesAreFreelyTransferable_',
          type: 'bool',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "symbol" function on the contract.
 * @param options - The options for the symbol function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { symbol } from "TODO";
 *
 * const result = await symbol();
 *
 * ```
 */
export async function symbol(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x95d89b41',
      [],
      [
        {
          internalType: 'string',
          name: 'symbol_',
          type: 'string',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "totalSupply" function on the contract.
 * @param options - The options for the totalSupply function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalSupply } from "TODO";
 *
 * const result = await totalSupply();
 *
 * ```
 */
export async function totalSupply(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x18160ddd',
      [],
      [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
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
 * Represents the parameters for the "addAssetManagers" function.
 */
export type AddAssetManagersParams = {
  managers: AbiParameterToPrimitiveType<{ internalType: 'address[]'; name: '_managers'; type: 'address[]' }>;
};

/**
 * Calls the "addAssetManagers" function on the contract.
 * @param options - The options for the "addAssetManagers" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { addAssetManagers } from "TODO";
 *
 * const transaction = addAssetManagers({
 *  managers: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function addAssetManagers(options: BaseTransactionOptions<AddAssetManagersParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x3e11553d',
      [
        {
          internalType: 'address[]',
          name: '_managers',
          type: 'address[]',
        },
      ],
      [],
    ],
    params: [options.managers],
  });
}

/**
 * Represents the parameters for the "addTrackedAsset" function.
 */
export type AddTrackedAssetParams = {
  asset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_asset'; type: 'address' }>;
};

/**
 * Calls the "addTrackedAsset" function on the contract.
 * @param options - The options for the "addTrackedAsset" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { addTrackedAsset } from "TODO";
 *
 * const transaction = addTrackedAsset({
 *  asset: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function addTrackedAsset(options: BaseTransactionOptions<AddTrackedAssetParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x4ef0762e',
      [
        {
          internalType: 'address',
          name: '_asset',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.asset],
  });
}

/**
 * Represents the parameters for the "approve" function.
 */
export type ApproveParams = {
  spender: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_spender'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "approve" function on the contract.
 * @param options - The options for the "approve" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { approve } from "TODO";
 *
 * const transaction = approve({
 *  spender: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function approve(options: BaseTransactionOptions<ApproveParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x095ea7b3',
      [
        {
          internalType: 'address',
          name: '_spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
    ],
    params: [options.spender, options.amount],
  });
}

/**
 * Represents the parameters for the "burnShares" function.
 */
export type BurnSharesParams = {
  target: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_target'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "burnShares" function on the contract.
 * @param options - The options for the "burnShares" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { burnShares } from "TODO";
 *
 * const transaction = burnShares({
 *  target: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function burnShares(options: BaseTransactionOptions<BurnSharesParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xee7a7c04',
      [
        {
          internalType: 'address',
          name: '_target',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.target, options.amount],
  });
}

/**
 * Represents the parameters for the "buyBackProtocolFeeShares" function.
 */
export type BuyBackProtocolFeeSharesParams = {
  sharesAmount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_sharesAmount'; type: 'uint256' }>;
  mlnValue: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_mlnValue'; type: 'uint256' }>;
  gav: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_gav'; type: 'uint256' }>;
};

/**
 * Calls the "buyBackProtocolFeeShares" function on the contract.
 * @param options - The options for the "buyBackProtocolFeeShares" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { buyBackProtocolFeeShares } from "TODO";
 *
 * const transaction = buyBackProtocolFeeShares({
 *  sharesAmount: ...,
 *  mlnValue: ...,
 *  gav: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function buyBackProtocolFeeShares(options: BaseTransactionOptions<BuyBackProtocolFeeSharesParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x1ff46bfa',
      [
        {
          internalType: 'uint256',
          name: '_sharesAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_mlnValue',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_gav',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.sharesAmount, options.mlnValue, options.gav],
  });
}

/**
 * Represents the parameters for the "callOnContract" function.
 */
export type CallOnContractParams = {
  contract: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_contract'; type: 'address' }>;
  callData: AbiParameterToPrimitiveType<{ internalType: 'bytes'; name: '_callData'; type: 'bytes' }>;
};

/**
 * Calls the "callOnContract" function on the contract.
 * @param options - The options for the "callOnContract" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { callOnContract } from "TODO";
 *
 * const transaction = callOnContract({
 *  contract: ...,
 *  callData: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function callOnContract(options: BaseTransactionOptions<CallOnContractParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xa90cce4b',
      [
        {
          internalType: 'address',
          name: '_contract',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: '_callData',
          type: 'bytes',
        },
      ],
      [
        {
          internalType: 'bytes',
          name: 'returnData_',
          type: 'bytes',
        },
      ],
    ],
    params: [options.contract, options.callData],
  });
}

/**
 * Calls the "claimOwnership" function on the contract.
 * @param options - The options for the "claimOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { claimOwnership } from "TODO";
 *
 * const transaction = claimOwnership();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function claimOwnership(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0x4e71e0c8', [], []],
    params: [],
  });
}

/**
 * Represents the parameters for the "init" function.
 */
export type InitParams = {
  owner: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_owner'; type: 'address' }>;
  accessor: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_accessor'; type: 'address' }>;
  fundName: AbiParameterToPrimitiveType<{ internalType: 'string'; name: '_fundName'; type: 'string' }>;
};

/**
 * Calls the "init" function on the contract.
 * @param options - The options for the "init" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { init } from "TODO";
 *
 * const transaction = init({
 *  owner: ...,
 *  accessor: ...,
 *  fundName: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function init(options: BaseTransactionOptions<InitParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x5c9a6d37',
      [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_accessor',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_fundName',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.owner, options.accessor, options.fundName],
  });
}

/**
 * Represents the parameters for the "mintShares" function.
 */
export type MintSharesParams = {
  target: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_target'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "mintShares" function on the contract.
 * @param options - The options for the "mintShares" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { mintShares } from "TODO";
 *
 * const transaction = mintShares({
 *  target: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function mintShares(options: BaseTransactionOptions<MintSharesParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x528c198a',
      [
        {
          internalType: 'address',
          name: '_target',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.target, options.amount],
  });
}

/**
 * Calls the "payProtocolFee" function on the contract.
 * @param options - The options for the "payProtocolFee" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { payProtocolFee } from "TODO";
 *
 * const transaction = payProtocolFee();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function payProtocolFee(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0xd5c20fa2', [], []],
    params: [],
  });
}

/**
 * Represents the parameters for the "receiveValidatedVaultAction" function.
 */
export type ReceiveValidatedVaultActionParams = {
  action: AbiParameterToPrimitiveType<{ internalType: 'enum IVault.VaultAction'; name: '_action'; type: 'uint8' }>;
  actionData: AbiParameterToPrimitiveType<{ internalType: 'bytes'; name: '_actionData'; type: 'bytes' }>;
};

/**
 * Calls the "receiveValidatedVaultAction" function on the contract.
 * @param options - The options for the "receiveValidatedVaultAction" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { receiveValidatedVaultAction } from "TODO";
 *
 * const transaction = receiveValidatedVaultAction({
 *  action: ...,
 *  actionData: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function receiveValidatedVaultAction(options: BaseTransactionOptions<ReceiveValidatedVaultActionParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x24e60012',
      [
        {
          internalType: 'enum IVault.VaultAction',
          name: '_action',
          type: 'uint8',
        },
        {
          internalType: 'bytes',
          name: '_actionData',
          type: 'bytes',
        },
      ],
      [],
    ],
    params: [options.action, options.actionData],
  });
}

/**
 * Represents the parameters for the "removeAssetManagers" function.
 */
export type RemoveAssetManagersParams = {
  managers: AbiParameterToPrimitiveType<{ internalType: 'address[]'; name: '_managers'; type: 'address[]' }>;
};

/**
 * Calls the "removeAssetManagers" function on the contract.
 * @param options - The options for the "removeAssetManagers" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { removeAssetManagers } from "TODO";
 *
 * const transaction = removeAssetManagers({
 *  managers: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function removeAssetManagers(options: BaseTransactionOptions<RemoveAssetManagersParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x64cb36cb',
      [
        {
          internalType: 'address[]',
          name: '_managers',
          type: 'address[]',
        },
      ],
      [],
    ],
    params: [options.managers],
  });
}

/**
 * Calls the "removeNominatedOwner" function on the contract.
 * @param options - The options for the "removeNominatedOwner" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { removeNominatedOwner } from "TODO";
 *
 * const transaction = removeNominatedOwner();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function removeNominatedOwner(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0x8156eecf', [], []],
    params: [],
  });
}

/**
 * Represents the parameters for the "setAccessor" function.
 */
export type SetAccessorParams = {
  nextAccessor: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_nextAccessor'; type: 'address' }>;
};

/**
 * Calls the "setAccessor" function on the contract.
 * @param options - The options for the "setAccessor" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setAccessor } from "TODO";
 *
 * const transaction = setAccessor({
 *  nextAccessor: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setAccessor(options: BaseTransactionOptions<SetAccessorParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xab9253ac',
      [
        {
          internalType: 'address',
          name: '_nextAccessor',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.nextAccessor],
  });
}

/**
 * Represents the parameters for the "setAccessorForFundReconfiguration" function.
 */
export type SetAccessorForFundReconfigurationParams = {
  nextAccessor: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_nextAccessor'; type: 'address' }>;
};

/**
 * Calls the "setAccessorForFundReconfiguration" function on the contract.
 * @param options - The options for the "setAccessorForFundReconfiguration" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setAccessorForFundReconfiguration } from "TODO";
 *
 * const transaction = setAccessorForFundReconfiguration({
 *  nextAccessor: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setAccessorForFundReconfiguration(
  options: BaseTransactionOptions<SetAccessorForFundReconfigurationParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x740f2b5a',
      [
        {
          internalType: 'address',
          name: '_nextAccessor',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.nextAccessor],
  });
}

/**
 * Calls the "setFreelyTransferableShares" function on the contract.
 * @param options - The options for the "setFreelyTransferableShares" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setFreelyTransferableShares } from "TODO";
 *
 * const transaction = setFreelyTransferableShares();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setFreelyTransferableShares(options: BaseTransactionOptions) {
  return prepareContractCall({
    contract: options.contract,
    method: ['0x7c81ac2d', [], []],
    params: [],
  });
}

/**
 * Represents the parameters for the "setMigrator" function.
 */
export type SetMigratorParams = {
  nextMigrator: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_nextMigrator'; type: 'address' }>;
};

/**
 * Calls the "setMigrator" function on the contract.
 * @param options - The options for the "setMigrator" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setMigrator } from "TODO";
 *
 * const transaction = setMigrator({
 *  nextMigrator: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setMigrator(options: BaseTransactionOptions<SetMigratorParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x23cf3118',
      [
        {
          internalType: 'address',
          name: '_nextMigrator',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.nextMigrator],
  });
}

/**
 * Represents the parameters for the "setName" function.
 */
export type SetNameParams = {
  nextName: AbiParameterToPrimitiveType<{ internalType: 'string'; name: '_nextName'; type: 'string' }>;
};

/**
 * Calls the "setName" function on the contract.
 * @param options - The options for the "setName" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setName } from "TODO";
 *
 * const transaction = setName({
 *  nextName: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setName(options: BaseTransactionOptions<SetNameParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xc47f0027',
      [
        {
          internalType: 'string',
          name: '_nextName',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.nextName],
  });
}

/**
 * Represents the parameters for the "setNominatedOwner" function.
 */
export type SetNominatedOwnerParams = {
  nextNominatedOwner: AbiParameterToPrimitiveType<{
    internalType: 'address';
    name: '_nextNominatedOwner';
    type: 'address';
  }>;
};

/**
 * Calls the "setNominatedOwner" function on the contract.
 * @param options - The options for the "setNominatedOwner" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setNominatedOwner } from "TODO";
 *
 * const transaction = setNominatedOwner({
 *  nextNominatedOwner: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setNominatedOwner(options: BaseTransactionOptions<SetNominatedOwnerParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x728e17a0',
      [
        {
          internalType: 'address',
          name: '_nextNominatedOwner',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.nextNominatedOwner],
  });
}

/**
 * Represents the parameters for the "setSymbol" function.
 */
export type SetSymbolParams = {
  nextSymbol: AbiParameterToPrimitiveType<{ internalType: 'string'; name: '_nextSymbol'; type: 'string' }>;
};

/**
 * Calls the "setSymbol" function on the contract.
 * @param options - The options for the "setSymbol" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setSymbol } from "TODO";
 *
 * const transaction = setSymbol({
 *  nextSymbol: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setSymbol(options: BaseTransactionOptions<SetSymbolParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xb84c8246',
      [
        {
          internalType: 'string',
          name: '_nextSymbol',
          type: 'string',
        },
      ],
      [],
    ],
    params: [options.nextSymbol],
  });
}

/**
 * Represents the parameters for the "setVaultLib" function.
 */
export type SetVaultLibParams = {
  nextVaultLib: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_nextVaultLib'; type: 'address' }>;
};

/**
 * Calls the "setVaultLib" function on the contract.
 * @param options - The options for the "setVaultLib" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setVaultLib } from "TODO";
 *
 * const transaction = setVaultLib({
 *  nextVaultLib: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setVaultLib(options: BaseTransactionOptions<SetVaultLibParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x4140d607',
      [
        {
          internalType: 'address',
          name: '_nextVaultLib',
          type: 'address',
        },
      ],
      [],
    ],
    params: [options.nextVaultLib],
  });
}

/**
 * Represents the parameters for the "transfer" function.
 */
export type TransferParams = {
  recipient: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_recipient'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "transfer" function on the contract.
 * @param options - The options for the "transfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transfer } from "TODO";
 *
 * const transaction = transfer({
 *  recipient: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transfer(options: BaseTransactionOptions<TransferParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xa9059cbb',
      [
        {
          internalType: 'address',
          name: '_recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'success_',
          type: 'bool',
        },
      ],
    ],
    params: [options.recipient, options.amount],
  });
}

/**
 * Represents the parameters for the "transferFrom" function.
 */
export type TransferFromParams = {
  sender: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_sender'; type: 'address' }>;
  recipient: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_recipient'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "transferFrom" function on the contract.
 * @param options - The options for the "transferFrom" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferFrom } from "TODO";
 *
 * const transaction = transferFrom({
 *  sender: ...,
 *  recipient: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transferFrom(options: BaseTransactionOptions<TransferFromParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x23b872dd',
      [
        {
          internalType: 'address',
          name: '_sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [
        {
          internalType: 'bool',
          name: 'success_',
          type: 'bool',
        },
      ],
    ],
    params: [options.sender, options.recipient, options.amount],
  });
}

/**
 * Represents the parameters for the "transferShares" function.
 */
export type TransferSharesParams = {
  from: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_from'; type: 'address' }>;
  to: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_to'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "transferShares" function on the contract.
 * @param options - The options for the "transferShares" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferShares } from "TODO";
 *
 * const transaction = transferShares({
 *  from: ...,
 *  to: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transferShares(options: BaseTransactionOptions<TransferSharesParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xbfc77beb',
      [
        {
          internalType: 'address',
          name: '_from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.from, options.to, options.amount],
  });
}

/**
 * Represents the parameters for the "withdrawAssetTo" function.
 */
export type WithdrawAssetToParams = {
  asset: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_asset'; type: 'address' }>;
  target: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_target'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: '_amount'; type: 'uint256' }>;
};

/**
 * Calls the "withdrawAssetTo" function on the contract.
 * @param options - The options for the "withdrawAssetTo" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { withdrawAssetTo } from "TODO";
 *
 * const transaction = withdrawAssetTo({
 *  asset: ...,
 *  target: ...,
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function withdrawAssetTo(options: BaseTransactionOptions<WithdrawAssetToParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x495d753c',
      [
        {
          internalType: 'address',
          name: '_asset',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_target',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.asset, options.target, options.amount],
  });
}
