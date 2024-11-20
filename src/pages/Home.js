import React, { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid2";
import moment from "moment";
import Counter from "./Counter";
import {
  ButtonGroup,
  Button,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";

function Home() {
  const [startDate, setStartDate] = useState(moment());
  const [counterUrl, setCounterUrl] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  useEffect(() => {
    setCounterUrl(
      `${window.location.href}counter?startDate=${startDate.format(
        "YYYYMMDD"
      )}`
    );
  }, [startDate]);

  const handleDate = (v) => {
    setStartDate(v);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(counterUrl);
      setCopyMsg("Copied!");
    } catch (error) {
      setCopyMsg("Failed");
    }
    setTimeout(handleCopyTooltipClose, 5000);
  };

  const handleCopyTooltipClose = () => {
    setCopyMsg("");
  };

  return (
    <>
      <Typography variant="h5">Notion Widget</Typography>
      <Grid container spacing={1}>
        <Grid>
          <Counter />
        </Grid>
        <Grid container>
          <Grid size={12}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={startDate}
                onChange={handleDate}
                format="YYYY/MM/DD"
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={12}>
            <ButtonGroup>
              <Tooltip
                disableFocusListener
                disableTouchListener
                disableHoverListener
                title={copyMsg}
                open={Boolean(copyMsg)}
              >
                <Button onClick={handleCopy}>Copy link</Button>
              </Tooltip>

              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "0 4px 4px 0",
                  },
                }}
                InputProps={{
                  readOnly: true,
                }}
                value={counterUrl}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
