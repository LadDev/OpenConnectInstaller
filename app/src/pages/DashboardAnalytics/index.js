import React, {useEffect} from 'react';
import { Col, Container, Row } from 'reactstrap';

//import COmponents
import UpgradeAccountNotise from './UpgradeAccountNotise';
import UsersByDevice from './UsersByDevice';
import Widget from './Widget';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import AudiencesMetrics from './AudiencesMetrics';
import AudiencesSessions from './AudiencesSessions';
import LiveUsers from './LiveUsers';
import TopReferrals from './TopReferrals';
import TopPages from './TopPages';
import {useDispatch, useSelector} from "react-redux";
import Occtl from "../../store/occtl/reducer";
import {fetchOcctlStatus, fetchOcctlUsers} from "../../store/occtl/actions";
import ServerStatus from "./Status";
import UsersConnected from "./UsersConnected";

const DashboardAnalytics = () => {
    const dispatch = useDispatch();
    document.title="Analytics | Velzon - React Admin & Dashboard Template";

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

                    </Row>

                    <Row>
                        <UsersConnected />
                    </Row>

                    <Row>
                        <Col xxl={5}>
                            <UpgradeAccountNotise />
                            <Widget />
                        </Col>
                        <LiveUsers />
                    </Row>
                    <Row>
                        <AudiencesMetrics />
                        <AudiencesSessions />
                    </Row>
                    <Row>
                        <UsersByDevice />
                        <TopReferrals />
                        <TopPages />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardAnalytics;
