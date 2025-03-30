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
      <MenuItem onClick={() => updateUserStatus(selectedRowId, "active")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        Set Active
      </MenuItem>
      <MenuItem onClick={() => updateUserStatus(selectedRowId, "inactive")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        Set Inactive
      </MenuItem>
      <MenuItem onClick={() => updateUserStatus(selectedRowId, "coming-soon")}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Set Coming Soon
      </MenuItem>
      <MenuItem
        onClick={() => updateUserStatus(selectedRowId, "sold-out")}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Set Sold Out
      </MenuItem>
    </Menu>
  );
};

export default OptionsMenu;