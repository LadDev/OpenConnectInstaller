import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col, Row, UncontrolledTooltip } from 'reactstrap';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {SemiCircularRadial} from "./RadialbarCharts";

const ServerUsage = (props) => {
    const dispatch = useDispatch()
    const {cpuUsageServer} = useSelector(state => ({
        statusLoading: state.Occtl.statusLoading,
        cpuUsageServer: state.Occtl.cpuUsage,
        error: state.Occtl.error,
    }));

    const [cpuUsage, setCpuUsage] = useState(0)


    useEffect(()=>{
        if(cpuUsageServer){
            const formattedNumber = Number(cpuUsageServer).toFixed(2);
            setCpuUsage(Number(formattedNumber))
        }
    },[cpuUsageServer])



    return (
        <React.Fragment>
            <Col xl={3} md={6}>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-0">{props.t("CPU Usage")}</h4>
                    </CardHeader>
                    <CardBody>
                        <SemiCircularRadial dataColors='["--vz-primary"]' series={[cpuUsage?cpuUsage:0]} />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

ServerUsage.propTypes = {
    t: PropTypes.any
};
export default withTranslation()(ServerUsage);
