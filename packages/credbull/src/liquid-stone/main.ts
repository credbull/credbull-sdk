import dotenv from "dotenv";
import {createThirdwebClient, getContract} from "thirdweb";
import {arbitrumSepolia} from "thirdweb/chains";
import path from "path";

import {totalSupply} from "thirdweb/extensions/erc1155";
import {toBigInt} from "ethers";

// see: https://portal.thirdweb.com/typescript/v5/getting-started
dotenv.config({
    encoding: 'utf-8',
    path: [
        path.resolve(__dirname, '../../.env'), // sdk
    ],
    override: true,
});

const main = async () => {
    const client = createThirdwebClient({
        secretKey: process.env.THIRDWEB_SECRET_KEY as string,
    });

    console.log("Initialized ThirdWeb Client: ", client.clientId);

    const liquidStoneContract = getContract({
        client,
        address: process.env.CREDBULL_LIQUIDSTONE_ADDRESS as string,
        chain: arbitrumSepolia,
    });

    const liquidStoneTokenId = toBigInt(38);
    const liquidStoneSupply = await totalSupply({
        contract: liquidStoneContract,
        id: liquidStoneTokenId,
    });

    console.log(`LiquidStone [${liquidStoneTokenId}] Supply: `, liquidStoneSupply);
};

main().catch((err) => {
    console.error("Error in script:", err);
    process.exit(1);
});