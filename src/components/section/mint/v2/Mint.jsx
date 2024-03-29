import { useState } from "react";
import CountdownTimer from "react-component-countdown-timer";
import { useModal } from "../../../../utils/ModalContext";

import Button from "../../../../common/button";
import Particle from "./Particles";
import MintStyleWrapper from "./Mint.style";

import checkIcon from "../../../../assets/images/icon/mint-right-text-icon.svg";

import twitterIcon from "../../../../assets/images/icon/Twitter.svg";
import { useEffect } from "react";

import LoadImage from "../../../../assets/images/nft/Character1.png";
const Mint = () => {
  const { mintModalHandle, NextMint } = useModal();
  const [imageURL, SetURL] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [minted, setMinted] = useState();
  const {
    Count,
    setCount,
    account,
    setNFT,
    setNFTID,
    NFT,
    NFTID,
    contractAddress,
    setContractAddress,
    WEB3,
    setWEB3,
    Contract,
    setContract,
    checkBasics,
    Basic,
    CreateContractInstance,
  } = useModal();

  const ok = false;
  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 500,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const counterSettings = {
    count: 5432560,
    showTitle: true,
    size: 40,
    labelSize: 24,
    backgroundColor: "transparent",
    color: "#fff",
    dayTitle: "D",
    hourTitle: "H",
    minuteTitle: "M",
    secondTitle: "S",
    id: "countdownwrap",
  };

  const getImage = async (value) => {
    console.log("This value here", value);
    try {
      let data = await fetch(
        `https://gateway.pinata.cloud/ipfs/QmewasZSkCSe7t66sCzAmGvpxoHp1UGDymrTmGVbELrz5G/${value}.json`
      );
      data = await data.json();
      setNFT(data);
      SetURL(data.image);
      // console.log(Works fine in getting mage)
    } catch {
      console.log("Error in getImage function in Mint.jsx");
    }
    // console.log(data)
  };
  const getNextMint = async () => {
    if (Contract) {
      const TokenURI = await Contract.methods.totalTokenURI().call();
      setRemaining(TokenURI);
      const Supply = await Contract.methods.totalSupply().call();
      setMinted(Supply);
      console.log("checking supply", Supply);
      console.log("checking TOKENS", TokenURI);
      console.log("checking answer", Number(TokenURI) > Number(Supply));
      if (Number(TokenURI) > Number(Supply)) {
        console.log("YAHAN TAK SAHI HAI");
        setCount(Number(Supply) + 1);
        getImage(Number(Supply) + 1);
      }
    }
  };
  const something = async () => {
    if (!Basic) await CreateContractInstance();
    console.log(Contract);
  };

  useEffect(() => {
    something();
  }, []);
  useEffect(() => {
    getNextMint();
  }, [Contract, NextMint]);
  console.log("no issue");
  return (
    <MintStyleWrapper>
      <Particle />
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="mint_left_content">
              <div className="mint_left_inner">
                <div className="mint_slider">
                  <div className="mint_thumb">
                    {console.log("image URL here", imageURL)}
                    {imageURL ? (
                      <img src={imageURL} alt="thumb" />
                    ) : (
                      <img src={LoadImage} style={{ marginLeft: "20%" }}></img>
                    )}
                  </div>
                </div>
                <ul className="mint_count_list">
                  <li>
                    <h5>Remaining</h5>
                    {remaining ? (
                      <>
                        <h5>
                          {minted}/<span>{remaining}</span>
                        </h5>
                      </>
                    ) : (
                      <></>
                    )}
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5>0.0004 MATIC</h5>
                  </li>
                </ul>
                {}
                {Contract ? (
                  <>
                    {imageURL ? (
                      <Button
                        lg
                        variant="mint"
                        onClick={() => mintModalHandle()}
                      >
                        {" "}
                        Mint now
                      </Button>
                    ) : (
                      <Button lg variant="mint">
                        {" "}
                        Nothing to mint
                      </Button>
                    )}
                  </>
                ) : (
                  <Button lg variant="mint">
                    {" "}
                    Wait
                  </Button>
                )}

                <p>
                  By clicking “MINT”, You agree to our{" "}
                  <a href="# ">Terms of Service</a> and our{" "}
                  <a href="# ">Privacy Policy.</a>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mint_right_content">
              <div className="content_header">
                <h4>
                  WHITELIST : SOLDOUT
                  <span>
                    <img src={checkIcon} alt="icon" />
                  </span>
                </h4>
                <h4>
                  Presale : SOLDOUT
                  <span>
                    <img src={checkIcon} alt="icon" />
                  </span>
                </h4>

                <h1>PUBLIC MINT LIVE</h1>
              </div>

              <div className="mint_timer">
                <h5>Public Mint End in</h5>
                <CountdownTimer {...counterSettings} />
              </div>
              <div className="content_footer">
                <h5>Max 1 NFT per wallet</h5>
                <h5>Price 0.0004 MATIC</h5>
                <h5>Mint is live until INFINITY</h5>
              </div>
              <div className="mint_btns">
                <a href="https://faucet.polygon.technology/" target="_blank">
                  <Button
                    lg
                    variant="outline"
                    style={{ backgroundColor: "#854CE6" }}
                  >
                    GET FREE MATIC
                  </Button>
                </a>
                <br></br>
                <a href="https://twitter.com/mujeeee7" target="_blank">
                  <Button
                    lg
                    variant="outline"
                    style={{ backgroundColor: "#1D9BF0" }}
                  >
                    <img src={twitterIcon} alt="icon" />
                    join twitter
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MintStyleWrapper>
  );
};

export default Mint;
