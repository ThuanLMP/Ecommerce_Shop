import styles from './Header.module.scss'
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function Header() {



    return (
        <div className={styles.header}>
            <div className={styles.topBar}>
                <ul>
                    <li>About Us</li>
                    <li>Contacts</li>
                    <li>Store</li>
                    <li>Tracks</li>
                    <li>Orders</li>
                </ul>
            </div>

            <div className={styles.mainBar}>
                <div className={styles.title}>
                    <h1>SHOP APP</h1>
                </div>
                <Box
                    component="form"
                    sx={{
                        p: '1px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 748,
                        height: 51,
                        backgroundColor: '#C4C4C4',
                        marginTop: '35px',
                        marginLeft: '20px',
                        borderRadius: '5px'

                    }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography sx={{
                        color: '#4B4B4B',
                        fontWeight: '700'
                    }} >
                        Categories
                    </Typography>

                    <Divider sx={{ height: 51, m: 0.5 }} orientation="vertical" />

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Items"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />

                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon fontSize='large'/>
                    </IconButton>
                </Box>
                <div className={styles.icons}>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="cart">
                        <AddShoppingCartIcon fontSize='large' sx={{ color: '#323232' }} />
                    </IconButton>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="user">
                        <PersonOutlineIcon fontSize='large' sx={{ color: '#323232' }} />
                    </IconButton>
                </div>
            </div>

        </div>
    )
}