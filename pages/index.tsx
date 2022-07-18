import { useRouter } from "next/router";
import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useLoadingContext } from "../src/context/Loading";
import { useSignerContext } from "../src/context/Signer";
import Web3modal from "./dashboard/Web3modal";
import { connectToWallet } from "../src/controllers/ConnectWallet";
import { useToast, Tag, Link, Avatar ,Button , Box, Heading, Text,Grid, Flex ,Divider , Icon, useDisclosure} from '@chakra-ui/react'
import svgAvatarGenerator from "../src/context/avatar";
import {BsArrowRight} from "react-icons/bs";
import { ethers, Signer } from "ethers";



interface Props {}

const index = (props: Props) => {
  const toast = useToast()
  const router = useRouter();
  const { setLoading } = useLoadingContext();
  const { setSigner, signer } = useSignerContext();
  const [add, setAdd] = useState(undefined);
  const [avatar, setAvatar] = useState(undefined);
  
  const { isOpen, onOpen, onClose } = useDisclosure();


  const handleLogin = async () => {
    await metamaskLogin()
    console.log(signer)
  };
  async function metamaskLogin() {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

    signer && toast({
        title: 'Wallet Connected Successfully!',
        status: 'success',
        duration: 5000,
        isClosable: false,
        position: "top",
      });
    
    setSigner({address: account, signer: signer})
  }

  useEffect(() => {
    router.prefetch(`/dashboard`);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    let svg = svgAvatarGenerator(add, { dataUri: true });
    setAvatar(svg);
// handleLogout()
  }, []);

  async function connectToWallett(){
    const providerEventsCB = async (_signer, _address, _network) => {
      if (_signer && _address && _network) {
        setSigner({ address: _address, signer: _signer, network: _network });
      } else {
        setSigner(undefined);
      }
    };

    connectToWallet(providerEventsCB).then(async (_signer) => {
      if (_signer) {
        console.log(_signer)
        const _address = await _signer.getAddress();
        const _network = window.ethereum.networkVersion
        console.log(_network)
        const a = `${_address.substr(0, 6)}...${_address}.substr(-4)`;
        // setAdd
        setAdd(`${_address.substr(0, 6)}...${_address.substr(-4)}`);
        _address &&
          toast({
            title: 'Wallet Connected Successfully!',
            status: 'success',
            duration: 5000,
            isClosable: false,
            position: "top",
          });
        setSigner({ address: _address, signer: _signer, network: _network });
      }
    });
  }

  function nextToShelf() {
    if (signer) {
      setLoading(true);
      router.push({
        pathname: "/dashboard",
      })
    } else {
      toast({
        title: "Wallet Not Connected !",
        description: "Please connect your wallet first.",
        status: "error",
        duration: 5000,
        isClosable: false,
        position: "top",
      })
    }
  }
  return (
    <>
      <Box m="0" p="0.5em" position="relative" top="0" w="100%" h="100%" bg="#fff">
          <Box h="75vh" className="m-bg">
            <Flex justifyContent="space-between" mx="2em" py="0.5em" alignItems="center">
              <Box>
                <Heading fontFamily="Domine">BookVerse</Heading>
                <Text fontFamily="Domine">The NFTs Book Library</Text>
              </Box>

              <Box>
                <Button 
                  boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" 
                  rounded="30px" 
                  p="1.2em" 
                  bg="#a101ff" 
                  mx ="4"
                  color="white" 
                  _hover={{
                    bg: "#a101ff", 
                    top: "-2px", 
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                  }}
                  rightIcon={<BsArrowRight/>}
                  onClick={nextToShelf}
                  fontFamily="Montserrat"
                >
                  Explore Now
                </Button>
                {
                  add ? (
                    <Tag 
                      boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" 
                      py="0.5em" bg="rgb(1, 119, 255,0.3)"
                      rounded="30px"
                      fontFamily="Montserrat"
                    >
                      <Avatar mr="5px" size="xs" src={avatar} />
                      {/* {add.substr(0, 6)}...{add.substr(-4)} */}
                      {/* {signer?.subdomain} */}{add}
                    </Tag>
                  ) : (
                    
                    <Button 
                      boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" 
                      rounded="20px" 
                      p="1.2em" 
                      bg="#a101ff" 
                      color="white" 
                      _hover={{
                        bg: "#a101ff", 
                        top: "-2px", 
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                      }} 
                      fontFamily="Montserrat"
                      // onClick={connectToWallett}
                      onClick={onOpen}
                      // onClick={loadWeb3Modal}
                  
                    >
                      Connect Wallet
                    </Button>
                  )
                }
                <Web3modal handleLogin={handleLogin}
                 connectToWallett={connectToWallett} 
                 isOpen={isOpen} onClose={onClose} />
              </Box>
            </Flex>
            <Divider/>
            <Flex mx="1.5%" py="0.1em" justifyContent="space-between" alignItems="center">
              <Box>
                <Heading className="h-shadow" fontSize="4em" fontFamily="Domine">The Fisrt</Heading>
                <Heading className="h-shadow" pt="0.1em" fontSize="4em" fontFamily="Domine">NFT Book</Heading>
                <Heading className="h-shadow" pt="0.1em" fontSize="4em" fontFamily="Domine">Marketplace</Heading>
              </Box>
              <Image src={"/studying.gif"} height={580} width={550} />
            </Flex>
          </Box>

          <Box align="center">
            <Flex 
              mt="10em" 
              mx="7.5%" 
              p="1em"
              py="1em"
              rounded="10px"
              justifyContent="space-around"
              flexDir="column"
            >
              <Heading className="h-shadow" fontSize="3em" fontFamily="Montserrat">Discover, Collect and Sell An Extraodinary Books NFTs</Heading>
              <Box mt="2em">
                <Text fontFamily="Montserrat">Start Your Own Collection Now!</Text>
                <Button 
                  mt="30px"
                  boxShadow="rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" 
                  rounded="30px" 
                  p="1.5em" 
                  bg="#a101ff" 
                  color="white" 
                  _hover={{
                    bg: "#a101ff", 
                    right: "-2px", 
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                  }}
                  rightIcon={<BsArrowRight/>}
                  onClick={nextToShelf}
                  fontFamily="Montserrat"
                >
                  Explore Now
                </Button>
              </Box>
            </Flex>
          </Box>

          <Box my="5em" align="center">
            <Heading fontSize="3em" fontFamily="Montserrat">Our Features</Heading> 
            <Grid mt="3em" mx="7.5%" templateColumns='repeat(3, 1fr)' gap={6} alignItems="center" justifyContent="center" fontSize="1.5em" fontFamily="Montserrat">
              <Flex w="400px" alignItems="center" py="2em" px="1em" rounded="10px" bg="rgb(224, 224, 224)" justifyContent="center">
                <Box flex="2" align="left">
                  <Heading
                    fontSize="1.1em"
                    fontFamily="Montserrat"
                    fontWeight="500"
                  >
                    Rent
                  </Heading>
                  <Text mt="15px" fontSize="0.7em">Rent Your Favorite NFT Collection</Text>
                </Box>
                <Image src={"/rent.gif"} height={130} width={130} />
              </Flex>
              <Flex w="400px" alignItems="center" py="2em" px="1em" rounded="10px" bg="rgb(224, 224, 224)" justifyContent="center">
                <Box flex="2" align="left">
                  <Heading
                    fontSize="1.1em"
                    fontFamily="Montserrat"
                    fontWeight="500"
                  >
                    Exchange
                  </Heading>
                  <Text mt="15px" fontSize="0.7em">Exchange Your NFT Collection With Community</Text>
                </Box>
                <Image src={"/exchange.gif"} height={130} width={130} />
              </Flex>
              <Flex 
                w="400px" 
                alignItems="center" 
                py="2em" 
                px="1em" 
                rounded="10px" 
                bg="rgb(224, 224, 224)" 
                justifyContent="center"
              >
                <Box flex="2" align="left">
                  <Heading
                    fontSize="1.1em"
                    fontFamily="Montserrat"
                    fontWeight="500"
                  >
                    Sell
                  </Heading>
                  <Text mt="15px" fontSize="0.7em">Sell Your NFT Collection Easily</Text>
                </Box>
                <Image src={"/sale.gif"} height={130} width={130} />
              </Flex>
            </Grid>
          </Box>
        

          <Flex 
            fontFamily="Montserrat" 
            bg="rgb(190,190,190)" 
            mt="5em"
            px="27em"
            py="1.5em" 
            alignItems="center"
            borderBottomRadius="10px"
            justifyContent="space-around"
          >

          <Text className="font-medium text-white ">
            Contact me <span className="font-bold text-purple-500 ">Elvissmart2020@gmail.com</span> 
          </Text>
            <Link
              href="https://twitter.com/Elvolution_20"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="inline w-6 h-6 text-gray-100 fill-current hover:text-purple-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Twitter</title>
                <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"></path>
              </svg>
            </Link>

            <Link
              href="https://github.com/Elvolution20"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
              className="inline w-6 h-6 text-gray-100 fill-current hover:text-purple-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>GitHub</title>
                <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path>
              </svg>
            </Link>
       </Flex>
      </Box>
    </>
  );
};

export default index;
