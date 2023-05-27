import React, {useEffect} from 'react';
import {Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';

//import COmponents
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {useDispatch} from "react-redux";
import {fetchOcctlStatus, fetchOcctlUsers} from "../../store/occtl/actions";
import ServerStatus from "./Status";
import UsersConnected from "./UsersConnected";
import UserList from "./UserList";
import {Link} from "react-router-dom";
import {SemiCircularRadial} from "./RadialbarCharts";
import ServerUsage from "./ServerUsage";

const DashboardAnalytics = () => {
    const dispatch = useDispatch();
    document.title="Analytics | OpenConnect VPN";

    useEffect(()=>{
        dispatch(fetchOcctlStatus())
        dispatch(fetchOcctlUsers())
        let interval = setInterval(()=>{
            dispatch(fetchOcctlStatus())
            dispatch(fetchOcctlUsers())
        }, 5000)
        return () => clearInterval(interval);
    },[])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Analytics" pageTitle="Dashboards" />

                    <Row>
                        <ServerUsage />
                    </Row>

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
