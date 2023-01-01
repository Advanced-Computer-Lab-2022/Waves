import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ResponsiveNavBar from "../components/ResponsiveNavBar";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import FilterBar from "../components/FilterBar";
import Search from "../components/Search";
import Users from "../components/Users";

const ViewCorporateTrainees = (props: any) => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getCorporateTrainees").then((response) => {
      setUsers(response.data);
    });
  }, [search]);

  return (
    <>
      <ResponsiveNavBar />
      <Search setSearch={setSearch} />
      <Users users={users} />
      <Footer />
    </>
  );
};

export default ViewCorporateTrainees;
