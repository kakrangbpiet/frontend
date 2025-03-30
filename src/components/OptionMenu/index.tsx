import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import {
  Person as PersonIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

const OptionsMenu = ({
  className,
  openMenu,
  setOpenMenu,
  selectedRowId,
  updateUserStatus,
}) => {
  return (
    <Menu
      className={className}
      open={Boolean(openMenu)}
      anchorEl={openMenu}
      onClose={() => setOpenMenu(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={() => updateUserStatus(selectedRowId, "approve")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        Approve
      </MenuItem>
      <MenuItem onClick={() => updateUserStatus(selectedRowId, "reject")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        Reject
      </MenuItem>
      <MenuItem onClick={() => updateUserStatus(selectedRowId, "suspend")}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Suspend
      </MenuItem>
      <MenuItem
        onClick={() => updateUserStatus(selectedRowId, "suspend/revoke")}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Revoke User
      </MenuItem>
    </Menu>
  );
};

export default OptionsMenu;