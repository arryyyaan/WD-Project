import { Box, Center } from "@chakra-ui/react";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";

const urls = [
  "https://youtube.com/watch?v=JZXQ455OT3A&si=EnSIkaIECMiOmarE",
  "https://youtube.com/watch?v=RVFAyFWO4go&si=EnSIkaIECMiOmarE",
];

export default function GetHelp() {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <Center>
        {urls.map((url) => (
          <>
            <Box width='640px' h='390px' display='block'>
              <YouTube videoId={getYouTubeID(url)} opts={opts} />
            </Box>
          </>
        ))}
      </Center>
    </>
  );
}
