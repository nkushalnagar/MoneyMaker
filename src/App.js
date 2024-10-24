import { useState } from 'react'
const API_KEY = process.env.REACT_APP_SEARCH_API_KEY
const API_URL = 'https://www.searchapi.io/api/v1/search?api_key=' + API_KEY + '&data_type=TIMESERIES&time=now 7-d&engine=google_trends&geo=US&q='

function App() {
  //trends array
  const [trends, setTrends] = useState([])

  //state for input 1
  const [searchTerm,setSearchTerm] = useState('')

  //state for input 2
  const [searchTerm1,setSearchTerm1] = useState('')
  
  //state for first results we get back
  function handleSearchInputChange (event) {
    setSearchTerm(event.target.value)
  }

  function handleSearchInputChange1 (event) {
    setSearchTerm1(event.target.value)
  }

  const handleSearch = async () => {
    //go to trends api and search
    // store the results in some state
    console.log('searching for trend')
    
    const response = await fetch(API_URL + searchTerm + '%2C' + searchTerm1)
    const data = await response.json()
    setTrends(data)


  }

  return (
    <div class="container">
      <h1>Enter two topics you would like to compare</h1>
    
      <div class="input-container">
          <label for="topic1">Enter first topic:</label>
          <input 
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            id="topic1"
            name="topic1"
            placeholder="First topic"
            />
      </div>
    
      <div class="input-container">
          <label for="topic2">Enter second topic:</label>
          <input 
            type="text"
            value={searchTerm1}
            onChange={handleSearchInputChange1}
            id="topic2"
            name="topic2"
            placeholder="Second topic"
            />
      </div>
      <button onClick={handleSearch}> View Trends</button>
      <TrendGrid trends={trends}/>
    </div>
  )
}
//searchTerm = {searchTerm} searchTerm1 = {searchTerm1}
//,{searchTerm},{searchTerm1}
function TrendGrid( {trends} ) {
  console.log('trends',trends)
  var trend_1 = 0
  var trend_2 = 0
  try {
    trend_1 = trends.interest_over_time.averages[0].value;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("")
  }

  try {
    trend_2 = trends.interest_over_time.averages[1].value;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("")
  }
  /*if ({searchTerm} == 'undefined') {
    searchTerm = "couldn't find value"
  };
  if ({searchTerm1} == 'undefined') {
    searchTerm1 = "couldn't find value"
  }
  var popularity = ""
  if (trend_1 > trend_2) {
    popularity = "" + searchTerm + "is more popular than" + searchTerm1
  } else {
    popularity = "" + searchTerm1 + "is more popular than" + searchTerm
  }
*/
  return(

    <div>
        
        <h1> {trend_1} on a scale from 1-100 </h1>
        <h1> {trend_2} on a scale from 1-100 </h1>

    </div>
    

  )

}


export default App;
