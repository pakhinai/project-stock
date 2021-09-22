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
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import * as registerAction from "../../actions/register.action"
import DialogFailed from "../Dialogs/RegisterFailed"
import DialogSuccess from "../Dialogs/RegisterSuccess"

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    width: 400,
  },
  id: {
    marginTop: 16,
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

export default function Register(props) {
  const classes = useStyles();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(registerAction.register({...values, ...props}))
    },
    validationSchema: validationSchema,
  });

  

  const dispatch = useDispatch();
  const registerReducer = useSelector(({ registerReducer }) => registerReducer);

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
              Register
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Box>
                <TextField
                  variant="outlined"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

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
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  onBlur={formik.handleBlur}
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

              <Box className={classes.password}>
                <TextField
                  variant="outlined"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  onBlur={formik.handleBlur}
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
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
              >
                Register
              </Button>
              <Button
                className={classes.register}
                size="medium"
                color="primary"
                fullWidth
                onClick={() => props.history.push("/user")}
              >
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      {registerReducer.error && <DialogFailed/>}
      {registerReducer.success && <DialogSuccess/>}
    </div>
  );
}
