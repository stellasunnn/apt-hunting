export async function getPrometheusAvailabilityById(id) {
    const date = new Date(new Date().setDate(new Date().getDate() + 7))
    const formattedTime = date.toISOString().split('T')[0]
    const response = await fetch(`https://shopping.prometheusapartments-prod-west2.com/${id}/available-units?date=${formattedTime}`)
    const data = await response.json()
    return data
}
