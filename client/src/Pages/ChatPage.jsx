import { Box } from "@chakra-ui/react";
import { useState } from "react";
import ChatBox from "../Components/Chat/ChatBox";
import MyChats from "../Components/Chat/MyChats";
import SideDrawer from "../Components/Chat/SideDrawer";
import { ChatState } from "../Context/chatProvider";

export default function ChatPage() {
    const {user} = ChatState()
    const [fetchAgain,setFetchAgain] = useState(false)

  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
          display='flex'
          justifyContent="space-between"
          w="100%"
          h="91.5vh "
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain}/>}
          {user && <ChatBox setFetchAgain={setFetchAgain} fetchAgain={fetchAgain
           }/>}
        </Box>
      </div>
    </>
  );
}
