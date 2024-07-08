import { Box, Grid, GridItem } from "@chakra-ui/react";
import {useEffect } from "react";
import AllFeatureHeathTable from '../../charts/AllFeatureHealthTable';
import AllFetureHealthCXInsights from '../../charts/AllFeatureCXInsights';

function Home() {
  useEffect(()=>{
    document.title='Customer Experience | Insight Track';
  },[]);
  return (
    <Box >
      <Grid gridGap={["0.8rem"]} rowGap={["0.8rem"]} p={["0.8rem"]}>
        <GridItem><AllFetureHealthCXInsights/></GridItem>
        <GridItem><AllFeatureHeathTable/></GridItem>
      </Grid>
    </Box>
  );
}

export default Home;
