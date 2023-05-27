import React, {useEffect} from 'react';
import {Container, Row } from 'reactstrap';
import {withTranslation} from "react-i18next";

//import COmponents
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {useDispatch} from "react-redux";
import {fetchOcctlStatus, fetchOcctlUsers} from "../../store/occtl/actions";
import ServerStatus from "./Status";
import UsersConnected from "./UsersConnected";
import UserList from "./UserList";
import ServerUsage from "./ServerUsage";
import PropTypes from "prop-types";

const DashboardAnalytics = (props) => {
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
                    <BreadCrumb title={props.t("Analytics")} pageTitle={props.t("Dashboards")} />

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
DashboardAnalytics.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(DashboardAnalytics);
