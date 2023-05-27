import React, {useEffect, useState} from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {SemiCircularRadial} from "./RadialbarCharts";

const ServerUsage = (props) => {
    //const dispatch = useDispatch()
    const {serverSystem} = useSelector(state => ({
        statusLoading: state.Occtl.statusLoading,
        serverSystem: state.Occtl.system,
        error: state.Occtl.error,
    }));

    const [cpuUsage, setCpuUsage] = useState(0)
    const [memUsage, setMemUsage] = useState(0)


    useEffect(()=>{
        if(serverSystem && serverSystem.cpuUsage){
            const formattedNumber = Number(serverSystem.cpuUsage).toFixed(2);
            setCpuUsage(Number(formattedNumber))
        }
        if(serverSystem && serverSystem.totalmem && serverSystem.freemem){

            const usedMemory = serverSystem.totalmem - serverSystem.freemem; // Объем использованной памяти
            const memoryUsagePercent = (usedMemory / serverSystem.totalmem) * 100;

            const formattedNumber = Number(memoryUsagePercent).toFixed(2);
            setMemUsage(Number(formattedNumber))
        }
    },[serverSystem])



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
            <Col xl={3} md={6}>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-0">{props.t("MEM Usage")}</h4>
                    </CardHeader>
                    <CardBody>
                        <SemiCircularRadial dataColors='["--vz-primary"]' series={[memUsage?memUsage:0]} />
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
