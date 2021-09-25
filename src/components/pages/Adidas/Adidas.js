import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Button } from "@material-ui/core";
import { forwardRef } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import * as adidasAction from "../../../actions/adidas.action";
import { URL_IMG } from "../../../Constants";
import { Link } from "react-router-dom";
import localStorageService from "../../../configs/localStorageService";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Adidas(props) {
  const dispatch = useDispatch();
  const adidasReducer = useSelector(({ adidasReducer }) => adidasReducer);
  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState();

  const handleClickOpen = (item) => {
    setSelectId(item.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(adidasAction.getAdidas());
  }, []);

  const showDialogDelete = () => {
    return selectId ? (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure remove item {selectId}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                dispatch(adidasAction.RemoveAdidas(selectId));
                handleClose();
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;
  };

  const columns = [
    {
      title: "Id",
      field: "id",
      render: (item) => <Typography variant="body1">{item.id}</Typography>,
    },
    {
      title: "Name",
      field: "name",
      render: (item) => <Typography variant="body1">{item.name}</Typography>,
    },
    {
      title: "Image",
      render: (item) => (
        <img
          src={`${URL_IMG}/image/${item.image}`}
          style={{ width: 150, height: 150 }}
        />
      ),
    },
    {
      title: "Price",
      field: "price",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      title: "Stock",
      field: "stock",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pieces"}
          />
        </Typography>
      ),
    },
    {
      title: "Updated",
      field: "updated",
      render: (item) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:MM">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ];

  const actions = [
    {
      icon: () => <Edit />,
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event, rowData) => {
        props.history.push(`/adidas-edit/${rowData.id}`);
      },
    },
    {
      icon: () => <DeleteOutline />,
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event, rowData) => {
        handleClickOpen(rowData);
      },
    },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", marginTop: 63 }}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        title="Adidas"
        data={adidasReducer.AdidasResult ? adidasReducer.AdidasResult : []}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ maxWidth: 200, marginLeft: 10, marginBottom: 5 }}>
                {(localStorageService.getRole() === 'admin') && <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to="/adidas-create"
                >
                  Create
                </Button>}
              </div>
            </div>
          ),
        }}
        actions={(localStorageService.getRole() === 'admin') && actions}
      />
      {showDialogDelete()}
    </div>
  );
}
