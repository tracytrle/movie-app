import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const style = {
  alignItems: "center",
  flexWrap: "wrap",
  display: "flex",
  justifyContent: "center",
  overflow: "scroll",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  color: "white",
  bgcolor: "#757C86",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 375px)": {
    width: 320,
  },
};

function LoginModal() {
  let navigate = useNavigate();
  let from = navigate.state?.from?.pathname || "/";

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box sx={style}>
          <LoginForm
            callback={() => {
              navigate(from, { replace: true });
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default LoginModal;
