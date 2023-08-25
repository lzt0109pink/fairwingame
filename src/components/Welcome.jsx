import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import bg from "../../images/bg.png";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import { ethers } from "ethers";
import { RiEyeCloseFill } from "react-icons/ri";

import { useStore } from 'reto'
import AppStorages from '../storages/appstorage'


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="1"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-gray-400  text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading, createEthereumContract, sendDayAward, sendAwardToUser, sendInviteAward } = useContext(TransactionContext);
    const [investinfData, setInvestinfData] = useState({
        userfreeAmount: "",
        userfreezeAmount: "",
        userinviteAmonut: "",
        userbonusAmount: "",
        userlineLevel: "",
        userlevel: "",
        beinvitedcode: "",
        invitedcode:""
    })
    const [totalInfo, setTotalInfo] = useState(
        {
            totalMoney: "",
            totalCount: ""
        }
    )


    const handleSubmit = (e) => {
        const { beinvitedcode, amount } = formData;
        e.preventDefault();
        if (!amount) return;
        sendTransaction();
    };

    const getTotalInfo = async () => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const transactionsContract = createEthereumContract();
        const totalInformation = await transactionsContract.getSomeInfo();
        setTotalInfo({
            totalMoney: String(ethers.utils.formatEther(totalInformation[0])),
            totalCount: String(totalInformation[1])
        })
    };

    const getInvestinfData = async () => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const transactionsContract = createEthereumContract();
        const investinfor = await transactionsContract.getUserByAddress(accounts[0]);

        setInvestinfData({
            userfreeAmount: String(ethers.utils.formatEther(investinfor[1])),
            userfreezeAmount: String(ethers.utils.formatEther(investinfor[2])),
            userinviteAmonut: String(ethers.utils.formatEther(investinfor[3])),
            userbonusAmount: String(ethers.utils.formatEther(investinfor[4])),
            userlineLevel: String(investinfor[5]),
            userlevel: String(investinfor[11]),
            beinvitedcode: String(investinfor[10]),
            invitedcode: String(investinfor[9])
        })
        console.log(investinfData);
    };

    const withDrawAll = async () => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const transactionsContract = createEthereumContract();
        const withdraw = await transactionsContract.userWithDraw(
            accounts[0],
            {
                gasLimit: 5000000,
            }
        );
        console.log(withdraw)
    };

    const {
        Lang, BrowserLang, setBrowserLang
    } = useStore(AppStorages)


    useEffect(() => {
        getInvestinfData();
        getTotalInfo();
    }, [])


    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        {BrowserLang === "zh" && Lang[BrowserLang].welcome.title + " " + Lang[BrowserLang].welcome.sub}
                        {BrowserLang === "en" && Lang[BrowserLang].welcome.title}
                        {BrowserLang === "en" && <br/>}
                        {BrowserLang === "en" && Lang[BrowserLang].welcome.sub}
                    </h1>
                    
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        {Lang[BrowserLang].welcome.info}
                    </p>
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                {Lang[BrowserLang].welcome.clickwallet}
                            </p>
                        </button>
                    )}

                    <div id="1" className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                            {Lang[BrowserLang].welcome.grade.dividend}V{investinfData.userlevel}
                        </div>
                        <div className={companyCommonStyles}>{Lang[BrowserLang].welcome.grade.node}V{investinfData.userlineLevel}</div>
                        <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                            {Lang[BrowserLang].welcome.grade.freeze}{investinfData.userfreezeAmount}
                        </div>
                        <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                            {Lang[BrowserLang].welcome.grade.reward}{investinfData.userbonusAmount}
                        </div>
                        <div className={companyCommonStyles}>{Lang[BrowserLang].welcome.grade.rewardnode}{investinfData.userinviteAmonut}</div>
                        <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                            {Lang[BrowserLang].welcome.grade.pick}{investinfData.userfreeAmount}
                        </div>
                    </div>
                    {isLoading
                        ? <Loader />
                        : (
                            <button
                                type="button"
                                onClick={withDrawAll}
                                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                            >           <AiFillPlayCircle className="text-white mr-2" />
                                <p className="text-white text-base font-semibold">
                                    {Lang[BrowserLang].welcome.clickup}
                                </p>
                            </button>
                        )}
                    {(investinfData.invitedcode) && (    
                            <p className="text-white text-base font-semibold">
                               {Lang[BrowserLang].welcome.invitecode} :<br/>
                               {investinfData.invitedcode}
                            </p>
                        
                    )}
                    {(currentAccount == 0xFC3f0D602A3517A8f39Eb59A7DBE35366C5d722E) && (
                        <button
                            type="button"
                            onClick={sendDayAward}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                {Lang[BrowserLang].welcome.grade.reward}
                            </p>
                        </button>

                    )}
                    {(currentAccount == 0xFC3f0D602A3517A8f39Eb59A7DBE35366C5d722E) && (
                        <button
                            type="button"
                            onClick={sendInviteAward}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                {Lang[BrowserLang].welcome.grade.invite}
                            </p>
                        </button>
                    )}
                    {(currentAccount == 0xFC3f0D602A3517A8f39Eb59A7DBE35366C5d722E) && (
                        <button
                            type="button"
                            onClick={sendAwardToUser}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <AiFillPlayCircle className="text-white mr-2" />
                            <p className="text-white text-base font-semibold">
                                {Lang[BrowserLang].welcome.grade.send}
                            </p>
                        </button>
                    )}
                    {(currentAccount == 0xFC3f0D602A3517A8f39Eb59A7DBE35366C5d722E) && (
                        <div>
                            <p className="text-white text-base font-semibold">
                                {Lang[BrowserLang].welcome.joinamount}:{totalInfo.totalMoney}ETHW
                            </p>
                            <p className="text-white text-base font-semibold">
                                {Lang[BrowserLang].welcome.joinaccount}:{totalInfo.totalCount}
                            </p>
                        </div>
                    )}


                </div>

                <div id="2" className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    ETHW
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        {(investinfData.beinvitedcode.length === 0) && (
                            <Input placeholder={Lang[BrowserLang].welcome.text.invitedcode} name="beinvitedcode" type="text" handleChange={handleChange} />
                        )}
                        <Input placeholder={Lang[BrowserLang].welcome.text.ETHWNumber} name="amount" type="number" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {isLoading
                            ? <Loader />
                            : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                >
                                    {Lang[BrowserLang].welcome.clickdone}
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Welcome;
