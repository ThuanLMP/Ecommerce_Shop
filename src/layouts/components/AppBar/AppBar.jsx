import styles from './AppBar.module.scss'
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { b64DecodeUnicode } from '../../../utils/ultils';

export default function AppBar() {
    const user = JSON.parse(b64DecodeUnicode(localStorage.getItem('user')))
    return (
        <div className={styles.wrapAppBar}>
            <div className={styles.iconList}>
                <MenuIcon />
            </div>
            <div className={styles.search}>
                <Box
                    component="form"
                    sx={{
                        p: "2px 4px",
                        backgroundColor: "#E5E5E5",
                        borderRadius: '5px',
                        display: "flex",
                        alignItems: "center",
                        width: 300,
                        height: 42
                    }}
                >
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ "aria-label": "search google maps" }}
                    />
                </Box>
            </div>

            <div className={styles.user}>
                <div className={styles.iconNotification}>
                    <NotificationsIcon />
                </div>
                <div className={styles.image}>
                    <img src={user.avatar ?? 'https://meliawedding.com.vn/wp-content/uploads/2022/03/hinh-anh-gai-xinh-1.jpg'} alt="Girl in a jacket" width="40" height="40"></img>
                </div>
                <div>
                    <label className={styles.name}>{user.username}</label> <br />
                    <label className={styles.role}>{user.role}</label>
                </div>
            </div>
        </div>
    )
}