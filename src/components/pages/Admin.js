import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Person as PersonIcon, Lock as LockIcon } from "@material-ui/icons";
import * as adminAction from "../../actions/admin.action";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../Dialogs/LoginFailed";
import * as yup from "yup";
import { useFormik } from "formik";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 200,
    width: 350,
  },
  password: {
    marginTop: 16,
    marginBottom: 16,
  },
  validateError: {
    color: "red",
  },
});

export default function Admin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminReducer = useSelector(({ adminReducer }) => adminReducer);
  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(adminAction.login({ ...values, ...props }));
      // ถ้าใช้ มันจะทำการโหลดหน้าเว็บหลังจาก login เป็นแบบ hardcode
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },
    validationSchema: validationSchema,
  });


  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url('/images/background.jpg')`,
      }}
    >
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
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="secondary"
              style={{ textAlign: "center" }}
            >
              Admin Login
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.id}>
                <TextField
                  variant="outlined"
                  placeholder="Username"
                  value={formik.values.username}
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Box>

              <Box className={classes.password}>
                <TextField
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Box>

              <Button
                size="medium"
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
              >
                Sign in
              </Button>

              <Button
                size="medium"
                color="primary"
                variant="text"
                style={{ marginTop: 10 }}
                onClick={() => props.history.push("/")}
                fullWidth
              >
                Back
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      {adminReducer.isError && <Dialog />}
    </div>
  );
}
