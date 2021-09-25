import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import * as pumaAction from "../../../actions/puma.action";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 200,
    width: 500,
  },
  namePriceStock: {
    marginTop: 16,
    marginBottom: 16,
  },
  image: {
    marginBottom: 10,
  },
  create: {
    marginBottom: 10,
  },
  validateError: {
    color: "red",
  },
});

export default function PumaCreate(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    stock: yup.number().min(1).required("Stock is required"),
    price: yup.number().min(1).required("Price is require"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      stock: 0,
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.file);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      dispatch(pumaAction.createPuma(formData, props.history));
    },
  });

  const previewImage = (values) => {
    if (values.file_obj) {
      return (
        <img
          src={values.file_obj}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url('/images/background-puma.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Create Product Puma
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box className={classes.namePriceStock}>
                <TextField
                  variant="outlined"
                  placeholder="Name"
                  value={formik.values.name}
                  id="name"
                  name="name"
                  label="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  fullWidth
                />
              </Box>

              <Box className={classes.namePriceStock}>
                <TextField
                  variant="outlined"
                  placeholder="Price"
                  value={formik.values.price}
                  id="price"
                  name="price"
                  label="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  fullWidth
                />
              </Box>

              <Box className={classes.namePriceStock}>
                <TextField
                  variant="outlined"
                  placeholder="Stock"
                  value={formik.values.stock}
                  id="stock"
                  name="stock"
                  label="stock"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.stock && Boolean(formik.errors.stock)}
                  helperText={formik.touched.stock && formik.errors.stock}
                  fullWidth
                />
              </Box>

              <div>{previewImage(formik.values)}</div>

              <Box className={classes.image}>
                <img
                  src="/images/logo_photo.png"
                  height={25}
                  width={25}
                  style={{ marginRight: 16 }}
                />
                <span style={{ marginRight: 16 }}>Add Picture</span>
                <input
                  type="file"
                  onChange={(e) => {
                    e.preventDefault();
                    formik.setFieldValue("file", e.target.files[0]);
                    formik.setFieldValue(
                      "file_obj",
                      URL.createObjectURL(e.target.files[0])
                    );
                  }}
                  id="files"
                  name="image"
                  click-type="type1"
                  className="picupload"
                  multiple
                  accept="image/*"
                  style={{ padding: "20px 0" }}
                />
              </Box>
              <Button
                className={classes.create}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Create
              </Button>

              <Button fullWidth variant="text" component={Link} to="/puma">
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
