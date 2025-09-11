import axios from 'axios'

export async function postWidgetCustomizations(data) {
  const { status } = await axios.post('https://stats.noobweer.ru/ranked/', data)
  if (status === 201) {
    return true
  } else {
    return false
  }
}
