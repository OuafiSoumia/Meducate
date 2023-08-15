import { Grid } from "@mui/material";

import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import AutocompleteComponent from "src/views/pages/dashboard/AutoComplete";
import SentimentTrendChart from "src/views/pages/dashboard/SentimentTrendChart";
import TopNamesBySentimentChart from "src/views/pages/dashboard/TopNamesBySentiment";
import TopNamesChart from "src/views/pages/dashboard/TopNamesChart";
import WordcloudCard from "src/views/pages/dashboard/WordcloudCard";





const Dashboard = () => {
   

    return(
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}  >
                    <AutocompleteComponent hidden={false}/>
        </Grid>
                <Grid item xs={12} md={6} >
                    <TopNamesChart />
                    </Grid>
                    <Grid item xs={12} md={6} >
                    <TopNamesBySentimentChart />
                    </Grid>
                    <Grid item xs={12}  >
                        <WordcloudCard />
                        </Grid>
                        <Grid item xs={12}  >
                            <SentimentTrendChart />
                            </Grid>
                            
            </Grid>
        </ApexChartWrapper>
    )

};


export default Dashboard;