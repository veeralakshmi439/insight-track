import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

function Home() {
  useEffect(()=>{
    document.title='Analytics | Insight Track';
  },[]);
  return <Box>Analytics</Box>;
}

export default Home;
