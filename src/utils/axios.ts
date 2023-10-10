import axios from 'axios'
import fetchAdapter from "@haverstack/axios-fetch-adapter"

axios.defaults.adapter = fetchAdapter

export default axios