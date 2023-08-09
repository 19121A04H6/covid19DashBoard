import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const stats = {
  confirmedState: 'confirmed',
  activeState: 'active',
  recoveredState: 'recovered',
  deceasedState: 'deceased',
}

class Graphs extends Component {
  state = {dates: []}

  componentDidMount() {
    this.getTimeLines()
  }

  getTimeLines = async () => {
    const {stateCode} = this.props
    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data[stateCode].dates)
    const dateWiseData = []
    const keyNames = Object.keys(data[stateCode].dates)

    keyNames.forEach(date =>
      dateWiseData.push({
        date,
        confirmed: data[stateCode].dates[date].total.confirmed,
        deceased: data[stateCode].dates[date].total.deceased,
        recovered: data[stateCode].dates[date].total.recovered,
        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
      }),
    )
    this.setState({dates: dateWiseData})
    console.log(dateWiseData)
  }

  getBarChart = () => {
    const {statState} = this.props
    const {dates} = this.state
    let lastTenDays = dates.slice(-10)
    let color
    console.log(this.props)
    switch (statState) {
      case stats.confirmedState:
        lastTenDays = lastTenDays.map(eachDay => ({
          date: eachDay.date,
          count: eachDay.confirmed,
        }))
        color = '#9A0E31'
        break
      case stats.activeState:
        lastTenDays = lastTenDays.map(eachDay => ({
          date: eachDay.date,
          count: eachDay.active,
        }))
        color = '#0A4FA0'
        console.log(lastTenDays)
        break
      case stats.recoveredState:
        lastTenDays = lastTenDays.map(eachDay => ({
          date: eachDay.date,
          count: eachDay.recovered,
        }))
        color = '#216837'
        break
      default:
        lastTenDays = lastTenDays.map(eachDay => ({
          date: eachDay.date,
          count: eachDay.deceased,
        }))

        color = '#474C57'
        break
    }
    return (
      <div>
        <BarChart width={1200} height={450} data={lastTenDays}>
          <CartesianGrid strokeDasharray="" />
          <XAxis dataKey="date" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill={`${color}`}
            className="bar"
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  getLineCharts = () => {
    const {dates} = this.state
    return (
      <>
        <div className="App-1">
          <LineChart
            width={900}
            height={250}
            data={dates}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="confirmed" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="confirmed" stroke="#9A0E31" />
          </LineChart>
        </div>
        <div className="App-2">
          <LineChart
            width={900}
            height={250}
            data={dates}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="active" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#0A4FA0" />
          </LineChart>
        </div>
        <div className="App-3">
          <LineChart
            width={900}
            height={250}
            data={dates}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="recovered" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="recovered" stroke="#216837" />
          </LineChart>
        </div>
        <div className="App-4">
          <LineChart
            width={900}
            height={250}
            data={dates}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="deceased" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deceased" stroke="#474C57" />
          </LineChart>
        </div>
        <div className="App-5">
          <LineChart
            width={900}
            height={250}
            data={dates}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="tested" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tested" stroke="#474C57" />
          </LineChart>
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        <div>{this.getBarChart()}</div>
        <div>{this.getLineCharts()}</div>
      </>
    )
  }
}

export default Graphs
