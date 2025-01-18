import {
  EnzymeConfig,
  testEnzymePolygonConfig,
  CredbullClient,
} from "@credbull-sdk/credbull";
import { thirdwebClient } from "@/components/client";

export const enzymeCredbullClient = new CredbullClient<EnzymeConfig>(
  testEnzymePolygonConfig,
  thirdwebClient,
);
