import React, { Component } from "react";
import Cookies from "universal-cookie";
import {
  Container,
  Grid,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  CardActionArea,
} from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import Reating2show from "../components/Rating2show";

const cookies = new Cookies();

// 游玩历史界面，用于展示用户游玩过的游戏列表
export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  // get用户的游玩历史
  componentDidMount() {
    axios
      .get(Api(`/histories`), {
        params: {
          user_id: cookies.get("uid"),
        },
      })
      .then(
        (response) => {
          this.setState({ history: response.data.data });
        },
        (error) => {
          console.log("fail", error);
        }
      );
  }

  render() {
    return (
      <Container maxWidth="md" component="main">
        <Grid container sx={{ mt: 10 }} spacing={2}>
          {this.state.history.map((historyObj) => (
            // <RectangleCard gamesObj={gamesObj} />
            <Grid item xs={12}>
              {/* 将游玩历史通过卡片进行展示 */}
              <CardActionArea onClick={() => console.log("handleInfor")}>
                <Card sx={{ maxWidth: "md" }}>
                  <Grid container>
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        height="150"
                        width="150"
                        image={historyObj.game.thumb}
                        alt={historyObj.game.title}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <CardContent height="150" width="450">
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography gutterBottom variant="h6" component="div">
                              {historyObj.game.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body4"
                              color="text.secondary"
                              component="div"
                              sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {historyObj.game.intro}
                            </Typography>
                          </Grid>
                          {/* <Grid item xs={8}>
                            <Stack direction="row" spacing={1}>
                              {historyObj.game.tags.map((tags) => (
                                // <RectangleCard gamesObj={gamesObj} />
                                <Chip label={tags.content} />
                              ))}
                            </Stack>
                          </Grid> */}
                          <Grid item xs={4}>
                            <Stack direction="row">
                              <Reating2show value={historyObj.game.rating / 2} />
                              <Typography variant="body5" color="text.secondary">
                                {historyObj.game.rating}
                              </Typography>
                            </Stack>
                          </Grid>
                          {/* 显示该游戏游玩总时长 */}
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              color="text.secondary"
                            >
                              游玩总时长:{historyObj.total_time}分钟
                            </Typography>
                          </Grid>
                          {/* 显示上次游玩该游戏的时间 */}
                          <Grid item xs={4}>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="div"
                              color="text.secondary"
                            >
                              上次游玩时间:{historyObj.last_moment}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
