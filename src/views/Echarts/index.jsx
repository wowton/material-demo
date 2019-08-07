import React, { PureComponent } from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ReactEcharts from "echarts-for-react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import HttpsIcon from "@material-ui/icons/Https";
import echarts from "echarts/lib/echarts";
import { withStyles } from "@material-ui/core";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Echarts extends PureComponent {
  getOption() {
    let option = {
      angleAxis: {},
      radiusAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四"],
        z: 10
      },
      polar: {},
      series: [
        {
          type: "bar",
          data: [1, 2, 3, 4],
          coordinateSystem: "polar",
          name: "A",
          stack: "a"
        },
        {
          type: "bar",
          data: [2, 4, 6, 8],
          coordinateSystem: "polar",
          name: "B",
          stack: "a"
        },
        {
          type: "bar",
          data: [1, 2, 3, 4],
          coordinateSystem: "polar",
          name: "C",
          stack: "a"
        }
      ],
      legend: {
        show: true,
        data: ["A", "B", "C"]
      }
    };
    return option;
  }
  getBarOption() {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
          "百度",
          "谷歌",
          "必应",
          "其他"
        ]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "广告",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "广告",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "bar",
          stack: "广告",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "搜索引擎",
          type: "bar",
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              normal: {
                type: "dashed"
              }
            },
            data: [[{ type: "min" }, { type: "max" }]]
          }
        },
        {
          name: "百度",
          type: "bar",
          barWidth: 5,
          stack: "搜索引擎",
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: "谷歌",
          type: "bar",
          stack: "搜索引擎",
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: "必应",
          type: "bar",
          stack: "搜索引擎",
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: "其他",
          type: "bar",
          stack: "搜索引擎",
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
  }
  render() {
    const { classes } = this.props;
    echarts.registerTheme("westeros", {
      seriesCnt: "4",
      backgroundColor: "rgba(0,0,0,0)",
      titleColor: "#516b91",
      subtitleColor: "#93b7e3",
      textColorShow: false,
      textColor: "#333",
      markTextColor: "#eee",
      color: ["#516b91", "#59c4e6", "#edafda", "#93b7e3", "#a5e7f0", "#cbb0e3"],
      borderColor: "#ccc",
      borderWidth: 0,
      visualMapColor: ["#516b91", "#59c4e6", "#a5e7f0"],
      legendTextColor: "#999999",
      kColor: "#edafda",
      kColor0: "transparent",
      kBorderColor: "#d680bc",
      kBorderColor0: "#8fd3e8",
      kBorderWidth: "2",
      lineWidth: "2",
      symbolSize: "6",
      symbol: "emptyCircle",
      symbolBorderWidth: "2",
      lineSmooth: true,
      graphLineWidth: 1,
      graphLineColor: "#aaa",
      mapLabelColor: "#000000",
      mapLabelColorE: "rgb(81,107,145)",
      mapBorderColor: "#516b91",
      mapBorderColorE: "#516b91",
      mapBorderWidth: 0.5,
      mapBorderWidthE: 1,
      mapAreaColor: "#f3f3f3",
      mapAreaColorE: "rgba(165,231,240,1)",
      axes: [
        {
          type: "all",
          name: "通用坐标轴",
          axisLineShow: true,
          axisLineColor: "#cccccc",
          axisTickShow: false,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#999999",
          splitLineShow: true,
          splitLineColor: ["#eeeeee"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"]
        },
        {
          type: "category",
          name: "类目坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: false,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        },
        {
          type: "value",
          name: "数值坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: true,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        },
        {
          type: "log",
          name: "对数坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: true,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        },
        {
          type: "time",
          name: "时间坐标轴",
          axisLineShow: true,
          axisLineColor: "#333",
          axisTickShow: true,
          axisTickColor: "#333",
          axisLabelShow: true,
          axisLabelColor: "#333",
          splitLineShow: true,
          splitLineColor: ["#ccc"],
          splitAreaShow: false,
          splitAreaColor: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      ],
      axisSeperateSetting: false,
      toolboxColor: "#999999",
      toolboxEmpasisColor: "#666666",
      tooltipAxisColor: "#cccccc",
      tooltipAxisWidth: 1,
      timelineLineColor: "#8fd3e8",
      timelineLineWidth: 1,
      timelineItemColor: "#8fd3e8",
      timelineItemColorE: "#8fd3e8",
      timelineCheckColor: "#8fd3e8",
      timelineCheckBorderColor: "rgba(138,124,168,0.37)",
      timelineItemBorderWidth: 1,
      timelineControlColor: "#8fd3e8",
      timelineControlBorderColor: "#8fd3e8",
      timelineControlBorderWidth: 0.5,
      timelineLabelColor: "#8fd3e8",
      datazoomBackgroundColor: "rgba(0,0,0,0)",
      datazoomDataColor: "rgba(255,255,255,0.3)",
      datazoomFillColor: "rgba(167,183,204,0.4)",
      datazoomHandleColor: "#a7b7cc",
      datazoomHandleWidth: "100",
      datazoomLabelColor: "#333333"
    });
    return (
      <div>
        <Button variant="contained" color="primary">
          Secondary
        </Button>
        <IconButton>
          <i className="fa fa-heartbeat"></i>
        </IconButton>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="success">
                <HttpsIcon />
                <h4 className={classes.cardTitleWhite}>Daily Sales</h4>
              </CardHeader>
              <CardBody>
                <ReactEcharts
                  option={this.getOption()}
                  notMerge={true}
                  lazyUpdate={true} //opts={{ renderer: "svg" }}
                  theme={"westeros"}
                />
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                <HttpsIcon />
                <h4 className={classes.cardTitleWhite}>Daily Sales</h4>
              </CardHeader>
              <CardBody>
                <ReactEcharts
                  option={this.getBarOption()}
                  notMerge={true}
                  lazyUpdate={true} //opts={{ renderer: "svg" }}
                  theme={"westeros"}
                />
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(dashboardStyle)(Echarts);
