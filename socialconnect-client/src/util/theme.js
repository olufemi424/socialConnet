export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#4367B2",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
  },
  imageStyle: {
    minWidth: 90,
    minHeight: 90,
    width: 90,
    height: 90,
    margin: "10px auto"
  },
  textField: {
    margin: "10px auto"
  },
  button: {
    margin: "10px auto",
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    margin: "10px auto"
  },
  progress: {
    position: "absolute"
  },
  paper: {
    padding: 20
  },
  card: {
    position: "relative"
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "40%",
        left: "70%"
      }
    },

    "& .profile-image": {
      width: 180,
      height: 180,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "45%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};
