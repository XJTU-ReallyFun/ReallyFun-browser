import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

export default class SquareCard extends React.Component {
  render() {
    const { gamesObj } = this.props;
    return (
      <Grid item xs={2}>
        <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
          <CardActionArea onClick={() => console.log("handleInfor")}>
            <CardMedia
              component="img"
              height="100"
              width="150"
              image={gamesObj.thumb}
              alt={gamesObj.title}
            />
            <CardContent height="50" width="150">
              <div>{gamesObj.title}</div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}