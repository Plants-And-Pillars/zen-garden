import { useEffect } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import { Stage } from "@pixi/react";

import useSpriteStore from "@/store/useSpriteStore";
import DraggableSpritesContent from "./DraggableSpritesContent";

import forestContractABI from "@/contracts/abi/forestContractABI.json";

import { Button, Flex, useToast } from "@chakra-ui/react";

const DraggableSprites = () => {
  const toast = useToast();

  const { account } = useAccount();
  const { data: signerData } = useSigner();

  const forestContract = useContract({
    address: process.env.NEXT_PUBLIC_FOREST_CONTRACT_ADDRESS,
    abi: forestContractABI,
    signerOrProvider: signerData,
  });

  const { forestPixiApp, forestTokenId, setForestTokenId, setSprites } = useSpriteStore(
    (state) => ({
      forestPixiApp: state.forestPixiApp,
      forestTokenId: state.forestTokenId,
      setForestTokenId: state.setForestTokenId,
      setSprites: state.setSprites,
    })
  );

  const captureForestState = () => {
    const forestDataURL = forestPixiApp.view.toDataURL();
    console.log("forestDataURL", forestDataURL);

    // 1. upload the dataURL to IPFS
    // 2. construct the metadata object (IPFS hash, sprites position data)
    //    { sprites: [], ipfsHash: "" }
    // 3. update the tokenURI with the metadata object, use tokenID from the global state
  };

  useEffect(() => {
    if (!signerData || !forestContract) return;

    forestContract
      .getTokenId()
      .then((tx) => {
        const tokenId = tx.toNumber();
        toast({
          title: "Token Id fetched",
          description: "Token Id fetched sucessfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setForestTokenId(tokenId);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.reason === "ERC721: caller does not have a token") {
          toast({
            title: "Token not found",
            description:
              "Looks like you dont have a token yet, minting one for you now!",
            status: "info",
            duration: 5000,
            isClosable: true,
          });

          const initURI = { sprites: [], ipfsHash: "" }; // TBD
          forestContract
            .safeMint(JSON.stringify(initURI))
            .then((tx) => {
              tx.wait().then(() => {
                console.log("token minted");
                toast({
                  title: "Token minted",
                  description: "Token minted sucessfully!",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                console.log("safeMint", tx);
              });
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      });
  }, [signerData, forestContract]);

  useEffect(() => {
    if (!forestTokenId) return;

    forestContract
      .getTokenURI(forestTokenId)
      .then((tx) => {
        const tokenURI = JSON.parse(tx);
        console.log("tokenURI", tokenURI);
        toast({
          title: "Token URI fetched",
          description: "Token URI fetched sucessfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSprites(tokenURI.sprites); // TBD
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [forestTokenId]);

  return (
    <Flex direction="column">
      <Stage options={{ backgroundColor: "#e0d9c9" }}>
        <DraggableSpritesContent />
      </Stage>
      <Button isDisabled={!forestPixiApp} onClick={captureForestState}>
        Capture
      </Button>
    </Flex>
  );
};

export default DraggableSprites;
