import React, {useEffect} from 'react';
import {Container, Row } from 'reactstrap';

//import COmponents
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {useDispatch} from "react-redux";
import {fetchOcctlStatus, fetchOcctlUsers} from "../../store/occtl/actions";
import ServerStatus from "./Status";
import UsersConnected from "./UsersConnected";
import UserList from "./UserList";

const DashboardAnalytics = () => {
    const dispatch = useDispatch();
    document.title="Analytics | OpenConnect VPN";

    useEffect(()=>{
        dispatch(fetchOcctlStatus())
        dispatch(fetchOcctlUsers())
    },[])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Analytics" pageTitle="Dashboards" />

                    <Row>
                        <ServerStatus />
                        <UserList />
                    </Row>

                    <Row>
                        <UsersConnected />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardAnalytics;
