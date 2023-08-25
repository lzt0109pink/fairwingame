import { useState } from 'react'

/**
 * 
 * AppStorage
 * - 动态数据 存储
 *   App 内容存储
 *   只能通过 App 自己修改
 * 
 */

const AppStorage = () => {

    const [BrowserLang, setBrowserLang] = useState("en")
    const [Lang, setLang] = useState({
        zh: {
            contact: "联系我们",
            menulist: ["项目介绍", "质押记录", "质押页面", "路线图"],
            welcome: {
                title: "只要路是对的",
                sub: "就不怕路远",
                info: "牛熊周期的转换是普通人盈利的根本来源。现在我们提供一个机会，不仅让你的币的数量增加，还能让你坚定的持币到牛市。",
                clickwallet: "点击此处连接钱包",
                clickup: "点击取出所有存款",
                clickdone: "点击完成质押",
                joinamount: "总参与金额",
                joinaccount: "总参与账户",
                invitecode : "邀请码",
                grade: {
                    dividend: "分红等级",
                    node: "节点等级",
                    freeze: "冻结金额",
                    reward: "分红奖励",
                    rewardnode: "节点奖励",
                    pick:"提现金额",
                    invite: "邀请奖励",
                    send: "发送奖励"
                },
                text: {
                    invitedcode: "被邀请码（必填）",
                    ETHWNumber: "投入的ethw数量（整数）"
                }
            },
            server: {
                title: "诚实守信与公开透明",
                sub: "希望每个人清楚投资的风险",
                info: "免责声明：网站和代码只做教学用途，若用于违法犯罪和欺诈概不负责。",
                card: {
                    title1: "透明安全",
                    sub1: "项目部署在区块链上，透明公开；智能合约已经通过审计，安全可靠。任何人都可以通过区块链浏览器查询用户与本合约的交互信息。",
                    title2: "投资风险",
                    sub2: "我们不能欺骗您说本项目无任何风险，但是因为较低的年化收益率使得风险大幅下降，只有资金池完全被取空时，用户才会遭受损失。",
                    title3: "补偿机制",
                    sub3: "用户在质押时会被收取存入资金的百分之2作为交易费，我们会将交易费的少部分用于团队开支，其余交易费将在牛市套现并按比例补偿所有遭受损失的用户。",
                }
            }
        },
        en: {
            contact: "Contact us",
            menulist: ["Introduce", "Pledge record", "Pledge page", "Road map"],
            welcome: {
                title: "As long as the road is right",
                sub: "You are not afraid of the distance",
                info: "The bull - bear cycle is the fundamental source of profit for ordinary people. Now we offer you a chance to not only increase the number of your coins, but also keep your money firmly in the bull market.",
                clickwallet: "Linked wallet",
                clickup: "Withdraw all deposits",
                clickdone: " deposits",
                joinamount: "Total participation amount",
                joinaccount: "Total participating account",
                invitecode : "invitecode",
                grade: {
                    dividend: "Dividend class",
                    node: "Node class",
                    freeze: "Frozen amount",
                    reward: "Bonus reward",
                    rewardnode: "Nodal reward",
                    pick:"Amount withdrawn",
                    invite: "Invitation reward",
                    send: "Send reward"
                },
                text: {
                    invitedcode: "Invited Code (required)",
                    ETHWNumber: "Number of ETHWs invested (integer)"
                }
            },
            server: {
                title: "Honesty and transparency",
                sub: "I want everyone to understand the risks of investing",
                info: "Disclaimer: The website and code are for educational purposes only, and are not responsible for crimes or fraud.",
                card: {
                    title1: "Transparent security",
                    sub1: "The project is deployed on the blockchain, transparent and open; Smart contracts have been audited and are secure. Anyone can query information about the user's interaction with this contract through the blockchain browser.",
                    title2: "Investment risk",
                    sub2: "We cannot deceive you and say that there is no risk in this project, but because the low annualized rate of return makes the risk significantly lower, the user will only suffer if the capital pool is completely emptied.",
                    title3: "Compensation mechanism",
                    sub3: "Users will be charged 2% of the deposited funds as transaction fee when they pledge. We will use a small part of the transaction fee for the lease of the server. The rest of the transaction fee will be cashed out in the bull market and compensate all users who suffer losses in proportion.",
                }
            }
        }
    })

    return {
        BrowserLang,
        setBrowserLang,
        Lang
    }

}

export default AppStorage