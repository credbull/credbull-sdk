import {
  EnzymeConfig,
  testEnzymePolygonConfig,
  CredbullClient,
  ManualValueOracle,
} from "@credbull-sdk/credbull";
import { thirdwebClient } from "@/components/client";

export const enzymeCredbullClient = new CredbullClient<EnzymeConfig>(
  testEnzymePolygonConfig,
  thirdwebClient,
);

export const manualValueOracleProxy =
  enzymeCredbullClient.chainConfig.flexibleLoans[0].manualValueOracleProxy;

export const manualValueOracle = new ManualValueOracle(
  enzymeCredbullClient,
  manualValueOracleProxy,
);
