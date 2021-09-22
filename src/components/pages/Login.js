import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,

} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 200,
    width: 350,
  },
  button: {
    width: 150,
    height: 50
  }
});

export default function Login(props) {
  const classes = useStyles();

  return (
    <div style={{ width: "100%", height: "100vh", backgroundImage: `url('/images/background.jpg')` }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="/images/shoe-background_login.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Box display="flex" justifyContent="space-around" >
              <Button
                className={classes.button}
                size="medium"
                color="secondary"
                variant="contained"
                onClick={()=> props.history.push("/admin")}
              >
                Admin
              </Button>
              <Button
                className={classes.button}
                size="medium"
                color="primary"
                variant="contained"
                onClick={() => props.history.push("/user")}
              >
                User
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
