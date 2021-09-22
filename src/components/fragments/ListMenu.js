import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter } from "react-router";

function ListMenu(props) {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <img src="/images/logo_nike.jpg" height={25} width={25} />
        </ListItemIcon>
        <ListItemText
          primary="Nike"
          onClick={() => {
            props.history.push("/nike");
          }}
        />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <img src="/images/logo_adidas.png" height={25} width={25} />
        </ListItemIcon>
        <ListItemText
          primary="Adidas"
          onClick={() => props.history.push("/adidas")}
        />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <img src="/images/logo_puma.jpg" height={25} width={25} />
        </ListItemIcon>
        <ListItemText
          primary="Puma"
          onClick={() => props.history.push("/puma")}
        />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <img src="/images/logo_reebok.png" height={25} width={25} />
        </ListItemIcon>
        <ListItemText
          primary="Reebox"
          onClick={() => props.history.push("/reebox")}
        />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <img src="/images/logo_under_armour.png" height={25} width={25} />
        </ListItemIcon>
        <ListItemText
          primary="Under Armour"
          onClick={() => props.history.push("/underarmour")}
        />
      </ListItem>
    </List>
  );
}

export default withRouter(ListMenu);
