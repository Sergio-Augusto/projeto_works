import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MailOutline from "@material-ui/icons/MailOutline";
// @material-ui/icons
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// import LockOutline from "@material-ui/icons/LockOutline";
import api from '../../services/api';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from "@material-ui/core/FormControl";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
// style for this view
import styles2 from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import styles3 from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import styles4 from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const useStyles4 = makeStyles(styles4);
const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(styles2);
const useStyles3 = makeStyles(styles3);


export default function RegisterPage({history}) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
 
  setTimeout(function() {
    setCardAnimation("");
  }, 500);
  const [registerEmail, setregisterEmail] = React.useState("");
  const [registerEmailState, setregisterEmailState] = React.useState("");
  const [registerPassword, setregisterPassword] = React.useState("");
  const [registerPasswordState, setregisterPasswordState] = React.useState("");
  const [registerCheckbox, setregisterCheckbox] = React.useState(false);
  const [registerCheckboxState, setregisterCheckboxState] = React.useState("");
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const [simpleSelectState, setSimpleSelectState] = React.useState(false);
  const [tl, setTL] = React.useState(false);
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  const register = async () => {

    const data = { email: registerEmail, password: registerPassword, perfil: simpleSelect }

    if (registerEmail === "" || registerPassword === "" || simpleSelect === "") {
      setregisterEmailState("error");
      setregisterPasswordState("error");
      setSimpleSelectState("error");
    }
     else {
        await api.post('register', data).then(response => {
          if (response.data) {
            history.push('/auth');
          }

        }).catch( response =>
          {
            if (response.data) {
              showNotification("tl")
            }
            })
    }
  }

  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function() {
            setTL(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };

  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const classes4 = useStyles4();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <Card login className={classes3[cardAnimaton]}>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h4 className={classes2.cardIconTitle}>Formulário de Inscrição😍</h4>
          </CardHeader>
          <CardBody>
            <form>
              <CustomInput
                success={registerEmailState == "success"}
                error={registerEmailState == "error"}
                labelText="Email *"
                id="registeremail"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event => {
                    if (verifyEmail(event.target.value)) {
                      setregisterEmailState("success");
                    } else {
                      setregisterEmailState("error");
                    }
                    setregisterEmail(event.target.value);
                  },
                  type: "email"
                }}
              />
              <CustomInput
                success={registerPasswordState == "success"}
                error={registerPasswordState == "error"}
                labelText="Agora, crie sua senha *"
                id="registerpassword"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event => {
                    if (verifyLength(event.target.value, 1)) {
                      setregisterPasswordState("success");
                    } else {
                      setregisterPasswordState("error");
                    }
                    setregisterPassword(event.target.value);
                  },
                  type: "password",
                  autoComplete: "off"
                }}
              />

                      <FormControl
                        fullWidth
                        className={classes4.selectFormControl}
                        required={simpleSelectState == "error"}
                        error={simpleSelectState == "error"}
                      >
                        <InputLabel
                          htmlFor="simple-select"
                          id="simple-select"
                          className={classes4.selectLabel}
                         
                        >
                          O que você está buscando?
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes4.selectMenu
                          }}
                          classes={{
                            select: classes4.select
                          }}
                          value={simpleSelect}
                          inputProps={{
                            name: "simpleSelect",
                            id: "simple-select",
                            onChange: event => {
                              if (verifyLength(event.target.value, 1)) {
                                debugger
                                setSimpleSelectState("success");
                              }
                              else {
                                setSimpleSelectState("error");
                              }
                              setSimpleSelect(event.target.value);
                            },
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes4.selectMenuItem
                            }}
                          >
                            Selecione o seu perfil
                          </MenuItem>
                        
                          <MenuItem
                            classes={{
                              root: classes4.selectMenuItem,
                              selected: classes4.selectMenuItemSelected
                            }}
                            value="0"
                          >
                            Estou buscando emprego
                          </MenuItem>
                          <br/>
                          <MenuItem
                            classes={{
                              root: classes4.selectMenuItem,
                              selected: classes4.selectMenuItemSelected
                            }}
                            value="1"
                          >
                            Estou buscando profissionais
                          </MenuItem>
                        </Select>
                      </FormControl>

               
              {/* <FormControlLabel
                control={
                  <Checkbox
                    tabIndex={-1}
                    onClick={event => {
                      if (event.target.checked) {
                        setregisterCheckboxState("success");
                      } else {
                        setregisterCheckboxState("error");
                      }
                      setregisterCheckbox(event.target.checked);
                    }}
                    checkedIcon={<Check className={classes2.checkedIcon} />}
                    icon={<Check className={classes2.uncheckedIcon} />}
                    classes={{
                      checked: classes2.checked,
                      root: classes2.checkRoot
                    }}
                  />
                }
                classes={{
                  label:
                  classes2.label +
                    (registerCheckboxState == "error"
                      ? " " + classes2.labelError
                      : "")
                }}
                label="Subscribe to newsletter"
              /> */}
              <Button
                color="rose"
                className={classes2.registerButton}
              onClick={()=> register()}
              >
                Começar
              </Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
    </div>
  );
}
