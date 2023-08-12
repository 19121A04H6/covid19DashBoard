import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Graphs from '../Graphs'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

let stateName
let lastUpdated
let id

const stats = {
  confirmedState: 'confirmed',
  activeState: 'active',
  recoveredState: 'recovered',
  deceasedState: 'deceased',
}

class StateSpecificRoute extends Component {
  state = {
    state: '',
    lastUpdatedDate: '',
    districtsList: [],
    isLoading: true,
    statState: stats.confirmedState,
  }

  componentDidMount() {
    this.getSpecificStateDetails()
  }

  loadingView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#ffffff" height="50" width="50" />
    </div>
  )

  getSpecificStateDetails = async () => {
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {stateCode} = params

    id = stateCode
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    function convertObjectsDataIntoListItemsUsingForInMethod() {
      const resultList = []

      const keyNames = Object.keys(data)

      keyNames.forEach(keyName => {
        if (keyName === stateCode) {
          const name = statesList.find(state => state.state_code === keyName)
          stateName = name.state_name

          lastUpdated = new Date(data[keyName].meta.last_updated)
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]
          const day = lastUpdated.getDate()
          const month = months[lastUpdated.getMonth()]
          const year = lastUpdated.getFullYear()

          console.log(
            month +
              ' '.toString() +
              day.toString() +
              'th'.toString() +
              ' '.toString() +
              year.toString(),
          )
          lastUpdated =
            month +
            ' '.toString() +
            day.toString() +
            'th'.toString() +
            ' '.toString() +
            year.toString()
          const {districts} = data[keyName]
          const districtNames = Object.keys(districts)
          console.log(districtNames)
          districtNames.forEach(districtName => {
            if (districts[districtName]) {
              const {total} = districts[districtName]

              const confirmed = total.confirmed ? total.confirmed : 0
              const deceased = total.deceased ? total.deceased : 0
              const recovered = total.recovered ? total.recovered : 0
              const tested = total.tested ? total.tested : 0

              resultList.push({
                districtName,
                confirmed,
                deceased,
                recovered,
                tested,

                active: confirmed - (deceased + recovered),
              })
            }
          })
        }
      })
      return resultList
    }

    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod()
    console.log(listFormattedDataUsingForInMethod)
    this.setState({
      state: stateName,
      lastUpdatedDate: lastUpdated,
      districtsList: listFormattedDataUsingForInMethod,
      isLoading: false,
    })
  }

  getTestedCases = () => {
    const {districtsList} = this.state

    const testedCases = districtsList.map(eachDistrict => eachDistrict.tested)
    return testedCases.reduce((acc, curr) => acc + curr)
  }

  changeToConfirmed = () => {
    this.setState({statState: stats.confirmedState})
  }

  changeToActive = () => {
    this.setState({statState: stats.activeState})
  }

  changeToRecovered = () => {
    this.setState({statState: stats.recoveredState})
  }

  changeToDeceased = () => {
    this.setState({statState: stats.deceasedState})
  }

  getCovidCases = () => {
    const {districtsList, statState} = this.state
    const confirmedClass =
      statState === stats.confirmedState ? 'confirmed-background' : ''
    const activeClass =
      statState === stats.activeState ? 'active-background' : ''
    const recoveredClass =
      statState === stats.recoveredState ? 'recovered-background' : ''
    const deceasedClass =
      statState === stats.deceasedState ? 'deceased-background' : ''

    const confirmedCases = districtsList.map(
      eachDistrict => eachDistrict.confirmed,
    )
    const activeCases = districtsList.map(
      eachDistrict =>
        eachDistrict.confirmed -
        (eachDistrict.recovered + eachDistrict.deceased),
    )

    const recoveredCases = districtsList.map(
      eachDistrict => eachDistrict.recovered,
    )

    const deceasedCases = districtsList.map(
      eachDistrict => eachDistrict.deceased,
    )
    return (
      <>
        <button onClick={this.changeToConfirmed} type="button">
          <div
            testid="stateSpecificConfirmedCasesContainer"
            className={`list-item ${confirmedClass}`}
          >
            <p className="confirmed-text">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dldkabpos/image/upload/v1691058063/check-mark_1_oei1ff.png"
              alt="state specific confirmed cases pic"
            />
            <p className="confirmed-count">
              {confirmedCases.reduce((acc, curr) => acc + curr)}
            </p>
          </div>
        </button>

        <button onClick={this.changeToActive} type="button">
          <div
            testid="stateSpecificActiveCasesContainer"
            className={`list-item ${activeClass}`}
          >
            <p className="active-text">Active</p>
            <img
              src="https://res.cloudinary.com/dldkabpos/image/upload/v1691058775/protection_1_ckizop.png"
              alt="state specific active cases pic"
            />
            <p className="active-count">
              {activeCases.reduce((acc, curr) => acc + curr)}
            </p>
          </div>
        </button>
        <button onClick={this.changeToRecovered} type="button">
          <div
            testid="stateSpecificRecoveredCasesContainer"
            className={`list-item ${recoveredClass}`}
          >
            <p className="recovered-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/dldkabpos/image/upload/v1691058911/recovered_1_etvj2c.png"
              alt="state specific recovered cases pic"
            />
            <p className="recovered-count">
              {recoveredCases.reduce((acc, curr) => acc + curr)}
            </p>
          </div>
        </button>
        <button onClick={this.changeToDeceased} type="button">
          <div
            testid="stateSpecificDeceasedCasesContainer"
            className={`list-item ${deceasedClass}`}
          >
            <p className="deceased-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/dldkabpos/image/upload/v1691059003/breathing_1_kaa7dr.png"
              alt="country wide deceased cases pic"
            />
            <p className="deceased-count">
              {deceasedCases.reduce((acc, curr) => acc + curr)}
            </p>
          </div>
        </button>
      </>
    )
  }

  getSortedCases = () => {
    const {districtsList, statState} = this.state
    switch (statState) {
      case stats.confirmedState:
        districtsList.sort((a, b) => b.confirmed - a.confirmed)
        return (
          <>
            <ul
              testid="topDistrictsUnorderedList"
              className="sorted-districts-container"
            >
              {districtsList.map(eachDistrict => (
                <li
                  key={eachDistrict.districtName}
                  className="count-and-district-container"
                >
                  <p className="top-district-counts">
                    {eachDistrict.confirmed}
                  </p>
                  <p className="top-district-names">
                    {eachDistrict.districtName}
                  </p>
                </li>
              ))}
            </ul>
            <Graphs statState={statState} stateCode={id} />
          </>
        )
      case stats.activeState:
        districtsList.sort((a, b) => b.active - a.active)
        return (
          <>
            <div className="sorted-districts-container">
              {districtsList.map(eachDistrict => (
                <div className="count-and-district-container">
                  <p className="top-district-counts">{eachDistrict.active}</p>
                  <p className="top-district-names">
                    {eachDistrict.districtName}
                  </p>
                </div>
              ))}
            </div>
            <Graphs statState={statState} stateCode={id} />
          </>
        )
      case stats.recoveredState:
        districtsList.sort((a, b) => b.recovered - a.recovered)
        return (
          <>
            <div className="sorted-districts-container">
              {districtsList.map(eachDistrict => (
                <div className="count-and-district-container">
                  <p className="top-district-counts">
                    {eachDistrict.recovered}
                  </p>
                  <p className="top-district-names">
                    {eachDistrict.districtName}
                  </p>
                </div>
              ))}
            </div>
            <Graphs statState={statState} stateCode={id} />
          </>
        )
      default:
        districtsList.sort((a, b) => b.deceased - a.deceased)
        return (
          <>
            <div className="sorted-districts-container">
              {districtsList.map(eachDistrict => (
                <div className="count-and-district-container">
                  <p className="top-district-counts">{eachDistrict.deceased}</p>
                  <p className="top-district-names">
                    {eachDistrict.districtName}
                  </p>
                </div>
              ))}
            </div>
            <Graphs statState={statState} stateCode={id} />
          </>
        )
    }
  }

  getDistrictNamesList = () => {
    const {districtsList} = this.state
    console.log(districtsList)
    return (
      <div testid="lineChartsContainer" className="district-list">
        <h1 className="top-districts">Top Districts</h1>

        {this.getSortedCases()}
      </div>
    )
  }

  render() {
    const {state, lastUpdatedDate, isLoading} = this.state
    return (
      <>
        <div className="specific-state-route-container">
          <Header />
          <div className="specific-state-info">
            {isLoading ? (
              this.loadingView()
            ) : (
              <>
                <div className="state-and-tested-container">
                  <div>
                    <div className="state-name-box">
                      <p className="state-name-specific">{state}</p>
                    </div>
                    <p className="last-update-date">
                      last update on {lastUpdatedDate}
                    </p>
                  </div>
                  <div>
                    <p className="test-text">Tested</p>
                    <p className="test-count">{this.getTestedCases()}</p>
                  </div>
                </div>
                <div className="state-search-results-unorderedlist">
                  {this.getCovidCases()}
                </div>

                {this.getDistrictNamesList()}
              </>
            )}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default StateSpecificRoute
