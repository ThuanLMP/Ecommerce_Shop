import styles from './NavBar.module.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function NavBar() {
    return (
        <div className={styles.wrapNav}>
            <div className={styles.logoApp}>
                <label className={styles.nameApp}>SHOP APP</label>
                <div>ADMIN</div>
            </div>
            <div className={styles.wrapFeature}>
                <p>APPLICATION</p>
                <div className={styles.listFeature}>
                    <ul>
                        <li>
                            <div className={styles.wrapTitle}>
                                <DashboardIcon sx={{ marginTop: '11px' }} />
                                <label>Dashboard</label>
                            </div>

                        </li>
                        <li>
                            <div className={styles.wrapTitle}>
                                <InventoryIcon sx={{ marginTop: '11px' }} />
                                <label>Product</label>
                                <KeyboardArrowDownIcon sx={{ marginLeft: '80px' }} />
                            </div>
                            <div className={styles.wrapSubFeature}>
                                <div><label>Product List</label></div>
                                <div><label>Add Product</label></div>
                            </div>
                        </li>
                        <li>
                            <div className={styles.wrapTitle}>
                                <PermIdentityIcon sx={{ marginTop: '11px' }} />
                                <label>User</label>
                                <KeyboardArrowDownIcon sx={{ marginLeft: '108px' }} />
                            </div>
                            <div className={styles.wrapSubFeature}>
                                <div><label>User List</label></div>
                                <div><label>Add User</label></div>
                            </div>


                        </li>
                        <li>
                            <div className={styles.wrapTitle}>
                                <ShoppingCartIcon sx={{ marginTop: '11px' }} />
                                <label>Orders</label>
                            </div>

                        </li>
                        <li>
                            <div className={styles.wrapTitle}>
                                <SettingsIcon sx={{ marginTop: '11px' }} />
                                <label>Settings</label>
                                <KeyboardArrowDownIcon sx={{ marginLeft: '78px', marginTop: '11px' }} />
                            </div>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}