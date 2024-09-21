import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [counter, setCounter] = useState(undefined);
  const [incrementValue, setIncrementValue] = useState("");
  const [decrementValue, setDecrementValue] = useState("");
  const [showCounter, setShowCounter] = useState(false);

  const contractAddress = "0x7c96E131e6D4ca0ca31885f4C53745555BD04cDa";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  const getCounter = async () => {
    if (atm) {
      const count = await atm.getCounter();
      console.log(parseInt(count._hex));
      setCounter(parseInt(count._hex));
    }
  };

  const IncrementCounter = async (x) => {
    if (atm) {
      let tx = await atm.IncrementCounter(x);
      await tx.wait();
      getCounter();
    }
  };

  const DecrementCounter = async (x) => {
    if (atm) {
      let tx = await atm.DecrementCounter(x);
      await tx.wait();
      getCounter();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
        }}
      >
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            IncrementCounter(incrementValue);
            setIncrementValue(0);
            setShowCounter(false);
          }}
        >
          <input
            type="number"
            placeholder="Enter the value you want to increment in the counter"
            value={incrementValue}
            onChange={(e) => setIncrementValue(e.target.value)}
          />
          <button type="submit"> Increment counter</button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            DecrementCounter(decrementValue);
            setDecrementValue(0);
            setShowCounter(false);
          }}
        >
          <input
            type="number"
            placeholder="Enter the value you want to decrement in the counter"
            value={decrementValue}
            onChange={(e) => {
              setDecrementValue(e.target.value);
            }}
          />
          <button type="submit"> Decrement counter</button>
        </form>
        <button
          onClick={() => {
            setShowCounter(true);
            getCounter();
          }}
        >
          Show Counter
        </button>
        <p>{showCounter && counter}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",

        backgroundColor: "#81de9a",
        height: "100vh",
      }}
    >
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
          }
        `}
      </style>
    </main>
  );
}
