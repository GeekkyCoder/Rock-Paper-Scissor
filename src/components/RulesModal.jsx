import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import RulesImg from "../images/image-rules.svg";
const emails = ["username@gmail.com", "user02@gmail.com"];
import "../componentStyles/Rules.css"

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{ textAlign: "center", fontFamily: "inherit", fontSize: "2rem" }}
      >
        Rules For The Game
      </DialogTitle>
      <img src={RulesImg} alt="rules-img" />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className="rules-container"
      style={{
        width: "200px",
        marginLeft: "auto",
      }}
    >
      <Button
        sx={{
          width: "100%",
          textAlign: "center",
          color: "whitesmoke",
          border: "2px solid hsl(217, 16%, 45%) ",
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Rules
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
