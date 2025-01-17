import Head from "next/head";
import Image from "next/image";
import { useState, useContext } from "react";
import Header from "../components/Header";
import useSWR from "swr";



export default function Home() {

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: ogData, error: ogError } = useSWR(
    "/Whitelist/og.json",
    fetcher
  );

  const { data: wl1Data, error: wl1Error } = useSWR(
    "/Whitelist/wl.json",
    fetcher
  );

  const { data: wl2Data, error: wl2Error } = useSWR(
    "/Whitelist/wl2.json",
    fetcher
  );

  var WLS = true;

  if (wl1Data && ogData && wl2Data) {
    WLS = false;
  }

  const [Message, setMSG] = useState(
    <p className="sm:text-xl text-lg text-black">W00t the F00k is going on?</p>
  );

  const HandleCheck = (addr) => {
    let ogWallets = ogData.map((acc) => {
      return acc.toLowerCase();
    });

    let wl1Wallets = wl1Data.map((acc) => {
      return acc.toLowerCase();
    });

    let wl2Wallets = wl2Data.map((acc) => {
      return acc.toLowerCase();
    });

    let useradd = addr.toLowerCase();

    if (ogWallets.includes(useradd)) {
      setMSG(<p className="sm:text-xl text-lg text-green-600">OG W00tlisted 🎉</p>);
    } else if (wl1Wallets.includes(useradd)) {
      setMSG(<p className="sm:text-xl text-lg text-green-600">WL1 W00tlisted 🎉</p>);
    } else if (wl2Wallets.includes(useradd)) {
      setMSG(<p className="sm:text-xl text-lg text-green-600">WL2 W00tlisted 🎉</p>);
    } else {
      setMSG(
        <p className="sm:text-xl text-lg text-red-500">Not W00tlisted 😭</p>
      );
    }

    if (!String(addr).startsWith("bc1p")) {
      setMSG(
        <p className="sm:text-xl text-lg text-blue-500">Not a valid address</p>
      );
    }

    if (String(addr).length == 0) {
      setMSG(
        <p className="sm:text-xl text-lg text-black">Paste Your Address</p>
      );
    }
  };


  return (
    <div className='flex flex-col min-h-screen justify-center items-center bg-[url("/assets/bg.png")] bg-center bg-cover'>
      <Head>
        <title>Whitelist Checker</title>
        <meta name="description" content="Whitelist Checker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="w-full flex flex-col justify-center items-center space-y-5">
        <div className="sm:w-[40%] w-[95%] flex flex-col space-y-5 justify-center items-center">
          <input
            className="w-full text-black p-3 focus:outline-2 focus:outline-slate-400 caret-slate-500 rounded-md"
            type={"text"}
            disabled={WLS}
            placeholder={"Paste Your Address to check"}
            onChange={(e) => {
              e.preventDefault();
              HandleCheck(e.target.value);
            }}
          />
          {Message}
        </div>
      </div>
    </div>
  );
}
