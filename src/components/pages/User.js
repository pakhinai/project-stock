import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Person as PersonIcon, Lock as LockIcon } from "@material-ui/icons";
import * as loginAction from "../../actions/login.action";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../Dialogs/LoginFailed";
import * as yup from "yup";
import { useFormik } from "formik";


const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    width: 350,
  },
  password: {
    marginTop: 16,
    marginBottom: 16,
  },
  register: {
    marginTop: 16,
  },
  validateError: {
    color: "red",
  },
});

export default function User(props) {
  const classes = useStyles();
  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginAction.login({...values, ...props}))
    },
    validationSchema: validationSchema
  })

  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

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
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="primary"
              style={{ textAlign: "center" }}
            >
              User Login
            </Typography>

            <form onSubmit={formik.handleSubmit}
            >
              <Box className={classes.id}>
                <TextField
                  variant="outlined"
                  placeholder="Username"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  onBlur={formik.handleBlur}
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
                  error={formik.touched.password && Boolean(formik.errors.password)}
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
                color="primary"
                variant="contained"
                fullWidth
              >
                Sign in
              </Button>
              <Button
                className={classes.register}
                size="medium"
                color="primary"
                fullWidth
                onClick={() => props.history.push("/register")}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      {loginReducer.isError && <Dialog />}
    </div>
  );
}
