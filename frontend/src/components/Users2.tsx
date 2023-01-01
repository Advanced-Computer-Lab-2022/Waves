import {Grid } from "@mui/material";
import User from "./UserCard2";

const Users = (props:any) => {
    const type = props.type
    return(
        <Grid container columnSpacing={{ xs: 2, sm:5, md: 45, lg: 45 }} rowSpacing={{ xs: 2, md: 2 }} columns={{sm: 7, md: 14, lg: 24 }}>
        {props.users && props.users.map((user:any) => (
            <Grid marginTop={2} item xs={2} sm={4} md={5} key={user._id}>
                <User username={user.username} email={user.email} firstName={user.firstName} lastName={user.lastName} courses={user.courses} profilePic={user.profilePic} type={type}/>
            </Grid>
        ))}
        </Grid>
    )
}

export default Users