import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
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

class Home extends Component {
  state = {
    isLoading: true,
    countryWideCases: [],
    searchInputList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getCovidDetails()
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#ffffff" height="50" width="50" />
    </div>
  )

  getCovidDetails = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()

    function convertObjectsDataIntoListItemsUsingForInMethod() {
      const resultList = []
      const keyNames = Object.keys(data)

      keyNames.forEach(keyName => {
        if (data[keyName] && keyName !== 'TT') {
          const {total} = data[keyName]
          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const name = statesList.find(state => state.state_code === keyName)
          const population = data[keyName].meta.population
            ? data[keyName].meta.population
            : 0

          resultList.push({
            stateCode: keyName,
            stateName: name.state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      return resultList
    }

    const listFormattedDataUsingForInMethod = convertObjectsDataIntoListItemsUsingForInMethod()
    this.setState({
      isLoading: false,
      countryWideCases: listFormattedDataUsingForInMethod,
    })
  }

  getSearchResultsUnorderedList = () => {
    const {countryWideCases} = this.state
    const confirmedCases = countryWideCases.map(
      eachState => eachState.confirmed,
    )
    const activeCases = countryWideCases.map(
      eachState =>
        eachState.confirmed - (eachState.recovered + eachState.deceased),
    )

    const recoveredCases = countryWideCases.map(
      eachState => eachState.recovered,
    )

    const deceasedCases = countryWideCases.map(eachState => eachState.deceased)

    return (
      <>
        <li
          key="confirmed"
          data-testid="countryWideConfirmedCases"
          className="list-item"
        >
          <p className="confirmed-text">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dldkabpos/image/upload/v1691058063/check-mark_1_oei1ff.png"
            alt="country wide confirmed cases pic"
          />
          <p className="confirmed-count">
            {confirmedCases.reduce((acc, curr) => acc + curr)}
          </p>
        </li>
        <li
          key="active"
          data-testid="countryWideActiveCases

"
          className="list-item"
        >
          <p className="active-text">Active</p>
          <img
            src="https://res.cloudinary.com/dldkabpos/image/upload/v1691058775/protection_1_ckizop.png"
            alt="country wide active cases pic"
          />
          <p className="active-count">
            {activeCases.reduce((acc, curr) => acc + curr)}
          </p>
        </li>
        <li
          key="recovered"
          data-testid="countryWideRecoveredCases

"
          className="list-item"
        >
          <p className="recovered-text">Recovered</p>
          <img
            src="https://res.cloudinary.com/dldkabpos/image/upload/v1691058911/recovered_1_etvj2c.png"
            alt="country wide recovered cases pic"
          />
          <p className="recovered-count">
            {recoveredCases.reduce((acc, curr) => acc + curr)}
          </p>
        </li>
        <li
          key="deceased"
          data-testid="countryWideDeceasedCases

"
          className="list-item"
        >
          <p className="deceased-text">Deceased</p>
          <img
            src="https://res.cloudinary.com/dldkabpos/image/upload/v1691059003/breathing_1_kaa7dr.png"
            alt="country wide deceased cases pic"
          />
          <p className="deceased-count">
            {deceasedCases.reduce((acc, curr) => acc + curr)}
          </p>
        </li>
      </>
    )
  }

  getSearchResults = () => {
    const {countryWideCases} = this.state
    const getStateNames = name => <p className="state-name">{name}</p>

    return (
      <>
        <ul
          className="search-results-unordered-list"
          data-testid="searchResultsUnorderedList"
        >
          {this.getSearchResultsUnorderedList()}
        </ul>
        <div
          data-testid="stateWiseCovidDataTable"
          className="state-wide-coviddata-table"
        >
          <div className="table-heading">
            <div className="state-ut-container">
              <p className="state-ut">States/UT</p>
              <FcGenericSortingAsc />
              <FcGenericSortingDesc />
            </div>
            <p className="column-heading">confirmed</p>
            <p className="column-heading">active</p>
            <p className="column-heading">recovered</p>
            <p className="column-heading">deceased</p>
            <p className="column-heading">population</p>
          </div>
          <hr className="h-line" />
          <div className="table-body">
            <div className="states-container">
              {countryWideCases.map(eachState =>
                getStateNames(eachState.stateName),
              )}
            </div>
            <div className="confirmed-counts">
              {countryWideCases.map(eachState =>
                getStateNames(eachState.confirmed),
              )}
            </div>
            <div className="active-counts">
              {countryWideCases.map(eachState =>
                getStateNames(eachState.active),
              )}
            </div>
            <div className="recovered-counts">
              {countryWideCases.map(eachState =>
                getStateNames(eachState.recovered),
              )}
            </div>
            <div className="deceased-counts">
              {countryWideCases.map(eachState =>
                getStateNames(eachState.deceased),
              )}
            </div>
            <div className="population-counts">
              {countryWideCases.map(eachState =>
                getStateNames(eachState.population),
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  onChangeInput = event => {
    this.setState({
      searchInputList: statesList.filter(eachState =>
        eachState.state_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase()),
      ),
      searchInput: event.target.value,
    })
  }

  render() {
    const {isLoading, searchInputList, searchInput} = this.state

    return (
      <>
        <Header />
        <div className="home-section">
          <div className="search-input-container">
            <img
              src="https://res.cloudinary.com/dldkabpos/image/upload/v1691046420/search_ai7p9s.png"
              alt="search"
            />

            <input
              onChange={this.onChangeInput}
              type="search"
              className="input"
              placeholder="Enter the State"
              value={searchInput}
            />
          </div>
          {searchInputList.length > 0 && (
            <ul onChange={this.onChangeInput} className="dropdowm">
              {searchInputList.map(eachState => (
                <Link className="link" to={`/state/${eachState.state_code}`}>
                  <li key={eachState.state_code} className="options">
                    <p>{eachState.state_name}</p>
                    <div className="line-container">
                      <p className="state-code">{eachState.state_code}</p>
                      <img
                        src="https://res.cloudinary.com/dldkabpos/image/upload/v1691165092/Line_gdq9rx.png"
                        alt="line"
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
          {isLoading ? this.loadingView() : this.getSearchResults()}
        </div>
      </>
    )
  }
}

export default Home