import { Box } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MICROSITE_CONNECT_ACCOUNT_SUCCESS, MICROSITE_CONNECT_MORE_ACCOUNTS, trackEvent } from "../../analytics";
import { Background, FullScreenLoader, NavBar, PlatformIconBox } from "../../Components";
import { ROUTE_LANDING_PAGE } from "../../Routes/RouteMapping";
import { getWorkplatformDetails } from "../../utils/api";
import { CONNECTED_STORAGE_WORK_PLATFORM_ID, STORAGE_AUTH_DATA, STORAGE_AUTH_TENANT_APP_NAME } from "../../utils/constants";
import "./IntroPage.scss"
import Typewriter from "typewriter-effect";
import Icons from "../../Components/Icons/icons";
import LandingPage from "../LandingPage/LandingPage";

function IntroPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [platform, setPlatform] = useState("");
  const [hideIntroPage, setHideIntroPage] = useState(false)

  if (isLoading) return <FullScreenLoader showLoader={isLoading} />;
  const handlePlatformClick = (selectedPlatform) => {
    setPlatform(selectedPlatform)
    setHideIntroPage(true)
  }
  return (
    <>
      {!hideIntroPage && <Box className="intro-page-body">
        <h1>The Ultimate AI Writer for Exceptional Content Creation</h1>
        <Box >
          <Typewriter
            options={{
              strings: [
                "Twitter Tweets.",
                "LinkdIn Posts.",
                "Facebook Posts.",
                "Instagram Posts."
                ,
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
            wrapperClassName="typed-words clipped"
          />
        </Box>

        <Box className="platform-main-container">
          
          <PlatformIconBox icon={<Icons.facebookIcon />}
          key={2}
            text={"Facebook"}
            onClickPlatform={()=>handlePlatformClick("facebook")}
          />
          <PlatformIconBox icon={<Icons.twitter_icon />}
          key={3}
            text={"Twitter"}
            onClickPlatform={()=>handlePlatformClick("twitter")}
          />
          <PlatformIconBox
          key={1}
            icon={<Icons.instagramIcon />}
            text={"Instagram"}
            onClickPlatform={()=>handlePlatformClick("instagram")}
          />
          <PlatformIconBox icon={<Icons.linkedin_logo />}
          key={4}
            text={"LinkdIn"}
            onClickPlatform={()=>handlePlatformClick("Linkedin")}
          />
          <PlatformIconBox icon={<Icons.youtubeIcon />}
          key={4}
            text={"YouTube"}
            onClickPlatform={()=>handlePlatformClick("YouTube")}
          />
        </Box>
      </Box>}
      {
        platform && hideIntroPage && <LandingPage platform={platform} />
      }
    </>
  );
}

export default IntroPage;
