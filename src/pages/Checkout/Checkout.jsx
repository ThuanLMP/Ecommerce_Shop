import styles from './Checkout.module.scss'
import { HeaderOnly } from "../../layouts";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItems from './component/ListItems';
import { Divider, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';

export default function Checkout() {

    const items = [
        {
            url: 'data:image/jpeg;base64,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',
            quantity: 100,
            name: 'Gái xinh',
            total: 120
        },
        {
            url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKkAgAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBgMFBwIIAQD/xAA9EAACAQMCAwUDCgUEAwEAAAABAgMABBEFIRIxQQYTUWFxIjKxBxQVI0JSgZGhwTND0eHwNGJyc4KisjX/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBAAUG/8QAHxEAAwEAAwEBAQEBAAAAAAAAAAECEQMhMRJBBFEy/9oADAMBAAIRAxEAPwBsj0+3SaSWKMo8hycbqT6f56VO0bxDLY4R9ocvx8PxpdstYeLAWXK/dbcVfWWsQSYEymJujA5H9a8uf6anorrg3tBoidFRmA4XGQwORU8ag0Vb3AlgCN3c8R6gjOPUVwYeFvqiSvmMEf1p8ck2vRLlyc91tmkL5Se0f0bB9GWb4uZlzI4+yvh+NNfaPWotE0uW5deKT3Y0+83QVgOq6nNd3k11PJxzSsWZug9KJRrOTOg5HExOWbclutcpfxQMSzEtjZVTrVU0ss/vN7BO2feI8cVLB9VMGIBPgfCqVOAUwrMl8XdsomNhjnX6DEe3Hv4ZxirOaEyQB06iq6RdxxkHIwT1rWjNLC2naHBYtg+eKLsdZeznMluSpIIbJyMHntS+krKMc4/u+HpU64deIf3FZ8naehezPaKyudEF1pqqvcKqz2ecFemV9f8AMVxMCulSb/WTFYs+bHJ+FYjouq3OmXiT2zYK81zsw8D5bVsmn6pBren6dLb4HFxSSoD7je7g/wCdaZvQlrGWccYVAOlfcZNTYAFdWsfeXMaeLCtBT1mNiSaH3w1FQam69alK7b0DcW8bbhQD4javLriR6U8jQwWGttEeKORo28UOM0y6d2p24bmNZF8U2b+lZNf3H0ZCJpJsR54QCCSTXVnrqyoe7kDbbkdKS/56XaGrkmumXnyma9bX7O1vKGCfVRIRgjIyzfAfiay+V+NzyPl4mjdVuTNI7E532oS3Tik3+z8a9HiXzPZLXvQRDEEj4mHFI3P/ADwqSCxllk4ipJJ/KrHT7I3Dr4Uy2+nCNYzwjIcZrqvDZjReFtcWsS8RPD035UHPC5XiIznqKfpNPSaAxsoxjHmKoJbI28rROBxHPMbEeIrFyadUYLCxNjz6+dSxjbK7EcxRs8HdMRjGKCfKtxL6inS9FMljYZp6+TjUfm+p9wxASYY4T49MUg8QOGHKjtOu3tbiOaMniQhhvWsBnoU4xtjFGaPHxXXF0QVS6Ne/P9Ltrn78YJx6Uy6NHwxO/icflRMVC7MLt75bqQpHG4wpYk45CvkrZBqLRIcm4xz7vH5kf0qe4hKg4qKdZdWJi/2lwdNw33v2NLlorJxNnl+tMvaAFbIHH8xRv57fvVHKojhO2CaYl0D+gEw4mAPXnUlsNuL7xrmcYII6V+tnIGOoOwo/wwc9BiBwaaFtuOJlA3O49aTdHvJ7Ye1AxXi54p4026WeJcgqT0PSp66ZRPhJwhogy43oTUrJLmDb2WG6t900ZOxhBwuR4VT3lxeyNwQLwr0Jrkcxb1KJgGWQASrzGef9jVO4BGedMWoaZK0Zkll4mxsRy9KXyCu3XO9UQ0T2mCqSrcJ5UVCSrAqQCOWahljDD2feHSvkDnOG2ZaaKNt+Tu7WfQ40OxXpmtKsk7u2jXG+MmsV+Sm5D3xtDzkII/f9v1rcBsKzQc7MB7OKGjuW/wCI+NEXigbVbWehx2cbLbxOgY5O/F8agu9LmbJSRSPBgRUPH/RxZmld8PJvgma+nFZkY/mL8aXLxsyKtN+r205R41i4yDuFOdxSXNk3LgjBU701Uq8M+Wl2RXOwY+VDQE98cdKmvHC8Q8cV1o8ff6gI+fFTd6AzWMNnqc9npouFhjdO84CGzkZ6nApq0PUFv7cSpGUI95G5ih9O0YIg4QoBq7t7VYl4RzPM1PVJopmGmHXNsZLUHqdx60r6jJciR7dC0UoQsG4dvLBrQreAPaKGHLriqzUdKgn2YKx6eVcvDn30Zdb22rXHem6knz9lQwP50PNZyxZMhJYc81oh0dkbKvxDwYVWaxpbNiXhAxscUxWDXHiEMkbHIB865eNmwwOTRGq23dOwIxg0BFKCMZxv+VPT6JaXY5fJtqBse1mnmT3XlCH1O3716Iu7juIgwxknArypptxJDeIysAyMGRs4wc7GvSZvPntppzj+bCsrY6ZANL5q+YbR0ztAaxLjlUN5bI1vIEHtlSB5UWtfH2RiegPOvndPVZknbER2csgiHCvBhfHBzWfjmzHm25ps7bXfzm/mGfZ4yB6A7fpilFmwrN57V7XFPyiS22A37+2AKK7NTLFrNuZDgMeHn48qAnPHNgb9BTX2e7PFkUSLmaQ74+yPDNU00oELXRpdhEGiXzGa7nHDMgA50HYx3OlLHFcOHhbAVt8p5Hx9aPuYzIMocHoaiL0xqs1T5rwsRmqm7yt40fiMjzFVML3LMqNOwVzwlh0q7S2EaqSxY4xk86PehbWMiEWRUF7bh4CpGRirJFBFD3zCOJj4CuR1UYr2zZrXVEA5Ae0AfHl8DVHKcMHU+yfjRna+4aftDdP9gYWPzAH9c1W8fFEA3lVk/wDJG3rLG3k9kOOYre+wOpRalodsVfMlvEsbqTyxy/SvO1vKyFRjiUjcU9die0MOk3StxusbbOnPP4/hSeeHU4jYaTNvxiqvtFfNa2DCHHfsDw55DHU1asQqlnOFUZPpSR29v3trEAACWUcRz0G/CuPzz+NeDxLaR6LZk+rytJO+c7bAGqedtwoycbAeJqwuiTJhQWdjsAMkk9K0TsD8n5gZNV1xPr/eitiP4fm3+74V7kElIq+wfYiUKL3UYh3so9lG+yD40/W3Z6DTyXhX2D0+56eVMEUCIoVQAKmysaMWICge0TyxRUnXpkpSK+oJA6mBwrFtue9Uc63JV7WO4aKZBlXCg8Q6c6g1KxlvO151G1u54tPVQoVn24t9wOXDy86H7QavHZXkMzZMUZCMRucMcA/Ck/PeIoXS0qY/pKAtG924fO+Vq90e11O7HB9KXKpzIwNvTarO0+aTorSIj55Zq4tDaxL9UAgHhXDq5V84kdWiyQoFlfjx18aA1i4aUGGM8+Z8KMnuBIxWI586iS3Bz4nnXErMj7XaMY7xJlHsFgpPhmlmeB7Z3ikQ7bEVsvarT0exkVhkneqvUuyqappCPGCtyiZDfeGOVP47/BNx1plcb92eLwGwBoqK4iLcSu0bfpQt9bSWlzJBKrI6Ehgem9fLWIyyBAfaNUCD1fcqvAocjgLDJz0G/wC1IfbLSbjWdQLLcQxRL7K8eTnz2puuJzKxLHnQM9vG5DNkjIO1eRw/yqHrZc7bF3sj2Mt9LuHvb2Rbu7z9UxTAjHiAc7+dOgYcBFASFlHGnTkamhlaRM7gefSrF0LDUbpS72uupZLY2cSyiBhmaRDgsPug/Grkuw9hffO3pXNxCqxcJG2Mb+dH+HJ49EGZ7fSdOlupS0MKDd5nLnywPGkefXrbVlht0hkSeW9RvaII4A3PPjy2oLtz2guNa1aaE+xaW0rJFEp2OCRxHzP6UL2Rt2uu0FjEoyWuIl/9gT+golxpLQHy1Twe72K7sIZXglZHVeLAPPG+DV5prNdW6ShycjOM1adpdIHzW4kGEHduc4zyFLnZmVrZRA59ldh6dKRyLB8PRotk4QNqNh2O9RxqGUEda6yVO9K0Jlb2jXvIeEcycVcafEiQxx4GOEdPCq3Uk42izy7wVaRHATxGKOXgOajL/lc0D5vJFqsCYVj3cmB+R+I/Ks9tgeLiGzDcV6H7Waemo6DdQkAtwca+o6V59jBVgmMPGxXf15VZFaiS1h6MmUqcVD3jjrRtyBtQnADmo0mVaEWkveZVhsfGi2ESrk5ULuaEgThxtXN/J3n1KnYY4vPyp0gV0RwSShyy4QZ2AAO340PrOrTadpV/ekqTb20ki5GMsFOP1xU8Q4ABSn8p9+LPsw1uD9ZeTLEN+Sj2mP6AfjTEkLbZisxJZmclnYksT1Jp3+SWx+cdqLSYj2YnLfkrUkTD262L5HNMMbrcMoHDGT6lhRW8QPGtZo98Ifo6dpwO7EbE59KQLK0ZsOuxUYPnTjrcneWnzNWHHIuW8gP71UaeirGPGpuRlUILslxAuT6VIy5Nc8XdYbmp5ivrXCZOMkjmMcvWkhNnE8YlcIOg4j+H96ndvZDiobZyRJK2xY4x6VysuFZDyBzk0aXRyLBGEsJRvtDFefNbtvmusXsPLglPP8K2i61pNNtnnMEkqKwAZNue3Wsi7UTpda1d3CRlRKQ3CeYOBmncLEc0m9zbmoY0LP4AUQRmvrFYoySPw8aDAiOeURDhUe2f0oMA1JhmJZuZqRI80xAvs4jTPM4rD+2+v/T/AGgkaJibS2BitxnmM7t+J/QCtB+VLtCdH0kabaycN5eAglTukXInyzy/OsaClMnGARkUyRVf4fXj4iMdcfrW0dkLLvLdLMsyD5qzcSnBBPCAax2Nl9nJwBgZ9K13sHe99qhdWJR4OBPQYP7Gg5A+Loanjc3kksqcJbbHgKDlX5vdMnRvaWmKSJXXgYZqv1WxdoQ6Elk3Ujn6Uqux6Bs8Sb9a+TMxjYsoyQvtE7kg9fwqK2lEijpnmPOpJcsyxLzPwpKbTC+UyW0gLxAt7tcXbIrBQBgfpRbEQwADZQOdLOt6iOF+7yEAO46+lGbhXdq9Wgjs2hBDszDIB8N+dZxeRSOxklO7+0f2pknhe6uDNce6OQ6AVS6xn22bYvsAOWKbx9CeRab8m+/ShXk7+Qkfw193+tfryTC9wnNscXkPCv0aYAFYmcyREzXcrpbQtJJ7oH5nwqSNMDNVupMblgo3RTt/WtMwTPlY0YXekQ6wi5e2I4yBv3bYH6HB/OsskT6kDqu34V6E1RY5NDvYZxmI2z8QP/E1g81u8RZGHIYPpRqjHJWM2CFpw7D6q9neRguV3yjeB3pRmhKt+VGWU7W0iOu/CQRRNagJeM9D6Zqi3SZmXgbOMj3f7VZPuOe1KnZWZLzTllXdWUEfrV8jyW+w9tPA0hlKA301fnL93J3bseJQ3ut5eVQ2kciSyyz4Ug8IwcjHjVjOEuYSq9RzHNTQC/WL3R/ljDDxNA8CSaYJfXLTqypnux4daXNQQtcRW+eftN6U4G2QjkKpLuFfplhj3YVJ8xxN/asNF6e3ZgUA4cDfyUUo6++ZkjG3pTxqEgAkGeeM/nSDqZ726bG4B50yPRd+G4x+07OdzRMe5oZPdomLkK5AsgvdQEci28eCT75zyHh61yvPeqx/9dL/ANjfGrA+5WhYcawok0W9ViQskRjyP92371k9/YusRVxmWHKk/fWtc1b/APFl9B8azzUf4x/667TcFWWz761YqAXj326iqZ8qfMU02f8AFm/6z8TS3d++/qaOGKuV6ap8ltyX0lo+kcmB6HetBwCvrWZfJT/pLj1X4VpY/hil16MnwheMcRbkRv60LMuJjKgKq55HeirjmPWopPdpY1I+Z2qm1BSuppMdxIhTPhg7fGrY1Xal/I/7R8DXGITddlKSPFt7xz5ikybMkpx1OdutOGt/6+T/AMv/AJNKUX8ZP+Q+NMkCj//Z',
            quantity: 100,
            name: 'Gái xinh',
            total: 120
        }
    ]
    return (
        <HeaderOnly>
            <div className={styles.nav}>
                <div className={styles.navList}>
                    <ul>
                        <li>Home</li>
                        <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                        <li>Shopping Cart</li>
                        <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                        <li>Checkout</li>
                    </ul>
                </div>
            </div>
            <div className={styles.checkout}>
                <div>
                    <h2>Checkout</h2>
                    <div className={styles.listProduct}>
                        <ListItems items={items} />
                    </div>
                </div>

                <div className={styles.inforCheckout}>
                    <div className={styles.shippingInfor}>
                        <div>
                            <h2>Shipping Information</h2>
                            <p>
                                Random Federation
                                115302, Moscow
                                ul. Varshavskaya, 15-2-178
                            </p>
                            <h3>Phone Number</h3>
                            <p>38 972 588-42-36</p>
                            <h3>Email Address</h3>
                            <p>stroyka@example.com</p>
                            <p>Edit Address</p>
                        </div>

                    </div>
                    <div className={styles.checkoutInfor}>
                        <div>
                            <h2>Checkout</h2>
                            <div className={styles.contentCheckout}>
                                <label className={styles.title}>Subtotal</label> <label className={styles.price}>$120.00</label> <br />
                                <label className={styles.title}>Shipping</label> <label className={styles.price}>$20.00</label>
                            </div>
                        </div>

                        <Divider
                            sx={{
                                borderRightWidth: 2,
                                backgroundColor: '#737070',
                                marginBottom: '19px',
                                marginTop: '19px'
                            }}
                        />

                        <div className={styles.listPayment}>
                            <label className={styles.title}>Total</label> <label className={styles.price}>$140.00</label> <br />
                            <FormControl sx={{
                                marginTop: '34px'
                            }}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <div className={styles.buttonPayment}>
                                        <FormControlLabel value="cash" sx={{
                                            marginLeft: '13px',
                                        }} control={<Radio />} label={<Typography sx={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                        }}>
                                            Cash on delivery
                                        </Typography>} />
                                    </div>
                                    <div className={styles.buttonPayment}>
                                        <FormControlLabel value="payments" sx={{
                                            marginLeft: '13px',
                                        }} control={<Radio />} label={<Typography sx={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                        }}>
                                            Check payments
                                        </Typography>} />
                                    </div><div className={styles.buttonPayment}>
                                        <FormControlLabel value="paypal" sx={{
                                            marginLeft: '13px',
                                        }} control={<Radio />} label={<Typography sx={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                        }}>
                                            Paypal
                                        </Typography>} />
                                    </div><div className={styles.buttonPayment}>
                                        <FormControlLabel value="card" sx={{
                                            marginLeft: '13px',
                                        }} control={<Radio />} label={<Typography sx={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                        }}>
                                            Master Card
                                        </Typography>} />
                                    </div>

                                </RadioGroup>
                            </FormControl>
                            <LoadingButton
                                type='submit'
                                loadingPosition='end'
                                variant='contained'
                                sx={{
                                    width: '300px',
                                    height: '35px',
                                    backgroundColor: '#FFD333',

                                    color: 'black',
                                    fontWeight: '700',
                                    fontSize: '24px',
                                    marginLeft: '42px',
                                    fontFamily: 'Roboto',
                                    textTransform: 'none'
                                }}
                            >
                                Checkout
                            </LoadingButton>

                        </div>

                    </div>
                </div>
            </div>
        </HeaderOnly>
    )
}