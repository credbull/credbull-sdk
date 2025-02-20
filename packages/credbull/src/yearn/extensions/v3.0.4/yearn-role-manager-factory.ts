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
 * Represents the filters for the "NewProject" event.
 */
export type NewProjectEventFilters = Partial<{
  projectId: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'bytes32';
    name: 'projectId';
    type: 'bytes32';
  }>;
  roleManager: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'roleManager';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the NewProject event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { newProjectEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  newProjectEvent({
 *  projectId: ...,
 *  roleManager: ...,
 * })
 * ],
 * });
 * ```
 */
export function newProjectEvent(filters: NewProjectEventFilters = {}) {
  return prepareEvent({
    signature: 'event NewProject(bytes32 indexed projectId, address indexed roleManager)',
    filters,
  });
}

/**
 * Represents the filters for the "NewRoleManager" event.
 */
export type NewRoleManagerEventFilters = Partial<{
  roleManager: AbiParameterToPrimitiveType<{
    indexed: true;
    internalType: 'address';
    name: 'roleManager';
    type: 'address';
  }>;
}>;

/**
 * Creates an event object for the NewRoleManager event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { newRoleManagerEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  newRoleManagerEvent({
 *  roleManager: ...,
 * })
 * ],
 * });
 * ```
 */
export function newRoleManagerEvent(filters: NewRoleManagerEventFilters = {}) {
  return prepareEvent({
    signature: 'event NewRoleManager(address indexed roleManager)',
    filters,
  });
}

/**
 * Contract read functions
 */

/**
 * Calls the "ACCOUNTANT_FACTORY" function on the contract.
 * @param options - The options for the ACCOUNTANT_FACTORY function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { ACCOUNTANT_FACTORY } from "TODO";
 *
 * const result = await ACCOUNTANT_FACTORY();
 *
 * ```
 */
export async function ACCOUNTANT_FACTORY(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0xec6d2621',
      [],
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "DEBT_ALLOCATOR_FACTORY" function on the contract.
 * @param options - The options for the DEBT_ALLOCATOR_FACTORY function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { DEBT_ALLOCATOR_FACTORY } from "TODO";
 *
 * const result = await DEBT_ALLOCATOR_FACTORY();
 *
 * ```
 */
export async function DEBT_ALLOCATOR_FACTORY(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x1fe833b1',
      [],
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "KEEPER" function on the contract.
 * @param options - The options for the KEEPER function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { KEEPER } from "TODO";
 *
 * const result = await KEEPER();
 *
 * ```
 */
export async function KEEPER(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x862a179e',
      [],
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "REGISTRY_FACTORY" function on the contract.
 * @param options - The options for the REGISTRY_FACTORY function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { REGISTRY_FACTORY } from "TODO";
 *
 * const result = await REGISTRY_FACTORY();
 *
 * ```
 */
export async function REGISTRY_FACTORY(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x861ceb69',
      [],
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Calls the "apiVersion" function on the contract.
 * @param options - The options for the apiVersion function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { apiVersion } from "TODO";
 *
 * const result = await apiVersion();
 *
 * ```
 */
export async function apiVersion(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x25829410',
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
 * Represents the parameters for the "getProjectId" function.
 */
export type GetProjectIdParams = {
  name: AbiParameterToPrimitiveType<{ internalType: 'string'; name: '_name'; type: 'string' }>;
  governance: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_governance'; type: 'address' }>;
};

/**
 * Calls the "getProjectId" function on the contract.
 * @param options - The options for the getProjectId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { getProjectId } from "TODO";
 *
 * const result = await getProjectId({
 *  name: ...,
 *  governance: ...,
 * });
 *
 * ```
 */
export async function getProjectId(options: BaseTransactionOptions<GetProjectIdParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0x511abc90',
      [
        {
          internalType: 'string',
          name: '_name',
          type: 'string',
        },
        {
          internalType: 'address',
          name: '_governance',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
    ],
    params: [options.name, options.governance],
  });
}

/**
 * Calls the "original" function on the contract.
 * @param options - The options for the original function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { original } from "TODO";
 *
 * const result = await original();
 *
 * ```
 */
export async function original(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x46c715fa',
      [],
      [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
    ],
    params: [],
  });
}

/**
 * Represents the parameters for the "projects" function.
 */
export type ProjectsParams = {
  arg_0: AbiParameterToPrimitiveType<{ internalType: 'bytes32'; name: ''; type: 'bytes32' }>;
};

/**
 * Calls the "projects" function on the contract.
 * @param options - The options for the projects function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { projects } from "TODO";
 *
 * const result = await projects({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function projects(options: BaseTransactionOptions<ProjectsParams>) {
  return readContract({
    contract: options.contract,
    method: [
      '0xb96ea12d',
      [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'roleManager',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'registry',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'accountant',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'debtAllocator',
          type: 'address',
        },
      ],
    ],
    params: [options.arg_0],
  });
}

/**
 * Calls the "protocolAddressProvider" function on the contract.
 * @param options - The options for the protocolAddressProvider function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { protocolAddressProvider } from "TODO";
 *
 * const result = await protocolAddressProvider();
 *
 * ```
 */
export async function protocolAddressProvider(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [
      '0x4c73e779',
      [],
      [
        {
          internalType: 'address',
          name: '',
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
 * Represents the parameters for the "newProject" function.
 */
export type NewProjectParams = {
  name: AbiParameterToPrimitiveType<{ internalType: 'string'; name: '_name'; type: 'string' }>;
  governance: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_governance'; type: 'address' }>;
  management: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_management'; type: 'address' }>;
};

/**
 * Calls the "newProject" function on the contract.
 * @param options - The options for the "newProject" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { newProject } from "TODO";
 *
 * const transaction = newProject({
 *  name: ...,
 *  governance: ...,
 *  management: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function newProject(options: BaseTransactionOptions<NewProjectParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0xc97bbd3f',
      [
        {
          internalType: 'string',
          name: '_name',
          type: 'string',
        },
        {
          internalType: 'address',
          name: '_governance',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_management',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: '_roleManager',
          type: 'address',
        },
      ],
    ],
    params: [options.name, options.governance, options.management],
  });
}

/**
 * Represents the parameters for the "newRoleManager" function.
 */
export type NewRoleManagerParams = {
  projectName: AbiParameterToPrimitiveType<{ internalType: 'string'; name: '_projectName'; type: 'string' }>;
  governance: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_governance'; type: 'address' }>;
  management: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_management'; type: 'address' }>;
  keeper: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_keeper'; type: 'address' }>;
  registry: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_registry'; type: 'address' }>;
  accountant: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_accountant'; type: 'address' }>;
  debtAllocator: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_debtAllocator'; type: 'address' }>;
};

/**
 * Calls the "newRoleManager" function on the contract.
 * @param options - The options for the "newRoleManager" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { newRoleManager } from "TODO";
 *
 * const transaction = newRoleManager({
 *  projectName: ...,
 *  governance: ...,
 *  management: ...,
 *  keeper: ...,
 *  registry: ...,
 *  accountant: ...,
 *  debtAllocator: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function newRoleManager(options: BaseTransactionOptions<NewRoleManagerParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x47cbf63e',
      [
        {
          internalType: 'string',
          name: '_projectName',
          type: 'string',
        },
        {
          internalType: 'address',
          name: '_governance',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_management',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_keeper',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_registry',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_accountant',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_debtAllocator',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: '_roleManager',
          type: 'address',
        },
      ],
    ],
    params: [
      options.projectName,
      options.governance,
      options.management,
      options.keeper,
      options.registry,
      options.accountant,
      options.debtAllocator,
    ],
  });
}
