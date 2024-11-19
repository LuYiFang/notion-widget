import _ from "lodash";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton, Popover, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Grid from "@mui/material/Grid2";

const width = 340;
const height = 190;
const numberCardStyle = {
  fontSize: 105,
  borderColor: "gray",
  borderStyle: "solid",
  borderWidth: 1,
  textAlign: "center",
  backgroundColor: "#D5F9E3",
  lineHeight: 1,
};

const Counter = () => {
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState(moment());
  const [anchorEl, setAnchorEl] = useState(null);

  const { hundreds, tens, units } = useMemo(() => {
    return {
      hundreds: _.floor(days / 100),
      tens: _.floor(days / 10) % 10,
      units: days % 10,
    };
  }, [days]);

  const calculateDaysPasses = () => {
    const today = moment();
    return today.diff(startDate, "days");
  };

  useEffect(() => {
    const now = moment();
    const nextMidnight = now.clone().endOf("day").add(1, "second");

    const timer = setTimeout(
      setDays(calculateDaysPasses),
      nextMidnight.diff(now)
    );

    return () => clearTimeout(timer);
  }, [days, startDate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDate = (v) => {
    setStartDate(v);
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: width,
          height: height,
          position: "relative",
          backgroundColor: "#191919",
          fontFamily: '"Funnel Sans", sans-serif',
        }}
        rowSpacing={1}
        px={1}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 1,
            right: 8,
            height: 40,
            width: 40,
            color: "transparent",
            "&:hover": {
              color: "gray",
            },
          }}
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
        <Grid container size={12} columnSpacing={1}>
          <Grid sx={numberCardStyle} size={4}>
            {hundreds}
          </Grid>
          <Grid sx={numberCardStyle} size={4}>
            {tens}
          </Grid>
          <Grid sx={numberCardStyle} size={4}>
            {units}
          </Grid>
        </Grid>
        <Grid
          sx={{
            ...numberCardStyle,
            flex: 1,
            fontSize: 50,
          }}
          size={12}
        >
          Days
        </Grid>
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={startDate}
            onChange={handleDate}
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};
export default Counter;
