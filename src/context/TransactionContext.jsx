import React, { useEffect, useState } from "react";
import { ethers, logger } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
console.log(contractABI);
export const TransactionContext = React.createContext();

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
console.log(signer._address)


const createEthereumContract = () => {
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
};
/**
 * 通过ethers调用合约
 * 1.web情况连接metamask
 * 2.连接合约 传入的地址和abi要一致否则报错，注意，合约参数一改就需要 改abi否则会报错
 * 3.调用合约 通连接的合约调用
 * 4.传eth 在{value:1}中传  不能在参数中传
 * 5.ethereum是metamask中的，所以不需要验证他 因为可能还有其他钱包
 * 6.有空看下 wagmi 和 andtui 库
  公共使用的东西可以拆分出去
 */

export const TransactionsProvider = ({ children }) => {
    const [formData, setformData] = useState({ beinvitedcode: " ", amount: ""});
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    // contract 0xAA3441aB93aFDB3857635C6D00CF812Ecb3A3d91
    // address 0xc3ac0a63aB451E89b1047831327f27719C9c7cc1
    const sendTransaction = async () => {
        try {
            //   if (!ethereum) {
            const { beinvitedcode, amount } = formData;
            const transactionsContract = await createEthereumContract();
            const accounts = await ethereum.request({ method: "eth_accounts" });
            console.log(amount);
            console.log(transactionsContract.address);
            console.log(await transactionsContract.getUserByinviteCode(accounts[0]))

            const transactionHash = await transactionsContract.invest(
                accounts[0],
                amount,
                accounts[0],
                beinvitedcode,
                {
                    gasLimit: 5000000,
                    value: ethers.utils.parseEther(amount)
                }
            );
            await transactionHash.wait();
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
            console.log(await transactionsContract.getUserByinviteCode(amount))
            // window.location.reload();
         
            //   } else {
            //     console.log("No ethereum object");
            //   }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
  
    const sendAwardToUser = async () => {
        try {
            const transactionsContract = createEthereumContract();
            const countnumber = await transactionsContract.test();
            const countnumbers = countnumber[1];
            console.log(countnumbers);
            const sendTouser = await transactionsContract.sendAward(
                0,
                countnumbers,
                1,
                {
                    gasLimit: 5000000
                }
            );
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    const sendDayAward = async () => {
        try {
            const transactionsContract = createEthereumContract();
            const countnumber = await transactionsContract.test();
            const countnumbers = countnumber[0];
            console.log(countnumbers);
            const fhcount = await transactionsContract.countShareAndRecommendedAward(
                0,
                countnumbers,
                1,
                {
                    gasLimit: 5000000
                }
            );
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

      const sendInviteAward = async () => {
        try {
            const transactionsContract = createEthereumContract();
            const countnumber = await transactionsContract.test();
            const countnumbers = countnumber[1];
            console.log(countnumbers);
            const yqcount = await transactionsContract.countRecommend(
                0,
                countnumbers,
                1,
                {
                    gasLimit: 5000000
                }
            );
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
  


    useEffect(() => {
        checkIfWalletIsConnect();
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                sendTransaction,
                handleChange,
                isLoading,
                formData,
                checkIfWalletIsConnect,
                createEthereumContract,
                sendDayAward,
                sendAwardToUser,
                sendInviteAward,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
